# Task Manager

> Visit the [Live Demo](https://task-manager-nine-kappa.vercel.app/)

Task Manager is a simple CRUD application developed using the MERN stack.

## Installation

1. Download and Install Dependencies

```sh
npm install
```

2. Navigate to the `dist` folder and run

```sh
node ./dist/app.js
```

3. If you're working on development, write your code in the `src` folder and run the following command in the root folder to enable `TypeScript` auto-compilation:

```sh
tsc --watch
```

TypeScript will automatically compile your code to JavaScript and output it to the dist folder upon file changes.

## Technology Stack

- TypeScript
- Express
- Nodejs
- Mongoose
- Mongodb

## Features Added

- **Custom Error Handling**
  Developed comprehensive error handling for the TypeScript backend, ensuring better user feedback and system stability. Meaningful error messages are now returned for various scenarios, enhancing the user experience.

- **Backend Enhancement**
  Expanded the backend functionality to include mongoose validation. These additions provide users with more powerful tools to manage their tasks effectively.

## Known Issues

- **No Authentication and Authorization**
  The application lacks authentication and authorization features. All tasks and edits are visible to everyone.

- **Does not have proper error handling in frontend**
  The frontend code was used from John Smilga's [NodeJS Tutorial and Projects Course](https://www.udemy.com/course/nodejs-tutorial-and-projects-course/) Task Manager API section.

## Credits

This project was inspired by and developed as part of John Smilga's John Smilga's [NodeJS Tutorial and Projects Course](https://www.udemy.com/course/nodejs-tutorial-and-projects-course/)

```

```
