import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IRAPController } from './controllers/irap.controller';
import { IRAPService } from './services/irap.service';
import { IRAP } from './entities';
import { IRAPRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([IRAP])],
  providers: [IRAPService, IRAPRepository],
  controllers: [IRAPController],
})
export class IrapModule {}
