import { DataSource, EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { IRAP } from '../entities';

@EntityRepository(IRAP)
export class IRAPRepository extends Repository<IRAP> {

  constructor(private datasource: DataSource) {
    super(IRAP, datasource.createEntityManager());
  }

  async $find({ inspection_date_from: from, inspection_date_to: to }: { inspection_date_from: Date, inspection_date_to: Date }) {
    const query: SelectQueryBuilder<IRAP> = this.createQueryBuilder().where('id IS NOT NULL');

    if (!!from && !!to) query.andWhere(`inspection_date BETWEEN ${from} AND ${to}`)

        return query.getMany();

  }
};
