import "components/Apointments/style.scss";
import React from "react";
import Header from 'components/Apointments/Header'
import Show from 'components/Apointments/Show'
import Empty from 'components/Apointments/Empty'
import useVisualMode from "hooks/useVisualMode"
import Form from 'components/Apointments/Form'
import Status from 'components/Apointments/Status'
import Confirm from "./Confirm";



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DElETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT"
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
  }

  function edit(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.editInterview(props.id, interview)
    .then(() => transition(SHOW))
  }

  function deleteInterview(name, interviewer) {
    transition(DELETING);
    const interview = {
      student: name,
      interviewer
    };
    props.cancelInterview(props.id, interview)
    .then(() => transition(EMPTY))
  }

  return (
  <article className="appointment">
    <Header time={props.time}/>
    {mode === EMPTY && <Empty onAdd={() => {
      transition(CREATE);
    }} />}
    {mode === SAVING && <Status message={"Saving"}/>}
    {mode === DELETING && <Status message={"Deleting"}/>}
    {mode === CONFIRM && <Confirm onCancel={() => {back()}} onConfirm={deleteInterview}/>}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
      />
    )}
    {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => {back()}} onSave={save}/>}
    {mode === EDIT && <Form interviewers={props.interviewers} interviewer={props.interview.interviewer.id} name={props.interview.student} onCancel={() => {back()}} onSave={save}/>}
  </article>)
}