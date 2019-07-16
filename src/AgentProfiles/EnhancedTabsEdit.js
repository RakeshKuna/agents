import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import EditAgentProfile from './EditAgentProfile';
import Breadcrumps from '../component/Breadcrumps';
import Loader from '../component/Loader';
import EmptyListComponent from '../component/EmptylistComponent';
import * as ApiService from './ApiService';
import * as Exceptionhandler from './../ExceptionHandling';
import { Tabs, Tab, Badge, Icon } from 'finablr-ui';
import * as config from './../config/config';


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

class EnchancedTabsEdit extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        value: 0,
        loading:true, 
        loaderMessage:'Retrieving Data',
        serverStatus:null,
        serverError:false,
        serverErrMessage:'',
        agentProfile: {},
        breadcrumps: [],
      };
    }

    componentDidMount(){
      console.log(this.props);
      this.getAgentProfile();
    }

    getAgentProfile = () => {
      if(sessionStorage.getItem('token') == undefined){
        window.location.replace(config.PAAS_LOGIN_URL);
        return (<h1>401 - Unauthorized Request</h1>)
      }
      else{
        let headers = {
          Authorization:sessionStorage.getItem('token')
        }
        ApiService.getAgentProfile(this.props.match.params.id,headers)
        .then((response) => {
          if (response.status == 200) {
            this.setState({ loading: false }, () => {
              this.setState({ agentProfile: response.data }, () => {
                let breadcrumps = [];
                breadcrumps = [{link:'/agentprofiles',text:'Agent Profiles'},{link:'#',text:response.data.name +' ('+this.props.match.params.id+')'}];
                this.setState({ breadcrumps });
                console.log(this.state.agentProfile);
              });
            })
          }
        })
        .catch(error => {
          if(Exceptionhandler.throwErrorType(error).status == 401){
            window.location.replace(config.PAAS_LOGIN_URL);
            return (<h1>401 - Unauthorized Request</h1>)
          }
          else if (Exceptionhandler.throwErrorType(error).status == 500 || Exceptionhandler.throwErrorType(error).status == 503 || Exceptionhandler.throwErrorType(error).status == 400 || Exceptionhandler.throwErrorType(error).status == 404) {
            this.setState({ loading: false, serverError: true, serverStatus: Exceptionhandler.throwErrorType(error).status, serverErrMessage: Exceptionhandler.throwErrorType(error).message })
          }
          else {
            this.setState({ loading: false, serverError: false, confirmStatus: true, apiErrMsg: error.response.data.error, actionType: 'OK' })
          }
        });
      }
    }
    
    handleChange = (event, valt) => {
      this.setState({value:valt });
    };
  
    render() {
      const { classes } = this.props;
      const { value } = this.state;
      return (
        <div>
          <Grid container spacing={24}>
            <Grid item xs={12} style={{marginBottom:10,marginTop:10}}>              
                <Breadcrumps  links={this.state.breadcrumps}/>                          
            </Grid>
          </Grid>
      <div className={classes.root}>
        {
          this.state.serverError ? <EmptyListComponent text={this.state.serverErrMessage} fromPage="Errors" /> :
            [
              this.state.loading ?
                <Loader action={this.state.loaderMessage} />
                :
                <div>
                  <p className="bank-profile global-font" style={{marginTop:10}}>Agent Profile (Edit)</p>
                  <AppBar position="static" className={classes.appbar}>
                    {/* <Tabs value={value}
                      classes={{
                        indicator: classes.indicator
                      }}
                      onChange={this.handleChange} className={classes.tabs} >
                    <Tab style={{fontSize: "16px",fontFamily: "Gotham-Rounded" }} className='individual-tabs' label="AGENT PROFILE EDIT" />
                    <Tab style={{ fontSize: "16px",fontFamily: "Gotham-Rounded" }} className='individual-tabs' label="ADDITIONAL PROFILE DETAILS" />    
                    </Tabs> */}
                    <Tabs value={value} umStyle="primary" onChange={this.handleChange}>
                      <Tab className ="global-font" label="AGENT PROFILE EDIT" />
                      <Tab className ="global-font" label="ADDITIONAL PROFILE DETAILS" />
                    </Tabs>
                  </AppBar>
                  {this.state.value === 0 && <EditAgentProfile agentinfo={this.state.agentProfile} {...this.props}/>}
                   {this.state.value === 1 && <h2></h2>}
                </div>
            ]
        }
      </div>
      </div>
    );
    }
  }
  
  EnchancedTabsEdit.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnchancedTabsEdit);
