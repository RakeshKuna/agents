import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    color:'lightgrey'
  },
  formControl: {
    margin: 0,
    width: `100%`,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class SimpleSelect extends React.Component {

  handleChange = event => {
    this.props.getSelectValue(event.target.value,this.props.type);
  };

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
        <InputLabel  className='createLabels'>{this.props.InputLabel}</InputLabel>
          <Select
            value={this.props.value}
            onChange={this.handleChange}
            disabled = {this.props.disabled}
            displayEmpty
          >
            {/* <MenuItem value="" disabled >
              {this.props.placeholder}
            </MenuItem> */}
            {
               this.props.selectLabels.length!==0?
               this.props.selectLabels.map((obj)=>{
                 return(
                   <MenuItem value={obj.value}>{obj.label}</MenuItem>
                 )
               }):this.props.placeholder
            }
          </Select>
        </FormControl>
      </form>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);