#!/usr/bin/env node

const TaskCLI = require('./taskCLI');

// Run the CLI
const args = process.argv.slice(2);
TaskCLI.handleCommand(args);