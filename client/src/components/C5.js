import React from 'react'
import {library} from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faBicycle, faArchive, faUsers, faUserCheck, faUserPlus} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { ListGroup, ListGroupItem, Badge, ListGroupItemHeading} from 'reactstrap';

library.add(fab, faBicycle, faArchive)

const C1 = (props, i) => {

    return (
        <ListGroup key ={i}>
            <ListGroupItem active className="main-color-bg" >
            <ListGroupItemHeading><FontAwesomeIcon icon={faUsers}/> User Type Stats</ListGroupItemHeading>
            </ListGroupItem>
            <ListGroupItem className="justify-content-between"><FontAwesomeIcon icon={faUserPlus}/> Customer <Badge color = 'info'>{props.customer_count}</Badge></ListGroupItem>
            <ListGroupItem className="justify-content-between"><FontAwesomeIcon icon={faUserCheck}/> Subscriber <Badge color = 'info'>{props.subscriber_count}</Badge></ListGroupItem>
            <ListGroupItem className="justify-content-between"><FontAwesomeIcon icon={faUsers}/> Dependent <Badge color = 'info'>{props.dependent_count}</Badge></ListGroupItem>
        </ListGroup>
      );



}//card1
export default C1;