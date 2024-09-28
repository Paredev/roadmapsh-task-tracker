#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const TASK_FILE = 'tasks.json';

// Helper functions
function loadTasks() {
  if (!fs.existsSync(TASK_FILE)) {
    return [];
  }
  const data = fs.readFileSync(TASK_FILE, 'utf8');
  return JSON.parse(data);
}

function saveTasks(tasks) {
  fs.writeFileSync(TASK_FILE, JSON.stringify(tasks, null, 2));
}

function getNextId(tasks) {
  return tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
}

// Command handlers
function addTask(description) {
  const tasks = loadTasks();
  const newTask = {
    id: getNextId(tasks),
    description,
    status: 'todo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  tasks.push(newTask);
  saveTasks(tasks);
  console.log(`Task added successfully (ID: ${newTask.id})`);
}

function updateTask(id, description) {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === parseInt(id));
  if (task) {
    task.description = description;
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log(`Task updated successfully (ID: ${id})`);
  } else {
    console.log(`Task with ID ${id} not found`);
  }
}

function deleteTask(id) {
  let tasks = loadTasks();
  const initialLength = tasks.length;
  tasks = tasks.filter(t => t.id !== parseInt(id));
  if (tasks.length < initialLength) {
    saveTasks(tasks);
    console.log(`Task deleted successfully (ID: ${id})`);
  } else {
    console.log(`Task with ID ${id} not found`);
  }
}

function markTask(id, status) {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === parseInt(id));
  if (task) {
    task.status = status;
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log(`Task marked as ${status} (ID: ${id})`);
  } else {
    console.log(`Task with ID ${id} not found`);
  }
}

function listTasks(filter) {
  const tasks = loadTasks();
  const filteredTasks = filter ? tasks.filter(t => t.status === filter) : tasks;
  if (filteredTasks.length === 0) {
    console.log('No tasks found');
  } else {
    filteredTasks.forEach(t => {
      console.log(`[${t.id}] ${t.description} (${t.status})`);
    });
  }
}

// Main command handler
function handleCommand(args) {
  const command = args[0];
  switch (command) {
    case 'add':
      if (args[1]) addTask(args[1]);
      else console.log('Please provide a task description');
      break;
    case 'update':
      if (args[1] && args[2]) updateTask(args[1], args[2]);
      else console.log('Please provide task ID and new description');
      break;
    case 'delete':
      if (args[1]) deleteTask(args[1]);
      else console.log('Please provide a task ID');
      break;
    case 'mark-in-progress':
      if (args[1]) markTask(args[1], 'in-progress');
      else console.log('Please provide a task ID');
      break;
    case 'mark-done':
      if (args[1]) markTask(args[1], 'done');
      else console.log('Please provide a task ID');
      break;
    case 'list':
      listTasks(args[1]);
      break;
    default:
      console.log('Unknown command. Available commands: add, update, delete, mark-in-progress, mark-done, list');
  }
}

// Run the CLI
const args = process.argv.slice(2);
handleCommand(args);