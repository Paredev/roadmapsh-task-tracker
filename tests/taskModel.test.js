const fs = require('fs');
const TaskModel = require('src/taskModel');

jest.mock('fs');

describe('TaskModel', () => {
  const TASK_FILE = 'tasks.json';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loadTasks', () => {
    test('should return an empty array if file does not exist', () => {
      fs.existsSync.mockReturnValue(false);
      expect(TaskModel.loadTasks()).toEqual([]);
    });

    test('should return parsed JSON data if file exists', () => {
      const mockTasks = [{ id: 1, description: 'Test task', status: 'todo' }];
      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue(JSON.stringify(mockTasks));
      expect(TaskModel.loadTasks()).toEqual(mockTasks);
    });
  });

  describe('saveTasks', () => {
    test('should write tasks to file', () => {
      const tasks = [{ id: 1, description: 'Test task', status: 'todo' }];
      TaskModel.saveTasks(tasks);
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        TASK_FILE,
        JSON.stringify(tasks, null, 2)
      );
    });
  });

  describe('getNextId', () => {
    test('should return 1 if tasks array is empty', () => {
      expect(TaskModel.getNextId([])).toBe(1);
    });

    test('should return max id + 1 if tasks array is not empty', () => {
      const tasks = [
        { id: 1, description: 'Task 1' },
        { id: 3, description: 'Task 3' },
        { id: 2, description: 'Task 2' },
      ];
      expect(TaskModel.getNextId(tasks)).toBe(4);
    });
  });
});