import React, {Component} from 'react';
import Axios from 'axios';
import {JsonToTable} from 'react-json-to-table';
import { Container, Row, Col, Button} from 'reactstrap'
import { CustomInput, CardHeader, FormGroup} from 'reactstrap';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink} from 'reactstrap';

import './App.css';

import chi from './logomark_blue-chi.png';
import dc from './washington-dc.svg';
import nyc from './new-york-city.svg';
import RadioButton from './components/RadioButton';
import C1 from './components/C1'
import C2 from './components/C2';
import C3 from './components/C3';
import C4 from './components/C4';
import C5 from './components/C5';
import C6 from './components/C6';

import 'bootstrap/dist/css/bootstrap.css'
import {library} from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faBicycle, faArchive } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


library.add(fab, faBicycle, faArchive)


const Size = {
  width: '20px',
};


const StatsCard = (props, city) => {
  let bike_stats = props.stats;
  let reports_length = 0;
  let json_reports = [];
  console.log(bike_stats)

  if (typeof bike_stats !== 'undefined')
  {
      
      json_reports=JSON.parse(bike_stats);
      reports_length = 1 //json_reports.length;
  }//if not undefined

  var rows = [];
  for (var i = 0; i < reports_length; i++) {
      rows.push( C1(json_reports, i));
      rows.push( C2(json_reports, i+1));
      rows.push( C3(json_reports, i+2));
      rows.push( C4(json_reports, i+3));
      rows.push( C5(json_reports, i+4));
      rows.push( C6(json_reports, i+5));
  }

  return (
      <Row>
           <Col md="3">
               {rows[3]}
               {rows[4]}
               {rows[5]}
           </Col>
           <Col md="9">
               <Row>
                   <CardHeader className="main-color-bg bikeshare">Showing Bikeshare Stats for {city}</CardHeader>
                   <Col xm="4">
                       {rows[0]}
                  </Col>
                  <Col xm="4">
                      {rows[1]}
                  </Col>
                  <Col xm="4">
                      {rows[2]}
                  </Col>
              </Row>


          </Col>
          
      </Row> 

  );
}

const togglRaw = (props, key) => {

  if (key)
  {
      return (
          <div>
              {<JsonToTable json={props}/>}
          </div>
      )
  } else {
      return (
          <div>
          </div>
      )
  }

}


class App extends Component {

  constructor(props) {
      super(props)
  
      this.state = {
          filterCity: "Chicago",
          filterMonth: "all",
          filterDay: "all",
          status: "",
          raw: [],
          collapsedRaw: true
      };
      this.getData = this.getData.bind(this);
      this.renderLogos = this.renderLogos.bind(this);
  }

      
  radioChangeHandler = (event) => {

      this.setState({
          filterCity: event.target.value
      });
  };

  selectChangeHandler = (e) => {
      this.setState({
          filterMonth : e.target.value
  });
  }

  dayChangeHandler = (e) => {
      this.setState({
          filterDay: e.target.value
      })
  }

  getData() {
      this.setState( {
          status: "Loading.....",
          raw: "Waiting..."
      });

      let json_req = {
          "city": this.state.filterCity,
          "month": this.state.filterMonth,
          "day": this.state.filterDay,
      }
      Axios.post('http://localhost:5000/api/bikeshare',json_req) 
          .then((res) => {
              this.setState({
                  status: StatsCard(res.data, this.state.filterCity),
                  raw: (JSON.parse(res.data.raw))
              });
          })
  }


  renderLogos() 
{
  if (this.state.filterCity === "Chicago")
  {
      return (
              <Button color = "info" size="sm" onClick={this.getData}>
                  {'SUBMIT ' + (this.state.filterCity).toUpperCase()} <img src={chi} style={Size} alt="logo"/>
              </Button>
      )
  }
  else if (this.state.filterCity === "Washington")
  {
      return (
              <Button color = "info" size="sm" onClick={this.getData}>
              <img src={dc} style={Size} alt="logo"/> {'SUBMIT ' + (this.state.filterCity).toUpperCase()}
              </Button>
      )
  }
    
  else if (this.state.filterCity === "New York")
  {
      return (
          <Button color = "info" size="sm" onClick={this.getData}>
          <img src={nyc} style={Size} alt="logo"/> {'SUBMIT ' + (this.state.filterCity).toUpperCase()}
          </Button>
      )
  }
  else {
      return null
  }
}


  render() {
  let bike_stats;
  bike_stats = this.state.status;

  const months = ['All','January', 'February', 'March', 'April', 'May', 'June']
  const days = ['All','Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

  const toggleRawbar = (e) => {
      this.setState({
          collapsedRaw: !this.state.collapsedRaw
      });
  };

  return (
  //using the grid layout for the dashboard

  <div>

              <header>
                  <Container className="container">
                  <Navbar color="faded" light expand="md" className = "main-color-bg">
                      <h2><FontAwesomeIcon icon={faBicycle}/> Welcome! <small>Let's explore some <span>US bikeshare</span> data</small></h2>
                      <Collapse isOpen={!this.state.collapsed} navbar>
                      <Nav className="ml-auto" navbar>
                          <NavItem>
                          <NavLink href="mailto:bmudimu@gmail.com" subject= 'bikeshare-app'>&copy; Brian Mudimu</NavLink>
                          </NavItem>
                          <NavItem>
                          <NavLink href="https://github.com/bmudimu/bikeshare-app">GitHub</NavLink>
                          </NavItem>
                      </Nav>
                      </Collapse>
                  </Navbar> 
                      <Row>
                          <Col md="9">
                          <div className="radio-btn-container" style={{ display: "flex" }}>
                                      <RadioButton 
                                      changed={ this.radioChangeHandler}
                                      id="1" 
                                      isSelected={this.state.filterCity === "Washington" } 
                                      label="Washington" 
                                      value="Washington" 
                                      />
                              
                                      <RadioButton 
                                      changed={ this.radioChangeHandler}
                                      id="2" 
                                      isSelected={this.state.filterCity === "Chicago" } 
                                      label="Chicago" 
                                      value="Chicago" 
                                      />
                               
                                      <RadioButton 
                                      changed={ this.radioChangeHandler}
                                      id="3" 
                                      isSelected={this.state.filterCity === "New York" } 
                                      label="New York" 
                                      value="New York" 
                                      />

                                  <FormGroup>
                                  <CustomInput type="select" id="exampleCustomSelect" name="customSelect" onChange={this.selectChangeHandler}>
                                      <option value="">Select Month</option>
                                  {months.map(function(item) {
                                          return <option key={item} value={item}>{item}</option>
                                      })}
                                  </CustomInput>
                              </FormGroup>
                              <FormGroup>
                                  <CustomInput type="select" id="exampleCustomSelect" name="customSelect"  onChange={this.dayChangeHandler}>
                                  <option value="">Select day</option>
                                  {days.map(function(item) {
                                          return <option key={item} value={item}>{item}</option>
                                      })}
                                  </CustomInput>
                              </FormGroup>
                          </div>
                                  
                                  

                          </Col>
                          <Col sm="3">
                          {this.renderLogos()}
                          </Col>
                      </Row>

                  </Container>
              </header>
              {/* <section id="main"> */}
                  <Container className="container">
                          {bike_stats}
                              <Row>
                                   <Navbar color="faded" light className = "main-color-bg">
                                      <h4><FontAwesomeIcon icon={faBicycle}/> Toggle <small>to see the <span>raw</span> data table for {(this.state.filterCity).toUpperCase()} ?</small></h4>
                                      <NavbarToggler onClick={toggleRawbar} className="mr-2" />
                                      <Collapse isOpen={!this.state.collapsedRaw} navbar>
                                      <Nav navbar>
                                          <NavItem>
                                              {togglRaw(this.state.raw, !this.state.collapsedRaw)}
                                          </NavItem>
                                      </Nav>
                                      </Collapse>
                                     
                                  </Navbar>
                              </Row> 

                         
                    
                  </Container>                                
                      {/* <div style={{height: "300px"}}>
                      
                      </div>
              </section> */}

      <main className="main">
          
          <div className="main-header__updates">
              
          </div>
     </main>
  
  </div>
  )}}

export default App;
