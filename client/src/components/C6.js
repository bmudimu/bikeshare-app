import React from 'react'
import {library} from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faBicycle, faArchive, faHeart, faClock, faCalendarWeek, faBirthdayCake} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { ListGroup, ListGroupItem, Badge, ListGroupItemHeading} from 'reactstrap';

library.add(fab, faBicycle, faArchive)

const C1 = (props, i) => {

    return (
        <ListGroup key ={i}>
        <ListGroupItem active className="main-color-bg" >
            <ListGroupItemHeading><FontAwesomeIcon icon={faBirthdayCake}/> Birth Year Stats</ListGroupItemHeading>
        </ListGroupItem>
        <ListGroupItem className="justify-content-between"><FontAwesomeIcon icon={faHeart}/> Common <Badge color = 'info'>{Math.round(props.common_birth_year)}</Badge></ListGroupItem>
        <ListGroupItem className="justify-content-between"><FontAwesomeIcon icon={faClock}/> Earliest <Badge color = 'info'>{Math.round(props.earliest_birth_year)}</Badge></ListGroupItem>
        <ListGroupItem className="justify-content-between"><FontAwesomeIcon icon={faCalendarWeek}/> Recent <Badge color = 'info'>{Math.round(props.recent_birth_year)}</Badge></ListGroupItem>
    </ListGroup>
      );



}//card1
export default C1;