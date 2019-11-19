import React from 'react'
import {library} from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faBicycle, faArchive, faMale, faFemale, faCog, faVenusMars} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { ListGroup, ListGroupItem, Badge, ListGroupItemHeading} from 'reactstrap';

library.add(fab, faBicycle, faArchive)

const C1 = (props, i) => {

    return (
        <ListGroup key ={i}>
        <ListGroupItem active className="main-color-bg" >
            <ListGroupItemHeading><FontAwesomeIcon icon={faVenusMars}/> Gender Stats</ListGroupItemHeading>
        </ListGroupItem>
        <ListGroupItem className="center"><FontAwesomeIcon icon={faFemale}/> Female <Badge color = 'info'>{props.female_count}</Badge></ListGroupItem>
        <ListGroupItem className="center"><FontAwesomeIcon icon={faMale}/> Male <Badge color = 'info'>{props.male_count}</Badge></ListGroupItem>
        <ListGroupItem className="center"><FontAwesomeIcon icon={faCog}/> Other <Badge color = 'info'>{props.type1_count}</Badge></ListGroupItem>
    </ListGroup>

        
      );



}//card1
export default C1;