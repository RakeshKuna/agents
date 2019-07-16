import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import AgentProfileCreation from './AgentProfileCreation';
import { Tabs, Tab, Badge, Icon } from 'finablr-ui';
import * as config from './../config/config';
import Breadcrumps from '../component/Breadcrumps';

const styles = theme => ({
    root: {
      flexGrow: 1,
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

class EnchancedTabsCreate extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        value: 0,
        loading:true, 
        loaderMessage:'Retrieving Data',
        serverStatus:null,
        serverError:false,
        serverErrMessage:'',
        breadcrumps:[{link:'/agentprofiles',text:'Agent Profiles'},{link:'#',text:'Create'}]
      };
    }

    componentDidMount(){
      console.log(this.props);
    }
    handleChange = (event, valt) => {
      this.setState({value:valt });
    };
  
    render() {
      const { classes } = this.props;
      const { value } = this.state;
      return (
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12} style={{marginBottom:10,marginTop:10}}>              
                <Breadcrumps  links={this.state.breadcrumps}/>                          
            </Grid>
          </Grid>
         <p className="bank-profile global-font" style={{marginTop:10}}>Agent Profile (Create)</p>
          <AppBar position="static" className={classes.appbar}>
          <Tabs value={value} umStyle="primary" onChange={this.handleChange}>
            <Tab className ="global-font" label="AGENT PROFILE DETAILS" />
            <Tab className ="global-font" label="ADDITIONAL PROFILE DETAILS" isEnabled={false} />
          </Tabs>
          {/* <Tabs value={value} 
          classes={{
            indicator: classes.indicator
          }}
          onChange={this.handleChange} className={classes.tabs} >
            <Tab style={{ fontSize: "16px",fontFamily: "Gotham-Rounded" }} className='individual-tabs' label="AGENT PROFILE DETAILS" />
            <Tab style={{fontSize: "16px",fontFamily: "Gotham-Rounded" }} className='individual-tabs' label="ADDITIONAL PROFILE DETAILS" />            
          </Tabs> */}
          </AppBar>
          {this.state.value === 0 && <AgentProfileCreation {...this.props}/>}
          {this.state.value === 1 && <h2>hi</h2>}
        </div>
      );
    }
  }
  
  EnchancedTabsCreate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnchancedTabsCreate);
