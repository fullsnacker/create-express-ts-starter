# Create Express TS Starter

**Create Express TS Starter** is a tool for quickly setting up a server project with Node.js, Express, and TypeScript. This starter includes configurations for **Nodemon** and **ESLint**, allowing you to start developing immediately with automatic reload and code linting.

## Installation

To create a new project using **Create Express TS Starter**, simply run the following command, replacing 'my-ex-ts' with your project name:

```bash
npx @fullsnacker/create-express-ts-starter my-ex-ts
```

This will generate a new folder named 'my-ex-ts' with a fully configured starter project.

## Features

- **Node.js and Express**: Server setup with the Express framework.
- **TypeScript**: Ready-to-use setup for writing scalable, typed code.
- **Nodemon**: Automatic server reload on file changes.
- **ESLint**: Configured linter to maintain code quality and consistency.

## Project Structure

The generated project structure is as follows:

```
my-ex-ts/
├── src/
│   ├── server.ts           # Main server file
│   └── ...                # Additional configuration files
├── .eslintrc.mjs           # ESLint configuration
├── tsconfig.json          # TypeScript configuration
├── nodemon.json          # Nodemon configuration
└── package.json           # Dependencies and scripts
```

## Available Scripts

Inside your new project directory, you can run the following commands:

- 'npm run dev': Starts the server in development mode with **Nodemon** for automatic reloading.
- 'npm run build': Compiles TypeScript to JavaScript in the 'dist' folder.
- 'npm start': Starts the server from the compiled code in 'dist'.
- 'npm run lint': Runs ESLint to analyze code and detect style or syntax issues.

## Customization

After creating your project, you can adjust the ESLint and TypeScript configurations to your liking. The '.eslintrc.js' and 'tsconfig.json' files are ready for you to tailor to your specific project needs.

## Contributing

Contributions are welcome! If you have suggestions for improving this starter or find any issues, feel free to open a pull request or report an issue.

## License

This project is licensed under the MIT License. See the 'LICENSE' file for more information.
