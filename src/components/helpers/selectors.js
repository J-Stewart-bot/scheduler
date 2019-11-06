export default{
  //Gets the scheduled interviews for a given day
  getAppointmentsForDay(state, name) {
    const theDays = [];
    const filteredDays = state.days.filter(day => {
      if (day.name === name) {
        theDays.push(day.appointments)
      }
    });
    const flat = [].concat(...theDays);
    const result = flat.map(x => state.appointments[x])
    return result;
  },


  //Gets the interviewers scheduled to work for a given day
  getInterviewersForDay(state, name) {
    const theInterviewers = [];
    const filteredInterviews = state.days.filter(day => {
      if (day.name === name) {
        theInterviewers.push(day.interviewers)
      }
    });
    const flat = [].concat(...theInterviewers);
    const result = flat.map(x => state.interviewers[x]);
    return result;
  },

  //Gets an interview with a given interviewer
  getInterview(state, interview) {
    if (!interview) {
      return null;
    }
    for (const interviewer of Object.keys(state.interviewers)) {
      if (interviewer == interview.interviewer) {
        interview.interviewer = state.interviewers[interviewer];
      }
    }
    return interview
  }
}