import React from "react";
import "components/DayListItem.scss";
const classnames = require('classnames');

export default function DayListItem(props) {
  const dayClass = classnames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots
  })
  
  return (<li className={dayClass} data-testid="day" onClick={() => props.setDay(props.name)}><h2 className="text--regular">{props.name}</h2><h3 className="text--light">{formatSpots(props.spots)}</h3></li>);
}

const formatSpots = function(spots) {
  if (spots > 1) {
    return `${spots} spots remaining`;
  } else if (spots > 0) {
    return `${spots} spot remaining`;
  } else {
    return 'no spots remaining';
  }
}