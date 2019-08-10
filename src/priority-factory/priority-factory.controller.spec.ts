import { Test, TestingModule } from '@nestjs/testing';
import { PriorityFactoryController } from './priority-factory.controller';

describe('PriorityFactory Controller', () => {
  let controller: PriorityFactoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriorityFactoryController],
    }).compile();

    controller = module.get<PriorityFactoryController>(PriorityFactoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
