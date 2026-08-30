# theoko.github.io

A website created using React JS and webpack.

## Development

Install dependencies:

```bash
npm install
```

## Testing

Tests are written with [Jest](https://jestjs.io/) and
[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

```bash
npm test            # run the test suite once
npm run test:watch  # run in watch mode
npm run test:coverage  # run with a coverage report
```

Tests live alongside the source files as `*.test.js` under `src/`. CI runs the
suite on every push and pull request via GitHub Actions.
