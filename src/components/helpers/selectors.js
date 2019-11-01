export default{
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