import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import '../../vendor/common.css';
import '../../theme/theme';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { TextButton, FloatButton, Toggle, Radio, Selectable, Notifications, Input } from 'finablr-ui';
import ErrorModalBox from '../../component/ErrorModalbox';
import MultiSelectTextField from '../../container/MultiSelectTextField';
import * as BranchApiService from '../ApiService';
import * as AgentApiService from '../../AgentProfiles/ApiService';
import * as Exceptionhandler from './../../ExceptionHandling';
import * as ApiService from './ApiService';
import ModalBox from './../../component/Modalbox';
import Loader from './../../component/Loader';
import { SHOW_NOTIFICATION } from '../../constants/action-types';
import { HIDE_NOTIFICATION } from '../../constants/action-types';
import * as config from '../../config/config';
import getMuiTheme from "../../theme/theme";
import { MuiThemeProvider } from '@material-ui/core/styles';
import { isNull } from 'util';



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
    <Typography component="div">
      {props.children}
    </Typography>
  );
}

class RoundOffRate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isRoundOff: false,
      isCreate: false,
      isCutOff: false,
      loading: true,
      loaderMessage: '',
      value: '',
      valueDisabled: false,
      valueCheck: false,
      valueerrMsg: '',
      isBaseToForeign: false,
      isForeignToBase: false,
      serverError: false,
      serverErrMessage: '',
      status: true,
      saveDisabled: false,
      isClearEnabled: false,
      confirmDelete: false,
      fromAction: '',
      snackbarMsg: '',
      snackbar: false,
      shownogeneralrules: false,
      apiErrMsg: '',
      custTypeCountryArr: [],
      agentBranchesDisabled: true,
      agentBranchesList: [],
      replicateToSelfAgent: false,
      replicateToOtherAgent: false,
      agentsList: [],
      notificationType: 'success',
      replicateAgentsData: [{ agentProfile: {}, agentBranches: [], agentProfileCheck: false, agentProfileerrMsg: '', agentBranchesCheck: false, agentBrancheserrMsg: '', agentBranchesDisabled: true, agentBranchesList: [] }],
      newPushObj: { agentProfile: {}, agentBranches: [], agentProfileCheck: false, agentProfileerrMsg: '', agentBranchesCheck: false, agentBrancheserrMsg: '', agentBranchesDisabled: true, agentBranchesList: [] }
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.setState({ loaderMessage: 'Retrieving Data' }, () => {
      this.fetchRoundOffDetails(this.props.match.params.agentid, this.props.match.params.agentbranchId);
    })
  }

  fetchRoundOffDetails = (agentid, agentbranchid) => {
    if(sessionStorage.getItem('token') == undefined){
      window.location.replace(config.PAAS_LOGIN_URL);
      return (<h1>401 - Unauthorized Request</h1>)
    }
    else{
      let headers = {
        Authorization:sessionStorage.getItem('token')
      }
      ApiService.FetchRateSettings(agentid, agentbranchid, headers)
      .then((response) => {
        console.log(response);
        if (response.data.hasOwnProperty('message')) {
          this.setState({ loading: false, isCreate: true });
        }
        else {
          this.setState({
            isRoundOff: (response.data.roundOffCutOffRate == "ROUND_OFF") ? true : false,
            isCutOff: (response.data.roundOffCutOffRate == "CUT_OFF") ? true : false,
            isBaseToForeign: (response.data.rateDisplayMechanism == "BASE_CURRENCY_TO_FOREIGN_CURRENCY") ? true : false,
            isForeignToBase: (response.data.rateDisplayMechanism == "FOREIGN_CURRENCY_TO_BASE_CURRENCY") ? true : false,
            status: (response.data.status == 'ENABLED') ? true : false,
            value: response.data.value,
            isCreate: false,
            loading: false
          }, () => {
            this.handleSaveEnable();
            this.handleClearEnable();
          })
        }
      }).catch(error => {
        if(Exceptionhandler.throwErrorType(error).status == 401){
          window.location.replace(config.PAAS_LOGIN_URL)
          return (<h1>401 - Unauthorized Request</h1>)
        }
        else if (Exceptionhandler.throwErrorType(error).status == 500 || Exceptionhandler.throwErrorType(error).status == 503 || Exceptionhandler.throwErrorType(error).status == 404) {
          this.setState({ loading: false, serverError: true, serverStatus: Exceptionhandler.throwErrorType(error).status, serverErrMessage: Exceptionhandler.throwErrorType(error).message })
        }
        else {
          this.setState({ loading: false, serverError: false, shownogeneralrules: true, apiErrMsg: error.response.data.error, actionType: 'OK' })
        }
      });
    }
  }

  handleExpiryChange = (e) => {
    this.props.handleCompValueChange(true);
    switch (e.target.id) {
      case 'RoundOff':
        this.setState({ isRoundOff: true, isCutOff: false }, () => {
          this.handleSaveEnable();
          this.handleClearEnable();
        })
        break;
      case 'CutOff':
        this.setState({ isCutOff: true, isRoundOff: false }, () => {
          this.handleSaveEnable();
          this.handleClearEnable();
        })
        break;
      case 'BaseToForeign':
        this.setState({ isBaseToForeign: true, isForeignToBase: false }, () => {
          this.handleSaveEnable();
          this.handleClearEnable();
        })
        break;
      case 'ForeignToBase':
        this.setState({ isForeignToBase: true, isBaseToForeign: false }, () => {
          this.handleSaveEnable();
          this.handleClearEnable();
        })
        break;
    }
  }

  handleValueError = (e) => {
    console.log(e);
    switch (e) {
      case 'regex':
      if(this.state.value == isNull){
        this.setState({valueCheck: false, valueerrMsg: '' }, () => {
          this.handleSaveEnable();
          this.handleClearEnable();
        })
      }
      else{
        this.setState({ valueCheck: true, valueerrMsg: 'Decimals are Not Allowed, Value should be Numeric Only' }, () => {
          this.handleSaveEnable();
          this.handleClearEnable();
        })
      }
        break;
      case 'max':
        this.setState({
          valueCheck: true,
          valueerrMsg: 'Value can not be Greater than 8'
        }, () => {
          this.handleSaveEnable();
          this.handleClearEnable();
        })
        break;
      case 'required':
        this.setState({
          valueCheck: true,
          valueerrMsg: 'Value can not be empty'
        }, () => {
          this.handleSaveEnable();
          this.handleClearEnable();
        })
        break;
    }
  }

  handleReplicaAgentChange = (e, index) => {
    // let index = index;
    console.log(e, index);
    this.props.handleCompValueChange(true);
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
          this.handleClearEnable();
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
                    this.handleClearEnable();
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
                      this.handleClearEnable();
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
          this.handleClearEnable();
        })
      }
    })
  }

  handleReplicaAgentValueClick = (e, indexValue) => {
    // let index = index;
    this.props.handleCompValueChange(true);
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
          replicateAgentsData[indexValue].agentProfile = checkExistingRule;
          this.setState({ replicateAgentsData }, () => {
            this.fetchSelectedAgentBranches(checkExistingRule.id, indexValue);
            this.handleSaveEnable();
            this.handleClearEnable();
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
              this.handleClearEnable();
            });
          })
        }
      }
    })
  }

  handleReplicaAgentBlur = (e, index) => {
    console.log(e, index);
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
        this.handleClearEnable();
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
        this.handleClearEnable();
      })
    }
    else {
      replicateAgentsData[index].agentProfileCheck = false;
      replicateAgentsData[index].agentProfileerrMsg = '';
      this.setState({ replicateAgentsData }, () => {
        this.handleSaveEnable();
        this.handleClearEnable();
      })
    }
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
        BranchApiService.getAllAgentBranchProfiles(params, agentId,headers)
          .then((response) => {
            console.log(response);
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
            console.log(response);
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
                this.setState({ loading: false, snackbar: true, notificationType: 'warning', snackbarMsg: 'no agent records found' })
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
            console.log(response);
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
                  //console.log(this.state.agentBranchesList);
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
    this.props.handleCompValueChange(true);
    let index = parseInt(id.replace('agentbranches', ''));
    let replicateAgentsData = this.state.replicateAgentsData;
    replicateAgentsData[index].agentBranches = data;
    this.setState({ replicateAgentsData }, () => {
      this.handleSaveEnable();
      this.handleClearEnable();
    });
  }

  handleViewAgentBranches = (data, id) => {
    this.props.handleCompValueChange(true);
    let index = parseInt(id.replace('agentbranches', ''));
    let replicateAgentsData = this.state.replicateAgentsData;
    replicateAgentsData[index].agentBranches = data;
    this.setState({ replicateAgentsData }, () => {
      this.handleSaveEnable();
      this.handleClearEnable();
    });
  }

  handleAddAgentRule = (indexValue) => {
    this.props.handleCompValueChange(true);
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
            this.handleClearEnable();
          });
        }
        else {
          this.setState({ snackbar: true, notificationType: 'warning', snackbarMsg: `Agent rules are already added in row ${existingIndex + 1}` })
        }
      }
    })
  }

  handleDeleteAgentRule = (index) => {
    this.props.handleCompValueChange(true);
    let replicateAgentsData = this.state.replicateAgentsData;
    replicateAgentsData.splice(index, 1);
    this.setState({ replicateAgentsData }, () => {
      this.handleSaveEnable();
      this.handleClearEnable();
    });
  }

  handleSaveEnable = () => {
    if (this.state.isRoundOff == false && this.state.isCutOff == false) {
      this.setState({ saveDisabled: false })
    }
    else if (this.state.isBaseToForeign == false && this.state.isForeignToBase == false) {
      this.setState({ saveDisabled: false })
    }
    else if (this.state.valueCheck) {
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

  handleClearEnable = () => {
    if((this.state.isRoundOff == true || this.state.isCutOff == true) || (this.state.isBaseToForeign == true || this.state.isForeignToBase == true) || (this.state.valueCheck.length > 0) || this.state.replicateToSelfAgent == true || this.state.replicateToOtherAgent == true) {
      this.setState({ isClearEnabled: true })
    }
    // if ((Object.keys(this.state.serviceProviderData).length > 0)
    //   || (Object.keys(this.state.subProductTypeData).length > 0)
    //   || ((this.state.serviceTypeList.length > 0) && ((Object.keys(this.state.serviceTypeData).length > 0))) 
    //   || (Object.keys(this.state.transactionTypeData).length > 0) 
    //   || (payinlimitLen > 0)
    //   || (this.state.currencycodeArr.length > 0))
    //  {
    //   this.setState({
    //     clearDisabled: true
    //   })
    // }
    else {
      this.setState({
        isClearEnabled: false
      })
    }
  }

  handleTextfieldChange = (e, value) => {
    console.log(e, value);
    this.props.handleCompValueChange(true);
    let pattern = /^[0-9]+$/i;
    switch (e.target.id) {
      case 'replicateToSelfAgent':
        this.setState({ replicateToSelfAgent: value }, () => {
          if (this.state.replicateToSelfAgent == true) {
            this.fetchAgentBranches(this.props.match.params.agentid);
          }
          else {
            this.setState({ custTypeCountryArr: [] })
          }
        })
        break;
      case 'replicateToOtherAgent':
        this.setState({ replicateToOtherAgent: value }, () => {
          if (this.state.replicateToOtherAgent == true) {
            this.fetchAgentProfiles();
          }
          else {
            let replicateAgentsData = [];
            replicateAgentsData.push({ agentProfile: {}, agentBranches: [], agentProfileCheck: false, agentProfileerrMsg: '', agentBranchesCheck: false, agentBrancheserrMsg: '', agentBranchesDisabled: true, agentBranchesList: [] })
            this.setState({ replicateAgentsData });
          }
          this.handleSaveEnable();
          this.handleClearEnable();
        })
        break;
      case 'status':
        this.setState({ status: value });
        break;
      case 'value':
        this.setState({ value: value, valueCheck: false }, () => {
          if (this.state.value == undefined) {
            this.setState({ valueCheck: true, valueerrMsg: 'Value can not be empty' }, () => {
              this.handleSaveEnable();
              this.handleClearEnable();
            })
          }
          else if (this.state.value.length == 0) {
            this.setState({ valueCheck: true, valueerrMsg: 'Value can not be empty' }, () => {
              this.handleSaveEnable();
              this.handleClearEnable();
            })
          }
          else if (this.state.value > 8) {
            this.setState({ valueCheck: true, valueerrMsg: 'Value can not be Greater than 8' }, () => {
              this.handleSaveEnable();
              this.handleClearEnable();
            })
          }
          else if (pattern.test(this.state.value) == false) {
            this.setState({ valueCheck: true, valueerrMsg: 'Decimals are Not Allowed, Value should be Numeric Only' }, () => {
              this.handleSaveEnable();
              this.handleClearEnable();
            })
          }
          else {
            this.setState({ valueCheck: false, valueerrMsg: '' }, () => {
              this.handleSaveEnable();
              this.handleClearEnable();
            })
          }
        })
        break;
    }
  }

  handleChangeCustAgentBranch = (data) => {
    this.props.handleCompValueChange(true);
    this.setState({ custTypeCountryArr: data }, () => {
      this.handleSaveEnable();
      this.handleClearEnable();
    })
  }

  handleViewCustAgentBranchValues = (data) => {
    this.props.handleCompValueChange(true);
    this.setState({ custTypeCountryArr: data }, () => {
      this.handleSaveEnable();
      this.handleClearEnable();
    })
  }

  handleData = () => {
    let data = {};
    if (this.state.isRoundOff) {
      data.roundOffCutOffRate = "ROUND_OFF";
    }
    else {
      data.roundOffCutOffRate = "CUT_OFF";
    }
    if (this.state.isBaseToForeign) {
      data.rateDisplayMechanism = "BASE_CURRENCY_TO_FOREIGN_CURRENCY";
    }
    else {
      data.rateDisplayMechanism = "FOREIGN_CURRENCY_TO_BASE_CURRENCY";
    }
    data.value = this.state.value;
    data.status = this.state.status ? 'ENABLED' : 'DISABLED';
    if (this.state.replicateToSelfAgent == true || this.state.replicateToOtherAgent == true) {
      data.replicatedAgentBranches = [];
    }

    if (this.state.replicateToSelfAgent == true) {
      data.replicatedAgentBranches = [];
      let selfAgent = {};
      selfAgent.agentId = parseInt(this.props.match.params.agentid);
      selfAgent.agentBranchIds = [];
      if (this.state.custTypeCountryArr.length > 0) {
        this.state.custTypeCountryArr.map((obj) => {
          selfAgent.agentBranchIds.push(obj.id);
        })
        data.replicatedAgentBranches.push(selfAgent);
      }
    }
    if (this.state.replicateToOtherAgent == true) {
      if (this.state.replicateAgentsData.length > 0) {
        this.state.replicateAgentsData.map((obj) => {
          let selfAgent = {};
          selfAgent.agentId = obj.agentProfile.id;
          selfAgent.agentBranchIds = [];
          if (obj.agentBranches.length > 0) {
            obj.agentBranches.map((branch) => {
              selfAgent.agentBranchIds.push(branch.id);
            })
          }
          data.replicatedAgentBranches.push(selfAgent);
        })
      }
    }
    this.createRateSettings(data);
  }

  createRateSettings = (data) => {
    console.log(data);
    if(sessionStorage.getItem('token') == undefined){
      window.location.replace(config.PAAS_LOGIN_URL)
      return (<h1>401 - Unauthorized Request</h1>)
    }
    else{
      let headers = {
        Authorization:sessionStorage.getItem('token')
      }
      this.setState({ snackbar: false, loading: true }, () => {
        ApiService.CreateRateSettings(data, this.props.match.params.agentid, this.props.match.params.agentbranchId,headers)
          .then((response) => {
            console.log(response);
            this.props.handleCompValueChange(false);
            let snackbarMsg = '';
            if (this.state.isCreate) {
              snackbarMsg = (this.state.replicateToSelfAgent || this.state.replicateToOtherAgent) ?
                'The rule has been replicated to the agents and branches and will be available under them.'
                : 'Roundoff/Cutoff rule created successfully';
            }
            else {
              snackbarMsg = (this.state.replicateToSelfAgent || this.state.replicateToOtherAgent) ?
                'The rule has been replicated to the agents and branches and will be available under them.'
                : 'Roundoff/Cutoff rule  Updated successfully';
            }
            this.setState({ loading: false, snackbar: true, notificationType: 'success', snackbarMsg, isCreate: false }, () => {
              setTimeout(() => {
                this.props.history.push(`/agentprofiles/${this.props.match.params.agentid}/branches/${this.props.match.params.agentbranchId}?tabId=${0}&pageelements=${5}`)
              }, 1000)
            })
          }).catch(error => {
            if(Exceptionhandler.throwErrorType(error).status == 401){
              window.location.replace(config.PAAS_LOGIN_URL)
              return (<h1>401 - Unauthorized Request</h1>)
            }
            else if (Exceptionhandler.throwErrorType(error).status == 500 || Exceptionhandler.throwErrorType(error).status == 503 || Exceptionhandler.throwErrorType(error).status == 404) {
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

  handleStatusResponse = (data) => {
    if (data == true) {
      this.setState({ shownogeneralrules: false }, () => {
      });
    }
  }

  handleClear = () => {
    console.log(this.state.value);
    this.setState({
      confirmDelete: false
    }, () => {
      let valueLength = (this.state.value == undefined || this.state.value == isNull) ? 0 : this.state.value.length;
      if ((valueLength > 0) || (this.state.isBaseToForeign) || (this.state.isForeignToBase) || (this.state.isRoundOff) || (this.state.isCutOff) || (this.state.replicateToSelfAgent) || (this.state.replicateToOtherAgent)) {
        this.setState({ confirmDelete: true, fromAction: 'clear', modalMessage: 'This will clear all data. Are you sure you want to continue?' })
      }
    }
    )
  }

  handleModalResponse = (data, from) => {
    if (data == true && from == 'clear') {
      this.props.handleCompValueChange(false);
      this.setState({
        confirmDelete: false,
        isBaseToForeign: false,
        isCutOff: false,
        isRoundOff: false,
        isForeignToBase: false,
        value: isNull,
        valueCheck: false,
        replicateToSelfAgent: false,
        replicateToOtherAgent: false,
        custTypeCountryArr: [],
        status: true,
        snackbar: false,
        saveDisabled: false,
        fromAction: '',
        shownogeneralrules: false,
        apiErrMsg: '',
      }, () => {
        let replicateAgentsData = [];
        let obj = this.state.newPushObj;
        replicateAgentsData.push(Object.assign({}, obj));
        this.setState({ replicateAgentsData }, () => {
          this.handleClearEnable();
          this.handleSaveEnable();
        });
      })
    }
    else {
      this.setState({ confirmDelete: true }, () => {
        //this.props.modalAction(null,'Try Again closed');
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={getMuiTheme}>
      <TabContainer>
        {
          this.state.loading ?
            <Loader action={this.state.loaderMessage} />
            :
            <div className={classes.root} style={{ padding: "5px 24px 24px" }}>
              <Grid container spacing={24} className='global-font'>
                <Grid item xs={12} className='grid-no-bottom-padding'>
                  <p><b>Round Off/Cut Off Rate</b></p>
                </Grid>
                <Grid item xs={5} className='grid-no-top-padding'>
                  <Radio
                    isChecked={this.state.isRoundOff}
                    onChange={this.handleExpiryChange}
                    id="RoundOff"
                    value="isRoundOff"
                    umStyle="primary"
                    label="Round Off"
                    umLabelClass="label-class"
                  />
                  <Radio
                    isChecked={this.state.isCutOff}
                    onChange={this.handleExpiryChange}
                    id="CutOff"
                    value="isCutOff"
                    umStyle="primary"
                    label="Cut Off"
                    umLabelClass="label-class"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={24} className='global-font'>
                <Grid item xs={5} className='grid-no-top-padding grid-error'>
                  <Input id='value' autocomplete="off" isEnabled={(this.state.isCutOff || this.state.isRoundOff)} value={this.state.value} placeholder="value" regex={/^[0-9]+$/i} label="value" type="numeric" max={8} isRequired onChange={(e, value) => this.handleTextfieldChange(e, value)} onError={e => this.handleValueError(e)} />
                  {this.state.valueCheck ? <span className="errorMessage-add">{this.state.valueerrMsg} </span> : ''}
                </Grid>
              </Grid>
              <Grid container spacing={24} className='global-font'>
                <Grid item xs={12} className='grid-no-bottom-padding'>
                  <p><b>Rate Display Mechanism</b></p>
                </Grid>
                <Grid item xs={10} className='grid-no-top-padding'>
                  <Radio
                    isChecked={this.state.isBaseToForeign}
                    onChange={this.handleExpiryChange}
                    id="BaseToForeign"
                    value="isBaseToForeign"
                    umStyle="primary"
                    label="Base Currency To Foreign Currency"
                    umLabelClass="label-class"
                  />
                  <Radio
                    isChecked={this.state.isForeignToBase}
                    onChange={this.handleExpiryChange}
                    id="ForeignToBase"
                    value="isForeignToBase"
                    umStyle="primary"
                    label="Foreign Currency To Base Currency"
                    umLabelClass="label-class"
                  />
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
                                  isRequired
                                  label="Agent"
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
                                      isEnabled={((Object.keys(obj.agentProfile).length == 0) || (obj.agentProfileCheck == true) || (obj.agentBranchesCheck == true)) ? false : true}
                                      onClick={(e) => this.handleAddAgentRule(index)}
                                      iconStyle={{ fontSize: 20 }}
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
                    {
                      this.state.isCreate ? <TextButton className="global-font save-clear" id="defaultTextButton" umStyle="default" isEnabled={this.state.isClearEnabled} onClick={this.handleClear} style={{ marginRight: "10px" }}>Clear</TextButton>
                        : ''}
                    <TextButton className="global-font save-clear" id="disabledTextButton" umSize="small" onClick={this.handleData} isEnabled={this.state.saveDisabled}>Save</TextButton>
                  </Grid>
                </Grid>
              </Grid>
              {
                this.state.confirmDelete ? <ModalBox isOpen={this.state.confirmDelete} fromAction={this.state.fromAction} actionType="Yes" message={(this.state.modalMessage)} modalAction={this.handleModalResponse} /> : null
              }
              {
                this.state.shownogeneralrules ? <ErrorModalBox isOpen={this.state.shownogeneralrules} actionType="OK" message={this.state.apiErrMsg} modalAction={this.handleStatusResponse} /> : null
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

            </div>
        }
      </TabContainer>
      </MuiThemeProvider>
    )
  }
}

RoundOffRate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RoundOffRate);
