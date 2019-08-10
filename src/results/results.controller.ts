import { Controller, Get, Post, Body} from '@nestjs/common';
import { GuessDTO } from '../dto/guess-dto.dto';
import { ResultDTO } from '../dto/result.dto';
import { StatisticsService } from '../statistics/statistics.service';
import { PriorityDTO } from '../dto/priority-dto.dto';
import { Result } from '../interfaces/result.interface';

@Controller('results')
export class ResultsController {
    constructor(private readonly statisticService: StatisticsService) {}

    // Return a priority queue with matches
    @Post()
    findStatistic(@Body() yourGuess: GuessDTO): Promise<PriorityDTO[]> {
        return this.statisticService.statisticData(yourGuess);
    }
    // Add new result
    @Post('new')
    create(@Body() result: ResultDTO): Promise<Result> {
        return this.statisticService.create(result);
    }
    // Get all results
    @Get()
    test(): Promise<Result> {
        return this.statisticService.getAll();
    }
}
