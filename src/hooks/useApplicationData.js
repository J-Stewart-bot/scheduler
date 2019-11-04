import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });
    
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
    ]).then((all) => {
      let days = all[0].data;
      let appointments = all[1].data;
      let interviewers = all[2].data;
      setState(prev => ({ ...prev, days, appointments, interviewers}))
    });
  }, [])
      
    
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return (axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState((prev => ({ ...prev, appointments})));
      })
    )
  }
    
  function editInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return (axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState((prev => ({ ...prev, appointments})));
      })
    )
  }
    
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return (axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState((prev => ({ ...prev, appointments})));
      })
    )
  }

  return { state, setDay, bookInterview, cancelInterview}

}