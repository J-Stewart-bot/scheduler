import DayList from "components/DayList";
import "components/Application.scss";
import React, { useState, useEffect } from "react";
import Appointment from "components/Apointments";
import * as helpers from "components/helpers/selectors"
import useApplicationData from "hooks/useApplicationData"

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const interviewers = helpers.default.getInterviewersForDay(state, state.day);

  const appointments = helpers.default.getAppointmentsForDay(state, state.day).map(
    appointment => {
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={helpers.default.getInterview(state, appointment.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );

  console.log(state)

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <section className="schedule">
          {appointments}
          <Appointment key="last" time="5pm" />
        </section>
      </section>
    </main>
  );
}
