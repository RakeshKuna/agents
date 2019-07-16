import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import '../../vendor/common.css';
import '../../theme/theme';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Loader from './../../component/Loader';
import ModalBox from './../../component/Modalbox';
import {TextButton, FloatButton,Toggle,Selectable,CheckBox,Notifications } from 'finablr-ui';
import * as Exceptionhandler from './../../ExceptionHandling';
import ErrorModalBox from '../../component/ErrorModalbox';
import getMuiTheme from "../../theme/theme";
import { MuiThemeProvider } from '@material-ui/core/styles';
import EmptyListComponent from '../../component/EmptylistComponent';
import MultiSelectTextField from '../../container/MultiSelectTextField';
import * as BranchApiService from '../ApiService';
import * as AgentApiService from '../../AgentProfiles/ApiService';
import Breadcrumps from '../../component/Breadcrumps';
import * as ApiService from './ApiService';
import {SHOW_NOTIFICATION} from '../../constants/action-types';
import {HIDE_NOTIFICATION} from '../../constants/action-types';
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
     headingtitle:{
        fontFamily: 'Gotham-Rounded !important'
    },
    subtitleheader:{
        fontFamily: 'Gotham-Rounded !important',
        
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

const transactionTypeList = [{ id: 1, label: 'AGENT FAULT', value: 'AGENT_FAULT' }, { id: 2, label: 'SERVICE PROVIDER FAULT', value: 'SERVICE_PROVIDER_FAULT' }, { id: 3, label: 'CUSTOMER WISH', value: 'CUSTOMER_WISH' }]

class EditChargeRules extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.state = {
            breadcrumps: [],
            loading: true,
            loaderMessage: 'Retrieving Data',
            productTypeDisabled: true,
            productsList: [],
            productType: '',
            productTypeData: {},
            productTypeCheck: false,
            productTypeerrMsg: '',
            subProductsResponse: [],
            subProductsList: [],
            subProductType: '',
            subProductTypeData: {},
            subProductTypeCheck: false,
            subProductTypeerrMsg: '',
            subProductTypeDisasbled: true,
            serviceTypeList: [],
            serviceType: '',
            serviceTypeData: {},
            serviceTypeCheck: false,
            serviceTypeerrMsg: '',
            serviceTypeDisabled: false,
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
            custTypeCountryArr: [],
            agentBranchesDisabled: true,
            agentBranchesList: [],
            replicateToSelfAgent: false,
            replicateToOtherAgent: false,
            agentsList: [],
            replicateAgentsData: [{ agentProfile: {}, agentBranches: [], agentProfileCheck: false, agentProfileerrMsg: '', agentBranchesCheck: false, agentBrancheserrMsg: '', agentBranchesDisabled: true, agentBranchesList: [] }],
            newPushObj: { agentProfile: {}, agentBranches: [], agentProfileCheck: false, agentProfileerrMsg: '', agentBranchesCheck: false, agentBrancheserrMsg: '', agentBranchesDisabled: true, agentBranchesList: [] },
            notificationType:'success',
            chargeRulesProfile:{},
            commissionchecked: false,
            taxchecked: false,
            otherchangeschecked: false,
            cardchangeschecked: false,
            additionalchargeschecked: false
        };
    }

    componentDidMount() {
        this.fetchAgentBranchDetails();
        this.getChargeRules();
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
            .then((response) => {
                console.log(response)
                if (response.status == 200) {
                    let breadcrumpData = [{ link: '/agentprofiles', text: 'Agent Profiles' }, { link: '/agentprofiles/' + this.props.match.params.agentid + '/branches', text: response.data.agentName + ' (' + response.data.agentId + ')' }, { link: '/agentprofiles/' + this.props.match.params.agentid + '/branches/' + this.props.match.params.agentbranchId, text: response.data.branchDisplayName + ' (' + response.data.id + ')' }, { link: '#', text: this.props.match.params.chargerulesid }];
                    this.setState({ breadcrumps: breadcrumpData });
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
                    this.setState({ loading: false, serverError: false, shownogeneralrules: true, apiErrMsg: error.response.data.error, actionType: 'OK' })
                }
            });
        }
    }

    getChargeRules = () => {
        if(sessionStorage.getItem('token') == undefined){
            window.location.replace(config.PAAS_LOGIN_URL);
            return (<h1>401 - Unauthorized Request</h1>)
        }
        else{
            let headers = {
              Authorization:sessionStorage.getItem('token')
            }
            ApiService.getChargeRulesProfile(this.props.match.params.agentid, this.props.match.params.agentbranchId, this.props.match.params.chargerulesid,headers)
            .then((response) => {   
            if (response.status == 200) {
              console.log(response.data);
                this.setState({loaderMessage: '',
                chargeRulesProfile: response.data,
                status: (response.data.status == 'ENABLED') ? true : false,
                commissionchecked: response.data.chargesRuleSettings.commission,
                taxchecked: response.data.chargesRuleSettings.tax,
                otherchangeschecked: response.data.chargesRuleSettings.otherCharges,
                cardchangeschecked: response.data.chargesRuleSettings.cardCharges,
                additionalchargeschecked: response.data.chargesRuleSettings.additionalCharges,
                loading: false,
            }, () => {
                  this.handleSaveEnable();
                });
            }
            else {
                this.setState({ loading: false, loaderMessage: '', snackbar: true,notificationType:'warning', snackbarMessage: 'No Currency Codes Found.' });
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

    handleTextfieldChange = (e, value) => {
        let pattern = /^[0-9]+$/i;
        console.log(e, value);
        switch (e.target.id) {
            case 'Commission':
            this.setState({ commissionchecked: value }, ()=>{
                console.log(this.state.commissionchecked)
            });
            break;
            case 'tax':
            this.setState({ taxchecked: value },()=>{
                console.log(this.state.taxchecked)
            });
            break;
            case 'otherChanges':
            this.setState({ otherchangeschecked:  value },()=>{
                console.log(this.state.otherchangeschecked)
            });
            break;
            case 'cardchanges':
            this.setState({  cardchangeschecked: value },()=>{
                console.log(this.state.cardchangeschecked)
            });
            break;
            case 'additionalCharges':
            this.setState({ additionalchargeschecked:value },()=>{
                console.log(this.state.additionalchargeschecked)
            });
            break;
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
                        replicateAgentsData.push(this.state.newPushObj)
                        this.setState({ replicateAgentsData });
                    }
                    this.handleSaveEnable();
                })
                break;
            case 'status':
                this.setState({ status: value });
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
        let agentBranchesList=[];
        if(sessionStorage.getItem('token') == undefined){
            window.location.replace(config.PAAS_LOGIN_URL);
            return (<h1>401 - Unauthorized Request</h1>)
        }
        else{
            let headers = {
              Authorization:sessionStorage.getItem('token')
            }
            this.setState({loading:true,loaderMessage:'Retrieving Agent Branches'},()=>{
            BranchApiService.getAllAgentBranchProfiles(params,agentId,headers)
            .then((response)=>{
                // console.log(response);
                let agentBranchCount = response.data.data.length;
                if(response.status == 200){
                if(response.data.data.length > 0){
                response.data.data.map((obj)=>{
                    if(obj.id == this.props.match.params.agentbranchId){
                    agentBranchCount = agentBranchCount - 1;
                    return null;
                    }
                    else{
                    let agentBranch = {};
                    agentBranch.id = obj.id;
                    agentBranch.label = obj.branchName;
                    agentBranch.value = obj.branchDisplayName;
                    agentBranchesList.push(agentBranch);
                    }
                }) 
                this.setState({agentBranchesList,agentBranchesDisabled:(agentBranchCount > 0) ? false:true,snackbar:(agentBranchCount > 0) ? false:true,notificationType:'warning',snackbarMsg:'no agent branches records found',loading:false},()=>{
                    //console.log(this.state.agentBranchesList);
                }); 
                }
                else{
                    this.setState({serviceProviderDisabled:true,loading:false,snackbar:true,notificationType:'warning',snackbarMsg:'no agent branches records found'})
                }
                }
            }).catch(error=>{
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
            })
        }
    }
  
    fetchAgentProfiles = () => {
        let params = {};
        let agentsList = [];
        if(sessionStorage.getItem('token') == undefined){
            window.location.replace(config.PAAS_LOGIN_URL);
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
                        this.setState({ loading: false, snackbar: true, notificationType:'warning',snackbarMsg: 'no agent records found' })
                    }
                }
                }).catch(error => {
                    if(Exceptionhandler.throwErrorType(error).status == 401){
                        window.location.replace(config.PAAS_LOGIN_URL);
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
        // let index = index;
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
                    })
                }
                else {
                    this.setState({ snackbar: true, notificationType:'warning',snackbarMsg: `Agent rules are already added in row ${existingIndex + 1}` }, () => {
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
            window.location.replace(config.PAAS_LOGIN_URL);
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
                                this.setState({ replicateAgentsData, loading: false, snackbar: true, notificationType:'warning',snackbarMsg: 'no agent branches records found' })

                            }
                        }
                    }).catch(error => {
                        if(Exceptionhandler.throwErrorType(error).status == 401){
                            window.location.replace(config.PAAS_LOGIN_URL);
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
                    this.setState({ snackbar: true,notificationType:'warning', snackbarMsg: `Agent rules are already added in row ${existingIndex + 1}` })
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
      if (this.state.replicateToOtherAgent == true) {
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
        let chargesRuleSettings = {};
        chargesRuleSettings.additionalCharges = this.state.additionalchargeschecked;
        chargesRuleSettings.cardCharges = this.state.cardchangeschecked;
        chargesRuleSettings.commission = this.state.commissionchecked;
        chargesRuleSettings.otherCharges = this.state.otherchangeschecked;
        chargesRuleSettings.tax = this.state.taxchecked;
        data.chargesRuleSettings = chargesRuleSettings;
        if (this.state.serviceTypeDisabled == true) {
            data.serviceType = this.state.serviceTypeData.value;
        }      
        if(this.state.replicateToSelfAgent == true || this.state.replicateToOtherAgent == true){
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
        data.status = this.state.status ? 'ENABLED' : 'DISABLED';
        this.EditChargeRules(data);
        console.log(data);
    }

    EditChargeRules = (data) => {
        console.log(data);
        if(sessionStorage.getItem('token') == undefined){
            window.location.replace(config.PAAS_LOGIN_URL);
            return (<h1>401 - Unauthorized Request</h1>)
        }
        else{
            let headers = {
              Authorization:sessionStorage.getItem('token')
            }
            this.setState({loading:true,loaderMessage:'Posting Data'},()=>{
            ApiService.EditAllowedProducts(data,this.props.match.params.agentid,this.props.match.params.agentbranchId,this.props.match.params.chargerulesid,headers)
            .then((response)=>{
                console.log(response);
                let snackbarMsg = (this.state.replicateToSelfAgent || this.state.replicateToOtherAgent) ? 'The rule has been replicated to the agents and branches and will be available under them.' : 'Charge Rules  Updated successfully';
    
                this.setState({loading:false,snackbar:true,notificationType:'success',snackbarMsg},()=>{
                setTimeout(()=>{
                    this.props.history.push(`/agentprofiles/${this.props.match.params.agentid}/branches/${this.props.match.params.agentbranchId}?tabId=${3}`)
                },1600)
                })
            }).catch(error=>{
                if(Exceptionhandler.throwErrorType(error).status == 401){
                    window.location.replace(config.PAAS_LOGIN_URL);
                    return (<h1>401 - Unauthorized Request</h1>)
                }
                else if(Exceptionhandler.throwErrorType(error).status == 500 || Exceptionhandler.throwErrorType(error).status == 503 || Exceptionhandler.throwErrorType(error).status == 400 || Exceptionhandler.throwErrorType(error).status == 404){
                    this.setState({serverError:false,shownogeneralrules:false},()=>{
                        this.setState({loading:false,serverError:true,serverStatus:Exceptionhandler.throwErrorType(error).status,serverErrMessage:Exceptionhandler.throwErrorType(error).message})
                    })
                }
                else{
                    this.setState({serverError:false,shownogeneralrules:false},()=>{
                        this.setState({loading:false,serverError:false,shownogeneralrules:true,apiErrMsg:error.response.data.error,actionType:'OK'})
                    })
                }
            }); 
            }) 
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
                                <Breadcrumps links={this.state.breadcrumps} />
                                <p className="bank-profile global-font" style={{ marginTop: 25, marginBottom: 30, color: `#19ace3` }}>Charges Rule(Edit)</p>
                                <TabContainer>
                                    <div className={classes.root}>
                                        <Grid container spacing={24}>
                                            <Grid item xs={12} className='grid-no-bottom-padding'>
                                                <p  className={classes.subtitleheader}><b>Charges Rule</b></p>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                    Product Type
                                            </Typography>
                                                <span className="drawee-profile-view" >
                                                    {this.state.chargeRulesProfile.productType}
                                                </span>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                    Sub Product Type
                                             </Typography>
                                                <span className="drawee-profile-view" >
                                                    {this.state.chargeRulesProfile.subProductType}
                                                </span>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                    Service Type
                                                </Typography>
                                                <span className="drawee-profile-view" >
                                                    {this.state.chargeRulesProfile.serviceType}
                                                </span>
                                            </Grid>
                                            <Grid item xs={12} className='grid-no-bottom-padding'>
                                                <p  className={classes.subtitleheader}><b>Reason Code</b></p>
                                            </Grid>
                                            <Grid item xs={4}>
                                              <span className="drawee-profile-view" >
                                                  {this.state.chargeRulesProfile.reasonCode}
                                              </span>
                                            </Grid>
                                            <Grid container spacing={24} className='global-font' style={{marginLeft:4,marginTop:20}}>
                                                <Grid item xs={4} className='grid-no-top-padding'>
                                                    <CheckBox umLabelClass={classes.headingtitle} id="Commission" isChecked={this.state.commissionchecked} onChange={this.handleTextfieldChange} label="Commission" />
                                                </Grid>
                                                <Grid item xs={4} className='grid-no-top-padding'>
                                                    <CheckBox umLabelClass={classes.headingtitle} id="tax"  isChecked={this.state.taxchecked} onChange={this.handleTextfieldChange} label="Tax" />
                                                </Grid>
                                                <Grid item xs={4} className='grid-no-top-padding'>
                                                    <CheckBox umLabelClass={classes.headingtitle}  id="otherChanges"  isChecked={this.state.otherchangeschecked} onChange={this.handleTextfieldChange} label="Other Charges" />
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={24} className='global-font' style={{marginLeft:4}}>
                                              <Grid item xs={4} className='grid-no-top-padding'>
                                                  <CheckBox umLabelClass={classes.headingtitle} id="cardchanges" isChecked={this.state.cardchangeschecked} onChange={this.handleTextfieldChange} label="Card Charges" />
                                              </Grid>
                                              <Grid item xs={4} className='grid-no-top-padding'>
                                                  <CheckBox umLabelClass={classes.headingtitle}  id="additionalCharges" isChecked={this.state.additionalchargeschecked} onChange={this.handleTextfieldChange} label="Additional Charges" />
                                              </Grid>
                                              <Grid item xs={4} className='grid-no-top-padding'>
                                                  <CheckBox umLabelClass={classes.headingtitle} id="PayInAmount" isChecked={true} isEnabled={false} label="Pay In Amount" />
                                              </Grid>
                                            </Grid>
                                            <Grid container spacing={24} className='global-font' style={{marginLeft:4}}>
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
                                                                                            iconStyle={{fontSize:20}}
                                                                                            isEnabled={((Object.keys(obj.agentProfile).length == 0) || (obj.agentProfileCheck == true) || (obj.agentBranchesCheck == true) || (obj.agentBranches.length == 0 && obj.agentBranchesList.length > 0)) ? false : true}
                                                                                            onClick={(e) => this.handleAddAgentRule(index)}
                                                                                            style={{ "margin-right": "10px", height: 32, width: 32 }}
                                                                                        />
                                                                                        :
                                                                                        <FloatButton icon="delete" iconStyle={{fontSize:20}} style={{ "margin-right": "10px", height: 32, width: 32, backgroundColor: '#c03018' }} onClick={(e) => this.handleDeleteAgentRule(index)} />
                                                                                }
                                                                            </Grid>
                                                                        </Grid>
                                                                    )
                                                                })
                                                            ]
                                                            : null
                                                    }
                                                </Grid>
                                                <Grid container spacing={24} className='global-font' style={{ marginLeft: 4 }}>
                                                    <Grid item xs={4}>
                                                        <p className="toggle-alignment"><b>Status :</b> Disable </p>
                                                        <div className="toggle-alignment">
                                                            <Toggle isChecked={this.state.status} id={'status'} isEnabled={true} onChange={this.handleTextfieldChange} />
                                                        </div>
                                                        <p className="toggle-alignment">Enable</p>
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={24} direction="row" justify="flex-end" alignItems="flex-end" style={{ margin: 4 }}>
                                                    <Grid item xs={4}>
                                                        <Grid container spacing={24} direction="row" justify="flex-end" alignItems="flex-end">
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
                                            </Grid>

                                        </Grid>
                                    </div>
                                </TabContainer>
                            </div>
                    ]
            }
        </MuiThemeProvider>
        )
    }
}

EditChargeRules.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditChargeRules);