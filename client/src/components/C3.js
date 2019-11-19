import React from 'react'
import { Card, CardText, CardHeader, CardTitle} from 'reactstrap';
import {library} from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faBicycle, faArchive, faMapMarkerAlt, faRoad} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

library.add(fab, faBicycle, faArchive)

const C1 = (props, i) => {

    return (
        <Card body>
        <CardHeader><FontAwesomeIcon icon={faMapMarkerAlt}/> Station Stats</CardHeader>
        <CardTitle>Most popular start & end stations</CardTitle>
        <CardText><FontAwesomeIcon icon={faMapMarkerAlt}/> Start: {props.used_start_station}</CardText>
        <CardText><FontAwesomeIcon icon={faMapMarkerAlt}/> End: {props.used_end_station}</CardText>
        <CardText><FontAwesomeIcon icon={faRoad}/> Route : {props.used_start_to_end_route}</CardText>
    </Card>
      );



}//card1
export default C1;