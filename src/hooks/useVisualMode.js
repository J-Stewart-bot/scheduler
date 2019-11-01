import React, { useState, useEffect } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode);
    // setHistory(prev => ({...prev, newMode}))
    if (replace) {
      history[history.length - 1] = newMode;
    } else {
      history.push(newMode)
    }
  }
  function back() {
    if(history.length <= 1) {
      setMode(history[0]);
    } else {
      history.pop();
      setMode(history[history.length - 1]);
    }
  }

  return { mode, transition, back };
};