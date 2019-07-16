import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import '../../vendor/common.css';
import '../../theme/theme';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Loader from './../../component/Loader';
import ModalBox from './../../component/Modalbox';
import { Button, TextButton,Toggle,Selectable, OutLineButton, FloatButton,Notifications, IconButton } from 'finablr-ui';
import * as APISettlementService from './APISettlementService';
import * as Exceptionhandler from './../../ExceptionHandling';
import Snackbarcomp from './../../component/snackbar';
import ErrorModalBox from '../../component/ErrorModalbox';
import getMuiTheme from "../../theme/theme";
import { MuiThemeProvider } from '@material-ui/core/styles';
import EmptyListComponent from '../../component/EmptylistComponent';
import MultiSelectTextField from '../../container/MultiSelectTextField';
import Breadcrumps from '../../component/Breadcrumps';
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

class CreateSettlementCurrency extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      loading: true,
      loaderMessage: 'Retrieving Data',
      serviceProviderList: [],
      serviceProviderData: {},
      serviceProvider: '',
      serviceProviderDisabled: true,
      transactionType: '',
      transactionTypeData: {},
      transactionTypeerrMsg: "",
      transactionTypeList: [],
      countryList: [],
      countryData: {},
      country: '',
      countryDisabled: true,
      currencyList: [],
      payinCurrencyCodeData: {},
      payinCurrencyCode: '',
      payinCurrencyCodeDisabled: true,
      serviceProviderCurrencyList: [],
      serviceProviderCurrencyData: {},
      serviceProviderCurrency: '',
      serviceProviderCurrencyDisabled: true,
      settlementCurrencyCodeList: [],
      settlementCurrencyCodeData: {},
      settlementCurrencyCode: '',
      settlementCurrencyCodeDisabled: true,
      passSettlementCurrencyCodeList: [],
      passSettlementCurrencyCodeData: {},
      passSettlementCurrencyCode: '',
      passSettlementCurrencyCodeDisabled: true,
      custTypeCountryArr: [],
      agentsList: [],
      notificationType:'success',
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
      breadcrumps: [],
    };
  }

  componentDidMount() {
    this.getAgentProfile();
    this.handleSaveEnable();
    this.handleClearEnable();
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
      APISettlementService.getAgentProfile(this.props.match.params.agentid,headers)
      .then((response) => {
        if (response.status == 200) {
          console.log(response);
          this.setState({ agentProfile: response.data }, () => {
            let breadcrumps = [{ link: '/agentprofiles', text: 'Agent Profiles' }, { link: '/agentprofiles/' + this.props.match.params.agentid + `?tabId=${0}`, text: response.data.name + ' ('+this.props.match.params.agentid+')' }, { link: '#', text: 'Create' }];
            this.setState({ breadcrumps });
            this.fetchServiceProviderList();
          });
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

  fetchServiceProviderList = () => {
    let serviceProviderList = [];
    if(sessionStorage.getItem('token') == undefined){
      window.location.replace(config.PAAS_LOGIN_URL);
      return (<h1>401 - Unauthorized Request</h1>)
    }
    else{
      let headers = {
        Authorization:sessionStorage.getItem('token')
      }
      APISettlementService.serviceProviderList(headers).then((response) => {
        console.log(response)
        if (response.data.length > 0) {
          response.data.map((obj) => {
            let serviceProvider = {};
            serviceProvider.id = obj.id;
            serviceProvider.label = obj.serviceProvider;
            serviceProvider.value = obj.code;
            serviceProviderList.push(serviceProvider);
          })
          this.setState({ serviceProviderList, serviceProviderDisabled: true }, () => {
            //console.log(this.state.serviceProviderList);
            this.fetchProductsList();
          });
        }
        else {
          this.setState({ serviceProviderDisabled: false })
          alert('No serviceprovider records found');
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
      APISettlementService.ProductList(headers).then((response) => {
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
            this.setState({ productsList }, () => {
              // console.log(this.state.productsList);
              this.fetchCurrencyCodesList();
            });
          }
          else {
            this.setState({ productTypeDisabled: false },()=>{
              this.fetchCurrencyCodesList();
            });
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

  fetchCurrencyCodesList = () => {
    let currencyList = [];
    if(sessionStorage.getItem('token') == undefined){
      window.location.replace(config.PAAS_LOGIN_URL);
      return (<h1>401 - Unauthorized Request</h1>)
    }
    else{
      let headers = {
        Authorization:sessionStorage.getItem('token')
      }
      APISettlementService.CurrencyCodesList(headers).then((response) => {
        console.log(response);
        if (response.data.length > 0) {
          response.data.map((obj) => {
            let payinCurrencyCode = {};
            payinCurrencyCode.id = obj.id;
            payinCurrencyCode.label = obj.code + ' - ' + obj.currencyName;
            payinCurrencyCode.value = obj.code;
            currencyList.push(payinCurrencyCode);
          })
          this.setState({ currencyList, payinCurrencyCodeDisabled: true }, () => {
            //console.log(this.state.serviceProviderList);
            this.fetchCountryList();
          });
        }
        else {
          this.setState({ payinCurrencyCodeDisabled: false })
          alert('No Payin Currency Code records found');
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

  fetchCountryList = () => {
    let countryList = [];
    if(sessionStorage.getItem('token') == undefined){
      window.location.replace(config.PAAS_LOGIN_URL);
      return (<h1>401 - Unauthorized Request</h1>)
    }
    else{
      let headers = {
        Authorization:sessionStorage.getItem('token')
      }
      APISettlementService.countryList(headers).then((response) => {
        console.log(response);
        if (response.data.length > 0) {
          response.data.map((obj) => {
            let country = {};
            country.id = obj.id;
            country.label = obj.name + ' - ' + obj.countryCode;
            country.value = obj.countryCode;
            countryList.push(country);
          })
          this.setState({ countryList, countryDisabled: true }, () => {
            //console.log(this.state.serviceProviderList);
            this.fetchAgents();
          });
        }
        else {
          this.setState({ countryDisabled: false })
          alert('no country records found');
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

  fetchAgents = () => {
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
      this.setState({ loading: true, loaderMessage: 'Retrieving Agents' }, () => {
        APISettlementService.getAllAgentsProfiles(params,headers)
          .then((response) => {
            console.log(response);
            console.log("Agents List");
            if (response.status == 200) {
              if (response.data.data.length > 0) {
                response.data.data.map((obj) => {
                  let agents = {};
                  agents.id = obj.id;
                  agents.label = obj.name;
                  agents.value = obj.displayName;
                  agentsList.push(agents);
                })
                this.setState({ agentsList, agentsDisabled: false, snackbar: false, loading: false }, () => {
                  //console.log(this.state.agentsList);
                });
              }
              else {
                this.setState({ serviceProviderDisabled: true, loading: false, snackbar: true,notificationType:'warning', snackbarMsg: 'no agent branches records found' })
                alert('No agent branches records found');
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

  handleSaveEnable = () => {
    if (
      (Object.keys(this.state.serviceProviderData).length == 0) ||
      (Object.keys(this.state.subProductTypeData).length == 0) ||
      ((this.state.serviceTypeList.length > 0) && ((Object.keys(this.state.serviceTypeData).length == 0))) ||
      (Object.keys(this.state.transactionTypeData).length == 0) ||
      (Object.keys(this.state.countryData).length == 0) ||
      (Object.keys(this.state.payinCurrencyCodeData).length == 0) ||
      (Object.keys(this.state.serviceProviderCurrencyData).length == 0) ||
      (Object.keys(this.state.settlementCurrencyCodeData).length == 0) ||
      (Object.keys(this.state.passSettlementCurrencyCodeData).length == 0)
    ) {
      this.setState({ saveDisabled: false })
    }
    else {
      this.setState({ saveDisabled: true })
    }
  }

  handleClearEnable = () => {
    if ((Object.keys(this.state.serviceProviderData).length > 0) ||
      (Object.keys(this.state.subProductTypeData).length > 0) ||
      ((this.state.serviceTypeList.length > 0) && ((Object.keys(this.state.serviceTypeData).length > 0))) ||
      (Object.keys(this.state.transactionTypeData).length > 0) ||
      (Object.keys(this.state.countryData).length > 0) ||
      (Object.keys(this.state.payinCurrencyCodeData).length > 0) ||
      (Object.keys(this.state.serviceProviderCurrencyData).length > 0) ||
      (Object.keys(this.state.settlementCurrencyCodeData).length > 0) ||
      (Object.keys(this.state.passSettlementCurrencyCodeData).length > 0))
     {
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
    let data = {};
    data.serviceProviderName = this.state.serviceProviderData.label;
    data.serviceProviderCode = this.state.serviceProviderData.value;
    data.productType = this.state.productType;
    data.subProductType = this.state.subProductTypeData.value;
    data.transactionType = this.state.transactionTypeData.value;
    data.country = this.state.countryData.value;
    data.countryId = this.state.countryData.id;
    data.paasSettlementCurrency = {
      id: this.state.passSettlementCurrencyCodeData.id,
      name: this.state.passSettlementCurrencyCodeData.value,
    }
    data.payInCurrencyCode = {
      id: this.state.payinCurrencyCodeData.id,
      name: this.state.payinCurrencyCodeData.value
    }
    data.serviceProviderCurrency = {
      id: this.state.serviceProviderCurrencyData.id,
      name: this.state.serviceProviderCurrencyData.value,
    }
    data.settlementCurrency = {
      id: this.state.settlementCurrencyCodeData.id,
      name: this.state.settlementCurrencyCodeData.value,
    }
    data.agentIds = [];
    if (this.state.replicateAgent) {
      if (this.state.custTypeCountryArr.length > 0) {
        this.state.custTypeCountryArr.map((obj) => {
          data.agentIds.push(obj.id);
        })
      }
    }
    if (this.state.subProductTypeData.value == 'Cash payout' || this.state.subProductTypeData.value == 'Account Credit') {
      data.serviceType = this.state.serviceTypeData.value;
    }
    data.status = (this.state.status == true) ? 'ENABLED' : 'DISABLED';
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
        APISettlementService.CreateSettlementCurrency(data, this.props.match.params.agentid,headers).then((response) => {
          if (response.status == 200) {
            console.log(response);
            let snackbarMsg = (this.state.replicateAgent) ? 'The rule has been replicated to the agents branches and will be available under them.' : 'Settlement Currency is Created Successfully.';
      
            this.setState({ serverError: false, loading: false, loaderMessage: '',notificationType:'success', snackbar: true, snackbarMsg: snackbarMsg }, () => {
              setTimeout(() => {
                this.props.history.push(`/agentprofiles/${this.props.match.params.agentid}?tabId=${0}`)
              }, 1200)
            });
          }
        })
        .catch(error => {
          if(Exceptionhandler.throwErrorType(error).status == 401){
            window.location.replace(config.PAAS_LOGIN_URL);
            return (<h1>401 - Unauthorized Request</h1>)
          }
          else if (Exceptionhandler.throwErrorType(error).status == 500 || Exceptionhandler.throwErrorType(error).status == 503 || Exceptionhandler.throwErrorType(error).status == 400) {
            this.setState({ loading: false, shownogeneralrules: true, serverError: false, apiErrMsg: error.response.data.error, actionType: 'OK', serverStatus: Exceptionhandler.throwErrorType(error).status, serverErrMessage: Exceptionhandler.throwErrorType(error).message })
          }
          // else {
          //   this.setState({ loading: false, serverError: false, shownogeneralrules: true, apiErrMsg: error.response.data.error, actionType: 'OK' })
          // }
        });
      })
    }
  }

  handleClear = () => {
    this.setState({ confirmDelete: false, snackbar: false }, () => {
      if (this.state.serviceProvider != undefined ||
        this.state.subProductType != undefined || this.state.serviceType !== undefined ||
        this.state.country != undefined || this.state.transactionType != undefined ||
        this.state.payinCurrencyCode != undefined || this.state.serviceProviderCurrency != undefined ||
        this.state.settlementCurrencyCode != undefined || this.state.passSettlementCurrencyCode == undefined ||
        this.state.replicateAgent == true) {
        this.setState({ confirmDelete: true, fromAction: 'clear', modalMessage: 'This will clear all data. Are you sure you want to continue?' })
      }
    })
  }

  handleModalResponse = (data, from) => {
    if (data == true && from == 'clear') {
      this.setState({
        confirmDelete: false,
        serviceProvider: undefined,
        serviceProviderData: {},
        serviceProviderCheck: false,
        serviceProvidererrMsg: '',
        transactionType: undefined,
        country: undefined,
        countryData: {},
        countryCheck: false,
        countryerrMsg: '',
        payinCurrencyCode: undefined,
        payinCurrencyCodeData: {},
        payinCurrencyCodeCheck: false,
        payinCurrencyCodeerrMsg: '',
        serviceProviderCurrency: undefined,
        serviceProviderCurrencyData: {},
        serviceProviderCurrencyCheck: false,
        serviceProviderCurrencyerrMsg: '',
        settlementCurrencyCode: undefined,
        settlementCurrencyCodeData: {},
        settlementCurrencyCodeCheck: false,
        settlementCurrencyCodeerrMsg: '',
        passSettlementCurrencyCode: undefined,
        passSettlementCurrencyCodeData: {},
        passSettlementCurrencyCodeCheck: false,
        passSettlementCurrencyCodeerrMsg: '',
        productTypeCheck: false,
        productTypeerrMsg: false,
        subProductType: undefined,
        subProductTypeData: {},
        subProductTypeCheck: false,
        subProductTypeerrMsg: '',
        serviceType: undefined,
        serviceTypeData: {},
        serviceTypeCheck: false,
        serviceTypeerrMsg: '',
        serviceTypeDisabled: false,
        serviceTypeList:[],
        status: true,
        snackbar: false,
        saveDisabled: false,
        clearDisabled:false,

        fromAction: '',
        shownogeneralrules: false,
        apiErrMsg: '',
        replicateAgent: false,
      }, () => {
        let replicateAgentsData = [];
        let obj = this.state.newPushObj;
        replicateAgentsData.push(obj);
        this.setState({ replicateAgentsData });
      })
    }

    else {
      this.setState({ confirmDelete: true }, () => {
        //this.props.modalAction(null,'Try Again closed');
      });
    }
  }

  handleStatusResponse = (data) => {
    if (data == true) {
      this.setState({ shownogeneralrules: false }, () => {
      });
    }
  }

  handleServiceProviderChange = (e) => {
    this.setState({ serviceProvider: e, serviceProviderCheck: false }, () => {
      if (this.state.serviceProvider == undefined) {
        this.setState({ serviceProviderCheck: true, serviceProvidererrMsg: 'Service Provider can not be empty', serviceProviderData:{} })
      }
      else if (this.state.serviceProvider.length == 0) {
        this.setState({ serviceProviderCheck: true, serviceProvidererrMsg: 'Service Provider can not be empty', serviceProviderData:{} })
      }
      else if(this.state.serviceProvider.length > 0){
        this.state.serviceProviderList.map((obj)=>{
          if(this.state.serviceProvider == obj.value){
            this.setState({serviceProvider:obj.value,serviceProviderData:obj,serviceProviderCheck:false},()=>{
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

  handleServiceProviderValueClick = (e) => {
    let value = e.value;
    this.setState({ serviceProviderData: e, serviceProvider: value }, () => {
      this.handleSaveEnable();
      this.handleClearEnable();

    })
  }

  handleCountryChange = (e) => {
    this.setState({ country: e, countryCheck: false }, () => {
      if (this.state.country == undefined) {
        this.setState({ countryCheck: true, countryerrMsg: 'Country can not be empty', countryData:{} },()=>{
          this.handleSaveEnable();
          this.handleClearEnable();

        })
      }
      else if (this.state.country.length == 0) {
        this.setState({ countryCheck: true, countryerrMsg: 'Country can not be empty', countryData:{} },()=>{
          this.handleSaveEnable();
          this.handleClearEnable();

        })
      }
      else if(this.state.country.length > 0){
        this.state.countryList.map((obj)=>{
          if(this.state.country == obj.value){
            this.setState({country:obj.value,countryCheck:false,countryData:obj},()=>{
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

  handleCountryValueClick = (e) => {
    let value = e.value;
    this.setState({ countryData: e, country: value }, () => {
      this.handleSaveEnable();
      this.handleClearEnable();

    })
  }

  handlePayinCurrencyCodeChange = (e) => {
    this.setState({ payinCurrencyCode: e, payinCurrencyCodeCheck: false }, () => {
      if (this.state.payinCurrencyCode == undefined) {
        this.setState({ payinCurrencyCodeCheck: true, payinCurrencyCodeerrMsg: 'PayIn Currency Code can not be empty' },()=>{
          this.handleSaveEnable();
          this.handleClearEnable();

        })
      }
      else if (this.state.payinCurrencyCode.length == 0) {
        this.setState({ payinCurrencyCodeCheck: true, payinCurrencyCodeerrMsg: 'PayIn Currency Code can not be empty' },()=>{
          this.handleSaveEnable();
          this.handleClearEnable();

        })
      }
      else if(this.state.payinCurrencyCode.length > 0){
        this.state.currencyList.map((obj)=>{
          if(this.state.payinCurrencyCode == obj.value){
            this.setState({payinCurrencyCode:obj.value,payinCurrencyCodeData:obj,payinCurrencyCodeCheck:false},()=>{
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

  handlePayinCurrencyCodeValueClick = (e) => {
    let value = e.value;
    this.setState({ payinCurrencyCodeData: e, payinCurrencyCode: value }, () => {
      this.handleSaveEnable();
      this.handleClearEnable();

    })
  }

  handleServiceProviderCurrencyChange = (e) => {
    this.setState({ serviceProviderCurrency: e, serviceProviderCurrencyCheck: false }, () => {
      if (this.state.serviceProviderCurrency == undefined) {
        this.setState({ serviceProviderCurrencyCheck: true, serviceProviderCurrencyerrMsg: 'Service Provider Currency can not be empty', serviceProviderCurrencyData:{} },()=>{
          this.handleSaveEnable();
          this.handleClearEnable();

        })
      }
      else if (this.state.serviceProviderCurrency.length == 0) {
        this.setState({ serviceProviderCurrencyCheck: true, serviceProviderCurrencyerrMsg: 'Service Provider Currency can not be empty', serviceProviderCurrencyData:{} },()=>{
          this.handleSaveEnable();
          this.handleClearEnable();

        })
      }
      else if(this.state.serviceProviderCurrency.length > 0){
        this.state.currencyList.map((obj)=>{
          if(this.state.serviceProviderCurrency == obj.value){
            this.setState({serviceProviderCurrency:obj.value,serviceProviderCurrencyData:obj,serviceProviderCurrencyCheck:false},()=>{
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

  handleServiceProviderCurrencyValueClick = (e) => {
    let value = e.value;
    this.setState({ serviceProviderCurrencyData: e, serviceProviderCurrency: value }, () => {
      this.handleSaveEnable();
      this.handleClearEnable();

    })
  }

  handleSettlementCurrencyCodeChange = (e) => {
    this.setState({ settlementCurrencyCode: e, settlementCurrencyCodeCheck: false }, () => {
      if (this.state.settlementCurrencyCode == undefined) {
        this.setState({ settlementCurrencyCodeCheck: true, settlementCurrencyCodeerrMsg: 'Settlement Currency Code can not be empty', settlementCurrencyCodeData:{} },()=>{
          this.handleSaveEnable();
          this.handleClearEnable();

        })
      }
      else if (this.state.settlementCurrencyCode.length == 0) {
        this.setState({ settlementCurrencyCodeCheck: true, settlementCurrencyCodeerrMsg: 'Settlement Currency Code can not be empty',settlementCurrencyCodeData:{} },()=>{
          this.handleSaveEnable();
          this.handleClearEnable();

        })
      }
      else if(this.state.settlementCurrencyCode.length > 0){
        this.state.currencyList.map((obj)=>{
          if(this.state.settlementCurrencyCode == obj.value){
            this.setState({settlementCurrencyCode:obj.value,settlementCurrencyCodeData:obj,settlementCurrencyCodeCheck:false},()=>{
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

  handleSettlementCurrencyCodeValueClick = (e) => {
    let value = e.value;
    this.setState({ settlementCurrencyCodeData: e, settlementCurrencyCode: value }, () => {
      this.handleSaveEnable();
      this.handleClearEnable();

    })
  }

  handlePassSettlementCurrencyCodeChange = (e) => {
    this.setState({ passSettlementCurrencyCode: e, passSettlementCurrencyCodeCheck: false }, () => {
      if (this.state.passSettlementCurrencyCode == undefined) {
        this.setState({ passSettlementCurrencyCodeCheck: true, passSettlementCurrencyCodeerrMsg: 'Pass Settlement Currency Code can not be empty',passSettlementCurrencyCodeData:{} },()=>{
          this.handleSaveEnable();
          this.handleClearEnable();

        })
      }
      else if (this.state.passSettlementCurrencyCode.length == 0) {
        this.setState({ passSettlementCurrencyCodeCheck: true, passSettlementCurrencyCodeerrMsg: 'Pass Settlement Currency Code can not be empty',passSettlementCurrencyCodeData:{} },()=>{
          this.handleSaveEnable();
          this.handleClearEnable();

        })
      }
      else if(this.state.passSettlementCurrencyCode.length > 0){
        this.state.currencyList.map((obj)=>{
          if(this.state.passSettlementCurrencyCode == obj.value){
            this.setState({passSettlementCurrencyCode:obj.value,passSettlementCurrencyCodeData:obj,passSettlementCurrencyCodeCheck:false},()=>{
              this.handleSaveEnable();
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

  handlePassSettlementCurrencyCodeValueClick = (e) => {
    let value = e.value;
    this.setState({ passSettlementCurrencyCodeData: e, passSettlementCurrencyCode: value }, () => {
      this.handleSaveEnable();
      this.handleClearEnable();

    })
  }

  handleChangeAgents = (data, id) => {
    let index = parseInt(id.replace('agents', ''));
    let replicateAgentsData = this.state.replicateAgentsData;
    replicateAgentsData[index].agents = data;
    this.setState({ replicateAgentsData });
  }

  handleViewAgents = (data, id) => {
    let index = parseInt(id.replace('agents', ''));
    let replicateAgentsData = this.state.replicateAgentsData;
    replicateAgentsData[index].agents = data;
    this.setState({ replicateAgentsData });
  }

  handleBlur = (e) => {
    console.log(e.target.id);
    switch (e.target.id) {
      case 'serviceProvider':
        this.setState({ serviceProviderCheck: false }, () => {
          if (this.state.serviceProvider == undefined) {
            this.setState({ serviceProviderCheck: true, serviceProvidererrMsg: 'Service Provider can not be empty', serviceProviderData:{} }, () => {
              this.handleSaveEnable();
              this.handleClearEnable();

            })
          }
          else if (this.state.serviceProvider.length == 0) {
            this.setState({ serviceProviderCheck: true, serviceProvidererrMsg: 'Service Provider can not be empty', serviceProviderData:{} }, () => {
              this.handleSaveEnable();
              this.handleClearEnable();

            })
          }
          else {
            this.handleSaveEnable();
            this.handleClearEnable();

          }
        })
      break;
      case 'productType':
        this.setState({ productTypeCheck: false }, () => {
          if (this.state.productType == undefined) {
            this.setState({ productTypeCheck: true, productTypeerrMsg: 'ProductType can not be empty' }, () => {
              this.handleSaveEnable();
              this.handleClearEnable();

            })
          }
          else if (this.state.productType.length == 0) {
            this.setState({ productTypeCheck: true, productTypeerrMsg: 'ProductType can not be empty' }, () => {
              this.handleSaveEnable();
              this.handleClearEnable();

            })
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
            this.setState({ subProductTypeCheck: true, subProductTypeerrMsg: 'Sub Product Type can not be empty', subProductTypeData:{} }, () => {
              this.handleSaveEnable();
              this.handleClearEnable();

            })
          }
          else if (this.state.subProductType.length == 0) {
            this.setState({ subProductTypeCheck: true, subProductTypeerrMsg: 'Sub Product Type can not be empty',subProductTypeData:{} }, () => {
              this.handleSaveEnable();
              this.handleClearEnable();

            })
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
            this.setState({ serviceTypeCheck: true, serviceTypeerrMsg: 'Service Type can not be empty',serviceTypeData:{} }, () => {
              this.handleSaveEnable();
              this.handleClearEnable();

            })
          }
          else {
            this.handleSaveEnable();
            this.handleClearEnable();

          }
        })
      break;
      case 'transactionType':
        this.setState({ transactionTypeCheck: false }, () => {
          if (this.state.transactionType == undefined) {
            this.setState({ transactionTypeCheck: true, transactionTypeerrMsg: 'Transaction Type can not be empty', transactionTypeData:{} }, () => {
              this.handleSaveEnable();
              this.handleClearEnable();

            })

          }
          else if (this.state.transactionType.length == 0) {
            this.setState({ transactionTypeCheck: true, transactionTypeerrMsg: 'Transaction Type can not be empty', transactionTypeData:{} }, () => {
              this.handleSaveEnable();
              this.handleClearEnable();

            })
          }
          else {
            this.handleSaveEnable();
            this.handleClearEnable();

          }
        })
      break;
      case 'country':
        this.setState({ countryCheck: false }, () => {
          if (this.state.country == undefined) {
            this.setState({ countryCheck: true, countryerrMsg: 'Country can not be empty',countryData:{} }, () => {
              this.handleSaveEnable();
              this.handleClearEnable();

            })
          }
          else if (this.state.country.length == 0) {
            this.setState({ countryCheck: true, countryerrMsg: 'Country can not be empty',countryData:{} }, () => {
              this.handleSaveEnable();
              this.handleClearEnable();

            })
          }
          else {
            this.handleSaveEnable();
            this.handleClearEnable();

          }
        })
      break;
      case 'payinCurrencyCode':
        this.setState({ payinCurrencyCodeCheck: false }, () => {
          if (this.state.payinCurrencyCode == undefined) {
            this.setState({ payinCurrencyCodeCheck: true, payinCurrencyCodeerrMsg: 'PayIn Currency Code can not be empty', payinCurrencyCodeData:{} }, () => {
              this.handleSaveEnable();
              this.handleClearEnable();

            })
          }
          else if (this.state.payinCurrencyCode.length == 0) {
            this.setState({ payinCurrencyCodeCheck: true, payinCurrencyCodeerrMsg: 'PayIn Currency Code can not be empty',payinCurrencyCodeData:{} }, () => {
              this.handleSaveEnable();
              this.handleClearEnable();

            })
          }
          else {
            this.handleSaveEnable();
            this.handleClearEnable();

          }
        })
      break;
      case 'serviceProviderCurrency':
        this.setState({ serviceProviderCurrencyCheck: false }, () => {
          if (this.state.serviceProviderCurrency == undefined) {
            this.setState({ serviceProviderCurrencyCheck: true, serviceProviderCurrencyerrMsg: 'Service Provider Currency can not be empty',serviceProviderData:{} }, () => {
              this.handleSaveEnable();
              this.handleClearEnable();

            })
          }
          else if (this.state.serviceProviderCurrency.length == 0) {
            this.setState({ serviceProviderCurrencyCheck: true, serviceProviderCurrencyerrMsg: 'Service Provider Currency can not be empty',serviceProviderData:{} }, () => {
              this.handleSaveEnable();
              this.handleClearEnable();

            })
          }
          else {
            this.handleSaveEnable();
            this.handleClearEnable();

          }
        })
      break;
      case 'settlementCurrencyCode':
        this.setState({ settlementCurrencyCodeCheck: false }, () => {
          if (this.state.settlementCurrencyCode == undefined) {
            this.setState({ settlementCurrencyCodeCheck: true, settlementCurrencyCodeerrMsg: 'Settlement Currency Code can not be empty',settlementCurrencyCodeData:{} }, () => {
              this.handleSaveEnable();
              this.handleClearEnable();

            })
          }
          else if (this.state.settlementCurrencyCode.length == 0) {
            this.setState({ settlementCurrencyCodeCheck: true, settlementCurrencyCodeerrMsg: 'Settlement Currency Code can not be empty',settlementCurrencyCodeData:{} }, () => {
              this.handleSaveEnable();
              this.handleClearEnable();

            })
          }
          else {
            this.handleSaveEnable();
            this.handleClearEnable();

          }
        })
      break;
      case 'passSettlementCurrencyCode':
        this.setState({ passSettlementCurrencyCodeCheck: false }, () => {
          if (this.state.passSettlementCurrencyCode == undefined) {
            this.setState({ passSettlementCurrencyCodeCheck: true, passSettlementCurrencyCodeerrMsg: 'Pass Settlement Currency Code can not be empty',passSettlementCurrencyCodeData:{} }, () => {
              this.handleSaveEnable();
              this.handleClearEnable();

            })
          }
          else if (this.state.passSettlementCurrencyCode.length == 0) {
            this.setState({ passSettlementCurrencyCodeCheck: true, passSettlementCurrencyCodeerrMsg: 'Pass Settlement Currency Code can not be empty',passSettlementCurrencyCodeData:{} }, () => {
              this.handleSaveEnable();
              this.handleClearEnable();

            })
          }
          else {
            this.handleSaveEnable();
            this.handleClearEnable();

          }
        })
      break;
    }
  }

  handleTextfieldChange = (e, value) => {
    let pattern = /^[0-9]+$/i;
    switch (e.target.id) {
      case 'replicateAgent':
        this.setState({ replicateAgent: value }, () => {
          if (this.state.replicateAgent == true) {
            this.fetchAgents();
          }
          else {
            this.setState({ custTypeCountryArr: [] })
          }
        })
        break;
      case 'status':
        this.setState({ status: value });
        break;
    }
  }

  handleChangeCustAgents = (data) => {
    this.setState({ custTypeCountryArr: data })
  }

  handleViewCustAgentsValues = (data) => {
    this.setState({ custTypeCountryArr: data })
  }

  handleProductTypeChange = (e) => {
    this.setState({ productType: e, productTypeCheck: false }, () => {
      if (this.state.productType == undefined) {
        this.setState({ productTypeCheck: true, productTypeerrMsg: 'ProductType can not be empty' }, () => {
          this.handleSaveEnable();
          this.handleClearEnable();

        })
      }
      else if (this.state.productType.length == 0) {
        this.setState({ productTypeCheck: true, productTypeerrMsg: 'ProductType can not be empty' }, () => {
          this.handleSaveEnable();
          this.handleClearEnable();

        })
      }
    });
  }

  handleProductTypeValueClick = (e) => {
    let value = e.value;
    this.setState({ productTypeData: e, productType: value, snackbar: false }, () => {
    })
  }

  handleSubProductTypeChange = (e) => {
    this.setState({ subProductType: e, subProductTypeCheck: false }, () => {
      if (this.state.subProductType == undefined) {
        this.setState({ subProductTypeCheck: true, subProductTypeerrMsg: 'Sub Product Type can not be empty', subProductTypeData:{}, serviceTypeList:[], serviceType:undefined, serviceTypeData:{} }, () => {
          this.handleSaveEnable();
          this.handleClearEnable();

        })
      }
      else if (this.state.subProductType.length == 0) {
        this.setState({ subProductTypeCheck: true, subProductTypeerrMsg: 'Sub Product Type can not be empty', subProductTypeData:{}, serviceTypeList:[],serviceType:undefined, serviceTypeData:{} }, () => {
          this.handleSaveEnable();
          this.handleClearEnable();

        })
      }
      else if(this.state.subProductType.length > 0){
        this.state.subProductsList.map((obj)=>{
          if(this.state.subProductType == obj.value){
            this.setState({ subProductTypeData: obj, subProductType: obj.value, subProductTypeCheck:false, snackbar: false, serviceTypeList: [] }, () => {
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
                      this.setState({ serviceTypeList, serviceTypeDisabled: true }, () => {
                        this.handleSaveEnable();
                        this.handleClearEnable();

                      })
                    }
                  }
                }
              })
              if (count == 0) {
                this.setState({ snackbar: true,notificationType:'warning', snackbarMsg: 'No service types found', serviceTypeDisabled: false, serviceTypeList: [] },()=>{
                  this.handleSaveEnable();
                  this.handleClearEnable();

                })
              }
            })
          }
        })
      }
    });
  }

  handleSubProductTypeValueClick = (e) => {
    let value = e.value;
    this.setState({ subProductTypeData: e, subProductType: value, snackbar: false, serviceTypeList: [] }, () => {
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
              this.setState({ serviceTypeList, serviceTypeDisabled: true }, () => {
                console.log(this.state.serviceTypeList);
              })
            }
          }
        }
      })
      if (count == 0) {
        this.setState({ snackbar: true,notificationType:'warning', snackbarMsg: 'No service types found', serviceTypeDisabled: false, serviceTypeList: [] })
      }
    })
  }

  handleServiceTypeChange = (e) => {
    this.setState({ serviceType: e, serviceTypeCheck: false }, () => {
      if (this.state.serviceType == undefined) {
        this.setState({ serviceTypeCheck: true, serviceTypeerrMsg: 'Service Type can not be empty' }, () => {
          this.handleSaveEnable();
          this.handleClearEnable();

        })
      }
      else if (this.state.serviceType.length == 0) {
        this.setState({ serviceTypeCheck: true, serviceTypeerrMsg: 'Service Type can not be empty' }, () => {
          this.handleSaveEnable();
          this.handleClearEnable();

        })
      }
      else if(this.state.serviceType.length > 0){
        this.state.serviceTypeList.map((obj)=>{
          if(this.state.serviceType == obj.value){
            this.setState({serviceType:obj.value,serviceTypeData:obj,serviceTypeCheck:false},()=>{
              this.handleSaveEnable();
              this.handleClearEnable();

            })
          }
        })
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
        this.setState({ transactionTypeCheck: true, transactionTypeerrMsg: 'Transaction Type can not be empty',transactionTypeData:{} }, () => {
          this.handleSaveEnable();
          this.handleClearEnable();

        })
      }
      else if (this.state.transactionType.length == 0) {
        this.setState({ transactionTypeCheck: true, transactionTypeerrMsg: 'Transaction Type can not be empty',transactionTypeData:{} }, () => {
          this.handleSaveEnable();
          this.handleClearEnable();

        })
      }
      else if(this.state.transactionType.length > 0){
        transactionTypeList.map((obj)=>{
          if(this.state.transactionType == obj.value){
            this.setState({transactionType:obj.value,transactionTypeData:obj,transactionTypeCheck:false},()=>{
              this.handleSaveEnable();
              this.handleClearEnable();

            })
          }
        })
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
                  <p className="bank-profile global-font" style={{ marginTop: 25, marginBottom: 30, color: `#19ace3` }}>Settlement Currency (Create)</p>
                  <TabContainer>
                    <div className={classes.root}>
                      <Grid container spacing={24} className='global-font'>
                        <Grid item xs={12} className='grid-no-bottom-padding'>
                          <p><b>SettlementCurrency</b></p>
                        </Grid>
                        <Grid item xs={6} className='grid-no-top-padding grid-error'>
                          <Selectable
                            id="serviceProvider"
                            isRequired
                            label='Service Provider'
                            searchable={true}
                            isClearable={true}
                            value={this.state.serviceProvider}
                            options={this.state.serviceProviderList}
                            noResultsText="No Service Provider Found"
                            searchBy={'any'}
                            placeholder={'Service Provider Code'}
                            onChange={this.handleServiceProviderChange}
                            onValueClick={this.handleServiceProviderValueClick}
                            onBlur={this.handleBlur}
                            isEnabled={this.state.serviceProviderDisabled}
                          />
                          {this.state.serviceProviderCheck ? <span className="errorMessage-add">{this.state.serviceProvidererrMsg} </span> : ''}
                        </Grid>
                      </Grid>
                      <Grid container spacing={24} className='global-font'>
                        <Grid item xs={12} className='grid-no-bottom-padding'>
                          <p><b>Product</b></p>
                        </Grid>
                        <Grid item xs={4} className='grid-no-top-padding'>
                          <Selectable
                            id="productType"
                            isRequired
                            label='Product Type'
                            searchable={true}
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
                                  isEnabled={this.state.serviceTypeDisabled}
                                />
                                {this.state.serviceTypeCheck ? <span className="errorMessage-add">{this.state.serviceTypeerrMsg} </span> : ''}
                              </div> 
                              : null
                          }
                        </Grid>
                      </Grid>
                      <Grid container spacing={24} className='global-font'>
                        <Grid item xs={12} className='grid-no-bottom-padding'>
                          <p><b>Transaction Type</b></p>
                        </Grid>
                        <Grid item xs={6} className='grid-no-top-padding grid-error'>
                          <Selectable
                            id="transactionType"
                            isRequired
                            label='Transaction Type'
                            searchable={true}
                            value={this.state.transactionType}
                            options={transactionTypeList}
                            noResultsText="No Transaction Types Found"
                            searchBy={'any'}
                            placeholder={'Transaction Type'}
                            onChange={this.handleTransactionTypeChange}
                            onValueClick={this.handleTransactionTypeValueClick}
                            onBlur={this.handleBlur}
                          />
                          {this.state.transactionTypeCheck ? <span className="errorMessage-add">{this.state.transactionTypeerrMsg} </span> : ''}
                        </Grid>
                      </Grid>

                      <Grid container spacing={24} className='global-font'>
                        <Grid item xs={12} className='grid-no-bottom-padding'>
                          <p><b>Currency Code</b></p>
                        </Grid>
                        <Grid item xs={6} className='grid-no-top-padding grid-error'>
                          <Selectable
                            id="payinCurrencyCode"
                            isRequired
                            searchable={true}
                            isClearable={true}
                            label='PayIn Currency Code'
                            value={this.state.payinCurrencyCode}
                            options={this.state.currencyList}
                            noResultsText="No payinCurrencyCode Found"
                            searchBy={'any'}
                            placeholder={'PayIn Currency Code'}
                            onChange={this.handlePayinCurrencyCodeChange}
                            onValueClick={this.handlePayinCurrencyCodeValueClick}
                            onBlur={this.handleBlur}
                            isEnabled={this.state.payinCurrencyCodeDisabled}
                          />
                          {this.state.payinCurrencyCodeCheck ? <span className="errorMessage-add">{this.state.payinCurrencyCodeerrMsg} </span> : ''}
                        </Grid>
                        <Grid item xs={6} className='grid-no-top-padding grid-error'>
                          <Selectable
                            id="serviceProviderCurrency"
                            isRequired
                            label='Service Provider Currency'
                            searchable={true}
                            isClearable={true}
                            value={this.state.serviceProviderCurrency}
                            options={this.state.currencyList}
                            noResultsText="No serviceProviderCurrency Found"
                            searchBy={'any'}
                            placeholder={'service Provider Currency'}
                            onChange={this.handleServiceProviderCurrencyChange}
                            onValueClick={this.handleServiceProviderCurrencyValueClick}
                            onBlur={this.handleBlur}
                            isEnabled={this.state.serviceProviderCurrencyDisabled}
                          />
                          {this.state.serviceProviderCurrencyCheck ? <span className="errorMessage-add">{this.state.serviceProviderCurrencyerrMsg} </span> : ''}
                        </Grid>
                        <Grid item xs={6} className='grid-no-top-padding grid-error'>
                          <Selectable
                            id="settlementCurrencyCode"
                            isRequired
                            label='Settlement Currency Code'
                            searchable={true}
                            isClearable={true}
                            value={this.state.settlementCurrencyCode}
                            options={this.state.currencyList}
                            noResultsText="No settlementCurrencyCode Found"
                            searchBy={'any'}
                            placeholder={'Settlement Currency Code'}
                            onChange={this.handleSettlementCurrencyCodeChange}
                            onValueClick={this.handleSettlementCurrencyCodeValueClick}
                            onBlur={this.handleBlur}
                            isEnabled={this.state.settlementCurrencyCodeDisabled}
                          />
                          {this.state.settlementCurrencyCodeCheck ? <span className="errorMessage-add">{this.state.settlementCurrencyCodeerrMsg} </span> : ''}
                        </Grid>
                        <Grid item xs={6} className='grid-no-top-padding grid-error'>
                          <Selectable
                            id="passSettlementCurrencyCode"
                            isRequired
                            label='Pass Settlement Currency Code'
                            searchable={true}
                            isClearable={true}
                            value={this.state.passSettlementCurrencyCode}
                            options={this.state.currencyList}
                            noResultsText="No passSettlementCurrencyCode Found"
                            searchBy={'any'}
                            placeholder={'Pass Settlement CurrencyCode'}
                            onChange={this.handlePassSettlementCurrencyCodeChange}
                            onValueClick={this.handlePassSettlementCurrencyCodeValueClick}
                            onBlur={this.handleBlur}
                            isEnabled={this.state.passSettlementCurrencyCodeDisabled}
                          />
                          {this.state.passSettlementCurrencyCodeCheck ? <span className="errorMessage-add">{this.state.passSettlementCurrencyCodeerrMsg} </span> : ''}
                        </Grid>
                      </Grid>
                      <Grid item xs={12} className='grid-no-bottom-padding'>
                        <p><b>Receiving Country</b></p>
                      </Grid>
                      <Grid item xs={6} className='grid-no-top-padding grid-error'>
                        <Selectable
                          id="country"
                          isRequired
                          label='Receiving Country'
                          searchable={true}
                          isClearable={true}
                          value={this.state.country}
                          options={this.state.countryList}
                          noResultsText="No Country Found"
                          searchBy={'any'}
                          placeholder={'Receiving Country'}
                          onChange={this.handleCountryChange}
                          onValueClick={this.handleCountryValueClick}
                          onBlur={this.handleBlur}
                          isEnabled={this.state.countryDisabled}
                        />
                        {this.state.countryCheck ? <span className="errorMessage-add">{this.state.countryerrMsg} </span> : ''}
                      </Grid>
                      <Grid container spacing={24} className='global-font'>
                        <Grid item xs={6}>
                          <p className="toggle-alignment"><strong>Replicate Rule to Other Agents</strong>: No </p>
                          <div className="toggle-alignment">
                            <Toggle isChecked={this.state.replicateAgent} id={'replicateAgent'} isEnabled={true} onChange={this.handleTextfieldChange} />
                          </div>
                          <p className="toggle-alignment">Yes</p>
                        </Grid>
                        {
                          this.state.replicateAgent ?
                            <Grid item xs={12}>
                              <MultiSelectTextField disabled={this.state.agentsDisabled} value={this.state.custTypeCountryArr} label='Agents' type='agents' suggestionFields={this.state.agentsList} placeholder={'Agents'} MultiSelectText='Agents' getAutoSelectValue={this.handleChangeCustAgents} getViewValues={this.handleViewCustAgentsValues} />
                            </Grid> : null
                        }
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
                            <TextButton className="global-font save-clear" isEnabled={this.state.clearDisabled} id="defaultTextButton" umStyle="default" onClick={this.handleClear}
                              style={{ marginRight: "10px" }}>Clear </TextButton>
                            <TextButton className="global-font save-clear"  id="disabledTextButton" umSize="small" onClick={this.handleData} isEnabled={this.state.saveDisabled}>
                              Save
                            </TextButton>
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

CreateSettlementCurrency.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateSettlementCurrency);
