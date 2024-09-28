const TaskCommands = require('./taskCommands');

class TaskCLI {
  static handleCommand(args) {
    const command = args[0];
    switch (command) {
      case 'add':
        if (args[1]) TaskCommands.addTask(args[1]);
        else console.log('Please provide a task description');
        break;
      case 'update':
        if (args[1] && args[2]) TaskCommands.updateTask(args[1], args[2]);
        else console.log('Please provide task ID and new description');
        break;
      case 'delete':
        if (args[1]) TaskCommands.deleteTask(args[1]);
        else console.log('Please provide a task ID');
        break;
      case 'mark-in-progress':
        if (args[1]) TaskCommands.markTask(args[1], 'in-progress');
        else console.log('Please provide a task ID');
        break;
      case 'mark-done':
        if (args[1]) TaskCommands.markTask(args[1], 'done');
        else console.log('Please provide a task ID');
        break;
      case 'list':
        TaskCommands.listTasks(args[1]);
        break;
      default:
        console.log('Unknown command. Available commands: add, update, delete, mark-in-progress, mark-done, list');
    }
  }
}

module.exports = TaskCLI;