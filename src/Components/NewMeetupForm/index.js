import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

class MeetupForm extends Component {

    state = {
        date: '',
        time: '10:00',
        supplies: '',
    }

    componentDidMount() {
        this.getCurrentDate();
    }

    getCurrentDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        this.setState({
            ...this.state, date: today,
        })
    }

    handleChange = (event) => {
        this.setState({
            ...this.state, [event.target.id]: event.target.value,
        })
    }

    submitMeetup = (event) => {
        event.preventDefault();
        console.log(this.state);
        this.setState({
            date: '',
            time: '',
            supplies: '',
        })
    }

    render() {
        return (
            <Grid container justify="center">
                <Grid item xs={10}>
                    <h2>Meetup Form</h2>
                    <form onSubmit={this.submitMeetup} noValidate autoComplete="off">
                        <TextField
                            value={this.state.date}
                            id="date"
                            type="date"
                            margin="normal"
                            label="MeetUp Date"
                            fullWidth
                            onChange={this.handleChange}
                        />
                        <TextField
                            value={this.state.time}
                            id="time"
                            type="time"
                            label="MeetUp Time"
                            margin="normal"
                            fullWidth
                            onChange={this.handleChange}
                        />
                        <TextField
                            value={this.state.supplies}
                            id="supplies"
                            label="Recommended Supplies"
                            margin="normal"
                            multiline
                            rows="6"
                            fullWidth
                            variant="outlined"
                            onChange={this.handleChange}
                        />
                        <Button type="submit" variant="contained" color="primary">Organize</Button>
                    </form>
                </Grid>

            </Grid>
        )
    }
}

export default connect()(MeetupForm);