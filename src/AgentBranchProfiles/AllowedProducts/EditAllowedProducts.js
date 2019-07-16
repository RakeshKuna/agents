import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import '../../vendor/common.css';
import '../../theme/theme';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Loader from './../../component/Loader';
import ModalBox from './../../component/Modalbox';
import {TextButton, FloatButton,Notifications,Input, Toggle,Selectable } from 'finablr-ui';
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

class EditAllowedProducts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            breadcrumps: [],
            value: 0,
            loading: true,
            loaderMessage: 'Retrieving Data',
            serverStatus: null,
            serverError: false,
            serverErrMessage: '',
            allowedProductsProfile: {},
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
            payinlimitErrMessage: '',
            payinlimit: '',
            payinlimitvalidation: false,
            currencycodeArr: [],
            suggestedFields: [],
            suggestions: [],
            currencycodedefaultData:{},
            currencycodedefault: undefined,
            currencycodeDisabled: false,
            currencyProvideCheck: false,
            currencyProvideCheckerrMsg: '',
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
        this.fetchcurrencyCodeList();
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
                .then((response) => {
                    console.log(response)
                    if (response.status == 200) {
                        let breadcrumpData = [{ link: '/agentprofiles', text: 'Agent Profiles' }, { link: '/agentprofiles/' + this.props.match.params.agentid + '/branches', text: response.data.agentName + ' (' + response.data.agentId + ')' }, { link: '/agentprofiles/' + this.props.match.params.agentid + '/branches/' + this.props.match.params.agentbranchId, text: response.data.branchDisplayName + ' (' + response.data.id + ')' }, { link: '#', text: this.props.match.params.allowedproductsid }];
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

    getAllowedProducts = () => {
        if(sessionStorage.getItem('token') == undefined){
            window.location.replace(config.PAAS_LOGIN_URL);
            return (<h1>401 - Unauthorized Request</h1>)
          }
          else{
            let headers = {
              Authorization:sessionStorage.getItem('token')
            }
            ApiService.getAllowedProducts(this.props.match.params.agentid, this.props.match.params.agentbranchId, this.props.match.params.allowedproductsid,headers)
            .then((response) => {
                if (response.status == 200) {
                    console.log(response.data);
                    let currencycodedefault = undefined;
                    let currencycodedefaultData = {};
                    if (response.data.currencyCodes.length > 0) {
                        let currencycodeArr = [];
                        response.data.currencyCodes.map((obj) => {
                            let checkdata = {};

                            this.state.suggestedFields.filter((sugg) => {
                                if (obj.id == sugg.id) {
                                    checkdata = sugg;

                                    console.log('first');
                                }
                                else if (response.data.defaultCurrencyCode.id == sugg.id) {
                                    console.log(sugg)
                                    currencycodedefault = sugg.value;
                                    currencycodedefaultData = sugg;
                                }
                            })
                            currencycodeArr.push(checkdata);
                        })
                        this.setState({
                            currencycodedefault, currencycodedefaultData, currencycodeArr, suggestions: currencycodeArr, loaderMessage: '',
                            allowedProductsProfile: response.data,
                            status: (response.data.status == 'ENABLED') ? true : false,
                            currencycodeDisabled: true,
                            payinlimit: response.data.payInLimit,
                            loading: false,
                        }, () => {
                            console.log("%%%%%" + this.state.currencycodedefaultData)
                            this.handleSaveEnable();
                        });
                    }
                    else {
                        this.setState({ loading: false, loaderMessage: '', snackbar: true, notificationType: 'warning', snackbarMessage: 'No Currency Codes Found.' });
                    }
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

    fetchcurrencyCodeList = () => {
        if(sessionStorage.getItem('token') == undefined){
            window.location.replace(config.PAAS_LOGIN_URL);
            return (<h1>401 - Unauthorized Request</h1>)
        }
        else{
            let headers = {
              Authorization:sessionStorage.getItem('token')
        }
        ApiService.fetchcurrencycodes(headers)
            .then((response) => {
                console.log(response.data);
                if (response.status == 200) {
                    let suggestedFields = [];
                    if (response.data.length > 0) {
                        response.data.map((obj) => {
                            let currencycode = {};
                            currencycode.id = obj.id;
                            currencycode.value = obj.code;
                            currencycode.label = obj.currencyName;
                            suggestedFields.push(currencycode);
                        })
                        this.setState({ suggestedFields, loaderMessage: '' }, () => {
                            this.getAllowedProducts();
                        });
                    }
                    else {
                        this.setState({ loading: false, loaderMessage: '', snackbar: true, notificationType: 'warning', snackbarMessage: 'No Currency Codes Found.' });
                    }
                }
            }).catch(error => {
                if(Exceptionhandler.throwErrorType(error).status == 401){
                    window.location.replace(config.PAAS_LOGIN_URL);
                    return (<h1>401 - Unauthorized Request</h1>)
                }
                else if (Exceptionhandler.throwErrorType(error).status == 500 || Exceptionhandler.throwErrorType(error).status == 503 || Exceptionhandler.throwErrorType(error).status == 400) {
                    this.setState({ loading: false, serverError: true, serverStatus: Exceptionhandler.throwErrorType(error).status, serverErrMessage: Exceptionhandler.throwErrorType(error).message })
                }
                else {
                    this.setState({ loading: false, serverError: false, shownogeneralrules: true, apiErrMsg: error.response.data.error, actionType: 'OK' })
                }
            });
        }
    }

    handleCurrencyTypeChange = (e) => {
      this.setState({ currencycodedefault: e, currencyProvideCheck: false }, () => {
        if (this.state.currencycodedefault == undefined) {
          this.setState({ currencyProvideCheck: true, currencyProvideCheckerrMsg: 'Currency Default Code can not be empty',currencycodedefaultData:{} },()=>{
            this.handleSaveEnable();
          })
        }
        else if (this.state.currencycodedefault.length == 0) {
          this.setState({ currencyProvideCheck: true, currencyProvideCheckerrMsg: 'Currency Default Code can not be empty',currencycodedefaultData:{} },()=>{
            this.handleSaveEnable();
          })
        }
        else if(this.state.currencycodedefault.length > 0){
          this.state.suggestions.map((obj)=>{
            if(this.state.currencycodedefault == obj.value){
              this.setState({ currencycodedefaultData: obj, currencycodedefault: obj.value,currencyProvideCheck:false }, () => {
                this.handleSaveEnable();
              })
            }
          })
        }
        else {
          this.handleSaveEnable();
        }
      });
    }

    handleStatusResponse = (data) => {
        if (data == true) {
            this.setState({ shownogeneralrules: false }, () => {
            });
        }
    }

    handleBlur = (e) => {
        console.log(e.target.id);
        switch (e.target.id) {
            case 'currencycodedefault':
                this.setState({ currencyProvideCheck: false }, () => {
                    if (this.state.currencycodedefault == undefined) {
                        this.setState({ currencyProvideCheck: true, currencyProvideCheckerrMsg: 'Currency Default Code can not be empty' })
                        this.handleSaveEnable();
                    }
                    else if (this.state.currencycodedefault.length == 0) {
                        this.setState({ currencyProvideCheck: true, currencyProvideCheckerrMsg: 'Currency Default Code can not be empty' })
                        this.handleSaveEnable();
                    }
                    else {
                        this.handleSaveEnable();
                    }
                })
                break;
        }
    }

    handleCurrencyTypeClick = (e) => {
        console.log(e);
        let value = e.code;
        this.setState({ currencycodedefaultData: e, currencycodedefault: value }, () => {
            console.log(this.state.currencycodedefaultData)
            this.handleSaveEnable();
        })
    }

    handleTextfieldChange = (e, value) => {
        let pattern = /^[0-9]+$/i;
        console.log(e, value);
        switch (e.target.id) {
            case ('payinlimit'):
                this.setState({ payinlimit: value, payinlimitvalidation: false }, () => {
                    if (this.state.payinlimit.length === 0) {
                        this.setState({
                            payinlimitvalidation: true,
                            payinlimitErrMessage: 'PayIn Limit can not be empty'
                        }, () => {
                            this.handleSaveEnable();
                        })
                    }
                    else if (this.state.payinlimit.length == 0) {
                        this.setState({ payinlimitvalidation: true, payinlimitErrMessage: 'Expiry time can not be empty' }, () => {
                            this.handleSaveEnable();
                        })
                    }
                    else {
                        this.setState({ payinlimitvalidation: false, payinlimitErrMessage: '' }, () => {
                            this.handleSaveEnable();
                        })
                    }
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

    handlePayInTypeError = (e) => {
        switch (e) {
            case 'required':
                this.setState({
                    payinlimitvalidation: true,
                    payinlimitErrMessage: 'PayIn Amount can not be empty'
                }, () => {
                    this.handleSaveEnable();
                })
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

    handleChangeCurrencyCode = (data) => {
        this.setState({ currencycodeArr: data, suggestions: [] }, () => {
          let currency = this.state.currencycodeArr;
          this.setState({
            suggestions: currency
          })
          let suggestions = [];
          suggestions = this.state.currencycodeArr.slice(0);
          this.setState({
            suggestions: suggestions
          }, () => {
            if (this.state.suggestions.length == 1){
              let suggestions = this.state.suggestions;
              this.setState({currencycodedefault:suggestions[0].label,currencycodedefaultData:suggestions[0]},()=>{
                this.handleSaveEnable();
              })
            }
            if (this.state.suggestions.length > 1) {
              this.setState({
                currencycodeDisabled: true
              },()=>{
                this.setState({currencycodedefault:undefined,currencycodedefaultData:{}},()=>{
                  this.handleSaveEnable();
                })
              })
            }
            else {
              this.setState({
                currencycodeDisabled: false,
                currencyProvideCheck: false
              },()=>{
                this.handleSaveEnable();
              })
            }
          })
        })
      }

      handleViewCurrencyCodeValues = (data) => {
        this.setState({ currencycodeArr: data, suggestions: [] }, () => {
          let currency = this.state.currencycodeArr;
          this.setState({
            suggestions: currency
          })
          let suggestions = [];
          suggestions = this.state.currencycodeArr.slice(0);
          this.setState({
            suggestions: suggestions
          }, () => {
            if (this.state.suggestions.length == 1){
              let suggestions = this.state.suggestions;
              this.setState({currencycodedefault:suggestions[0].label,currencycodedefaultData:suggestions[0]},()=>{
                this.handleSaveEnable();
              })
            }
            if (this.state.suggestions.length > 1) {
              this.setState({
                currencycodeDisabled: true
              },()=>{
                this.setState({currencycodedefault:undefined,currencycodedefaultData:{}},()=>{
                  this.handleSaveEnable();
                })
              })
            }
            else {
              this.setState({
                currencycodeDisabled: false,
                currencyProvideCheck: false
              },()=>{
                this.handleSaveEnable();
              })
            }
          })
        })
      }

    fetchAgentBranches = (agentId) => {
        let params = {};
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
                BranchApiService.getAllAgentBranchProfiles(params, agentId,headers)
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
                                this.setState({ loading: false, notificationType: 'warning', snackbar: true, snackbarMsg: 'no agent records found' })
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
                                this.setState({ replicateAgentsData, loading: false, snackbar: true, notificationType: 'warning', snackbarMsg: 'no agent branches records found' })

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
        console.log(this.state.currencycodeArr)
        if (this.state.payinlimit.length == 0 || (this.state.currencycodeArr.length == 0) || Object.keys(this.state.currencycodedefaultData).length == 0) {
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
        data.currencyCodes = [];
        if (this.state.currencycodeArr.length > 0) {
            this.state.currencycodeArr.map((obj) => {
                let branchObj = {};
                branchObj.id = obj.id;
                branchObj.code = obj.value;
                data.currencyCodes.push(branchObj);
            })
        }
        if(this.state.currencycodeArr.length===1){
            this.state.currencycodeArr.map((obj) => {
              let defaultCurrencyCode = {};
              defaultCurrencyCode.id = obj.id;
              defaultCurrencyCode.code = obj.value;
              data.defaultCurrencyCode = defaultCurrencyCode;
            })  
          }
          else{
            let defaultCurrencyCode = {};
            defaultCurrencyCode.id = this.state.currencycodedefaultData.id;
            defaultCurrencyCode.code = this.state.currencycodedefaultData.value;
            data.defaultCurrencyCode = defaultCurrencyCode;
          }
        data.payInLimit = this.state.payinlimit;
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
        data.status = this.state.status ? 'ENABLED' : 'DISABLED';
        this.editAllowedProducts(data);
    }

    editAllowedProducts = (data) => {
        console.log(data);
        if(sessionStorage.getItem('token') == undefined){
            window.location.replace(config.PAAS_LOGIN_URL);
            return (<h1>401 - Unauthorized Request</h1>)
        }
        else{
            let headers = {
              Authorization:sessionStorage.getItem('token')
            }
            this.setState({ loading: true, loaderMessage: 'Posting Data' }, () => {
                ApiService.EditAllowedProducts(data, this.props.match.params.agentid, this.props.match.params.agentbranchId, this.props.match.params.allowedproductsid,headers)
                    .then((response) => {
                        console.log(response);
                        let snackbarMsg = (this.state.replicateToSelfAgent || this.state.replicateToOtherAgent) ? 'The rule has been replicated to the agents and branches and will be available under them.' : 'Allowed Products  Rule Updated successfully';

                        this.setState({ loading: false, snackbar: true, notificationType: 'success', snackbarMsg }, () => {
                            setTimeout(() => {
                                this.props.history.push(`/agentprofiles/${this.props.match.params.agentid}/branches/${this.props.match.params.agentbranchId}?tabId=${0}&pageelements=${5}`)
                            }, 1600)
                        })
                    }).catch(error => {
                        if(Exceptionhandler.throwErrorType(error).status == 401){
                            window.location.replace(config.PAAS_LOGIN_URL);
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

    render() {
        const { classes } = this.props;
        console.log('sec');
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
                                    <p className="bank-profile global-font" style={{ marginTop: 25, marginBottom: 30, color: `#19ace3` }}>Allowed Products Send(Edit)</p>
                                    <TabContainer>
                                        <div className={classes.root}>
                                            <Grid container spacing={24}>
                                                <Grid item xs={12} className='grid-no-bottom-padding'>
                                                    <p><b>Allowed Products Send</b></p>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                        Service Provider Code
                                                 </Typography>
                                                    <span className="drawee-profile-view" >
                                                        {this.state.allowedProductsProfile.serviceProviderCode}
                                                    </span>
                                                </Grid>

                                                <Grid item xs={12} className='grid-no-bottom-padding'>
                                                    <p><b>Product</b></p>
                                                </Grid>

                                                <Grid item xs={4}>
                                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                        Product Type
                                                </Typography>
                                                    <span className="drawee-profile-view" >
                                                        {this.state.allowedProductsProfile.productType}
                                                    </span>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                        Sub Product Type
                                                 </Typography>
                                                    <span className="drawee-profile-view" >
                                                        {this.state.allowedProductsProfile.subProductType}
                                                    </span>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                        Service Type
                                            </Typography>
                                                    <span className="drawee-profile-view" >
                                                        {this.state.allowedProductsProfile.serviceType}
                                                    </span>
                                                </Grid>
                                                <Grid container spacing={24} className='global-font'>
                                                    <Grid item xs={12} className='grid-no-bottom-padding'>
                                                        <p><b>Payin Limit</b></p>
                                                    </Grid>
                                                    <Grid item xs={6} className='grid-no-top-padding grid-error'>
                                                        <Input
                                                            id="payinlimit"
                                                            autocomplete='off'
                                                            placeholder="PayIn Limit"
                                                            roundOff={5}
                                                            decimalChar={3}
                                                            type="decimal"
                                                            value={this.state.payinlimit}
                                                            isRequired
                                                            onChange={(e, value) => this.handleTextfieldChange(e, value)}
                                                            onError={e => this.handlePayInTypeError(e)}
                                                        />
                                                        {this.state.payinlimitvalidation ? <span className="errorMessage-add">{this.state.payinlimitErrMessage}</span> : null}
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={24} className='global-font'>
                                                    <Grid item xs={12} className='grid-no-bottom-padding'>
                                                        <p><b>Currency Codes</b></p>
                                                        <h5>(*Minimum You have to Choose Two Currency Codes)</h5>
                                                    </Grid>
                                                    <Grid item xs={6} className='grid-no-top-padding'>
                                                        <MultiSelectTextField
                                                            value={this.state.currencycodeArr}

                                                            label='Currency Codes' type='currencycodes'
                                                            suggestionFields={this.state.suggestedFields}
                                                            placeholder={'Currency Codes'}
                                                            MultiSelectText='Agent Branches'
                                                            getAutoSelectValue={this.handleChangeCurrencyCode}
                                                            getViewValues={this.handleViewCurrencyCodeValues} />
                                                    </Grid>
                                                    <Grid item xs={5} className='grid-no-top-padding grid-error'>
                                                        {
                                                            this.state.suggestions.length > 1 ?
                                                                <div>
                                                                    <Selectable
                                                                        placeholder="Set Currency Code as Default"
                                                                        id="currencycodedefault"
                                                                        options={this.state.suggestions}
                                                                        isRequired
                                                                        label='Set Currency Code as Default'
                                                                        searchable={true}
                                                                        value={this.state.currencycodedefault}
                                                                        noResultsText="No Currency Codes are  Found"
                                                                        searchBy={'any'}
                                                                        placeholder={'Set Currency Code as Default'}
                                                                        onChange={this.handleCurrencyTypeChange}
                                                                        onBlur={this.handleBlur}
                                                                        onValueClick={this.handleCurrencyTypeClick}
                                                                        isEnabled={this.state.currencycodeDisabled}
                                                                    />
                                                                    {this.state.currencyProvideCheck ? <span className="errorMessage-add">{this.state.currencyProvideCheckerrMsg} </span> : ''}
                                                                </div> : null
                                                        }
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
                                                    <Grid item xs={12} className="grid-error">
                                                        {
                                                            this.state.replicateToOtherAgent ?
                                                                [
                                                                    this.state.replicateAgentsData.map((obj, index) => {
                                                                        return (
                                                                            <Grid container spacing={24} className='global-font'>
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
                                                                                    {obj.agentBranchesCheck ? <span className="errorMessage-add">{obj.agentBranchesCheckerrMsg} </span> : ''}
                                                                                </Grid>
                                                                                <Grid item xs={2} alignItems="flex-end">
                                                                                    {
                                                                                        (index == this.state.replicateAgentsData.length - 1) ?
                                                                                            <FloatButton
                                                                                                id="floatButton"
                                                                                                icon="plus"
                                                                                                isEnabled={((Object.keys(obj.agentProfile).length == 0) || (obj.agentProfileCheck == true) || (obj.agentBranchesCheck == true) || (obj.agentBranches.length == 0 && obj.agentBranchesList.length > 0)) ? false : true}
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
                                                                <TextButton className = "global-font save-clear" id="disabledTextButton" umSize="small" onClick={this.handleData} isEnabled={this.state.saveDisabled}>Save</TextButton>
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
        );
    }
}

EditAllowedProducts.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditAllowedProducts);