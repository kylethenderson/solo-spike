import React, { Component } from 'react'
import WrappedMap from './MarkerItem'
import axios from 'axios';
import { connect } from 'react-redux'
import { ClipLoader } from 'react-spinners';

const MAPS_KEY = `${process.env.REACT_APP_MAPS_KEY}`;

class TestMap extends Component {

    state = {
        defaultLat: null,
        defaultLong: null,
    }

    componentDidMount() {
        this.getUserLocation();
    }

    getUserLocation = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const userLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                }
                this.setState({
                    ...this.state,
                    defaultLat: userLocation.latitude,
                    defaultLong: userLocation.longitude,
                })
            }
        );
    }

    addPin = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const userLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                }
                console.log(userLocation);
                axios.post('/api/pins', userLocation)
                    .then(response => {
                        axios.get('/api/data')
                            .then(response => {
                                this.props.dispatch({ type: 'SET_PIN_LIST', payload: response.data })
                            })
                    })
            }
        );
    }
    render() {
        return (
            <>
                <div id="mapWrapper">
                    {this.state.defaultLat ?
                        <>
                            <WrappedMap
                            defaultLat={this.state.defaultLat}
                            defaultLong={this.state.defaultLong}
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                            loadingElement={<div style={{ height: "100%" }} />}
                            containerElement={<div style={{ height: "100%" }} />}
                            mapElement={<div style={{ height: "100%" }} />}
                            pinList={this.props.pinList}
                        />
                        </>
                        :
                        <div id="mapLoader">
                            <h4>Map Loading...</h4>
                            <ClipLoader
                                sizeUnit={"px"}
                                size={75}
                                width={5}
                                color={'rgba(0, 143, 12, 1);'}
                            />
                        </div>
                    }
                </div>
                <div id="buttonContainer">
                    <button onClick={this.addPin}>Add Pin</button>
                </div>
                {/* <Link to='/new-meetup-form'>
                    <p>Form</p>
                </Link>
                <Link to='/single-meetup'>
                    <p>Single</p>
                </Link> */}
            </>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    pinList: reduxState.pinListReducer,
})

export default connect(mapStateToProps)(TestMap);