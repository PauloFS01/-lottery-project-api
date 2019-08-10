import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResultsController } from './results/results.controller';
import { StatisticsService } from './statistics/statistics.service';
import { SenaLottery } from './schemas/lottery.schemas';
import { PriorityFactoryController } from './priority-factory/priority-factory.controller';
import { PriorityService } from './priority/priority.service';
import config from './config/keys';

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoURL),
    MongooseModule.forFeature([{ name: 'Sena', schema: SenaLottery }]),
  ],
  controllers: [AppController, ResultsController, PriorityFactoryController],
  providers: [AppService, StatisticsService, PriorityService],
})
export class AppModule {}
