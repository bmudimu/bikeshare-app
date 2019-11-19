import React from 'react'
import { Card, CardText, CardHeader, CardTitle} from 'reactstrap';
import {library} from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faBicycle, faArchive, faClock, faUserClock} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

library.add(fab, faBicycle, faArchive)

const C1 = (props, i) => {

    const time_convert = (num) => {
        const sec_num = parseInt(num,10);
        const hours = Math.floor(sec_num / 60);
        const minutes = Math.floor(sec_num % 60)
        const seconds  = Math.floor(sec_num % 3600,1);
        return hours + "h " + minutes + "m " + seconds + "s";
      }

    return (
        <Card body key={i}>
        <CardHeader><FontAwesomeIcon icon={faUserClock}/> Trip Duration Stats</CardHeader>
        <CardTitle>Trip total and average durations</CardTitle>
        <CardText><FontAwesomeIcon icon={faClock}/> Total: {time_convert(props.total_trip_duration)}</CardText>
        <CardText><FontAwesomeIcon icon={faClock}/> Average: {time_convert(props.mean_time_travel)}</CardText>
    </Card>
      );



}//card1
export default C1;