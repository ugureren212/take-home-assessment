# Expenses table
A simple expenses table built with React, TypeScript, and Vite. Only displays the first page of data from the API.

## Prerequisites

- Node.js (latest LTS version recommended)
- npm (comes with Node.js)

## Installation

To install the project dependencies, run:

```bash
npm install
```

## Development

To start the development server:

```bash
npm run dev
```

This will start the application in development mode. Open your browser and navigate to the URL shown in your terminal (typically http://localhost:5173).


## Running Tests

This project uses Cypress for testing. To run the tests first run the development server:

```bash
npm run dev
```

Then run the tests in a seperate terminal with:

```bash
npx cypress open
```

E2E Testing --> Start E2E Testing in Chrome --> expensesTable