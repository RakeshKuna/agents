import React from 'react';
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

class CreateChargeRules extends React.Component {
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
            clearDisabled:false,
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
            commissionchecked: false,
            taxchecked: false,
            otherchangeschecked: false,
            cardchangeschecked: false,
            additionalchargeschecked: false
        };
    }

    componentDidMount() {
      this.fetchProductsList();
      this.fetchAgentBranchDetails();
      this.handleClearEnable();
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
                let breadcrumpData = [{ link: '/agentprofiles', text: 'Agent Profiles' }, { link: '/agentprofiles/' + this.props.match.params.agentid + '/branches', text: response.data.agentName + ' (' + response.data.agentId + ')' }, { link: '/agentprofiles/' + this.props.match.params.agentid + '/branches/' + this.props.match.params.agentbranchId, text: response.data.branchDisplayName + ' (' + response.data.id + ')' }, { link: '#', text: 'Create' }];
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

    fetchProductsList = () => {
        let productsList = [];
        if(sessionStorage.getItem('token') == undefined){
            window.location.replace(config.PAAS_LOGIN_URL);
            return (<h1>401 - Unauthorized Request</h1>)
        }
        else{
            let headers = {
              Authorization:sessionStorage.getItem('token')
            }
            ApiService.ProductList(headers).then((response) => {
                if (response.status == 200) {
                    if (response.data.response.length > 0) {
                        response.data.response.map((obj, index) => {
                            let product = {};
                            product.id = index;
                            product.label = obj.product;
                            product.value = obj.product;
                            if (obj.product == 'Remittance') {
                                let subProductsList = [];
                                this.setState({ productType: obj.product, productTypeData: obj, productTypeDisabled: false, subProductsResponse: obj.subProducts }, () => {
                                    if (obj.subProducts.length > 0) {
                                        obj.subProducts.map((obj, index) => {
                                            let subProductType = {};
                                            subProductType.id = index;
                                            subProductType.label = obj.subProduct;
                                            subProductType.value = obj.subProduct;
                                            subProductsList.push(subProductType);
                                        })
                                        this.setState({ subProductsList, subProductTypeDisasbled: true })
                                    
                                    }
                                    else {
                                        this.setState({ subProductsList, subProductTypeDisasbled: false })
                                    
                                    }
                                })
                            }
                            productsList.push(product);
                        })
                        this.setState({ productsList, loading: false }, () => {
                            // console.log(this.state.productsList);
                           
                        });
                    }
                    else {
                        this.setState({ productTypeDisabled: false });
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
        }
    }

    handleStatusResponse = (data) => {
        if (data == true) {
            this.setState({ shownogeneralrules: false }, () => {
                this.handleSaveEnable();
                this.handleClearEnable();
            });
        }
    }

    handleClear = () => {
      this.setState({ confirmDelete: false, snackbar: false }, () => {
          if (this.state.productType != undefined || this.state.subProductType != undefined
           || (Object.keys(this.state.subProductTypeData).length > 0) || (Object.keys(this.state.serviceTypeData).length > 0)
             || this.state.serviceType !== undefined || this.state.transactionStatus != undefined
              || this.state.transactionType != undefined || this.state.commissionchecked == true 
              || this.state.taxselected == true || this.state.otherchangeschecked == true 
              || this.state.cardchangesselected == true
               || this.state.additionalchargesselected == true 
               || this.state.replicateToSelfAgent == true 
               || this.state.replicateToOtherAgent == true) {
              this.setState({ confirmDelete: true, fromAction: 'clear', modalMessage: 'This will clear all data. Are you sure you want to continue?' })
              this.handleSaveEnable();
              this.handleClearEnable();
              console.log(this.state)

            }
      })
    }

    handleModalResponse = (data, from) => {
        if (data == true && from == 'clear') {
            this.setState({
                confirmDelete: false,
                productTypeCheck: false,
                productTypeerrMsg: false,
                subProductType: undefined,
                subProductTypeData: {},
                subProductTypeCheck: false,
                subProductTypeerrMsg: '',
                serviceType: undefined,
                serviceTypeList:[],
                serviceTypeData: {},
                serviceTypeCheck: false,
                serviceTypeerrMsg: '',
                serviceTypeDisabled: false,
                transactionStatus: undefined,
                transactionStatusData: {},
                transactionStatusCheck: false,
                transactionStatuserrMsg: '',
                transactionType: undefined,
                transactionTypeData: {},
                transactionTypeCheck: false,
                transactionTypeerrMsg: '',
                replicateToSelfAgent: false,
                replicateToOtherAgent: false,
                status: true,
                snackbar: false,
                saveDisabled: false,
                clearDisabled:false,
                fromAction: '',
                shownogeneralrules: false,
                apiErrMsg: '',
                currencycodeArr: [],
                commissionchecked: false,
                taxchecked: false,
                otherchangeschecked: false,
                cardchangeschecked: false,
                additionalchargeschecked: false
            }, () => {
                console.log(this.state)
                let replicateAgentsData = [];
                let obj = this.state.newPushObj;
                replicateAgentsData.push(obj);
                this.setState({ replicateAgentsData });
                this.handleSaveEnable();
                this.handleClearEnable();
            })
        }
        else {
            this.setState({ confirmDelete: true }, () => {
                this.handleSaveEnable();
                this.handleClearEnable();
                //this.props.modalAction(null,'Try Again closed');
            });
        }
    }

    handleBlur = (e) => {
        console.log(e.target.id);
        switch (e.target.id) {
            case 'productType':
                this.setState({ productTypeCheck: false }, () => {
                    if (this.state.productType == undefined) {
                        this.setState({ productTypeCheck: true, productTypeerrMsg: 'Product Type can not be empty' })
                        this.handleSaveEnable();
                        this.handleClearEnable();
                    }
                    else if (this.state.productType.length == 0) {
                        this.setState({ productTypeCheck: true, productTypeerrMsg: 'Product Type can not be empty' })
                        this.handleSaveEnable();
                        this.handleClearEnable();

                    }
                    else {
                        this.handleSaveEnable();
                        this.handleClearEnable();

                    }
                })
                break;
            case 'subProductType':
                this.setState({ subProductTypeCheck: false }, () => {
                    if (this.state.subProductType == undefined) {
                        this.setState({ subProductTypeCheck: true, subProductTypeerrMsg: 'Sub Product Type can not be empty',serviceType:undefined,serviceTypeData:{},serviceTypeList:[] })
                        this.handleSaveEnable();
                        this.handleClearEnable();
                    }
                    else if (this.state.subProductType.length == 0) {
                        this.setState({ subProductTypeCheck: true, subProductTypeerrMsg: 'Sub Product Type can not be empty',serviceType:undefined,serviceTypeData:{},serviceTypeList:[] })
                        this.handleSaveEnable();
                        this.handleClearEnable();
                    }
                    else {
                        this.handleSaveEnable();
                        this.handleClearEnable();

                    }
                })
                break;
            case 'serviceType':
                this.setState({ serviceTypeCheck: false }, () => {
                    if (this.state.serviceType == undefined) {
                        this.setState({ serviceTypeCheck: true, serviceTypeerrMsg: 'Service Type can not be empty',serviceTypeData: {} })
                        this.handleSaveEnable();
                        this.handleClearEnable();
                    }
                    else {
                        this.handleSaveEnable();
                        this.handleClearEnable();

                    }
                    console.log(this.state.serviceType)
                })
                break;
            case 'transactionType':
            // console.log('switch',this.state.transactionTypeCheck)
            this.setState({ transactionTypeCheck: false }, () => {
                if (this.state.transactionType == undefined) {
                    this.setState({ transactionTypeCheck: true, transactionTypeerrMsg: 'Reason Code can not be empty' })
                    this.handleSaveEnable();
                    this.handleClearEnable();
                }
                else if (this.state.transactionType.length == 0) {
                    this.setState({ transactionTypeCheck: true, transactionTypeerrMsg: 'Reason Code can not be empty' })
                    this.handleSaveEnable();
                    this.handleClearEnable();
                }
                else {
                    this.handleSaveEnable();
                    this.handleClearEnable();
                }
            })
            break;
        }
    }

    handleProductTypeChange = (e) => {
        this.setState({ productType: e, productTypeCheck: false }, () => {
            if (this.state.productType == undefined) {
                this.setState({ productTypeCheck: true, productTypeerrMsg: 'Product Type can not be empty' })
                this.handleSaveEnable();
                this.handleClearEnable();
            }
            else if (this.state.productType.length == 0) {
                this.setState({ productTypeCheck: true, productTypeerrMsg: 'Product Type can not be empty' })
                this.handleSaveEnable();
                this.handleClearEnable();
            }
            else {
                this.handleSaveEnable();
                this.handleClearEnable();

            }
        });
    }

    handleProductTypeValueClick = (e) => {
        let value = e.value;
        this.setState({ productTypeData: e, productType: value, snackbar: false }, () => {
            this.handleSaveEnable();
            this.handleClearEnable();

        })
    }

    handleSubProductTypeChange = (e) => {
        this.setState({ subProductType: e, subProductTypeCheck: false }, () => {
            if (this.state.subProductType == undefined) {
                this.setState({ subProductTypeCheck: true, subProductTypeerrMsg: 'Sub Product Type can not be empty',subProductTypeData:{},serviceTypeList: [],serviceType:undefined,serviceTypeData:{} },()=>{
                  this.handleSaveEnable();
                  this.handleClearEnable();
                })
            }
            else if (this.state.subProductType.length == 0) {
                this.setState({ subProductTypeCheck: true, subProductTypeerrMsg: 'Sub Product Type can not be empty',subProductTypeData:{},serviceTypeList: [],serviceType:undefined,serviceTypeData:{} },()=>{
                  this.handleSaveEnable();
                  this.handleClearEnable();
                })
            }
            else if(this.state.subProductType.length > 0){
              this.state.subProductsList.map((obj)=>{
                if(this.state.subProductType == obj.value){
                  this.setState({ subProductTypeData: obj, subProductType: obj.value, snackbar: false, serviceTypeList: [] }, () => {
                    let count = 0;
                    this.state.subProductsResponse.map((obj, index) => {
                        //TODO after getting id in service types, change index to obj.id in if loop
                        if (this.state.subProductTypeData.id == index) {
                            if (obj.hasOwnProperty('serviceTypes')) {
                                if (obj.serviceTypes.length > 0) {
                                    count = count + 1;
                                    let serviceTypeList = [];
                                    obj.serviceTypes.map((obj, index) => {
                                        let serviceType = {};
                                        serviceType.id = index;
                                        serviceType.label = obj;
                                        serviceType.value = obj;
                                        serviceTypeList.push(serviceType);
                                    })
                                    this.setState({ serviceTypeList: serviceTypeList, serviceTypeDisabled: true }, () => {
                                    this.handleSaveEnable();
                                    this.handleClearEnable();
                                        console.log(this.state.serviceTypeList);
                                    })
                                }
                            }
                        }
                    })
                    if (count == 0) {
                        this.setState({ snackbar: true, notificationType:'warning',snackbarMsg: 'no service types found', serviceTypeDisabled: false, serviceTypeList: [] })
                    }
                })
                }
              })
            }
            else {
                this.handleSaveEnable();
                this.handleClearEnable();

            }
        });
    }

    handleSubProductTypeValueClick = (e) => {
        let value = e.value;
        this.setState({ subProductTypeData: e, subProductType: value, snackbar: false, serviceTypeList: [],serviceType:undefined,serviceTypeData:{} }, () => {
            let count = 0;
            this.state.subProductsResponse.map((obj, index) => {
                //TODO after getting id in service types, change index to obj.id in if loop
                if (this.state.subProductTypeData.id == index) {
                    if (obj.hasOwnProperty('serviceTypes')) {
                        if (obj.serviceTypes.length > 0) {
                            count = count + 1;
                            let serviceTypeList = [];
                            obj.serviceTypes.map((obj, index) => {
                                let serviceType = {};
                                serviceType.id = index;
                                serviceType.label = obj;
                                serviceType.value = obj;
                                serviceTypeList.push(serviceType);
                            })
                            this.setState({ serviceTypeList: serviceTypeList, serviceTypeDisabled: true }, () => {
                                this.handleSaveEnable();
                                this.handleClearEnable();
                                console.log(this.state.serviceTypeList);
                            })
                        }
                    }
                }
            })
            if (count == 0) {
                this.setState({ snackbar: true, notificationType:'warning',snackbarMsg: 'no service types found', serviceTypeDisabled: false, serviceTypeList: [] })
            }
        })
    }

    handleServiceTypeChange = (e) => {
        this.setState({ serviceType: e, serviceTypeCheck: false }, () => {
            if (this.state.serviceType == undefined) {
                this.setState({ serviceTypeCheck: true, serviceTypeerrMsg: 'Service Type can not be empty',serviceTypeData: {} })
                this.handleSaveEnable();
                this.handleClearEnable();
            }
            else if (this.state.serviceType.length == 0) {
                this.setState({ serviceTypeCheck: true, serviceTypeerrMsg: 'Service Type can not be empty',serviceTypeData: {} })
                this.handleSaveEnable();
                this.handleClearEnable();
            }
            else if(this.state.serviceType.length > 0){
              this.state.serviceTypeList.map((obj)=>{
                if(this.state.serviceType == obj.value){
                  this.setState({ serviceTypeData: obj, serviceType: obj.value,serviceTypeCheck:false }, () => {
                    this.handleSaveEnable();
                    this.handleClearEnable();

                  })
                }
              })
            }
            else {
                this.handleSaveEnable();
                this.handleClearEnable();

            }
        });
    }

    handleServiceTypeValueClick = (e) => {
        let value = e.value;
        this.setState({ serviceTypeData: e, serviceType: value }, () => {
            this.handleSaveEnable();
            this.handleClearEnable();

        })
    }

    handleTransactionTypeChange = (e) => {
      this.setState({ transactionType: e, transactionTypeCheck: false }, () => {
          if (this.state.transactionType == undefined) {
              this.setState({ transactionTypeCheck: true, transactionTypeerrMsg: 'Reason Code can not be empty',transactionTypeData:{} },()=>{
                this.handleSaveEnable();
                this.handleClearEnable();

              })
          }
          else if (this.state.transactionType.length == 0) {
              this.setState({ transactionTypeCheck: true, transactionTypeerrMsg: 'Reason Code can not be empty',transactionTypeData:{} },()=>{
                this.handleSaveEnable();
                this.handleClearEnable();

              })
          }
          else if(this.state.transactionType.length > 0){
            transactionTypeList.map((obj)=>{
                if(this.state.transactionType == obj.value){
                    this.setState({ transactionTypeData: obj, transactionType: obj.value,transactionTypeCheck:false }, () => {
                        this.handleSaveEnable();
                        this.handleClearEnable();

                      })
                }
            })
          }
          else {
              this.handleSaveEnable();
              this.handleClearEnable();

          }
      });
    }

    handleTransactionTypeValueClick = (e) => {
        let value = e.value;
        this.setState({ transactionTypeData: e, transactionType: value }, () => {
            this.handleSaveEnable();
            this.handleClearEnable();

        })
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
                    this.handleClearEnable();

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
            this.handleClearEnable();

        })
    }

    handleViewCustAgentBranchValues = (data) => {
        this.setState({ custTypeCountryArr: data }, () => {
            this.handleSaveEnable();
            this.handleClearEnable();

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
                                this.setState({ loading: false,notificationType:'warning', snackbar: true, snackbarMsg: 'no agent records found' })
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
            this.handleClearEnable();

          })
        }
        else if(value.length > 0){
          this.state.agentsList.map((obj)=>{
            if(value == obj.value){
              let existingIndex = null;
              let checkExistingRule = obj;
              this.setState({ snackbar: false }, () => {
                this.handleSaveEnable();
                this.handleClearEnable();
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
                    this.setState({ snackbar: true, notificationType:'warning',snackbarMsg: `Agent rules are already added in row ${existingIndex + 1}` }, () => {
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
                            this.setState({ replicateAgentsData, loading: false, snackbar: true,notificationType:'warning', snackbarMsg: 'no agent branches records found' })

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
            this.handleClearEnable();

        });
    }

    handleViewAgentBranches = (data, id) => {
        let index = parseInt(id.replace('agentbranches', ''));
        let replicateAgentsData = this.state.replicateAgentsData;
        replicateAgentsData[index].agentBranches = data;
        this.setState({ replicateAgentsData }, () => {
            this.handleSaveEnable();
            this.handleClearEnable();
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
                        this.handleClearEnable();
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
            this.handleClearEnable();

        });
    }

    handleSaveEnable = () => {
        if ((Object.keys(this.state.productTypeData).length == 0) || (Object.keys(this.state.subProductTypeData).length == 0) || ((this.state.serviceTypeList.length > 0) && ((Object.keys(this.state.serviceTypeData).length == 0))) || (Object.keys(this.state.transactionTypeData).length == 0)) {
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
        console.log(this.state)
        // let agentcodeLen = (this.state.agentcode == undefined) ? 0 : this.state.agentcode.length;
        if ((Object.keys(this.state.subProductTypeData).length > 0)
              || (Object.keys(this.state.serviceTypeData).length > 0) 
              || (Object.keys(this.state.transactionTypeData).length > 0) ) {
          this.setState({
            clearDisabled: true
          })
        }
        else {
          this.setState({
            clearDisabled: false
          })
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
        data.productType = this.state.productType;
        data.subProductType = this.state.subProductTypeData.value;
        data.reasonCode=this.state.transactionType;
        if(this.state.replicateToSelfAgent == true || this.state.replicateToOtherAgent == true){
          data.replicatedAgentBranches = [];
        }
        if (this.state.serviceTypeDisabled == true) {
            data.serviceType = this.state.serviceTypeData.value;
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
        this.CreateChargeRules(data);
        console.log(data);
    }

    CreateChargeRules = (data) => {
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
            ApiService.CreateChargeRules(data,this.props.match.params.agentid,this.props.match.params.agentbranchId,headers)
            .then((response)=>{
                console.log(response);
                let snackbarMsg = (this.state.replicateToSelfAgent || this.state.replicateToOtherAgent) ? 'The rule has been replicated to the agents and branches and will be available under them.' : 'Charge Rules List created successfully';
    
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
                else if(Exceptionhandler.throwErrorType(error).status == 500 || Exceptionhandler.throwErrorType(error).status == 503 || Exceptionhandler.throwErrorType(error).status == 404){
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
                                    <p className="bank-profile global-font" style={{ marginTop: 25, marginBottom: 30, color: `#19ace3` }}> Charges Rules(Create)</p>
                                    <TabContainer>
                                        <div className={classes.root}>
                                            <Grid container spacing={24} className='global-font'>
                                                <Grid item xs={12} className='grid-no-bottom-padding'>
                                                    <p className={classes.headingtitle}><b>Charges Rule</b></p>
                                                </Grid>
                                                <Grid item xs={4} className='grid-no-top-padding'>
                                                    <Selectable
                                                        id="productType"
                                                        isRequired
                                                        searchable={true}
                                                        label='Product Type'
                                                        value={this.state.productType}
                                                        options={this.state.productsList}
                                                        noResultsText="No Product Type Found"
                                                        searchBy={'any'}
                                                        placeholder={'Product Type'}
                                                        onChange={this.handleProductTypeChange}
                                                        onValueClick={this.handleProductTypeValueClick}
                                                        onBlur={this.handleBlur}
                                                        isEnabled={this.state.productTypeDisabled}
                                                    />
                                                    {this.state.productTypeCheck ? <span className="errorMessage">{this.state.productTypeerrMsg} </span> : ''}
                                                </Grid>
                                                <Grid item xs={4} className='grid-no-top-padding grid-error'>
                                                    <Selectable
                                                        id="subProductType"
                                                        isRequired
                                                        label='Sub Product Type'
                                                        searchable={true}
                                                        value={this.state.subProductType}
                                                        options={this.state.subProductsList}
                                                        noResultsText="No Sub Product Types Found"
                                                        searchBy={'any'}
                                                        placeholder={'Sub Product Type'}
                                                        onChange={this.handleSubProductTypeChange}
                                                        onValueClick={this.handleSubProductTypeValueClick}
                                                        onBlur={this.handleBlur}
                                                        isEnabled={this.state.subProductTypeDisasbled}
                                                    />
                                                    {this.state.subProductTypeCheck ? <span className="errorMessage-add">{this.state.subProductTypeerrMsg} </span> : ''}
                                                </Grid>
                                                <Grid item xs={4} className='grid-no-top-padding grid-error'>
                                                    {
                                                        this.state.serviceTypeList.length > 0 ?
                                                            <div>
                                                                <Selectable
                                                                    id="serviceType"
                                                                    searchable={true}
                                                                    label='Service Type'
                                                                    value={this.state.serviceType}
                                                                    options={this.state.serviceTypeList}
                                                                    noResultsText="No Service Types Found"
                                                                    searchBy={'any'}
                                                                    placeholder={'Service Type'}
                                                                    onChange={this.handleServiceTypeChange}
                                                                    onValueClick={this.handleServiceTypeValueClick}
                                                                    onBlur={this.handleBlur}
                                                                    isEnabled={this.state.serviceTypeList.length > 0 ? true : false}
                                                                />
                                                                {this.state.serviceTypeCheck ? <span className="errorMessage-add">{this.state.serviceTypeerrMsg} </span> : ''}
                                                            </div> : null
                                                    }
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={24} className='global-font'>
                                                <Grid item xs={12} className='grid-no-bottom-padding'>
                                                    <p><b>Reason Code </b></p>
                                                </Grid>
                                                <Grid item xs={6} className='grid-no-top-padding grid-error'>
                                                    <Selectable
                                                        id="transactionType"
                                                        isRequired
                                                        searchable={true}
                                                        label='Reason Code'
                                                        value={this.state.transactionType}
                                                        options={transactionTypeList}
                                                        noResultsText="No Reason Codes Found"
                                                        searchBy={'any'}
                                                        placeholder={'Reason Code'}
                                                        onChange={this.handleTransactionTypeChange}
                                                        onValueClick={this.handleTransactionTypeValueClick}
                                                        onBlur={this.handleBlur}
                                                    />
                                                    {this.state.transactionTypeCheck ? <span className="errorMessage-add">{this.state.transactionTypeerrMsg} </span> : ''}
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={24} className='global-font'>
                                                <Grid item xs={4} className='grid-no-top-padding'>
                                                    <CheckBox umLabelClass={classes.headingtitle}  id="Commission" isChecked={this.state.commissionchecked} onChange={this.handleTextfieldChange} label="Commission" />
                                                </Grid>
                                                <Grid item xs={4} className='grid-no-top-padding'>
                                                    <CheckBox umLabelClass={classes.headingtitle}  id="tax" style={{ fontFamily: 'Gotham-Rounded'}}  isChecked={this.state.taxchecked} onChange={this.handleTextfieldChange} label="Tax" />
                                                </Grid>
                                                <Grid item xs={4} className='grid-no-top-padding'>
                                                    <CheckBox umLabelClass={classes.headingtitle}  id="otherChanges"  isChecked={this.state.otherchangeschecked} onChange={this.handleTextfieldChange} label="Other Charges" />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={24} className='global-font'>
                                                <Grid item xs={4} className='grid-no-top-padding'>
                                                    <CheckBox umLabelClass={classes.headingtitle} id="cardchanges" isChecked={this.state.cardchangeschecked} onChange={this.handleTextfieldChange} label="Card Charges" />
                                                </Grid>
                                                <Grid item xs={4} className='grid-no-top-padding'>
                                                    <CheckBox umLabelClass={classes.headingtitle} id="additionalCharges" isChecked={this.state.additionalchargeschecked} onChange={this.handleTextfieldChange} label="Additional Charges" />
                                                </Grid>
                                                <Grid item xs={4} className='grid-no-top-padding'>
                                                    <CheckBox umLabelClass={classes.headingtitle}  id="PayInAmount" isChecked={true} isEnabled={false} label="Pay In Amount" />
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={24} className='global-font'>
                                                <Grid item xs={12} className='grid-no-bottom-padding'>
                                                    <p umLabelClass={classes.headingtitle} ><b>Replicate Rule</b></p>
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
                                                    <p className="toggle-alignment"><strong >Replicate Rule to Other Agent and Agent Branches</strong>: No </p>
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
                                                                                        <FloatButton iconStyle={{fontSize:20}} icon="delete" style={{ "margin-right": "10px", height: 32, width: 32, backgroundColor: '#c03018' }} onClick={(e) => this.handleDeleteAgentRule(index)} />
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
                                                        <TextButton className="global-font save-clear" id="defaultTextButton" umStyle="default" onClick={this.handleClear} isEnabled={this.state.clearDisabled} style={{ marginRight: "10px" }}>Clear</TextButton>
                                                        <TextButton className="global-font save-clear" id="disabledTextButton" umSize="small" onClick={this.handleData} isEnabled={this.state.saveDisabled}>Save</TextButton>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        {
                                            this.state.confirmDelete ? <ModalBox isOpen={this.state.confirmDelete} fromAction={this.state.fromAction} actionType="Yes" message={(this.state.modalMessage)} modalAction={this.handleModalResponse} /> : null
                                        }
                                        {/* {
                                            this.state.snackbar ? <Snackbarcomp message={this.state.snackbarMsg} isOpen={this.state.snackbar} /> : null
                                        } */}
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

                                    </TabContainer>
                                </div>
                        ]
                }
            </MuiThemeProvider>
        );
    }
}

CreateChargeRules.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateChargeRules);
