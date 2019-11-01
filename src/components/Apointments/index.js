import "components/Apointments/style.scss";
import React from "react";
import Header from 'components/Apointments/Header'
import Show from 'components/Apointments/Show'
import Empty from 'components/Apointments/Empty'
import useVisualMode from "hooks/useVisualMode"
import Form from 'components/Apointments/Form'
import Status from 'components/Apointments/Status'



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    // transition(SHOW)
  }

  return (
  <article className="appointment">
    <Header time={props.time}/>
    {mode === EMPTY && <Empty onAdd={() => {
      transition(CREATE);
    }} />}
    {mode === SAVING && <Status message={"Saving"}/>}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
      />
    )}
    {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => {back()}} onSave={save}/>}
  </article>)
}