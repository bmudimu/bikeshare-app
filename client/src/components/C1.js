import React from 'react'
import { Card, CardText, CardHeader, CardTitle} from 'reactstrap';
import {library} from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faBicycle, faArchive, faClock, faCalendarAlt, faCalendarDay} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

library.add(fab, faBicycle, faArchive)

const C1 = (props, i) => {

    return (
        <Card body key={i}>
            <CardHeader><FontAwesomeIcon icon={faCalendarAlt}/> Time Stats</CardHeader>
            <CardTitle>Most frequent times of travel</CardTitle>
            <CardText><FontAwesomeIcon icon={faCalendarDay}/> Month: {props.freq_month_of_travel}</CardText>
            <CardText><FontAwesomeIcon icon={faCalendarAlt}/> Day: {props.freq_day_of_travel}</CardText>
            <CardText><FontAwesomeIcon icon={faClock}/> Hour: {props.freq_hour_of_travel+":00"}</CardText>
        </Card>
      );



}//card1
export default C1;