import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Breadcrumps from '../component/Breadcrumps';
import * as ApiService from './ApiService';
import * as Exceptionhandler from '../ExceptionHandling';
import Loader from '../component/Loader';
import EmptyListComponent from '../component/EmptylistComponent';
import '../vendor/common.css';
import AgentBranchProfileEdit from './AgentBranchProfileEdit';
import ModalBox from './../component/Modalbox';
import ErrorModalBox from '../component/ErrorModalbox';
import { Tabs, Tab } from 'finablr-ui';
import * as config from './../config/config';


let currentVal = 0;
const styles = theme => ({
    root: {
      flexGrow: 1,     
    },
    indicator: {
      backgroundColor: 'white',
      height:`4px`
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

class EnchancedTabProfileView extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        value: null,
        loading:true, 
        loaderMessage:'Retrieving Data',
        serverStatus:null,
        serverError:false,
        serverErrMessage:'',
        agentBranchDetails:{},
        breadcrumps:[],
        branchProfile:{},
        actionCompChange:false,
        shownogeneralrules:false,
        apiErrMsg:'',
        actionType:'',
        confirmChange:false,
        modalMessage:'There are un saved changes on this page. These will be lost if not saved! Are you sure you want to continue?',
      };
    }

    componentDidMount(){
      console.log(this.props);
      this.getAgentProfile();
      //this.setState({loading:false});
    }

    handleChange = (event, valt) => {
      this.setState({value:valt });
    };

    handleCompValueChange = (data) => {
      this.setState({actionCompChange:data});
    }

    handleModalResponse = (data) =>{
      if(data){
        this.setState({value:currentVal,confirmChange:false});
      }
      else{
        this.setState({confirmChange:false});
      }
    }

    handleChange = (event, valt) => {
      this.setState({confirmChange:false},()=>{
        currentVal = valt;
        if(this.state.actionCompChange === true){
          this.setState({confirmChange:true,actionType:'Yes'});
        }
        else{
          this.setState({confirmChange:false,actionCompChange:false,value:valt},()=>{

          });
        }
      })
    };

    handleStatusResponse=(data)=>{
      if(data == true){
        this.setState({shownogeneralrules:false},()=>{          
        });       
      } 
    }

    getAgentProfile=()=>{
      if(sessionStorage.getItem('token') == undefined){
        window.location.replace(config.PAAS_LOGIN_URL)
        return (<h1>401 - Unauthorized Request</h1>)
      }
      else{
        let headers = {
          Authorization:sessionStorage.getItem('token')
        }
        ApiService.getAgentBranchProfileDetails(this.props.match.params.branchid,headers)
        .then((response)=>{
          console.log(response);
            if(response.status == 200){
              this.setState({loading:false},()=>{
                  this.setState({branchProfile:response.data,value:0},()=>{
                    let breadcrumpData = [{link:'/agentprofiles',text:'Agent Profiles'},{link:`/agentprofiles/${this.props.match.params.agentid}/branches`,text: response.data.agentName +' ('+ this.props.match.params.agentid +')'},{link:'#',text: response.data.branchDisplayName + ' ('+ this.props.match.params.branchid +')'}];
                    this.setState({breadcrumps:breadcrumpData})
                    //console.log(this.state.agentProfile);
                  });
              })
            }
        })
        .catch(error=>{
          if(Exceptionhandler.throwErrorType(error).status == 401){
            window.location.replace(config.PAAS_LOGIN_URL)
            return (<h1>401 - Unauthorized Request</h1>)
          }
          if(Exceptionhandler.throwErrorType(error).status == 500 || Exceptionhandler.throwErrorType(error).status == 503 || Exceptionhandler.throwErrorType(error).status == 400 || Exceptionhandler.throwErrorType(error).status == 404){
              this.setState({loading:false,serverError:true,serverStatus:Exceptionhandler.throwErrorType(error).status,serverErrMessage:Exceptionhandler.throwErrorType(error).message})
          }
          else{
              this.setState({loading:false,serverError:false,confirmStatus:true,apiErrMsg:error.response.data.error,actionType:'OK'})
          }
        });
      }
    }

  
    render() {
      const { classes } = this.props;
      //const { value } = this.state;
      
      return (
        <div>
          <Grid container spacing={24}>
            <Grid item xs={12}>              
              <Breadcrumps  links={this.state.breadcrumps}/>  
            </Grid>
            <Grid item xs={12}> 
              <p className="agent-branch-header">Agent Branch Profile (Edit)</p>                       
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
                    {/* <Tabs value={this.state.value} 
                    classes={{
                      indicator: classes.indicator
                    }}
                    onChange={this.handleChange} className={classes.tabs} >
                      <Tab style={{fontSize: "16px",fontFamily: "Gotham-Rounded" }} className='individual-tabs' label="Agent Branch Profile Details" />
                      <Tab style={{fontSize: "16px",fontFamily: "Gotham-Rounded",maxWidth:"450px" }} label="Additional Agent Branch Profile Details" />            
                    </Tabs> */}
                    <Tabs value={this.state.value} umStyle="primary" onChange={this.handleChange}>
                      <Tab className = "global-font" label="AGENT BRANCH PROFILE DETAILS EDIT" />
                      <Tab className = "global-font" label="ADDITIONAL AGENT BRANCH PROFILE DETAILS" />
                    </Tabs>
                  </AppBar>
                  {this.state.value === 0 && <AgentBranchProfileEdit handleCompValueChange={this.handleCompValueChange} branchProfile={this.state.branchProfile} {...this.props}/>}
                  {this.state.value === 1 && <div>Activity</div>}
                </div>
              ]
            }      
          </div>
          {
            this.state.confirmChange ? <ModalBox isOpen={this.state.confirmChange} actionType={this.state.actionType} message={(this.state.modalMessage)} modalAction={this.handleModalResponse}/> : null
          }
          {
            this.state.shownogeneralrules ? <ErrorModalBox isOpen={this.state.shownogeneralrules} actionType="OK" message={this.state.apiErrMsg} modalAction={this.handleStatusResponse}/> : null
          }
        </div>
      );
    }
  }
  
  EnchancedTabProfileView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnchancedTabProfileView);