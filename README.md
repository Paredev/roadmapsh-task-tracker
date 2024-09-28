# Task Tracker CLI

Task Tracker CLI is a command-line tool for managing tasks. It allows you to add, update, delete, mark, and list tasks directly from your terminal.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Add a Task](#add-a-task)
  - [Update a Task](#update-a-task)
  - [Delete a Task](#delete-a-task)
  - [Mark a Task as In-Progress](#mark-a-task-as-in-progress)
  - [Mark a Task as Done](#mark-a-task-as-done)
  - [List Tasks](#list-tasks)
- [Development](#development)
  - [Running Tests](#running-tests)
- [License](#license)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/task-tracker.git
    cd task-tracker
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Link the CLI tool:

    ```sh
    npm link
    ```

This will create a symlink globally, allowing you to use the `task` command from anywhere in your terminal.

## Usage

### Add a Task

To add a new task, use the `add` command followed by the task description:

```sh
task add "Your task description"
```

### Update a Task

To update an existing task, use the `update` command followed by the task ID and the new description:

```sh
task update <task_id> "New task description"
```

### Delete a Task

To delete a task, use the `delete` command followed by the task ID:

```sh
task delete <task_id>
```

### Mark a Task as In-Progress

To mark a task as in-progress, use the `mark-in-progress` command followed by the task ID:

```sh
task mark-in-progress <task_id>
```

### Mark a Task as Done

To mark a task as done, use the `mark-done` command followed by the task ID:

```sh
task mark-done <task_id>
```

### List Tasks

To list all tasks, use the `list` command:

```sh
task list
```

To list tasks filtered by status (e.g., `todo`, `in-progress`, `done`), use the `list` command followed by the status:

```sh
task list <status>
```

## Development

### Running Tests

To run the tests, use the following command:

```sh
npm test
```

This will run all tests in the `tests` directory using Jest.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
