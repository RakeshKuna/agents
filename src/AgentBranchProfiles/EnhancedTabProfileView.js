import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
import AgentBranchProfileView from './AgentBranchProfileView';
import Grid from '@material-ui/core/Grid';
import Breadcrumps from '../component/Breadcrumps';
import * as ApiService from './ApiService';
import * as Exceptionhandler from '../ExceptionHandling';
import Loader from '../component/Loader';
import EmptyListComponent from '../component/EmptylistComponent';
import '../vendor/common.css';
import EnchancedTabsRulesView from './EnchancedTabsRulesView';
import { Tabs, Tab } from 'finablr-ui';
import RoundOffRate from './RoundOffRate/RoundOffRate';
import ModalBox from './../component/Modalbox';
import * as config from './../config/config';
import moment from 'moment';
import AuditingComponent from './../component/AuditingComponent';

const queryString = require('query-string');
var parsed = null;

const styles = theme => ({
    root: {
      flexGrow: 1,
      border: '1px solid lightgrey',        
    },
    indicator: {
      backgroundColor: 'white',
      height:`2.5px`
    },
    appbar:{
      boxShadow:'none',
    },
    tabs:{
        backgroundColor:'#19ace3',
        color:'#fff',  
    },
    testColor:{
      color:'blue !important'
    },
    individualTab:{
      width:`auto !important`,
    }
});
let currentVal = 0;
class EnchancedTabProfileView extends React.Component {
    constructor(props){
      super(props);
      parsed = queryString.parse(props.location.search);
      this.state = {
        value: 0,
        loading:true, 
        loaderMessage:'Retrieving Data',
        modalMessage: 'There are un saved changes on this page. These will be lost if not saved! Are you sure you want to continue?',
        serverStatus:null,
        serverError:false,
        serverErrMessage:'',
        agentBranchDetails:{},
        breadcrumps:[],
        confirmChange: false,
        actionCompChange: false,
        actionType: 'YES',
        activityDetails: {},
      };
    }

    dateFormater = (data) => {
      let activityDetails = {
        createBy: data.createdBy,
        modifiedBy: data.modifiedBy,
        createDate: moment(data.createdDate).format("DD/MM/YYYY hh:mm a"),
        modifiedDate: moment(data.modifiedDate).format("DD/MM/YYYY hh:mm a"),
      }
      this.setState({ activityDetails }, () => {
        console.log(activityDetails);
      })
    }

    componentDidMount(){
      console.log(this.props);
      this.fetchAgentBranchDetails();
      this.setState({loading:true});
    }

    handleChange = (event, valt) => {
      this.setState({value:valt });
    };

    handleChange = (event, valt) => {
      let emptydatasearch = '';
      this.setState({ confirmChange: false }, () => {
        currentVal = valt;
        if (this.state.actionCompChange === true) {
          this.setState({ confirmChange: true, actionType: 'Yes' });
        }
        else {
          this.setState({ confirmChange: false, actionCompChange: false, value: valt }, () => {
          });
        }
      })
    };

    handleCompValueChange = (data) => {
      this.setState({ actionCompChange: data });
    }
    
    handleModalResponse = (data) => {
      if (data) {
        this.setState({ value: currentVal, confirmChange: false });
      }
      else {
        this.setState({ confirmChange: false });
      }
    }

    fetchAgentBranchDetails = () => {
      if(sessionStorage.getItem('token') == undefined){
        window.location.replace(config.PAAS_LOGIN_URL);
        return (<h1>401 - Unauthorized Request</h1>)
      }
      else{
        let headers = {
          Authorization:sessionStorage.getItem('token')
        }
        ApiService.getAgentBranchProfileDetails(this.props.match.params.agentbranchId,headers)
        .then((response)=>{
          console.log(response)
          if(response.status == 200){
            this.setState({serverError:false,loading:false,loaderMessage:'',agentBranchDetails:response.data},()=>{
              let breadcrumpData = [{link:'/agentprofiles',text:'Agent Profiles'},{link:'/agentprofiles/'+this.props.match.params.agentid+'/branches',text:response.data.agentName+' ('+this.props.match.params.agentid+')'},{link:'#',text:response.data.branchDisplayName+' ('+this.props.match.params.agentbranchId+')'}];
              this.setState({breadcrumps: breadcrumpData}, () => {
                this.getActivity();
              })
            });
          }
        })
        .catch(error=>{
          if(Exceptionhandler.throwErrorType(error).status == 401){
            window.location.replace(config.PAAS_LOGIN_URL)
            return (<h1>401 - Unauthorized Request</h1>)
          }
          else if(Exceptionhandler.throwErrorType(error).status == 500 || Exceptionhandler.throwErrorType(error).status == 503 || Exceptionhandler.throwErrorType(error).status == 400 || Exceptionhandler.throwErrorType(error).status == 404){
            this.setState({loading:false,serverError:true,serverStatus:Exceptionhandler.throwErrorType(error).status,serverErrMessage:Exceptionhandler.throwErrorType(error).message})
          }
          else{
            this.setState({loading:false,serverError:false,shownogeneralrules:true,apiErrMsg:error.response.data.error,actionType:'OK'})
          }
        });
      }
    }

    getActivity = () => {
      if(sessionStorage.getItem('token') == undefined){
        window.location.replace(config.PAAS_LOGIN_URL);
        return (<h1>401 - Unauthorized Request</h1>)
      }
      else {
        let headers = {
          Authorization:sessionStorage.getItem('token')
        }
        this.setState({ loading: true }, () => {
          ApiService.getActivity(this.props.match.params.agentbranchId)
            .then((response) => {
              if (response.status == 200) {
                console.log(response);
                this.setState({ loading: false, serverError: false, activityDetails: response.data }, () => {
                  console.log(this.state.activityDetails);
                  this.dateFormater(this.state.activityDetails)
                })
              }
            })
            .catch(error => {
              if(Exceptionhandler.throwErrorType(error).status == 401){
                window.location.replace(config.PAAS_LOGIN_URL);
                return (<h1>401 - Unauthorized Request</h1>)
              }
              else if (Exceptionhandler.throwErrorType(error).status == 500 || Exceptionhandler.throwErrorType(error).status == 503 || Exceptionhandler.throwErrorType(error).status == 400 ) {
                this.setState({ loading: false, serverError: true, serverStatus: Exceptionhandler.throwErrorType(error).status, serverErrMessage: Exceptionhandler.throwErrorType(error).message })
              }
              else {
                this.setState({ loading: false, serverError: false, confirmStatus: true, apiErrMsg: error.response.data.error, actionType: 'OK' })
              }
            });
        })
      }
    }
  
    render() {
      const { classes } = this.props;
      const { value, activityDetails } = this.state;
      return (
        <div>
          <Grid container spacing={24}>
            <Grid item xs={12} style={{marginBottom:20,marginTop:20}}>              
                <Breadcrumps  links={this.state.breadcrumps}/>                          
            </Grid>
          </Grid>
        <div className={classes.root}>
        {
          this.state.serverError ? <EmptyListComponent text={this.state.serverErrMessage} fromPage="Errors"/> :
          [
            this.state.loading?
            <Loader action={this.state.loaderMessage}/>
            :
            <div>
              <AppBar position="static" className={classes.appbar}>
                {/* <Tabs value={value} 
                classes={{
                  indicator: classes.indicator
                }}
                onChange={this.handleChange} className={classes.tabs} >
                  <Tab  style={{ fontSize: "16px",fontFamily: "Gotham-Rounded" }} className='individual-tabs' label="Agent Branch Profile Details" />
                  <Tab  style={{ fontSize: "16px",fontFamily: "Gotham-Rounded" }} label="ACTIVITY" />            
                </Tabs> */}
                <Tabs style={{ fontSize: "16px",fontFamily: "Gotham-Rounded" }} value={this.state.value} umStyle="primary" onChange={this.handleChange}>
                  <Tab style={{ fontSize: "16px",fontFamily: "Gotham-Rounded" }}  label="AGENT BRANCH PROFILE DETAILS" />
                  <Tab style={{ fontSize: "16px",fontFamily: "Gotham-Rounded" }} label="ACTIVITY" />
                </Tabs>
              </AppBar>
              {this.state.value === 0 && <AgentBranchProfileView agentBranchDetails={this.state.agentBranchDetails} handleCompValueChange={this.handleCompValueChange} {...this.props}/>}
              {this.state.value === 1 && <AuditingComponent createDate={activityDetails.createDate} createBy={activityDetails.createBy} modifiedBy={activityDetails.modifiedBy} modifiedDate={activityDetails.modifiedDate}/>}
            </div>
          ]
        }      
        </div>
        <div>
          {
            this.state.value === 0 ?
            <Grid item xs={12} style={{ marginTop: 40 }}>
              <EnchancedTabsRulesView {...this.props} tabIndex={parseInt(parsed.tabId)}/>
            </Grid>
            :
            null
          }
        </div>
        {
          this.state.confirmChange ? <ModalBox isOpen={this.state.confirmChange} actionType={this.state.actionType} message={(this.state.modalMessage)} modalAction={this.handleModalResponse} /> : null
        }
        </div>
      );
    }
  }
  
  EnchancedTabProfileView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnchancedTabProfileView);