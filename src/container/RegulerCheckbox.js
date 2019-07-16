import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import getMuiTheme from "../theme/theme";
import {MuiThemeProvider} from '@material-ui/core/styles';

const styles = {
    root: {
      color: '',
      '&$checked': {
        color: '#16ace3',
      },
    },
    checked: {},
  };

class RegulerCheckbox extends React.Component {
    state = {
        checked: true,
      };
      componentDidMount(){
        
      }
    
      handleCheckedChange = checked => event => {
        if(this.props.categoryName !== undefined && this.props.categoryType !== undefined){
          this.props.getChecked(event.target.checked,this.props.type,this.props.categoryName,this.props.categoryType);
        }
        else{
          this.props.getChecked(event.target.checked,this.props.type);
        }
      };
    
      render() {
        const { classes } = this.props;
    return (
        <MuiThemeProvider theme={getMuiTheme}>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.props.value}
              disabled={this.props.disabled}
              onChange={this.handleCheckedChange('checked')}
              classes={{
                root: classes.root,
                checked: classes.checked,
              }}
            />
          }
        />
      </FormGroup>
       </MuiThemeProvider>
    );
  }
}
RegulerCheckbox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegulerCheckbox);