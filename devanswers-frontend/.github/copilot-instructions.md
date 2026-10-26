# Project Guidelines

## Build, test, and lint

Run these commands from `devanswers-frontend/`:

- `npm run dev` — start the Vite development server.
- `npm run build` — create the production build.
- `npm run lint` — run ESLint.
- `npm test` — run the Vitest suite once.
- `npm test -- tests/unit/pages/Home.test.jsx` — run one test file.
- `npm test -- tests/unit/pages/Home.test.jsx -t "test name"` — run matching tests in one file.

Vitest is configured in `vite.config.js` to use jsdom and `tests/setup.js`. Tests use React Testing Library and `@testing-library/user-event`; add dependencies only if the existing tools cannot cover the requirement.

## Architecture

`src/main.jsx` mounts the React app in `StrictMode` and imports Bootstrap styles. `src/App.jsx` composes `BaseLayout` (header, page area, footer) with `SideBarLayout`, and owns dark-mode state persisted in `localStorage` and applied to the document body.

Question pages live in `src/pages/Question/` and are intended to compose reusable question and answer components from `src/components/Question/` and `src/components/Answer/`. Voting controls are shared in `src/components/Shared/`. The app currently uses the local seed records exported from `data/questions.js`; confirm whether a feature is implemented before assuming an API, router, or persistence layer exists.

## Conventions

- Use JavaScript ES modules and React function components. Local component imports use explicit `.jsx` extensions.
- Keep a component's stylesheet alongside it and import that stylesheet in the component.
- Use React Bootstrap for existing UI primitives, `react-icons` for icons, and the existing CSS variables/classes for styling.
- Seed questions use `_id`, `title`, `description`, `tags` (objects with a `name`), `voteCount`, `author`, and `createdAt`. Answers are nested under `answers` and use `answerText`.
- Keep tests in `tests/unit/`, organized under `components/` or `pages/` to match the code under test.

## Test coverage

When implementing or changing user-facing behavior, add focused tests with React Testing Library and user-event. Cover applicable flows:

- Question browsing and details: render the question list and selected question from the seed data; check loading, empty, and missing-question behavior when those states are implemented.
- Forms: verify required or empty-input validation, answer submission, and registration password confirmation; assert that invalid input does not submit.
- Interactions: exercise vote controls, theme toggle, and form buttons through user actions, checking resulting UI/state rather than implementation details.
- Navigation: test only navigation that is wired in the app. The current header/sidebar links and auth pages may be placeholders; do not imply that routes work unless implemented.
- Errors: for asynchronous or data-dependent behavior, verify visible error handling and recovery as applicable; do not invent an API failure path for the current local-data flow.
- Regression: keep relevant existing coverage passing, including `tests/unit/components/QuestionList.test.jsx`, `tests/unit/pages/Home.test.jsx`, and `tests/unit/pages/QuestionDetail.test.jsx`.

Several page, component, and test files are starter placeholders marked with TODOs. Check the relevant implementation and data shape before writing assertions, and keep coverage aligned with behavior that is actually provided.
