import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {MuiThemeProvider} from '@material-ui/core/styles';
import theme from '../theme/theme';
import {Link} from 'react-router-dom';

const styles = theme => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
});

class Breadcrumps extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
  
  }

  render() {
    const { classes } = this.props;
    return (
      <div className='breadcrumps global-font'>
        <div className={classes.root}>
          <MuiThemeProvider theme={theme}>    
            {this.props.links.map((obj,index) => {
              return (
                  <div className="link-block">
                    <Link className={(this.props.links.length-1 === index) ? 'disabled' : ''} to={obj.link}>{obj.text}</Link> 
                  </div>
                )
              } 
            )}
          </MuiThemeProvider>
        </div>
    </div>
    );
  }
}

Breadcrumps.propTypes = {
  classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Breadcrumps);