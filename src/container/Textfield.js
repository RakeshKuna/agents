import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: `100%`,
    padding:`6px 17px 0px 0px`
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class RegulerTextfield extends React.Component {

  componentDidMount(){
    //console.log(this.props.hasOwnProperty('tableRowIndex'));
  }
  
  handleChange = name => event => {
    if(this.props.hasOwnProperty('tableRowIndex')){
      this.props.getEnterText(event.target.value,this.props.type,this.props.tableRowIndex);
    }
    else{
      this.props.getEnterText(event.target.value,this.props.type);
    }
  };

render() {
  const { classes } = this.props;
  
  return (
    <div className={classes.root}>
      <form className={classes.root} autoComplete="off">
        <TextField
          id="standard-name"
          className={classes.textField}
          value={this.props.value}
          onChange={this.handleChange('name')}
          margin="normal"
          placeholder={this.props.placeholder}
        />
      </form>
    </div>
  );
  }
}

RegulerTextfield.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegulerTextfield);