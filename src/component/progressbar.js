import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {MuiThemeProvider} from '@material-ui/core/styles';
import theme from './../theme/theme';

const styles = theme => ({
  root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      
    },
    progress: {
      margin: theme.spacing.unit * 2,
    },
});

 class Progress extends React.Component {
  state = {
    completed: 0,
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 100);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 5 });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className='progress'>
        <div className={classes.root}>
          <MuiThemeProvider theme={theme}>    
            <h3 className='b'>Your Excel File is Uploading....</h3>  
            <h3 className='b'>{this.props.displayText}</h3>
            <div>
              <CircularProgress
                className={classes.progress}
                variant="static"
                value={this.state.completed} size={100}
              />
            </div>
          </MuiThemeProvider>
        </div>
    </div>
    );
  }
}

Progress.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Progress);