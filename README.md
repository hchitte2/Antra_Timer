# Countdown Timer

A simple countdown timer built with React and Vite.

---

## Running the project

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Running tests

```bash
npm test
```

To run once without watch mode:

```bash
npm test -- --run
```

---

## React concepts learned

### `useState`
Holds values that change over time (minutes, seconds, whether the timer is running). When state updates, React re-renders the component automatically.

### `useEffect`
Runs side effects in response to state changes. Used here to start or clear the `setInterval` whenever `isRunning` or `isPaused` changes. The cleanup function (`return () => clearInterval(...)`) prevents the interval from running after the component unmounts.

### `useRef`
Stores a mutable value that persists across renders without causing a re-render. Used to hold the interval ID so it can be cleared from anywhere (pause, reset, timer reaching zero) without needing it in state.

### Conditional rendering
Render different UI based on state — e.g. the Pause button shows `Pause` or `Resume` depending on `isPaused`, and the Start button is disabled while the timer is running.

### Event handling
Functions like `handleStart`, `handlePauseResume`, and `handleReset` are passed as `onClick` props to buttons. React uses synthetic events that work consistently across browsers.

### Controlled inputs
The minute and second `<input>` fields are controlled — their `value` is driven by state and `onChange` updates that state. React is always the source of truth for what the input shows.
