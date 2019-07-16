import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import '../../vendor/common.css';
import '../../theme/theme';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Loader from './../../component/Loader';
import ModalBox from './../../component/Modalbox';
import { Toggle, TextButton, FloatButton, Notifications, Input, Selectable } from 'finablr-ui';
import * as ApiService from './ApiService';
import * as Exceptionhandler from './../../ExceptionHandling';
import ErrorModalBox from '../../component/ErrorModalbox';
import getMuiTheme from "../../theme/theme";
import { MuiThemeProvider } from '@material-ui/core/styles';
import EmptyListComponent from '../../component/EmptylistComponent';
import MultiSelectTextField from '../../container/MultiSelectTextField';
import * as BranchApiService from '../ApiService';
import * as AgentApiService from '../../AgentProfiles/ApiService';
import Breadcrumps from '../../component/Breadcrumps';
import { SHOW_NOTIFICATION } from '../../constants/action-types';
import { HIDE_NOTIFICATION } from '../../constants/action-types';
import * as config from '../../config/config';


const styles = theme => ({
  root: {
    flexGrow: 1,
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

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3, border: `1px solid lightgrey` }}>
      {props.children}
    </Typography>
  );
}

const transactionTypeList = [{ id: 1, label: 'Send', value: 'send' }, { id: 2, label: 'Cancel', value: 'cancel' }]

const transactionStatusList = [{ id: 1, label: 'Awaiting Funds', value: 'awaitingFunds' }, { id: 2, label: 'Cancel', value: 'cancel' }]

class EditTokenExpiry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      breadcrumps: [],
      loaderMessage: 'Retrieving Data',
      serviceProvider: '',
      productType: '',
      subProductType: '',
      serviceType: '',
      transactionType: '',
      transactionTypeData: {},
      transactionTypeCheck: false,
      transactionTypeerrMsg: '',
      transactionStatus: '',
      transactionStatusData: {},
      transactionStatusCheck: false,
      transactionStatuserrMsg: '',
      serverStatus: null,
      serverError: false,
      serverErrMessage: '',
      status: true,
      saveDisabled: false,
      confirmDelete: false,
      fromAction: '',
      snackbarMsg: '',
      snackbar: false,
      shownogeneralrules: false,
      apiErrMsg: '',
      setExpiryTimeFor: '',
      tokenExpiryHours: '00',
      tokenExpiryCheck: false,
      tokenExpiryerrMsg: '',
      tokenExpiryMins: '00',
      tokenExpirySecs: '00',
      custTypeCountryArr: [],
      agentBranchesDisabled: true,
      agentBranchesList: [],
      replicateToSelfAgent: false,
      replicateToOtherAgent: false,
      notificationType: 'success',
      agentsList: [],
      replicateAgentsData: [{ agentProfile: {}, agentBranches: [], agentProfileCheck: false, agentProfileerrMsg: '', agentBranchesCheck: false, agentBrancheserrMsg: '', agentBranchesDisabled: true, agentBranchesList: [] }],
      newPushObj: { agentProfile: {}, agentBranches: [], agentProfileCheck: false, agentProfileerrMsg: '', agentBranchesCheck: false, agentBrancheserrMsg: '', agentBranchesDisabled: true, agentBranchesList: [] }
    };
  }

  componentDidMount() {
    //  console.log(this.props);
    this.fetchTokenExpiryDetails(this.props.match.params.tokenexpiryid);
  }

  fetchTokenExpiryDetails = (id) => {
    if(sessionStorage.getItem('token') == undefined){
      window.location.replace(config.PAAS_LOGIN_URL);
      return (<h1>401 - Unauthorized Request</h1>)
    }
    else{
      let headers = {
        Authorization:sessionStorage.getItem('token')
      }
      this.setState({ loading: true }, () => {
        ApiService.TokenExpiryDetails(this.props.match.params.agentid, this.props.match.params.agentbranchId, id, headers)
          .then((response) => {
            console.log(response);
            let hrs = response.data.time.indexOf(':');
            let secs = response.data.time.lastIndexOf(":");
            let breadcrumpData = [{ link: '/agentprofiles', text: 'Agent Profiles' }, { link: '/agentprofiles/' + this.props.match.params.agentid + '/branches', text: response.data.agentName + ' (' + response.data.agentId + ')' }, { link: '/agentprofiles/' + this.props.match.params.agentid + '/branches/' + this.props.match.params.agentbranchId, text: response.data.agentBranchName + ' (' + response.data.agentBranchId + ')' }, { link: '#', text: response.data.id }];
            if (response.status == 200) {
              this.setState({
                serviceProvider: response.data.serviceProviderName,
                productType: response.data.productType,
                subProductType: response.data.subProductType,
                serviceType: response.data.serviceType,
                setExpiryTimeFor: response.data.tokenOrTransactionType,
                transactionType: response.data.transactionType,
                tokenExpiryHours: response.data.time.slice(0, hrs),
                tokenExpiryMins: response.data.time.slice(hrs + 1, secs),
                tokenExpirySecs: response.data.time.slice(secs + 1, response.data.time.length),
                transactionStatus: (response.data.transactionStatus == null) ? '---' : response.data.transactionStatus,
                status: (response.data.status == 'ENABLED') ? true : false,
                breadcrumps: breadcrumpData,
                loading: false
              }, () => {
                this.handleSaveEnable();
              })
            }
          }).catch(error => {
            if(Exceptionhandler.throwErrorType(error).status == 401){
              window.location.replace(config.PAAS_LOGIN_URL)
              return (<h1>401 - Unauthorized Request</h1>)
            }
            else if (Exceptionhandler.throwErrorType(error).status == 500 || Exceptionhandler.throwErrorType(error).status == 503 || Exceptionhandler.throwErrorType(error).status == 400 || Exceptionhandler.throwErrorType(error).status == 404) {
              this.setState({ loading: false, serverError: true, serverStatus: Exceptionhandler.throwErrorType(error).status, serverErrMessage: Exceptionhandler.throwErrorType(error).message })
            }
            else {
              this.setState({ loading: false, serverError: false, shownogeneralrules: true, apiErrMsg: error.response.data.error, actionType: 'OK' })
            }
          });
      })
    }
  }

  handleStatusResponse = (data) => {
    if (data == true) {
      this.setState({ shownogeneralrules: false }, () => {
      });
    }
  }

  handleBlur = (e) => {
    // console.log(e.target.id);
    switch (e.target.id) {
      case 'transactionStatus':
        // console.log('switch',this.state.transactionStatusCheck)
        this.setState({ transactionStatusCheck: false }, () => {
          if (this.state.transactionStatus == undefined) {
            this.setState({ transactionStatusCheck: true, transactionStatuserrMsg: 'transactionStatus cannot be empty' }, () => {
              this.handleSaveEnable();
            })
          }
          else if (this.state.transactionStatus.length == 0) {
            this.setState({ transactionStatusCheck: true, transactionStatuserrMsg: 'transactionStatus cannot be empty' }, () => {
              this.handleSaveEnable();
            })
          }
          else {
            this.handleSaveEnable();
          }
        })
        break;
    }
  }

  handleTextfieldChange = (e,value) => {
    let pattern = /^[0-9]+$/i;
    // console.log(e,value);
    switch(e.target.id){
      case 'tokenExpiryHrs':
        this.setState({tokenExpiryHours:value,tokenExpiryCheck:false},()=>{
          if(pattern.test(this.state.tokenExpiryHours) == false){
            this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
              this.handleSaveEnable();
             
            })
          }
          else if(this.state.tokenExpiryHours.length == 0){
            this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Expiry time can not be empty'},()=>{
              this.handleSaveEnable();
              
            })
          }
          else{
            this.setState({tokenExpiryCheck:false,tokenExpiryerrMsg:''},()=>{
              this.handleSaveEnable();
              
            })
          }
        })
      break;
      case 'tokenExpiryMins':
        this.setState({tokenExpiryMins:value,tokenExpiryCheck:false},()=>{
          if(pattern.test(this.state.tokenExpiryMins) == false){
            this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
              this.handleSaveEnable();
              
            })
          }
          else if(this.state.tokenExpiryMins.length == 0){
            this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Expiry time can not be empty'},()=>{
              this.handleSaveEnable();
              
            })
          }
          else{
            this.setState({tokenExpiryCheck:false,tokenExpiryerrMsg:''},()=>{
              this.handleSaveEnable();
              
            });
          }
        })
      break;
      case 'tokenExpirySecs':
        this.setState({tokenExpirySecs:value,tokenExpiryCheck:false},()=>{
          if(pattern.test(this.state.tokenExpirySecs) == false){
            this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
              this.handleSaveEnable();
              
            })
          }
          else if(this.state.tokenExpirySecs.length == 0){
            this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Expiry time can not be empty'},()=>{
              this.handleSaveEnable();
              
            })
          }
          else{
            this.setState({tokenExpiryCheck:false,tokenExpiryerrMsg:''},()=>{
              this.handleSaveEnable();
              
            })
          }
        })
      break;
      case 'replicateToSelfAgent':
        this.setState({replicateToSelfAgent:value},()=>{
          if(this.state.replicateToSelfAgent == true){
            this.fetchAgentBranches(this.props.match.params.agentid);
          }
          else{
            this.setState({custTypeCountryArr:[]})
          }
        })
      break;
      case 'replicateToOtherAgent':
        this.setState({replicateToOtherAgent:value},()=>{
          if(this.state.replicateToOtherAgent == true){
            this.fetchAgentProfiles();
          }
          else{
            let replicateAgentsData = [];
            replicateAgentsData.push(this.state.newPushObj)
            this.setState({replicateAgentsData});
          }
          this.handleSaveEnable();
         
        })
      break;
      case 'status':
        this.setState({status:value});
      break;
    }
  }

  handleTokenExpiryHoursError = (e) => {
    // console.log(e);
    switch (e){
      case('required'):
        this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Expiry time can not be empty'},()=>{
          this.handleSaveEnable();
          
        });
      break;
      case('regex'):
        this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
          this.handleSaveEnable();
          
        });
      break;
    }
  }

  handleTokenExpiryMinsError = (e) => {
    // console.log(e);
    switch (e){
      case('required'):
        this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Expiry time can not be empty'},()=>{
          this.handleSaveEnable();
          
        });
      break;
      case('regex'):
        this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
          this.handleSaveEnable();
          
        });
      break;
      case('max'):
      this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
        this.handleSaveEnable();
        
      });
      break;
      case('min'):
      this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
        this.handleSaveEnable();
        
      });
      break;
      case('maxLength'):
      this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
        this.handleSaveEnable();
        
      });
      break;
      case('minLength'):
      this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
        this.handleSaveEnable();
        
      });
      break;
    }
  }

  handleTokenExpirySecsError = (e) => {
    // console.log(e);
    switch (e){
      case('required'):
        this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Expiry time can not be empty'},()=>{
          this.handleSaveEnable();
          
        });
      break;
      case('regex'):
        this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
          this.handleSaveEnable();
          
        });
      break;
      case('max'):
      this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
        this.handleSaveEnable();
        
      });
      break;
      case('min'):
      this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
        this.handleSaveEnable();
        
      });
      break;
      case('maxLength'):
      this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
        this.handleSaveEnable();
        
      });
      break;
      case('minLength'):
      this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
        this.handleSaveEnable();
       
      });
      break;
    }
  }

  handleChangeCustAgentBranch = (data) => {
    this.setState({ custTypeCountryArr: data }, () => {
      this.handleSaveEnable();
    })
  }

  handleViewCustAgentBranchValues = (data) => {
    this.setState({ custTypeCountryArr: data }, () => {
      this.handleSaveEnable();
    })
  }

  fetchAgentBranches = (agentId) => {
    let params = {};
    let agentBranchesList = [];
    if(sessionStorage.getItem('token') == undefined){
      window.location.replace(config.PAAS_LOGIN_URL)
      return (<h1>401 - Unauthorized Request</h1>)
    }
    else{
      let headers = {
        Authorization:sessionStorage.getItem('token')
      }
      this.setState({ loading: true, loaderMessage: 'Retrieving Agent Branches' }, () => {
        BranchApiService.getAllAgentBranchProfiles(params, agentId, headers)
          .then((response) => {
            // console.log(response);
            let agentBranchCount = response.data.data.length;
            if (response.status == 200) {
              if (response.data.data.length > 0) {
                response.data.data.map((obj) => {
                  if (obj.id == this.props.match.params.agentbranchId) {
                    agentBranchCount = agentBranchCount - 1;
                    return null;
                  }
                  else {
                    let agentBranch = {};
                    agentBranch.id = obj.id;
                    agentBranch.label = obj.branchName;
                    agentBranch.value = obj.branchDisplayName;
                    agentBranchesList.push(agentBranch);
                  }
                })
                this.setState({ agentBranchesList, agentBranchesDisabled: (agentBranchCount > 0) ? false : true, snackbar: (agentBranchCount > 0) ? false : true, notificationType: 'warning', snackbarMsg: 'no agent branches records found', loading: false }, () => {
                  //console.log(this.state.agentBranchesList);
                });
              }
              else {
                this.setState({ serviceProviderDisabled: true, loading: false, snackbar: true, notificationType: 'warning', snackbarMsg: 'no agent branches records found' })
              }
            }
          }).catch(error => {
            if(Exceptionhandler.throwErrorType(error).status == 401){
              window.location.replace(config.PAAS_LOGIN_URL)
              return (<h1>401 - Unauthorized Request</h1>)
            }
            else if (Exceptionhandler.throwErrorType(error).status == 500 || Exceptionhandler.throwErrorType(error).status == 503 || Exceptionhandler.throwErrorType(error).status == 400 || Exceptionhandler.throwErrorType(error).status == 404) {
              this.setState({ loading: false, serverError: true, serverStatus: Exceptionhandler.throwErrorType(error).status, serverErrMessage: Exceptionhandler.throwErrorType(error).message })
            }
            else {
              this.setState({ loading: false, serverError: false, shownogeneralrules: true, apiErrMsg: error.response.data.error, actionType: 'OK' })
            }
          });
      })
    }
  }

  fetchAgentProfiles = () => {
    let params = {};
    let agentsList = [];
    if(sessionStorage.getItem('token') == undefined){
      window.location.replace(config.PAAS_LOGIN_URL)
      return (<h1>401 - Unauthorized Request</h1>)
    }
    else{
      let headers = {
        Authorization:sessionStorage.getItem('token')
      }
      this.setState({ loading: true, loaderMessage: 'Retrieving Agent Profiles' }, () => {
        AgentApiService.getAllAgentProfiles(params,headers)
          .then((response) => {
            // console.log(response);
            if (response.status == 200) {
              if (response.data.total > 0) {
                response.data.data.map((obj) => {
                  if (this.props.match.params.agentid == obj.id) {
                    return null;
                  }
                  else {
                    let agentProfile = {};
                    agentProfile.id = obj.id;
                    agentProfile.label = obj.name;
                    agentProfile.value = obj.displayName;
                    agentsList.push(agentProfile);
                  }
                })
                this.setState({ agentsList, snackbar: false, loading: false }, () => {
                  //console.log(this.state.agentBranchesList);
                });
              }
              else {
                this.setState({ loading: false, notificationType: 'warning', snackbar: true, snackbarMsg: 'no agent records found' })
              }
            }
          }).catch(error => {
            if(Exceptionhandler.throwErrorType(error).status == 401){
              window.location.replace(config.PAAS_LOGIN_URL)
              return (<h1>401 - Unauthorized Request</h1>)
            }
            else if (Exceptionhandler.throwErrorType(error).status == 500 || Exceptionhandler.throwErrorType(error).status == 503 || Exceptionhandler.throwErrorType(error).status == 400 || Exceptionhandler.throwErrorType(error).status == 404) {
              this.setState({ loading: false, serverError: true, serverStatus: Exceptionhandler.throwErrorType(error).status, serverErrMessage: Exceptionhandler.throwErrorType(error).message })
            }
            else {
              this.setState({ loading: false, serverError: false, shownogeneralrules: true, apiErrMsg: error.response.data.error, actionType: 'OK' })
            }
          });
      })
    }
  }

  handleReplicaAgentBlur = (e, index) => {
    let replicateAgentsData = this.state.replicateAgentsData;
    if (e.target.id == undefined) {
      replicateAgentsData[index].agentProfile = {};
      replicateAgentsData[index].agentProfileCheck = true;
      replicateAgentsData[index].agentProfileerrMsg = 'Agent can not be empty';
      replicateAgentsData[index].agentBranches = [];
      replicateAgentsData[index].agentBranchesDisabled = true;
      replicateAgentsData[index].agentBranchesList = [{}];
      this.setState({ replicateAgentsData }, () => {
        this.handleSaveEnable();
      })
    }
    else if (Object.keys(replicateAgentsData[index].agentProfile).length == 0) {
      replicateAgentsData[index].agentProfileCheck = true;
      replicateAgentsData[index].agentProfileerrMsg = 'Agent can not be empty';
      replicateAgentsData[index].agentBranches = [];
      replicateAgentsData[index].agentBranchesDisabled = true;
      replicateAgentsData[index].agentBranchesList = [{}];
      this.setState({ replicateAgentsData }, () => {
        this.handleSaveEnable();
      })
    }
    else {
      replicateAgentsData[index].agentProfileCheck = false;
      replicateAgentsData[index].agentProfileerrMsg = '';
      this.setState({ replicateAgentsData }, () => {
        this.handleSaveEnable();
      })
    }
  }

  handleReplicaAgentChange = (e, index) => {
    // let index = index;
    console.log(e, index);
    let value  = e;
    let indexValue = index;
    let replicateAgentsData = this.state.replicateAgentsData;
    replicateAgentsData[index].agentProfileCheck = false;
    this.setState({ replicateAgentsData }, () => {
      if (value == undefined) {
        replicateAgentsData[index].agentProfile = {};
        replicateAgentsData[index].agentProfileCheck = true;
        replicateAgentsData[index].agentBranches = [];
        replicateAgentsData[index].agentBranchesDisabled = true;
        replicateAgentsData[index].agentProfileerrMsg = 'Agent can not be empty';
        replicateAgentsData[index].agentBranchesList = [{}];
        this.setState({ replicateAgentsData }, () => {
          this.handleSaveEnable();
        })
      }
      else if(value.length > 0){
        this.state.agentsList.map((obj)=>{
          if(value == obj.value){
            let existingIndex = null;
            let checkExistingRule = obj;
            this.setState({ snackbar: false }, () => {
              if (this.state.replicateAgentsData.length > 0) {
                this.state.replicateAgentsData.map((obj, index) => {
                  if (indexValue == index) {
                    return null;
                  }
                  else {
                    if (checkExistingRule.id == obj.agentProfile.id) {
                      existingIndex = index;
                    }
                  }
                })
                if (existingIndex == null) {
                  let replicateAgentsData = this.state.replicateAgentsData;
                  replicateAgentsData[indexValue].agentProfileCheck = false;
                  replicateAgentsData[indexValue].agentBranches = [];
                  replicateAgentsData[indexValue].agentProfile = checkExistingRule;
                  this.setState({ replicateAgentsData }, () => {
                    this.fetchSelectedAgentBranches(checkExistingRule.id, indexValue);
                    this.handleSaveEnable();
                  })
                }
                else {
                  this.setState({ snackbar: true,notificationType:'warning', snackbarMsg: `Agent rules are already added in row ${existingIndex + 1}` }, () => {
                    let replicateAgentsData = this.state.replicateAgentsData;
                    replicateAgentsData[indexValue].agentProfileCheck = true;
                    replicateAgentsData[indexValue].agentProfileerrMsg = 'Duplicate Agent rule';
                    replicateAgentsData[indexValue].agentBranches = [];
                    replicateAgentsData[indexValue].agentProfile = {};
                    replicateAgentsData[indexValue].agentProfile.value = undefined;
                    this.setState({ replicateAgentsData }, () => {
                      this.handleSaveEnable();
                    });
                  })
                }
              }
            })
          }
        })
      }
      else {
        replicateAgentsData[index].agentProfileCheck = false;
        this.setState({ replicateAgentsData }, () => {
          this.handleSaveEnable();
        })
      }
    })
  }

  handleReplicaAgentValueClick = (e, indexValue) => {
    let existingIndex = null;
    let checkExistingRule = e;
    this.setState({ snackbar: false }, () => {
      if (this.state.replicateAgentsData.length > 0) {
        this.state.replicateAgentsData.map((obj, index) => {
          if (indexValue == index) {
            return null;
          }
          else {
            if (checkExistingRule.id == obj.agentProfile.id) {
              existingIndex = index;
            }
          }
        })
        if (existingIndex == null) {
          let replicateAgentsData = this.state.replicateAgentsData;
          replicateAgentsData[indexValue].agentProfileCheck = false;
          replicateAgentsData[indexValue].agentBranches = [];
          replicateAgentsData[indexValue].agentProfile = e;
          this.setState({ replicateAgentsData }, () => {
            this.fetchSelectedAgentBranches(e.id, indexValue);
            this.handleSaveEnable();
          })
        }
        else {
          this.setState({ snackbar: true, notificationType: 'warning', snackbarMsg: `Agent rules are already added in row ${existingIndex + 1}` }, () => {
            let replicateAgentsData = this.state.replicateAgentsData;
            replicateAgentsData[indexValue].agentProfileCheck = true;
            replicateAgentsData[indexValue].agentProfileerrMsg = 'Duplicate Agent rule';
            replicateAgentsData[indexValue].agentBranches = [];
            replicateAgentsData[indexValue].agentProfile = {};
            replicateAgentsData[indexValue].agentProfile.value = undefined;
            this.setState({ replicateAgentsData }, () => {
              this.handleSaveEnable();
            });
          })
        }
      }
    })
  }

  fetchSelectedAgentBranches = (id, index) => {
    let params = {};
    let replicateAgentsData = this.state.replicateAgentsData;
    let agentBranchesList = [];
    if(sessionStorage.getItem('token') == undefined){
      window.location.replace(config.PAAS_LOGIN_URL)
      return (<h1>401 - Unauthorized Request</h1>)
    }
    else{
      let headers = {
        Authorization:sessionStorage.getItem('token')
      }
      this.setState({ loading: true, loaderMessage: 'Retrieving Agent Branches' }, () => {
        BranchApiService.getAllAgentBranchProfiles(params, id, headers)
          .then((response) => {
            if (response.status == 200) {
              if (response.data.total > 0) {
                response.data.data.map((obj) => {
                  let agentBranch = {};
                  agentBranch.id = obj.id;
                  agentBranch.label = obj.branchName;
                  agentBranch.value = obj.branchDisplayName;
                  agentBranchesList.push(agentBranch);
                })
                replicateAgentsData[index].agentBranchesList = agentBranchesList;
                replicateAgentsData[index].agentBranchesDisabled = false;
                this.setState({ replicateAgentsData, snackbar: false, loading: false }, () => {
                });
              }
              else {
                replicateAgentsData[index].agentBranchesList = agentBranchesList;
                replicateAgentsData[index].agentBranchesDisabled = true;
                this.setState({ replicateAgentsData, loading: false, snackbar: true, notificationType: 'warning', snackbarMsg: 'no agent branches records found' })

              }
            }
          }).catch(error => {
            if(Exceptionhandler.throwErrorType(error).status == 401){
              window.location.replace(config.PAAS_LOGIN_URL)
              return (<h1>401 - Unauthorized Request</h1>)
            }
            else if (Exceptionhandler.throwErrorType(error).status == 500 || Exceptionhandler.throwErrorType(error).status == 503 || Exceptionhandler.throwErrorType(error).status == 400 || Exceptionhandler.throwErrorType(error).status == 404) {
              this.setState({ loading: false, serverError: true, serverStatus: Exceptionhandler.throwErrorType(error).status, serverErrMessage: Exceptionhandler.throwErrorType(error).message })
            }
            else {
              this.setState({ loading: false, serverError: false, shownogeneralrules: true, apiErrMsg: error.response.data.error, actionType: 'OK' })
            }
          });
      })
    }
  }

  handleChangeAgentBranches = (data, id) => {
    let index = parseInt(id.replace('agentbranches', ''));
    let replicateAgentsData = this.state.replicateAgentsData;
    replicateAgentsData[index].agentBranches = data;
    this.setState({ replicateAgentsData }, () => {
      this.handleSaveEnable();
    });
  }

  handleViewAgentBranches = (data, id) => {
    let index = parseInt(id.replace('agentbranches', ''));
    let replicateAgentsData = this.state.replicateAgentsData;
    replicateAgentsData[index].agentBranches = data;
    this.setState({ replicateAgentsData }, () => {
      this.handleSaveEnable();
    });
  }

  handleAddAgentRule = (indexValue) => {
    let existingIndex = null;
    let replicateAgentsData = this.state.replicateAgentsData;
    let checkExistingRule = this.state.replicateAgentsData[indexValue];
    this.setState({ snackbar: false }, () => {
      if (this.state.replicateAgentsData.length > 0) {
        this.state.replicateAgentsData.map((obj, index) => {
          if (indexValue == index) {
            return null;
          }
          else {
            if (checkExistingRule.agentProfile.id == obj.agentProfile.id) {
              existingIndex = index;
            }
          }
        })
        if (existingIndex == null) {
          replicateAgentsData.push(Object.assign({}, this.state.newPushObj));
          this.setState({ replicateAgentsData }, () => {
            this.handleSaveEnable();
          });
        }
        else {
          this.setState({ snackbar: true, notificationType: 'warning', snackbarMsg: `Agent rules are already added in row ${existingIndex + 1}` })
        }
      }
    })
  }

  handleDeleteAgentRule = (index) => {
    let replicateAgentsData = this.state.replicateAgentsData;
    replicateAgentsData.splice(index, 1);
    this.setState({ replicateAgentsData }, () => {
      this.handleSaveEnable();
    });
  }

  handleSaveEnable = () => {
    if (this.state.tokenExpiryCheck == true) {
      this.setState({ saveDisabled: false })
    }
    else if (this.state.replicateToOtherAgent == true) {
      let errCount = 0;
      this.state.replicateAgentsData.map((obj, index) => {
        if ((obj.agentProfileCheck == true) || (obj.agentBranchesCheck == true) || (Object.keys(obj.agentProfile).length == 0)) {
          errCount = errCount + 1;
        }
      })
      if (errCount > 0) {
        this.setState({ saveDisabled: false })
      }
      else {
        this.setState({ saveDisabled: true })
      }
    }
    else {
      this.setState({ saveDisabled: true })
    }
  }

  handleData = () => {
    var data = {};
    data.time = this.state.tokenExpiryHours + ':' + this.state.tokenExpiryMins + ':' + this.state.tokenExpirySecs;

    if (this.state.replicateToSelfAgent == true || this.state.replicateToOtherAgent == true) {
      data.agentReplications = [];
    }
    if (this.state.replicateToSelfAgent == true) {
      data.agentReplications = [];
      let selfAgent = {};
      selfAgent.agentId = parseInt(this.props.match.params.agentid);
      selfAgent.agentBranchesId = [];
      if (this.state.custTypeCountryArr.length > 0) {
        this.state.custTypeCountryArr.map((obj) => {
          selfAgent.agentBranchesId.push(obj.id);
        })
        data.agentReplications.push(selfAgent);
      }
    }
    if (this.state.replicateToOtherAgent == true) {
      if (this.state.replicateAgentsData.length > 0) {
        this.state.replicateAgentsData.map((obj) => {
          let selfAgent = {};
          selfAgent.agentId = obj.agentProfile.id;
          selfAgent.agentBranchesId = [];
          if (obj.agentBranches.length > 0) {
            obj.agentBranches.map((branch) => {
              selfAgent.agentBranchesId.push(branch.id);
            })
          }
          data.agentReplications.push(selfAgent);
        })
      }
    }
    data.status = this.state.status ? 'ENABLED' : 'DISABLED';
    this.editTokenExpiry(data);
  }

  editTokenExpiry = (data) => {
    if(sessionStorage.getItem('token') == undefined){
      window.location.replace(config.PAAS_LOGIN_URL)
      return (<h1>401 - Unauthorized Request</h1>)
    }
    else{
      let headers = {
        Authorization:sessionStorage.getItem('token')
      }
      this.setState({ loading: true, loaderMessage: 'Posting Data', snackbar: false }, () => {
        ApiService.EditTokenExpiryDetails(data, this.props.match.params.agentid, this.props.match.params.agentbranchId, this.props.match.params.tokenexpiryid,headers)
          .then((response) => {
            console.log(response);
            let snackbarMsg = (this.state.replicateToSelfAgent || this.state.replicateToOtherAgent) ? 'The rule has been replicated to the agents and branches and will be available under them.' : 'Token/Transaction Expiry rule Updated successfully';
            this.setState({ loading: false, snackbar: true, notificationType: 'success', snackbarMsg }, () => {
              setTimeout(() => {
                this.props.history.push(`/agentprofiles/${this.props.match.params.agentid}/branches/${this.props.match.params.agentbranchId}?tabId=${1}&pageelements=${5}`)
              }, 1600)
            })
          }).catch(error => {
            if(Exceptionhandler.throwErrorType(error).status == 401){
              window.location.replace(config.PAAS_LOGIN_URL)
              return (<h1>401 - Unauthorized Request</h1>)
            }
            else if (Exceptionhandler.throwErrorType(error).status == 500 || Exceptionhandler.throwErrorType(error).status == 503 || Exceptionhandler.throwErrorType(error).status == 400 || Exceptionhandler.throwErrorType(error).status == 404) {
              this.setState({serverError:false,shownogeneralrules:false},()=>{
              this.setState({ loading: false, serverError: true, serverStatus: Exceptionhandler.throwErrorType(error).status, serverErrMessage: Exceptionhandler.throwErrorType(error).message })
            })
          }
            else {
              this.setState({serverError:false,shownogeneralrules:false},()=>{
              this.setState({ loading: false, serverError: false, shownogeneralrules: true, apiErrMsg: error.response.data.error, actionType: 'OK' })
            })
          }
          });
      })
    }
  }

  handleTimeBlur = (e,id) =>{
    console.log(id,this.state.tokenExpiryHours);
    switch (id) {
      case 'tokenExpiryHrs':
      // if(this.state.tokenExpiryHours.length == 0){
      //   this.setState({tokenExpiryHours:'00'},()=>{
      //     this.handleTimeErrorCheck();
      //   })
      // }
      if((this.state.tokenExpiryHours == 0 && this.state.tokenExpiryHours.length > 0) || (this.state.tokenExpiryHours < 10 && this.state.tokenExpiryHours > 0 && !this.state.tokenExpiryCheck && this.state.tokenExpiryHours.length == 1)){
        console.log('first if ', this.state.tokenExpiryHours)
        let tokenExpiryHours = this.state.tokenExpiryHours;
        tokenExpiryHours = ('0' + tokenExpiryHours).slice(-2);
        this.setState({tokenExpiryHours},()=>{
          console.log(this.state.tokenExpiryHours)
          this.handleTimeErrorCheck();
        })
      }
      else if(this.state.tokenExpiryHours.length > 2 && parseInt(this.state.tokenExpiryHours) == 0 && !this.state.tokenExpiryCheck){
        this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
          this.handleTimeErrorCheck();
        })
      }
      else if(this.state.tokenExpiryHours.length > 2 && parseInt(this.state.tokenExpiryHours) > 9 && !this.state.tokenExpiryCheck){
        let tokenExpiryHours = ''+parseInt(this.state.tokenExpiryHours);
        this.setState({tokenExpiryHours:tokenExpiryHours},()=>{
          this.handleTimeErrorCheck();
        })
      }
      else if(this.state.tokenExpiryHours.length > 2 && parseInt(this.state.tokenExpiryHours) < 9 && parseInt(this.state.tokenExpiryHours) > 0 && !this.state.tokenExpiryCheck){
        let tokenExpiryHours = '0'+parseInt(this.state.tokenExpiryHours);
        this.setState({tokenExpiryHours:tokenExpiryHours},()=>{
          this.handleTimeErrorCheck();
        })
      }
      else {
        this.handleTimeErrorCheck();
      }
      break;
      case 'tokenExpiryMins':
        // if(this.state.tokenExpiryMins.length == 0){
        //   this.setState({tokenExpiryMins:'00'},()=>{
        //     this.handleTimeErrorCheck();
        //   })
        // }
        if((this.state.tokenExpiryMins == 0 && this.state.tokenExpiryMins.length > 0) || (this.state.tokenExpiryMins < 10 && this.state.tokenExpiryMins > 0 && !this.state.tokenExpiryCheck && this.state.tokenExpiryMins.length == 1)){
          let tokenExpiryMins = this.state.tokenExpiryMins;
          tokenExpiryMins = ('0' + tokenExpiryMins).slice(-2);
          this.setState({tokenExpiryMins},()=>{
            this.handleTimeErrorCheck();
          })
        }
        else if(this.state.tokenExpiryMins.length > 2 && parseInt(this.state.tokenExpiryMins) == 0 && !this.state.tokenExpiryCheck){
          this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
            this.handleTimeErrorCheck();
          })
        }
        else if(this.state.tokenExpiryMins.length > 2 && parseInt(this.state.tokenExpiryMins) > 9 && !this.state.tokenExpiryCheck){
          let tokenExpiryMins = ''+parseInt(this.state.tokenExpiryMins);
          this.setState({tokenExpiryMins},()=>{
            this.handleTimeErrorCheck();
          })
        }
        else if(this.state.tokenExpiryMins.length > 2 && parseInt(this.state.tokenExpiryMins) > 0 && parseInt(this.state.tokenExpiryMins) < 9 && !this.state.tokenExpiryCheck){
          let tokenExpiryMins = '0'+parseInt(this.state.tokenExpiryMins);
          this.setState({tokenExpiryMins},()=>{
            this.handleTimeErrorCheck();
          })
        }
        else {
          this.handleTimeErrorCheck();
        }
      break;
      case 'tokenExpirySecs':
        // if(this.state.tokenExpirySecs.length == 0){
        //   this.setState({tokenExpirySecs:'00'},()=>{
        //     this.handleTimeErrorCheck();
        //   })
        // }
        if((this.state.tokenExpirySecs == 0 && this.state.tokenExpirySecs.length > 0) || (this.state.tokenExpirySecs < 10 && this.state.tokenExpirySecs > 0 && !this.state.tokenExpiryCheck && this.state.tokenExpirySecs.length == 1)){
          let tokenExpirySecs = this.state.tokenExpirySecs;
          tokenExpirySecs = ('0' + tokenExpirySecs).slice(-2);
          this.setState({tokenExpirySecs},()=>{
            this.handleTimeErrorCheck();
          })
        }
        else if(this.state.tokenExpirySecs.length > 2 && parseInt(this.state.tokenExpirySecs) == 0 && !this.state.tokenExpiryCheck){
          this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
            this.handleTimeErrorCheck();
          })
        }
        else if(this.state.tokenExpirySecs.length > 2 && parseInt(this.state.tokenExpirySecs) > 9 && !this.state.tokenExpiryCheck){
          let tokenExpirySecs = ''+parseInt(this.state.tokenExpirySecs);
          this.setState({tokenExpirySecs},()=>{
            this.handleTimeErrorCheck();
          })
        }
        else if(this.state.tokenExpirySecs.length > 2 && parseInt(this.state.tokenExpirySecs) > 0 && parseInt(this.state.tokenExpirySecs) < 9 && !this.state.tokenExpiryCheck){
          let tokenExpirySecs = '0'+parseInt(this.state.tokenExpirySecs);
          this.setState({tokenExpirySecs},()=>{
            this.handleTimeErrorCheck();
          })
        }
        else {
          this.handleTimeErrorCheck();
        }
      break;
    }
  }

  handleTimeErrorCheck = () =>{
    let regex = /^[0-9]+$/i;
    if(this.state.tokenExpiryHours.length == 0 || this.state.tokenExpiryMins.length == 0 || this.state.tokenExpirySecs.length == 0){
      this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
        this.handleSaveEnable();
        
      })
    }
    else if(regex.test(this.state.tokenExpiryHours) == false || regex.test(this.state.tokenExpiryMins) == false || regex.test(this.state.tokenExpirySecs) == false){
      this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
        this.handleSaveEnable();
        
      })
    }
    else if((this.state.tokenExpiryHours == 0 && this.state.tokenExpiryHours.length > 0) || (this.state.tokenExpiryHours < 10 && this.state.tokenExpiryHours > 0 && !this.state.tokenExpiryCheck && this.state.tokenExpiryHours.length == 1)){
      let tokenExpiryHours = this.state.tokenExpiryHours;
      tokenExpiryHours = ('0' + tokenExpiryHours).slice(-2);
      this.setState({tokenExpiryHours},()=>{
        this.handleSaveEnable();
        
      })
    }
    else if(this.state.tokenExpiryHours.length > 2 && parseInt(this.state.tokenExpiryHours) == 0 && !this.state.tokenExpiryCheck){
      this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
        this.handleSaveEnable();
        
      })
    }
    else if(this.state.tokenExpiryHours.length > 2 && parseInt(this.state.tokenExpiryHours) > 9 && !this.state.tokenExpiryCheck){
      let tokenExpiryHours = ''+parseInt(this.state.tokenExpiryHours);
      this.setState({tokenExpiryHours:tokenExpiryHours},()=>{
        this.handleSaveEnable();
        
      })
    }
    else if(this.state.tokenExpiryHours.length > 2 && parseInt(this.state.tokenExpiryHours) < 9 && parseInt(this.state.tokenExpiryHours) > 0 && !this.state.tokenExpiryCheck){
      let tokenExpiryHours = '0'+parseInt(this.state.tokenExpiryHours);
      this.setState({tokenExpiryHours:tokenExpiryHours},()=>{
        this.handleSaveEnable();
        
      })
    }
    else if((this.state.tokenExpiryMins == 0 && this.state.tokenExpiryMins.length > 0) || (this.state.tokenExpiryMins < 10 && this.state.tokenExpiryMins > 0 && !this.state.tokenExpiryCheck && this.state.tokenExpiryMins.length == 1)){
      let tokenExpiryMins = this.state.tokenExpiryMins;
      tokenExpiryMins = ('0' + tokenExpiryMins).slice(-2);
      this.setState({tokenExpiryMins},()=>{
        this.handleSaveEnable();
        
      })
    }
    else if(this.state.tokenExpiryMins.length > 2 && parseInt(this.state.tokenExpiryMins) == 0 && !this.state.tokenExpiryCheck){
      this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
        this.handleSaveEnable();
        
      })
    }
    else if(this.state.tokenExpiryMins.length > 2 && parseInt(this.state.tokenExpiryMins) > 9 && !this.state.tokenExpiryCheck){
      let tokenExpiryMins = ''+parseInt(this.state.tokenExpiryMins);
      this.setState({tokenExpiryMins},()=>{
        this.handleSaveEnable();
        
      })
    }
    else if(this.state.tokenExpiryMins.length > 2 && parseInt(this.state.tokenExpiryMins) > 0 && parseInt(this.state.tokenExpiryMins) < 9 && !this.state.tokenExpiryCheck){
      let tokenExpiryMins = '0'+parseInt(this.state.tokenExpiryMins);
      this.setState({tokenExpiryMins},()=>{
        this.handleSaveEnable();
        
      })
    }
    else if((this.state.tokenExpirySecs == 0 && this.state.tokenExpirySecs.length > 0) || (this.state.tokenExpirySecs < 10 && this.state.tokenExpirySecs > 0 && !this.state.tokenExpiryCheck && this.state.tokenExpirySecs.length == 1)){
      let tokenExpirySecs = this.state.tokenExpirySecs;
      tokenExpirySecs = ('0' + tokenExpirySecs).slice(-2);
      this.setState({tokenExpirySecs},()=>{
        this.handleSaveEnable();
        
      })
    }
    else if(this.state.tokenExpirySecs.length > 2 && parseInt(this.state.tokenExpirySecs) == 0 && !this.state.tokenExpiryCheck){
      this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
        this.handleSaveEnable();
        
      })
    }
    else if(this.state.tokenExpirySecs.length > 2 && parseInt(this.state.tokenExpirySecs) > 9 && !this.state.tokenExpiryCheck){
      let tokenExpirySecs = ''+parseInt(this.state.tokenExpirySecs);
      this.setState({tokenExpirySecs},()=>{
        this.handleSaveEnable();
        
      })
    }
    else if(this.state.tokenExpirySecs.length > 2 && parseInt(this.state.tokenExpirySecs) > 0 && parseInt(this.state.tokenExpirySecs) < 9 && !this.state.tokenExpiryCheck){
      let tokenExpirySecs = '0'+parseInt(this.state.tokenExpirySecs);
      this.setState({tokenExpirySecs},()=>{
        this.handleSaveEnable();
        
      })
    }
    else {
      this.handleSaveEnable();
      
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={getMuiTheme}>
        {
          this.state.serverError ? <EmptyListComponent text={this.state.serverErrMessage} fromPage="Errors" /> :
            [
              this.state.loading ?
                <Loader action={this.state.loaderMessage} />
                :
                <div>
                  <Grid container spacing={24}>
                    <Grid item xs={12} style={{ marginBottom: 20, marginTop: 20 }}>
                      <Breadcrumps links={this.state.breadcrumps} />
                      <p className="bank-profile global-font" style={{ color: `#19ace3` }}>Token/Transaction Expiry (Edit)</p>
                    </Grid>
                  </Grid>
                  <TabContainer>
                    <div className={classes.root}>
                      <Grid container spacing={24} className='global-font'>
                        <Grid item xs={12} className='grid-no-bottom-padding'>
                          <p><b>Token/Transaction Expiry</b></p>
                        </Grid>
                        <Grid item xs={12} className='grid-content-top-padding'>
                          <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Service Provider Code
                            </Typography>
                          <span className="drawee-profile-view" >
                            {this.state.serviceProvider}
                          </span>
                        </Grid>
                      </Grid>
                      <Grid container spacing={24} className='global-font'>
                        <Grid item xs={12} className='grid-no-bottom-padding'>
                          <p><b>Product</b></p>
                        </Grid>
                        <Grid item xs={4} className='grid-content-top-padding'>
                          <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Product Type
                            </Typography>
                          <span className="drawee-profile-view" >
                            {this.state.productType}
                          </span>
                        </Grid>
                        <Grid item xs={4} className='grid-content-top-padding'>
                          <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Sub Product Type
                            </Typography>
                          <span className="drawee-profile-view" >
                            {this.state.subProductType}
                          </span>
                        </Grid>
                        <Grid item xs={4} className='grid-content-top-padding'>
                          <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Service Type
                            </Typography>
                          <span className="drawee-profile-view" >
                            {this.state.serviceType}
                          </span>
                        </Grid>
                      </Grid>
                      <Grid container spacing={24} className='global-font'>
                        <Grid item xs={12} className='grid-no-bottom-padding'>
                          <p><b>Transaction Type</b></p>
                        </Grid>
                        <Grid item xs={4} className='grid-content-top-padding'>
                          <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Transaction Type
                            </Typography>
                          <span className="drawee-profile-view" >
                            {this.state.transactionType}
                          </span>
                        </Grid>
                      </Grid>
                      <Grid container spacing={24} className='global-font'>
                        <Grid item xs={12} className='grid-no-bottom-padding'>
                          <p><b>Set Expiry Time for</b></p>
                        </Grid>
                        <Grid item xs={4} className='grid-content-top-padding'>
                          <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Set Expiry Time for
                              </Typography>
                          <span className="drawee-profile-view" >
                            {this.state.setExpiryTimeFor}
                          </span>
                        </Grid>
                      </Grid>
                      <Grid container spacing={24} className='global-font'>
                        <Grid item xs={12} className='grid-no-bottom-padding'>
                          <p><b>Transaction Status</b></p>
                        </Grid>
                        <Grid item xs={4} className='grid-content-top-padding'>
                          <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Transaction Status
                            </Typography>
                          <span className="drawee-profile-view" >
                            {this.state.transactionStatus}
                          </span>
                        </Grid>
                        <Grid item xs={2} className='grid-no-bottom-padding grid-error'>
                          <div style={{ display: 'flex' }}>
                                  <Input autocomplete="off" inputStyle={{width:"37px"}} style={{width:"37px"}} id='tokenExpiryHrs' value={this.state.tokenExpiryHours} placeholder="hh" regex={/^[0-9]+$/i} label="hh" type="numeric" isRequired onChange={(e, value) => this.handleTextfieldChange(e,value)} onError={e => this.handleTokenExpiryHoursError(e)} onBlur={(e) => this.handleTimeBlur(e,"tokenExpiryHrs")}/>
                                  <p style={{paddingTop:6,paddingRight:6}}>:</p>
                                  <Input autocomplete="off" style={{width:"37px"}}  id='tokenExpiryMins' value={this.state.tokenExpiryMins} placeholder="mm" regex={/^[0-9]+$/i} label="mm" type="numeric" max={60} isRequired onChange={(e, value) => this.handleTextfieldChange(e,value)} onError={e => this.handleTokenExpiryMinsError(e)} onBlur={(e) => this.handleTimeBlur(e,"tokenExpiryMins")}/>
                                  <p style={{paddingTop:6,paddingRight:6}}>:</p>
                                  <Input autocomplete="off" style={{width:"37px"}}  id='tokenExpirySecs' value={this.state.tokenExpirySecs} placeholder="ss" regex={/^[0-9]+$/i} label="ss" type="numeric" max={60} isRequired onChange={(e, value) => this.handleTextfieldChange(e,value)} onError={e => this.handleTokenExpirySecsError(e)} onBlur={(e) => this.handleTimeBlur(e,"tokenExpirySecs")}/>
                          </div>
                          {this.state.tokenExpiryCheck ? <span style={{whiteSpace:"nowrap",bottom:"-7px" }} className="errorMessage-add">{this.state.tokenExpiryerrMsg} </span> : ''}
                        </Grid>
                      </Grid>
                      <Grid container spacing={24} className='global-font'>
                        <Grid item xs={12} className='grid-no-bottom-padding'>
                          <p><b>Replicate Rule</b></p>
                        </Grid>
                        <Grid item xs={6}>
                          <p className="toggle-alignment"><strong>Replicate Rule to Self Agent Branches</strong>: No </p>
                          <div className="toggle-alignment">
                            <Toggle isChecked={this.state.replicateToSelfAgent} id={'replicateToSelfAgent'} isEnabled={true} onChange={this.handleTextfieldChange} />
                          </div>
                          <p className="toggle-alignment">Yes</p>
                        </Grid>
                        {
                          this.state.replicateToSelfAgent ?
                            <Grid item xs={6}>
                              <MultiSelectTextField disabled={this.state.agentBranchesDisabled} value={this.state.custTypeCountryArr} label='Agent Branches' type='agentbranches' suggestionFields={this.state.agentBranchesList} placeholder={'Agent Branches'} MultiSelectText='Agent Branches' getAutoSelectValue={this.handleChangeCustAgentBranch} getViewValues={this.handleViewCustAgentBranchValues} />
                            </Grid> : null
                        }
                        <Grid item xs={12}>
                          <p className="toggle-alignment"><strong>Replicate Rule to Other Agent and Agent Branches</strong>: No </p>
                          <div className="toggle-alignment">
                            <Toggle isChecked={this.state.replicateToOtherAgent} id={'replicateToOtherAgent'} isEnabled={true} onChange={this.handleTextfieldChange} />
                          </div>
                          <p className="toggle-alignment">Yes</p>
                        </Grid>
                        <Grid item xs={12}>
                          {
                            this.state.replicateToOtherAgent ?
                              [
                                this.state.replicateAgentsData.map((obj, index) => {
                                  return (
                                    <Grid container spacing={24} className='global-font grid-error'>
                                      <Grid item xs={5}>
                                        <Selectable
                                          id={'agent' + index}
                                          label="Agent"
                                          isRequired
                                          searchable={true}
                                          isClearable={true}
                                          value={obj.agentProfile.value}
                                          options={this.state.agentsList}
                                          noResultsText="No Agents List Found"
                                          searchBy={'any'}
                                          placeholder={'Agent'}
                                          onChange={(e) => this.handleReplicaAgentChange(e, index)}
                                          onValueClick={(e) => this.handleReplicaAgentValueClick(e, index)}
                                          onBlur={(e) => this.handleReplicaAgentBlur(e, index)}
                                        />
                                        {obj.agentProfileCheck ? <span className="errorMessage-add">{obj.agentProfileerrMsg} </span> : ''}
                                      </Grid>
                                      <Grid item xs={5}>
                                        <MultiSelectTextField disabled={obj.agentBranchesDisabled} value={obj.agentBranches} label='Agent Branches' type={'agentbranches' + index} suggestionFields={obj.agentBranchesList} placeholder={'Agent Branches'} MultiSelectText='Agent Branches' getAutoSelectValue={this.handleChangeAgentBranches} getViewValues={this.handleViewAgentBranches} />
                                        {obj.agentBranchesCheck ? <span className="errorMessage">{obj.agentBranchesCheckerrMsg} </span> : ''}
                                      </Grid>
                                      <Grid item xs={2} alignItems="flex-end">
                                        {
                                          (index == this.state.replicateAgentsData.length - 1) ?
                                            <FloatButton
                                              id="floatButton"
                                              icon="plus"
                                              iconStyle={{ fontSize: 20 }}
                                              isEnabled={((Object.keys(obj.agentProfile).length == 0) || (obj.agentProfileCheck == true) || (obj.agentBranchesCheck == true)) ? false : true}
                                              onClick={(e) => this.handleAddAgentRule(index)}
                                              style={{ "margin-right": "10px", height: 32, width: 32 }}
                                            />
                                            :
                                            <FloatButton icon="delete" iconStyle={{ fontSize: 20 }} style={{ "margin-right": "10px", height: 32, width: 32, backgroundColor: '#c03018' }} onClick={(e) => this.handleDeleteAgentRule(index)} />
                                        }
                                      </Grid>
                                    </Grid>
                                  )
                                })
                              ]
                              : null
                          }
                        </Grid>
                      </Grid>
                      <Grid container spacing={24} className='global-font'>
                        <Grid item xs={4}>
                          <p className="toggle-alignment"><b>Status :</b> Disable </p>
                          <div className="toggle-alignment">
                            <Toggle isChecked={this.state.status} id={'status'} isEnabled={true} onChange={this.handleTextfieldChange} />
                          </div>
                          <p className="toggle-alignment">Enable</p>
                        </Grid>
                      </Grid>
                      <Grid container spacing={24} direction="row" justify="flex-end" alignItems="flex-end">
                        <Grid item xs={4}>
                          <Grid container spacing={24} direction="row" justify="flex-end" alignItems="flex-end">
                            <TextButton className="global-font save-clear" id="disabledTextButton" umSize="small" onClick={this.handleData} isEnabled={this.state.saveDisabled}>Save</TextButton>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                    {
                      this.state.confirmDelete ? <ModalBox isOpen={this.state.confirmDelete} fromAction={this.state.fromAction} actionType="Yes" message={(this.state.modalMessage)} modalAction={this.handleModalResponse} /> : null
                    }

                    {
                      this.state.snackbar ?
                        <Notifications
                          id="timerSuccess"
                          umStyle={this.state.notificationType}
                          placement="bottom-right"
                          children={this.state.snackbarMsg}
                          delayShow={SHOW_NOTIFICATION}

                          delayHide={HIDE_NOTIFICATION}

                        />
                        : null


                    }

                    {
                      this.state.shownogeneralrules ? <ErrorModalBox isOpen={this.state.shownogeneralrules} actionType="OK" message={this.state.apiErrMsg} modalAction={this.handleStatusResponse} /> : null
                    }
                  </TabContainer>
                </div>
            ]
        }
      </MuiThemeProvider>
    );
  }
}

EditTokenExpiry.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditTokenExpiry);