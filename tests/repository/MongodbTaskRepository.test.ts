jest.mock('../../src/models/UserModel');
import { TaskStatus } from '../../src/domain/entities/task/EnumTaskStatus';
import { TaskNotFoundError } from '../../src/errors/task/TaskNotFoundException';
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

    it (
      'should to throw Error when INTERNAL SERVER ERROR',
      async () => {

        const taskRepository = new MongoDBTaskRepository();

        const task = TaskBuilder.aTask().build();
        TaskModel.create = jest.fn().mockRejectedValue(task);
        
        await expect(
          taskRepository.save(task)).rejects.toThrow(Error('Erro ao salvar usuário'));
      }
    );
  }
);

describe(
  'update task',
  () => {

    beforeEach(
      () => {
          jest.clearAllMocks();
      });
      
      it (
        'update task with sucess',
        async () => {

          const taskRepository = new MongoDBTaskRepository();

          const task = TaskPersistedBuilder.aTask()
            .withDescription("description updated")
            .withTitle('Title updated')
            .withStatus(TaskStatus.IN_PROGRESS)
          .build();

          const taskFormated = TaskPersistedFormatedBuilder.aTask()
            .withDescription("description updated")
            .withTitle('Title updated')
            .withStatus(TaskStatus.IN_PROGRESS)
          .build();

          TaskModel.findByIdAndUpdate = jest.fn().mockResolvedValue(task);
          CreateOutputPersistedTask.create = jest.fn().mockResolvedValue(taskFormated);

          expect(
            await taskRepository.updateTask(
              {
                id: task.id,
                title: "Title updated",
                description: "description updated",
                status: TaskStatus.IN_PROGRESS
              }
            )
          ).toEqual(taskFormated);
        }
      );
    
      it(
        'should to throw Error when task not found',
        async () => {

          const taskRepository = new MongoDBTaskRepository();
          const task = {
            id: '1234567890988765434',
            title: 'new title',
            description: 'Description',
            status: TaskStatus.IN_PROGRESS
          }

          TaskModel.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

          await expect(
            taskRepository.updateTask(task)
          ).rejects.toThrow(TaskNotFoundError)
        }
      );
  }
);

describe(
  'delete task',
  () => {

    beforeEach(
      () => {
          jest.clearAllMocks();
      });


    it(
      'should to delete a task with sucess',
      async () => {

        const taskRepository = new MongoDBTaskRepository();

        const task = TaskPersistedBuilder.aTask().build();
        TaskModel.findByIdAndDelete = jest.fn().mockResolvedValue(task);

        expect(taskRepository.deleteTask('123456789'));

        expect(TaskModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
      }
    );

    it(
      'should to throw Error when Task not found',
      () => {

        const taskRepository = new MongoDBTaskRepository();

        TaskModel.findByIdAndDelete = jest.fn().mockResolvedValue(null);

        expect(
          taskRepository.deleteTask('1234567890')
        ).rejects.toThrow(TaskNotFoundError);
      }
    );

    it(
      'should to delete All tasks by user with sucess',
      async () => {

        const taskRepository = new MongoDBTaskRepository();
        const taskList = [
          TaskBuilder.aTask().build(),
          TaskBuilder.aTask().build()
        ]

        TaskModel.deleteMany = jest.fn().mockResolvedValue(taskList);

        taskRepository.deleteAllTasksByUser('123456789');
        
        expect(TaskModel.deleteMany).toHaveBeenCalledTimes(1);
        expect(TaskModel.deleteMany).toHaveBeenCalledWith({user: '123456789'});
      }
    );
  }
);