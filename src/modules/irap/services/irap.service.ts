import { Injectable, NotFoundException, Param, Query } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IRAP } from '../entities';
import * as XLSX from 'xlsx';
import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class IRAPService {

  constructor(
    @InjectRepository(IRAP)
    private readonly IRAPRespitory: Repository<IRAP>,
  ) {}

  async list(@Query() query: any) {

    return await this.IRAPRespitory.findBy(query);
  }

  async listJson() {

    const filePath = './src/modules/irap/json/data.json';

    const json = readFileSync(filePath, 'utf-8')

    return json;
  }

  async detail(@Param() id: any): Promise<IRAP> {

    const data = await this.IRAPRespitory.findOneBy(id);

    if (data === null) {
      throw new NotFoundException(`ID not found in database`);
    }

    return data;
  }

  async create(data: any) {

    const save = await this.IRAPRespitory.save(data);
    const id: any = save.id;
    const savedData = await this.IRAPRespitory.findOneBy({ id });

    savedData.save();

    return savedData;
  }

  async excel(body, res) {

    const data = body?.body.map(item => ({

      "MO": item.mo,
      "CPO": item.cpo,
      "Article": item.article,
      "Working No": item.working_no,
      "Country/Site": item.country,
      "MO Order Qty": item.mo_order_qty,
      "Sample Size": item.sample_size,
      "TC PODD": item.tc_podd,
      "Inspect Date": item.inspect_date,
      "Inspect Result": this.result(item.inspect_result),
      "Issue": item.issue,
      "Root Cause": item.root_cause,
      "Action": item.action,
      "Prevention": item.prevention

    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Convert workbook to buffer (memory representation)
    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

    // Set response headers for download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${'irap.xlsx'}`); // Set filename

    // Stream the buffer to the response
    res.end(buffer, 'binary');

    return res;
  }

  async update(id: any, body): Promise<IRAP> {

    const data = await this.IRAPRespitory.findOneBy(id);

    if (data == null) {
      throw new NotFoundException(`ID not found in database`);
    }

    data.mo = body.mo;
    data.cpo = body.cpo;
    data.working_no = body.working_no;
    data.article = body.article;
    data.country = body.country;
    data.mo_order_qty = body.mo_order_qty;
    data.sample_size = body.sample_size;
    data.inspect_date = body.inspect_date;
    data.inspect_result = body.inspect_result;
    data.issue = body.issue;
    data.root_cause = body.root_cause;
    data.action = body.action;
    data.prevention = body.prevention;
    data.updated_At = new Date();
    data.inspect_from = body.inspect_from;
    data.inspector_name = body.inspector_name;
    data.person_in_charge = body.person_in_charge;
    data.department = body.department;

    await data.save()

    return data;
  }

  async delete(id: any) {


    const data = await this.IRAPRespitory.findOneBy({ ...id })

    if (data == null) {
      throw new NotFoundException(`ID not found in database`);
    }

    const deletedData = await this.IRAPRespitory.delete(id);

    if (deletedData.affected == 0) {
      console.log(`No data in DB deleted`);
    }

    return `Data with ID ${data.id} have been deleted`;
  }

  convertDataFromSpecificCell(addresses) {

    const workbook = XLSX.readFile(join(__dirname, 'excel.xlsx'));
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    let cell = worksheet[addresses];
    return cell ? cell.v : undefined;

  }

  excelDataCollector(file: any) {

    writeFileSync(join(__dirname, 'excel.xlsx'), file?.buffer, { flag: 'w' });

    const workbook = XLSX.readFile(join(__dirname,'excel.xlsx'));
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];


    const range = XLSX.utils.decode_range(worksheet['!ref']);
    const totalRows = range.e.r - range.s.r + 1;
    const length = totalRows-2;


    const keyAddress = ['G', 'F', 'AC', 'Z', 'AE', 'T', 'I'];
    const startValue = 3;
    const arrayList = new Array(length);

    for (let i = startValue; i <= length; i++) {

      let test = length+startValue-i

      console.log(`${test} rows left`)

      arrayList[i - startValue] = {
          "MO": this.convertDataFromSpecificCell(`${keyAddress[0]+i}`),
          "CPO": this.convertDataFromSpecificCell(`${keyAddress[1]+i}`),
          "Article": this.convertDataFromSpecificCell(`${keyAddress[2]+i}`),
          "Working No": this.convertDataFromSpecificCell(`${keyAddress[3]+i}`),
          "Country/Site": this.convertDataFromSpecificCell(`${keyAddress[4]+i}`),
          "TC PODD": this.convertDataFromSpecificCell(`${keyAddress[5]+i}`),
          "MO Order Qty": this.convertDataFromSpecificCell(`${keyAddress[6]+i}`)
      };

  }

    return arrayList;

  }

  file(file: any) {

    const worksheet = this.excelDataCollector(file);

    return worksheet;
  }

  result(result: boolean) {
    if(result == true) {
      return "Pass"
    }
    else if(result == false) {
      return "Fail"
    }
  }

}
