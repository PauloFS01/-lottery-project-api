import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GuessDTO } from '../dto/guess-dto.dto';
import { PriorityDTO } from '../dto/priority-dto.dto';
import { Result } from '../interfaces/result.interface';
import { ResultDTO } from '../dto/result.dto';
import { PriorityService } from '../priority/priority.service';

@Injectable()
export class StatisticsService {

    constructor(@InjectModel('Sena') private readonly resultModel: Model<Result>, private readonly priorityService: PriorityService) {}
    // search matches and call factory of priority queue
    async statisticData(guessDTO: GuessDTO): Promise<PriorityDTO[]> {
        let mockResult: Result[] = [];
        mockResult = await this.resultModel.find({drawn: {$in: guessDTO.value}});
        return this.priorityService.getQueue(guessDTO.value, mockResult);
    }
    // save new result in database
    async create(result: ResultDTO): Promise<Result> {
        const newResult = new this.resultModel(result);
        return await newResult.save();
    }
    // search all results in database
    async getAll(): Promise<Result> {
        return this.resultModel.find();
    }
}
