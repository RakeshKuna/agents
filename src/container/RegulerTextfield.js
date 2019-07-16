import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputLabel from "@material-ui/core/InputLabel";

const styles = theme => ({
root: {
flexGrow: 1,
width: '100%',
},
paper: {
position: 'absolute',
width: theme.spacing.unit * 50,
backgroundColor: theme.palette.background.paper,
boxShadow: theme.shadows[5],
padding: theme.spacing.unit * 4,
outline: 'none',
overflow:`scroll`
},
margin: {
margin: theme.spacing.unit,
},
extendedIcon: {
marginRight: theme.spacing.unit,
},
formControl: {
margin: theme.spacing.unit,
width: `100%`,
},
selectEmpty: {
marginTop: theme.spacing.unit * 2,
},
textField: {
marginLeft: theme.spacing.unit,
marginRight: theme.spacing.unit,
width: `100%`,
},
dense: {
marginTop: 19,
},
margin: {
margin: theme.spacing.unit * 2,
},
padding: {
padding: `0 ${theme.spacing.unit * 2}px`,
},
});
class RegulerTextfield extends React.Component {

  handleTextfieldChange = name => event => {
    this.props.getEnterText(event.target.value,this.props.type);
  };

render() {
const { classes } = this.props;
return (
<div className={classes.root}>
<form className={classes.container} noValidate autoComplete="off">
   {/* <Label>{this.props.InputLabel}</Label> */}
      <TextField
      required={this.props.required}
      label={this.props.label}
      value={this.props.value}
      disabled={this.props.disabled}
      className={classes.textField}
      onChange={this.handleTextfieldChange('name')}
      id="standard-full-width"
      placeholder={this.props.placeholder}
      style={{ margin: 8 }}
      fullWidth
      margin="normal"
  
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