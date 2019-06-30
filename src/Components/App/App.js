import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css';

// Components 
import Header from '../Header/Header'
import HomeMap from '../HomeMap/HomeMap'
import MeetupForm from '../NewMeetupForm'
import SingleMeetup from '../SingleMeetup'
import Footer from '../Footer/Footer'

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Route path='/' component={Header} />
          <Route exact path='/' component={HomeMap} />
          <Route path='/new-meetup-form' component={MeetupForm} />
          <Route path='/single-meetup' component={SingleMeetup} />
          <Route path='/' component={Footer} />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (reduxState) => ({
  reduxState,
})

export default connect(mapStateToProps)(App);

