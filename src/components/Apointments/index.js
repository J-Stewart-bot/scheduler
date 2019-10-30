import "components/Apointments/style.scss";
import React from "react";
import Header from 'components/Apointments/Header'
import Show from 'components/Apointments/Show'
import Empty from 'components/Apointments/Empty'

export default function Appointment(props) {
  return (
  <article className="appointment">
    <Header time={props.time}/>
    {props.interview && <Show student={props.interview.student} interviewer={props.interview.interviewer.name}/>}
    {!props.interview && <Empty/>}
  </article>)
}