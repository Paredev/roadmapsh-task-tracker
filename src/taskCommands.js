const TaskModel = require('./taskModel');

class TaskCommands {
  static addTask(description) {
    const tasks = TaskModel.loadTasks();
    const newTask = {
      id: TaskModel.getNextId(tasks),
      description,
      status: 'todo',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    tasks.push(newTask);
    TaskModel.saveTasks(tasks);
    console.log(`Task added successfully (ID: ${newTask.id})`);
  }

  static updateTask(id, description) {
    const tasks = TaskModel.loadTasks();
    const task = tasks.find(t => t.id === parseInt(id));
    if (task) {
      task.description = description;
      task.updatedAt = new Date().toISOString();
      TaskModel.saveTasks(tasks);
      console.log(`Task updated successfully (ID: ${id})`);
    } else {
      console.log(`Task with ID ${id} not found`);
    }
  }

  static deleteTask(id) {
    let tasks = TaskModel.loadTasks();
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id !== parseInt(id));
    if (tasks.length < initialLength) {
      TaskModel.saveTasks(tasks);
      console.log(`Task deleted successfully (ID: ${id})`);
    } else {
      console.log(`Task with ID ${id} not found`);
    }
  }

  static markTask(id, status) {
    const tasks = TaskModel.loadTasks();
    const task = tasks.find(t => t.id === parseInt(id));
    if (task) {
      task.status = status;
      task.updatedAt = new Date().toISOString();
      TaskModel.saveTasks(tasks);
      console.log(`Task marked as ${status} (ID: ${id})`);
    } else {
      console.log(`Task with ID ${id} not found`);
    }
  }

  static listTasks(filter) {
    const tasks = TaskModel.loadTasks();
    const filteredTasks = filter ? tasks.filter(t => t.status === filter) : tasks;
    if (filteredTasks.length === 0) {
      console.log('No tasks found');
    } else {
      filteredTasks.forEach(t => {
        console.log(`[${t.id}] ${t.description} (${t.status})`);
      });
    }
  }
}

module.exports = TaskCommands;