const fs = require('fs');

const TASK_FILE = 'tasks.json';

class TaskModel {
  static loadTasks() {
    if (!fs.existsSync(TASK_FILE)) {
      return [];
    }
    const data = fs.readFileSync(TASK_FILE, 'utf8');
    return JSON.parse(data);
  }

  static saveTasks(tasks) {
    fs.writeFileSync(TASK_FILE, JSON.stringify(tasks, null, 2));
  }

  static getNextId(tasks) {
    return tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
  }
}

module.exports = TaskModel;