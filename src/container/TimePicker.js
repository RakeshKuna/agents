/* eslint-disable */
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
// pick utils

import DateFnsUtils from '@date-io/date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import { TimePicker, DatePicker } from 'material-ui-pickers';

import moment from 'moment';

const styles = {
  grid: {
    width: '60%',
  },
};

class MaterialUIPickers extends React.Component {
  state = {
    selectedDate: new Date('2014-08-18T21:11:54'),
  };

  handleDateChange = date => {
    this.props.getSelectedTime(moment(date).format('h:mm a'),this.props.type,this.props.fromPage);
  };

  render() {
    
    let props = this.props;
    const { classes } = this.props;
    const { selectedDate } = this.state;

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container className={classes.grid} justify="space-around">
          <TimePicker
            margin="normal"
            label="Time picker"
            value={props.value}
            onChange={this.handleDateChange}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    );
  }
}

MaterialUIPickers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MaterialUIPickers);