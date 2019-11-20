import React, { useState, useReducer, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_SPOTS = "SET_SPOTS";

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
      case SET_SPOTS:
        return {
          ...state, days: action.days
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
    
  //Makes axios requests to the database to set the application data
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
      
  //Used as part of the *save* function in index.js
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    let theDay = state.days.find(function(element) {
      if (element.name === state.day) {
        return element;
      }
    })
    let dayID = theDay.id - 1;
    let daySpots = theDay.spots;
    const day = {
      ...state.days[dayID],
      spots: daySpots - 1
    }
    const days = [
      ...state.days
    ]
    days[dayID] = day
    return (axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, appointments: appointments})
        dispatch({ type: SET_SPOTS, days: days})
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
        dispatch({ type: SET_INTERVIEW, appointments: appointments})
      })
    )
  }
    
  //Used as part of the *deleteInterview* function in index.js
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    let theDay = state.days.find(function(element) {
      if (element.name === state.day) {
        return element;
      }
    })
    let dayID = theDay.id - 1;
    let daySpots = theDay.spots;
    const day = {
      ...state.days[dayID],
      spots: daySpots + 1
    }
    const days = [
      ...state.days
    ]
    days[dayID] = day
    return (axios.delete(`/api/appointments/${id}`)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, appointments: appointments})
        dispatch({ type: SET_SPOTS, days: days})
      })
    )
  }

  return { state, setDay, bookInterview, cancelInterview, editInterview}

}