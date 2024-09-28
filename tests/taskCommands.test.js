const TaskCommands = require('src/taskCommands');
const TaskModel = require('src/taskModel');

// Mock TaskModel to avoid file system operations during tests
jest.mock('src/taskModel');

describe('TaskCommands', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    TaskModel.loadTasks.mockReturnValue([]);
    TaskModel.getNextId.mockReturnValue(1);
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    jest.clearAllMocks();
  });

  test('addTask should add a new task', () => {
    TaskCommands.addTask('Test task');
    expect(TaskModel.saveTasks).toHaveBeenCalledWith([
      expect.objectContaining({
        id: 1,
        description: 'Test task',
        status: 'todo'
      })
    ]);
    expect(consoleSpy).toHaveBeenCalledWith('Task added successfully (ID: 1)');
  });

  test('updateTask should update an existing task', () => {
    TaskModel.loadTasks.mockReturnValue([{ id: 1, description: 'Old task', status: 'todo' }]);
    TaskCommands.updateTask(1, 'Updated task');
    expect(TaskModel.saveTasks).toHaveBeenCalledWith([
      expect.objectContaining({
        id: 1,
        description: 'Updated task',
        status: 'todo'
      })
    ]);
    expect(consoleSpy).toHaveBeenCalledWith('Task updated successfully (ID: 1)');
  });

  test('deleteTask should remove an existing task', () => {
    TaskModel.loadTasks.mockReturnValue([{ id: 1, description: 'Task to delete', status: 'todo' }]);
    TaskCommands.deleteTask(1);
    expect(TaskModel.saveTasks).toHaveBeenCalledWith([]);
    expect(consoleSpy).toHaveBeenCalledWith('Task deleted successfully (ID: 1)');
  });

  test('markTask should update the status of an existing task', () => {
    TaskModel.loadTasks.mockReturnValue([{ id: 1, description: 'Task to mark', status: 'todo' }]);
    TaskCommands.markTask(1, 'done');
    expect(TaskModel.saveTasks).toHaveBeenCalledWith([
      expect.objectContaining({
        id: 1,
        description: 'Task to mark',
        status: 'done'
      })
    ]);
    expect(consoleSpy).toHaveBeenCalledWith('Task marked as done (ID: 1)');
  });

  test('listTasks should display all tasks when no filter is provided', () => {
    TaskModel.loadTasks.mockReturnValue([
      { id: 1, description: 'Task 1', status: 'todo' },
      { id: 2, description: 'Task 2', status: 'done' }
    ]);
    TaskCommands.listTasks();
    expect(consoleSpy).toHaveBeenCalledWith('[1] Task 1 (todo)');
    expect(consoleSpy).toHaveBeenCalledWith('[2] Task 2 (done)');
  });

  test('listTasks should display filtered tasks when a filter is provided', () => {
    TaskModel.loadTasks.mockReturnValue([
      { id: 1, description: 'Task 1', status: 'todo' },
      { id: 2, description: 'Task 2', status: 'done' }
    ]);
    TaskCommands.listTasks('done');
    expect(consoleSpy).toHaveBeenCalledWith('[2] Task 2 (done)');
    expect(consoleSpy).not.toHaveBeenCalledWith('[1] Task 1 (todo)');
  });
});