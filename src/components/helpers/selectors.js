export function getAppointmentsForDay(state, name) {
  const theDays = [];
  const filteredDays = state.days.filter(day => {
    if (day.name === name) {
      theDays.push(day.appointments)
    }
  });
  const flat = [].concat(...theDays);
  const result = flat.map(x => state.appointments[x])
  return result;
}