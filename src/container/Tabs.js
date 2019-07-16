import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({
  root: {
    flexGrow: 1,
    border: '1px solid lightgrey',        
  },

  indicator: {
    backgroundColor: 'white',
    height:`4px`
  },
  appbar:{
    boxShadow:'none'
  },
  tabs:{
      backgroundColor:'#19ace3',
      color:'#fff'
  },
  testColor:{
color:'blue !important'
  }
});

class EnchancedTabs extends React.Component {
  constructor(props){
      super(props)
    this.state = {
        value: 0,
        draweeBankView:'' 
      };
  }
    
 
  draweeBankViewFn=(draweeBankName)=>{
    this.setState({draweeBankView:draweeBankName})
  }    

  handleChange = (event, valt) => {
    this.setState({value:valt },()=>{ this.props.getTabVal(this.state.value)
    });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appbar}>
          <Tabs value={value} 
          classes={{
            indicator: classes.indicator
          }}
          onChange={this.handleChange} className={classes.tabs} >
            <Tab label={this.props.draweeLabel}  />
            <Tab label="ACTIVITY" />            
          </Tabs>
        </AppBar>
       {this.props.children}        
      </div>
    );
  }
}

EnchancedTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnchancedTabs);
