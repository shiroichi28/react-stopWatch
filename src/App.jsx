import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let startTime = 0;
    let rafId;

    const updateTimer = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }
      const elapsedTime = timestamp - startTime;
      setTime(elapsedTime);

      rafId = requestAnimationFrame(updateTimer);
    };

    if (running) {
      rafId = requestAnimationFrame(updateTimer);
    }

    return () => cancelAnimationFrame(rafId);
  }, [running]);

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const hundredths = Math.floor((milliseconds % 1000) / 10);

    return (
      ("0" + minutes).slice(-2) +
      ":" +
      ("0" + seconds).slice(-2) +
      ":" +
      ("0" + hundredths).slice(-2)
    );
  };

  const handleStartStop = () => {
    setRunning((prevRunning) => !prevRunning);
  };

  const handleReset = () => {
    setRunning(false);
    setTime(0);
  };

  return (
    <>
      <h1 className="uppercase">Stopwatch</h1>
      <div className="text-3xl font-bold m-5">{formatTime(time)}</div>
      <div className="flex items-center justify-between">
        <button onClick={handleStartStop}>{running ? "Stop" : "Start"}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </>
  );
}

export default App;
