import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import getMuiTheme from "../theme/theme";
import {MuiThemeProvider} from '@material-ui/core/styles';

const styles = theme => ({
  colorSwitchBase: {
    color: 'white',
    '&$colorChecked': {
      color: '#16ace3',
      '& + $colorBar': {
        backgroundColor: '#4ddbff',
      },
    },
  },
  colorBar: {},
  colorChecked: {},
});

class ToggleComponent extends React.Component {
  state = {
    checked: true,
  };

  componentDidMount(){

  }

  handleToggleChange = checked => event => {
    if(this.props.categoryName !== undefined && this.props.categoryType !== undefined){
      this.props.getToggleValue(event.target.checked,this.props.type,this.props.categoryName,this.props.categoryType);
    }
    else{
      this.props.getToggleValue(event.target.checked,this.props.type);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={getMuiTheme}>
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch color="primary"
              checked={this.props.value}
              disabled={this.props.disabled}
              onChange={this.handleToggleChange('checked')}
              classes={{
                switchBase: classes.colorSwitchBase,
                checked: classes.colorChecked,
                bar: classes.colorBar,
              }}
            />
          }
        />
      </FormGroup>
      </MuiThemeProvider>
    );
  }
}

ToggleComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToggleComponent);