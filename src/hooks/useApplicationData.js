import React, { useState, useReducer, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return {
          ...state, day: action.day
        }
      case SET_APPLICATION_DATA:
        return {
          ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers
        }
      case SET_INTERVIEW: {
        return {
          ...state, appointments: action.appointments
        }
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, day: day})
    
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
    ]).then((all) => {
      let days = all[0].data;
      let appointments = all[1].data;
      let interviewers = all[2].data;
      dispatch({ type: SET_APPLICATION_DATA, days: days, appointments: appointments, interviewers: interviewers})
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
        dispatch({ type: SET_INTERVIEW, appointments: appointments})
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
        dispatch({ type: SET_INTERVIEW, appointments: null})
      })
    )
  }

  return { state, setDay, bookInterview, cancelInterview}

}