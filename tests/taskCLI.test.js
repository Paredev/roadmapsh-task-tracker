const TaskCLI = require('src/taskCLI');
const TaskCommands = require('src/taskCommands');

// Mock the TaskCommands module
jest.mock('src/taskCommands');

describe('TaskCLI', () => {
  let consoleSpy;

  beforeEach(() => {
    // Spy on console.log
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    // Clear all mocks
    jest.clearAllMocks();
    // Restore console.log
    consoleSpy.mockRestore();
  });

  test('handleCommand should call addTask when "add" command is used', () => {
    TaskCLI.handleCommand(['add', 'New task']);
    expect(TaskCommands.addTask).toHaveBeenCalledWith('New task');
  });

  test('handleCommand should log error when "add" command is used without description', () => {
    TaskCLI.handleCommand(['add']);
    expect(consoleSpy).toHaveBeenCalledWith('Please provide a task description');
  });

  test('handleCommand should call updateTask when "update" command is used', () => {
    TaskCLI.handleCommand(['update', '1', 'Updated task']);
    expect(TaskCommands.updateTask).toHaveBeenCalledWith('1', 'Updated task');
  });

  test('handleCommand should log error when "update" command is used without ID or description', () => {
    TaskCLI.handleCommand(['update']);
    expect(consoleSpy).toHaveBeenCalledWith('Please provide task ID and new description');
  });

  test('handleCommand should call deleteTask when "delete" command is used', () => {
    TaskCLI.handleCommand(['delete', '1']);
    expect(TaskCommands.deleteTask).toHaveBeenCalledWith('1');
  });

  test('handleCommand should log error when "delete" command is used without ID', () => {
    TaskCLI.handleCommand(['delete']);
    expect(consoleSpy).toHaveBeenCalledWith('Please provide a task ID');
  });

  test('handleCommand should call markTask with "in-progress" when "mark-in-progress" command is used', () => {
    TaskCLI.handleCommand(['mark-in-progress', '1']);
    expect(TaskCommands.markTask).toHaveBeenCalledWith('1', 'in-progress');
  });

  test('handleCommand should call markTask with "done" when "mark-done" command is used', () => {
    TaskCLI.handleCommand(['mark-done', '1']);
    expect(TaskCommands.markTask).toHaveBeenCalledWith('1', 'done');
  });

  test('handleCommand should log error when "mark-in-progress" or "mark-done" command is used without ID', () => {
    TaskCLI.handleCommand(['mark-in-progress']);
    expect(consoleSpy).toHaveBeenCalledWith('Please provide a task ID');

    TaskCLI.handleCommand(['mark-done']);
    expect(consoleSpy).toHaveBeenCalledWith('Please provide a task ID');
  });

  test('handleCommand should call listTasks when "list" command is used', () => {
    TaskCLI.handleCommand(['list']);
    expect(TaskCommands.listTasks).toHaveBeenCalled();
  });

  test('handleCommand should call listTasks with filter when provided', () => {
    TaskCLI.handleCommand(['list', 'done']);
    expect(TaskCommands.listTasks).toHaveBeenCalledWith('done');
  });

  test('handleCommand should log error for unknown command', () => {
    TaskCLI.handleCommand(['unknown']);
    expect(consoleSpy).toHaveBeenCalledWith('Unknown command. Available commands: add, update, delete, mark-in-progress, mark-done, list');
  });
});