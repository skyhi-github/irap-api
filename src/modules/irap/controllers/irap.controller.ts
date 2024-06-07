import { Controller, Get, Post, Body, Param, Put, Delete, Query, Res } from '@nestjs/common';
import { IRAPService } from '../services/irap.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateIRAPDto, UpdateIRAPDto, QueryIRAPDto, IdsIRAPDto } from '../dto';

@ApiTags('IRAP')
@Controller('v1/irap')
export class IRAPController {
  constructor(private IrapService: IRAPService) {}

  @Get()
  get(@Query() query: QueryIRAPDto) {
    return this.IrapService.list(query);
  }

  @Get('json')
  getJson() {
    return this.IrapService.listJson();
  }

  @ApiParam({ name: 'id', required: true })
  @Get(':id')
  detail(@Param() id: string) {
    return this.IrapService.detail(id);
  }

  @Post()
  create(@Body() data: CreateIRAPDto) {
    return this.IrapService.create(data);
  }

  @Post('excel')
  excel(@Body() body: IdsIRAPDto, @Res() res: Response) {
    return this.IrapService.excel(body, res);
  }

  @ApiParam({ name: 'id', required: true })
  @Put(':id')
  update(@Param() id: string, @Body() data: UpdateIRAPDto) {
    return this.IrapService.update(id, data);
  }

  @ApiParam({ name: 'id', required: true })
  @Delete(':id')
  delete(@Param() id: string) {
    return this.IrapService.delete(id);
  }
}
