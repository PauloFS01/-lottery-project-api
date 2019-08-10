import { Controller } from '@nestjs/common';
import { PriorityDTO } from '../dto/priority-dto.dto';
import { Result } from '../interfaces/result.interface';

@Controller('priority-factory')
export class PriorityFactoryController {

    private listResult: PriorityDTO[] = [];
    // will iterate the matches and enqueue
    getQueue(drawn: string[], mockResult: Result[]): PriorityDTO[] {
        this.listResult = [];
        for (const b of mockResult) {
            if (!this.has(b._id)) {
                const priorityDTO: PriorityDTO = {
                    result: b,
                    priority: this.prior(drawn, b.drawn),
                };
                this.enqueue(priorityDTO);
            }
        }
        return this.listResult;
    }
    // verify if the queue has result
    has(id: string): boolean {
        for (const e of this.listResult) {
            if (e.result._id === id) {
                return true;
            }
        }
        return false;
    }
    // will define the priority of each match
    prior(drawn: string[], resultDrawn: string[]): number {
        let sum = 0;
        for (const e of resultDrawn) {
            if (drawn.indexOf(e) !== -1) {
                sum += 1;
            }
        }
        return sum;
    }
    // enqueue the match in order of priority
    enqueue(element: PriorityDTO) {
        let added: boolean = false;
        for (const i in this.listResult) {
            if (element.priority > this.listResult[i].priority) {
                this.listResult.splice(Number(i), 0, element);
                added = true;
                break;
            }
        }
        if (!added) {
            this.listResult.push(element);
        }
    }
}
