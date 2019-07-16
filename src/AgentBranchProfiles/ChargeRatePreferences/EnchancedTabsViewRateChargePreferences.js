import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Loader from './../../component/Loader';
import EmptyListComponent from './../../component/EmptylistComponent';
import * as ApiService from './ApiChargePerferences';
import * as Exceptionhandler from './../../ExceptionHandling';
import { Tabs, Tab } from 'finablr-ui';
import ViewRateChargePreference from './ViewRateChargePreference';
import Breadcrumps from '../../component/Breadcrumps';
import * as BranchApiService from '../ApiService';
import AuditingComponent from './../../component/AuditingComponent';
import * as config from '../../config/config';
import moment from 'moment';

const styles = theme => ({
  root: {
    flexGrow: 1,
    border: '1px solid lightgrey',
  },

  indicator: {
    backgroundColor: 'white',
    height: `4px`
  },
  appbar: {
    boxShadow: 'none'
  },
  tabs: {
    backgroundColor: '#19ace3',
    color: '#fff'
  },
  testColor: {
    color: 'blue !important'
  }
});

class EnchancedTabsViewRateChargePreferences extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      loading: true,
      loaderMessage: 'Retrieving Data',
      serverStatus: null,
      serverError: false,
      serverErrMessage: '',
      rateChargePrefernce: {},
      breadcrumps: [],
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

  componentDidMount() {
    console.log(this.props);
    this.getRateChargePreferences();
    this.fetchAgentBranchDetails();
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
      BranchApiService.getAgentBranchProfileDetails(this.props.match.params.agentbranchId,headers)
      .then((response)=>{
        console.log(response)
        if(response.status == 200){
          let breadcrumpData = [{link:'/agentprofiles',text:'Agent Profiles'},{link:'/agentprofiles/'+this.props.match.params.agentid+'/branches',text:response.data.agentName+' ('+response.data.agentId+')'},{link:'/agentprofiles/'+this.props.match.params.agentid+'/branches/'+this.props.match.params.agentbranchId,text:response.data.branchDisplayName+' ('+response.data.id+')'},{link:'#',text:this.props.match.params.ratechargeprefernceid}];
          this.setState({breadcrumps:breadcrumpData});
        }
      })
      .catch(error=>{
        if(Exceptionhandler.throwErrorType(error).status == 401){
          window.location.replace(config.PAAS_LOGIN_URL);
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

  getRateChargePreferences = () => {
    if(sessionStorage.getItem('token') == undefined){
      window.location.replace(config.PAAS_LOGIN_URL);
      return (<h1>401 - Unauthorized Request</h1>)
    }
    else{
      let headers = {
        Authorization:sessionStorage.getItem('token')
      }
      ApiService.RateChargePerferencesDetails(this.props.match.params.agentid,this.props.match.params.agentbranchId,this.props.match.params.ratechargeprefernceid,headers)
      .then((response) => {
        if (response.status == 200) {
            console.log(response.data);
          this.setState({ rateChargePrefernce:response.data,loading: false}, () => {
            this.getActivity();
            console.log(this.state.allowedProductsProfile)
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
        ApiService.getActivity( this.props.match.params.agentid, this.props.match.params.agentbranchId, this.props.match.params.ratechargeprefernceid, headers )
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
    
  handleChange = (event, valt) => {
    this.setState({ value: valt });
  };

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
            this.state.serverError ? <EmptyListComponent text={this.state.serverErrMessage} fromPage="Errors" /> :
              [
                this.state.loading ?
                  <Loader action={this.state.loaderMessage} />
                  :
                  <div>
                    <AppBar position="static" className={classes.appbar}>

                      <Tabs value={value} umStyle="primary" onChange={this.handleChange}>
                        <Tab style={{ fontSize: "16px",fontFamily: "Gotham-Rounded",maxWidth: "400px"}}  label="RATE/CHARGE PREFERENCE" />
                        <Tab style={{ fontSize: "16px",fontFamily: "Gotham-Rounded" }} label="ACTIVITY" />
                      </Tabs>
                    </AppBar>
                    {this.state.value === 0 && <ViewRateChargePreference rateChargePrefernce={this.state.rateChargePrefernce}/>}
                    {this.state.value === 1 && <AuditingComponent createDate={activityDetails.createDate} createBy={activityDetails.createBy} modifiedBy={activityDetails.modifiedBy} modifiedDate={activityDetails.modifiedDate}/>}
                  </div>
              ]
          }
        </div>
      </div>
    );
  }
}

EnchancedTabsViewRateChargePreferences.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnchancedTabsViewRateChargePreferences);
