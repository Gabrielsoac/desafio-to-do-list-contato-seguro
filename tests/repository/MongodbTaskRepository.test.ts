jest.mock('../../src/models/UserModel');
import { CreateOutputPersistedTask } from '../../src/infra/repository/task/CreateOutputPersistedTask';
import { MongoDBTaskRepository } from '../../src/infra/repository/task/MongoDBTaskRepository';
import { TaskModel } from '../../src/models/TaskModel';
import { TaskBuilder } from '../builders/task/TaskBuilder';
import { TaskPersistedBuilder } from '../builders/task/TaskPersistedBuilder';
import { TaskPersistedFormatedBuilder } from '../builders/task/TaskPersistedFormatedBuilder';

describe(
  'Save Task Tests',
  () => {

    beforeEach(
      () => {
          jest.clearAllMocks();
      });

    it (
      'should to save a task with sucess',
      async () => {
        
        const taskRepository = new MongoDBTaskRepository();

        const task = TaskBuilder.aTask().build();
        const taskPersisted = TaskPersistedBuilder.aTask().build();
        const taskPersistedFormated = TaskPersistedFormatedBuilder.aTask().build();
        
        CreateOutputPersistedTask.create = jest.fn().mockReturnValue(taskPersistedFormated);
        TaskModel.create = jest.fn().mockReturnValue(taskPersisted);

        expect(
          await taskRepository.save(task)
        ).toEqual(taskPersistedFormated)
      }
    )
  }
);
  