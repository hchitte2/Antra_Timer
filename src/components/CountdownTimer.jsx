import { useState, useEffect, useRef } from 'react';
import './CountdownTimer.css';

const CountdownTimer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setIsPaused(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, isPaused]);

  const handleStart = () => {
    const total = parseInt(minutes) * 60 + parseInt(seconds);
    if (total <= 0) return;
    setTimeLeft(total);
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    if (!isRunning) return;
    setIsPaused((prev) => !prev);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(null);
    setMinutes(0);
    setSeconds(0);
  };

  const displayMinutes = timeLeft !== null
    ? String(Math.floor(timeLeft / 60)).padStart(2, '0')
    : '00';

  const displaySeconds = timeLeft !== null
    ? String(timeLeft % 60).padStart(2, '0')
    : '00';

  return (
    <div className="timer-container">
      <div className="timer-card">
        <h1 className="timer-title">Timer</h1>

        <div className="timer-display">
          {displayMinutes}:{displaySeconds}
        </div>

        <div className="timer-inputs">
          <div className="input-group">
            <input
              type="number"
              min="0"
              max="99"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              disabled={isRunning}
              className="time-input"
            />
            <label className="input-label">Minutes</label>
          </div>

          <span className="input-separator">:</span>

          <div className="input-group">
            <input
              type="number"
              min="0"
              max="59"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              disabled={isRunning}
              className="time-input"
            />
            <label className="input-label">Seconds</label>
          </div>
        </div>

        <div className="timer-controls">
          <button onClick={handleStart} disabled={isRunning} className="btn btn-start">
            Start
          </button>
          <button onClick={handlePauseResume} disabled={!isRunning} className="btn btn-pause">
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          <button onClick={handleReset} className="btn btn-reset">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
