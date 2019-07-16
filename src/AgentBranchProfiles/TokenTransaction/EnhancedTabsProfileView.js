import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Breadcrumps from '../../component/Breadcrumps';
import * as ApiService from './ApiService';
import * as Exceptionhandler from '../../ExceptionHandling';
import Loader from '../../component/Loader';
import EmptyListComponent from '../../component/EmptylistComponent';
import AuditingComponent from '../../component/AuditingComponent';
import '../../vendor/common.css';
import { Tabs, Tab } from 'finablr-ui';
import ViewTokenTransaction from './ViewTokenTransaction';
import * as config from '../../config/config';
import moment from 'moment';


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
      super(props);
      this.state = {
        value: 0,
        loading:true, 
        loaderMessage:'Retrieving Data',
        tokenExpiryProfile:{},
        serverStatus:null,
        serverError:false,
        serverErrMessage:'',
        breadcrumps:[],
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
      this.fetchTokenExpiryDetails(this.props.match.params.tokenexpiryid);
    }

    handleChange = (event, valt) => {
      this.setState({value:valt });
    };

    fetchTokenExpiryDetails = (id) => {
      if(sessionStorage.getItem('token') == undefined){
        window.location.replace(config.PAAS_LOGIN_URL)
        return (<h1>401 - Unauthorized Request</h1>)
      }
      else{
        let headers = {
          Authorization:sessionStorage.getItem('token')
        }
        this.setState({loading:true},()=>{
          ApiService.TokenExpiryDetails(this.props.match.params.agentid,this.props.match.params.agentbranchId,id,headers)
            .then((response)=>{
              console.log(response);
              if(response.status == 200){
                let breadcrumpData = [{link:'/agentprofiles',text:'Agent Profiles'},{link:'/agentprofiles/'+this.props.match.params.agentid+'/branches',text:response.data.agentName+' ('+response.data.agentId+')'},{link:'/agentprofiles/'+this.props.match.params.agentid+'/branches/'+this.props.match.params.agentbranchId,text:response.data.agentBranchName+' ('+response.data.agentBranchId+')'},{link:'#',text:response.data.id}];
                this.setState({
                  tokenExpiryProfile:response.data,breadcrumps:breadcrumpData,loading:false
                }, () => {
                  this.getActivity();
                })
              }
            }).catch(error=>{
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
        })
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
          ApiService.getActivity( this.props.match.params.agentid, this.props.match.params.agentbranchId, this.props.match.params.tokenexpiryid, headers )
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
                    <Tabs value={this.state.value} umStyle="primary" onChange={this.handleChange}>
                      <Tab style={{ fontSize: "16px",fontFamily: "Gotham-Rounded" ,maxWidth:"440px" }} label="TOKEN/TRANSACTION EXPIRY DETAILS" />
                      <Tab style={{ fontSize: "16px",fontFamily: "Gotham-Rounded" }} label="ACTIVITY" />
                    </Tabs>
                  </AppBar>
                  {this.state.value === 0 && <ViewTokenTransaction tokenExpiryProfile={this.state.tokenExpiryProfile} {...this.props}/>}
                  {this.state.value === 1 && <AuditingComponent createDate={activityDetails.createDate} createBy={activityDetails.createBy} modifiedBy={activityDetails.modifiedBy} modifiedDate={activityDetails.modifiedDate}/>}
                </div>
              ]
            }      
          </div>
        </div>
      );
    }
  }
  
  EnchancedTabProfileView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnchancedTabProfileView);