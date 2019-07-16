import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import '../../vendor/common.css';
import '../../theme/theme';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Loader from './../../component/Loader';
import ModalBox from './../../component/Modalbox';
import {Toggle, Button, TextButton, OutLineButton, Selectable,FloatButton,Notifications, IconButton } from 'finablr-ui';
import * as APISettlementService from './APISettlementService';
import * as Exceptionhandler from './../../ExceptionHandling';
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

const queryString = require('query-string');
var parsed = null;

class EditSettlementCurrency extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    parsed = queryString.parse(props.location.search);
    this.state = {
      value:0,
      loading: true,
      loaderMessage: 'Retrieving Data',
      serviceProviderList: [],
      serviceProviderData: {},
      serviceProvider: '',
      serviceProviderDisabled: true,
      transactionType:'',
      transactionTypeData:{},
      transactionTypeerrMsg:"",
      transactionTypeList:[],
      countryList: [],
      countryData: {},
      country: '',
      countryDisabled: true,
      currencyList: [],
      payinCurrencyCodeData: {},
      payinCurrencyCode: '',
      payinCurrencyCodeDisabled: true,
      serviceProviderCurrencyList:[],
      serviceProviderCurrencyData:{},
      serviceProviderCurrency:'',
      serviceProviderCurrencyDisabled:true,
      settlementCurrencyCodeList:[],
      settlementCurrencyCodeData:{},
      settlementCurrencyCode:'',
      settlementCurrencyCodeDisabled:true,
      passSettlementCurrencyCodeList:[],
      passSettlementCurrencyCodeData:{},
      passSettlementCurrencyCode:'',
      passSettlementCurrencyCodeDisabled:true,
      custTypeCountryArr:[],
      agentsList:[],
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
      confirmDelete: false,
      fromAction: '',
      snackbarMsg: '',
      snackbar: false,
      shownogeneralrules: false,
      apiErrMsg: '',
      breadcrumps:[],
      notificationType:'success',
      editSettlementCurrencyProfile: {},
      breadcrumps: []
    }
  }

  componentDidMount() {
    console.log("Edit Settlement Currency")
    console.log(this.props);
    this.fetchgetSettlementCurrencyProfile();
    this.fetchCurrencyCodesList();
  }

  fetchgetSettlementCurrencyProfile = () => {
    if(sessionStorage.getItem('token') == undefined){
      window.location.replace(config.PAAS_LOGIN_URL);
      return (<h1>401 - Unauthorized Request</h1>)
    }
    else{
      let headers = {
        Authorization:sessionStorage.getItem('token')
      }
        APISettlementService.getSettlementCurrencyProfileView(this.props.match.params.agentid, this.props.match.params.settlementcurrencyid,headers)
        .then((response) => {
        console.log(response);
        if (response.status == 200) {
          this.setState({ editSettlementCurrencyProfile: response.data, }, () => {
            let breadcrumps = [];
            breadcrumps = [{link:'/agentprofiles',text:'Agent Profiles'},
            {link:'/agentprofiles/'+this.props.match.params.agentid+`?tabId=${0}`,
            text:response.data.agentName + ' ('+this.props.match.params.agentid+')'},
            {link:'#',text: this.props.match.params.settlementcurrencyid }];
            this.setState({
              serviceProviderCode: response.data.serviceProviderCode,
              productType: response.data.productType,
              subProductType: response.data.subProductType,
              serviceType: (response.data.serviceType == null) ? '---': response.data.serviceType ,
              countryName: response.data.countryName,
              transactionType: response.data.transactionType,
              // transactionTypeData:(response.data.transactionType == 'send') ? {id:1,label:'Send',value:'send'} : {id:2,label:'Cancel',value:'cancel'},
              payinCurrencyCode: response.data.payIncurrencyName,
              serviceProviderCurrency: response.data.serviceProviderCurrencyName,
              settlementCurrencyCode: response.data.settlementCurrencyName,
              passSettlementCurrencyCode: response.data.paasSettlementCurrencyName,
              transactionStatus: (response.data.transactionStatus == null) ? '':response.data.transactionStatus,
              status:(response.data.status == 'ENABLED')?true:false,
              breadcrumps:breadcrumps,
          }, () => {
            this.fetchCurrencyCodesList();
            })
            console.log(this.state.editSettlementCurrencyProfile);
          });

        }
      })
      .catch(error => {
        if(Exceptionhandler.throwErrorType(error).status == 401){
          window.location.replace(config.PAAS_LOGIN_URL);
          return (<h1>401 - Unauthorized Request</h1>)
        }
        else if (Exceptionhandler.throwErrorType(error).status == 500 || Exceptionhandler.throwErrorType(error).status == 503 || Exceptionhandler.throwErrorType(error).status == 400 || Exceptionhandler.throwErrorType(error).status == 404) {
          this.setState({serverError:false,confirmStatus:false},()=>{
            this.setState({ loading: false, serverError: true, serverStatus: Exceptionhandler.throwErrorType(error).status, serverErrMessage: Exceptionhandler.throwErrorType(error).message })
          }) 
        }
        else {
          this.setState({serverError:false,confirmStatus:false},()=>{
            this.setState({ loading: false, serverError: false, confirmStatus: true, apiErrMsg: error.response.data.error, actionType: 'OK' })
          })
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
          this.setState({ currencyList }, () => {
            //console.log(this.state.serviceProviderList);
            this.state.currencyList.map((obj)=>{
              if(this.state.payinCurrencyCode == obj.label || this.state.payinCurrencyCode ==obj.value){
                this.setState({payinCurrencyCodeData:obj,payinCurrencyCodeDisabled: true},()=>{
                  // console.log('payin match');
                  this.handleSaveEnable();
                })
              }
              if(this.state.serviceProviderCurrency == obj.label || this.state.serviceProviderCurrency == obj.value){
                this.setState({serviceProviderCurrencyData:obj,serviceProviderCurrencyDisabled:true},()=>{
                  // console.log('sp match');
                  this.handleSaveEnable();
                })
              }
              if(this.state.settlementCurrencyCode == obj.label || this.state.settlementCurrencyCode == obj.value){
                this.setState({settlementCurrencyCodeData:obj,settlementCurrencyCodeDisabled:true},()=>{
                  // console.log('sc match');
                  this.handleSaveEnable();
                })
              }
              if(this.state.passSettlementCurrencyCode == obj.label || this.state.passSettlementCurrencyCode == obj.value){
                this.setState({passSettlementCurrencyCodeData:obj,passSettlementCurrencyCodeDisabled:true},()=>{
                  // console.log('ps match');
                  this.handleSaveEnable();
                })
              }
            })
            this.fetchAgents();
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
                this.setState({ serviceProviderDisabled: true, loading: false, snackbar: true, notificationType:'warning',snackbarMsg: 'no agent branches records found' })
                alert('No Agent branches records found');
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

  handleStatusResponse = (data) => {
    if (data == true) {
      this.setState({ shownogeneralrules: false }, () => {
      });
    }
  }

  handlePayinCurrencyCodeChange = (e) => {
    this.setState({ payinCurrencyCode: e, payinCurrencyCodeCheck: false }, () => {
      if (this.state.payinCurrencyCode == undefined) {
        this.setState({ payinCurrencyCodeCheck: true, payinCurrencyCodeerrMsg: 'PayIn CurrencyCode can not be empty' },()=>{
          this.handleSaveEnable();
        })
      }
      else if (this.state.payinCurrencyCode.length == 0) {
        this.setState({ payinCurrencyCodeCheck: true, payinCurrencyCodeerrMsg: 'PayIn CurrencyCode can not be empty' },()=>{
          this.handleSaveEnable();
        })
      }
      else if(this.state.payinCurrencyCode.length > 0){
        this.state.currencyList.map((obj)=>{
          if(this.state.payinCurrencyCode == obj.value){
            this.setState({payinCurrencyCode:obj.value,payinCurrencyCodeData:obj,payinCurrencyCodeCheck:false},()=>{
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

  handlePayinCurrencyCodeValueClick = (e) => {
    let value = e.value;
    this.setState({ payinCurrencyCodeData: e, payinCurrencyCode: value },()=>{
      this.handleSaveEnable();
    })
  }

  handleServiceProviderCurrencyChange = (e) => {
    this.setState({ serviceProviderCurrency: e, serviceProviderCurrencyCheck: false }, () => {
      if (this.state.serviceProviderCurrency == undefined) {
        this.setState({ serviceProviderCurrencyCheck: true, serviceProviderCurrencyerrMsg: 'Service Provider Currency can not be empty', serviceProviderCurrencyData:{} },()=>{
          this.handleSaveEnable();
        })
      }
      else if (this.state.serviceProviderCurrency.length == 0) {
        this.setState({ serviceProviderCurrencyCheck: true, serviceProviderCurrencyerrMsg: 'Service Provider Currency can not be empty', serviceProviderCurrencyData:{} },()=>{
          this.handleSaveEnable();
        })
      }
      else if(this.state.serviceProviderCurrency.length > 0){
        this.state.currencyList.map((obj)=>{
          if(this.state.serviceProviderCurrency == obj.value){
            this.setState({serviceProviderCurrency:obj.value,serviceProviderCurrencyData:obj,serviceProviderCurrencyCheck:false},()=>{
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

  handleServiceProviderCurrencyValueClick = (e) => {
    let value = e.value;
    this.setState({ serviceProviderCurrencyData: e, serviceProviderCurrency: value},()=>{
      this.handleSaveEnable();
    })
  }

  handleSettlementCurrencyCodeChange = (e) => {
    this.setState({ settlementCurrencyCode: e, settlementCurrencyCodeCheck: false }, () => {
      if (this.state.settlementCurrencyCode == undefined) {
        this.setState({ settlementCurrencyCodeCheck: true, settlementCurrencyCodeerrMsg: 'SettlementCurrencyCode can not be empty', settlementCurrencyCodeData:{} },()=>{
          this.handleSaveEnable();
        })
      }
      else if (this.state.settlementCurrencyCode.length == 0) {
        this.setState({ settlementCurrencyCodeCheck: true, settlementCurrencyCodeerrMsg: 'SettlementCurrencyCode can not be empty',settlementCurrencyCodeData:{} },()=>{
          this.handleSaveEnable();
        })
      }
      else if(this.state.settlementCurrencyCode.length > 0){
        this.state.currencyList.map((obj)=>{
          if(this.state.settlementCurrencyCode == obj.value){
            this.setState({settlementCurrencyCode:obj.value,settlementCurrencyCodeData:obj,settlementCurrencyCodeCheck:false},()=>{
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

  handleSettlementCurrencyCodeValueClick = (e) => {
    let value = e.value;
    this.setState({ settlementCurrencyCodeData: e, settlementCurrencyCode: value },()=>{
      this.handleSaveEnable();
    })
  }

  handlePassSettlementCurrencyCodeChange = (e) => {
    this.setState({ passSettlementCurrencyCode: e, passSettlementCurrencyCodeCheck: false }, () => {
      if (this.state.passSettlementCurrencyCode == undefined) {
        this.setState({ passSettlementCurrencyCodeCheck: true, passSettlementCurrencyCodeerrMsg: 'PassSettlementCurrencyCode can not be empty',passSettlementCurrencyCodeData:{} },()=>{
          this.handleSaveEnable();
        })
      }
      else if (this.state.passSettlementCurrencyCode.length == 0) {
        this.setState({ passSettlementCurrencyCodeCheck: true, passSettlementCurrencyCodeerrMsg: 'PassSettlementCurrencyCode can not be empty',passSettlementCurrencyCodeData:{} },()=>{
          this.handleSaveEnable();
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
      }
    });
  }

  handlePassSettlementCurrencyCodeValueClick = (e) => {
    let value = e.value;
    this.setState({ passSettlementCurrencyCodeData: e, passSettlementCurrencyCode: value },()=>{
      this.handleSaveEnable();
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

  handleTextfieldChange = (e, value) => {
    let pattern = /^[0-9]+$/i;
    console.log(e, value);
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
        this.setState({status:value});
      break;
    }
  }

  handleChangeCustAgents = (data) => {
    this.setState({ custTypeCountryArr: data })
  }

  handleViewCustAgentsValues = (data) => {
    this.setState({ custTypeCountryArr: data })
  }

  handleBlur = (e) => {
    console.log(e.target.id);
    switch (e.target.id) {
      case 'transactionType':
        console.log('switch', this.state.transactionTypeCheck)
        this.setState({ transactionTypeCheck: false }, () => {
          if (this.state.transactionType == undefined) {
            this.setState({ transactionTypeCheck: true, transactionTypeerrMsg: 'TransactionType cannot be empty' },()=>{
            this.handleSaveEnable();
          })
          }
          else if (this.state.transactionType.length == 0) {
            this.setState({ transactionTypeCheck: true, transactionTypeerrMsg: 'TransactionType cannot be empty'  },()=>{
            this.handleSaveEnable();
          })
        }
        else{
          this.handleSaveEnable();
        }
      })
    break;
      case 'payinCurrencyCode':
        this.setState({ payinCurrencyCodeCheck: false }, () => {
          if (this.state.payinCurrencyCode == undefined) {
            this.setState({ payinCurrencyCodeCheck: true, payinCurrencyCodeerrMsg: 'PayIn CurrencyCode can not be empty' },()=>{
              this.handleSaveEnable();
            })
          }
          else if (this.state.payinCurrencyCode.length == 0) {
            this.setState({ payinCurrencyCodeCheck: true, payinCurrencyCodeerrMsg: 'PayIn CurrencyCode can not be empty'},()=>{
              this.handleSaveEnable();
            })
          }
          else{
            this.handleSaveEnable();
          }
        })
      break;
      case 'serviceProviderCurrency':
        this.setState({ serviceProviderCurrencyCheck: false }, () => {
          if (this.state.serviceProviderCurrency == undefined) {
            this.setState({ serviceProviderCurrencyCheck: true, serviceProviderCurrencyerrMsg: 'Service Provider Currency can not be empty' },()=>{
              this.handleSaveEnable();
            })
          }
          else if (this.state.serviceProviderCurrency.length == 0) {
            this.setState({ serviceProviderCurrencyCheck: true, serviceProviderCurrencyerrMsg: 'Service Provider Currency can not be empty'},()=>{
              this.handleSaveEnable();
            })
          }
          else{
            this.handleSaveEnable();
          }
        })
      break;
        case 'settlementCurrencyCode':
        this.setState({ settlementCurrencyCodeCheck: false }, () => {
          if (this.state.settlementCurrencyCode == undefined) {
            this.setState({ settlementCurrencyCodeCheck: true, settlementCurrencyCodeerrMsg: 'SettlementCurrencyCode can not be empty' },()=>{
              this.handleSaveEnable();
            })
          }
          else if (this.state.settlementCurrencyCode.length == 0) {
            this.setState({ settlementCurrencyCodeCheck: true, settlementCurrencyCodeerrMsg: 'SettlementCurrencyCode can not be empty'},()=>{
              this.handleSaveEnable();
            })
          }
          else{
            this.handleSaveEnable();
          }
        })
      break;
        case 'passSettlementCurrencyCode':
        this.setState({ passSettlementCurrencyCodeCheck: false }, () => {
          if (this.state.passSettlementCurrencyCode == undefined) {
            this.setState({ passSettlementCurrencyCodeCheck: true, passSettlementCurrencyCodeerrMsg: 'PassSettlementCurrencyCode can not be empty'},()=>{
              this.handleSaveEnable();
            })
          }
          else if (this.state.passSettlementCurrencyCode.length == 0) {
            this.setState({ passSettlementCurrencyCodeCheck: true, passSettlementCurrencyCodeerrMsg: 'PassSettlementCurrencyCode can not be empty' },()=>{
              this.handleSaveEnable();
            })
          }
          else{
            this.handleSaveEnable();
          }
        })
      break;
    }
  }

  handleSaveEnable = () => {
    if(   
     (Object.keys(this.state.payinCurrencyCodeData).length == 0) ||
    (Object.keys(this.state.serviceProviderCurrencyData).length ==0) ||
    (Object.keys(this.state.settlementCurrencyCodeData).length ==0) || 
   (Object.keys(this.state.passSettlementCurrencyCodeData).length == 0) 
    ){
      this.setState({saveDisabled:false})
    }
    else {
      this.setState({saveDisabled:true})
    }
  }

  handleData = () => {
    let data = {};
    data["agentReplications"] = [];
    if (this.state.replicateAgent) {
      if (this.state.custTypeCountryArr.length > 0) {
        this.state.custTypeCountryArr.map((obj) => {
          data.agentReplications.push(obj.id);
        })
      }
    }
    data["paasSettlementCurrency"] = {
      "id": this.state.passSettlementCurrencyCodeData.id,
      "name": this.state.passSettlementCurrencyCodeData.value,
    }
    data["payInCurrencyCode"] = {
      "id": this.state.payinCurrencyCodeData.id,
      "name": this.state.payinCurrencyCodeData.value
    }
    data["serviceProviderCurrency"] = {
      "id": this.state.serviceProviderCurrencyData.id,
      "name": this.state.serviceProviderCurrencyData.value,
    }
    data["settlementCurrency"] = {
      "id": this.state.settlementCurrencyCodeData.id,
      "name": this.state.settlementCurrencyCodeData.value,
    }
    
    data["status"] = (this.state.status == true) ? "ENABLED" : "DISABLED";
    console.log(data);
    if(sessionStorage.getItem('token') == undefined){
      window.location.replace(config.PAAS_LOGIN_URL);
      return (<h1>401 - Unauthorized Request</h1>)
    }
    else{
      let headers = {
        Authorization:sessionStorage.getItem('token')
      }
      APISettlementService.EditSettlementCurrency(data, this.props.match.params.agentid, this.props.match.params.settlementcurrencyid)
      .then((response) => {
        if (response.status == 200) {
          console.log(response);
          let snackbarMsg = (this.state.replicateAgent) ? 'The rule has been replicated to the agents branches and will be available under them.' : 'Settlement Currency is Updated Successfully.';
          this.setState({ serverError: false, loading: false, loaderMessage: '', notificationType:'success',snackbar:true, snackbarMsg:snackbarMsg }, () => {
            setTimeout(()=>{
              this.props.history.push(`/agentprofiles/${this.props.match.params.agentid}?tabId=${0}`)
            },2200)
          });
        }
      })
      .catch(error => {
        if(Exceptionhandler.throwErrorType(error).status == 401){
          window.location.replace(config.PAAS_LOGIN_URL);
          return (<h1>401 - Unauthorized Request</h1>)
        }
        else if (Exceptionhandler.throwErrorType(error).status == 500 || Exceptionhandler.throwErrorType(error).status == 503 || Exceptionhandler.throwErrorType(error).status == 400) {
          this.setState({shownogeneralrules: false, serverError: false},()=>{
            this.setState({ loading: false, shownogeneralrules: true, serverError: true, apiErrMsg: error.response.data.error, actionType: 'OK', serverStatus: Exceptionhandler.throwErrorType(error).status, serverErrMessage: Exceptionhandler.throwErrorType(error).message })
          }) 
        }
        else {
          this.setState({shownogeneralrules: false, serverError: false},()=>{
            this.setState({ loading: false, serverError: false, shownogeneralrules: true, apiErrMsg: error.response.data.error, actionType: 'OK' })
          })
        }
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12} style={{ marginBottom: 10, marginTop: 10 }}>
            <Breadcrumps links={this.state.breadcrumps} />
          </Grid>
        </Grid>
        <MuiThemeProvider theme={getMuiTheme}>
          {
            this.state.serverError ? <EmptyListComponent text={this.state.serverErrMessage} fromPage="Errors" /> :
              [
                this.state.loading ?
                  <Loader action={this.state.loaderMessage} />
                  :
                  <div>
                    <p className="bank-profile global-font" style={{ marginTop: 25, marginBottom: 30, color: `#19ace3` }}>Settlement Currency (Edit)</p>
                    <TabContainer>
                      <div className={classes.root}>
                        <Grid container spacing={24}>
                          <Grid item xs={12} className='grid-no-bottom-padding'>
                            <p><b>Settlement Currency</b></p>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                              Service Provider
                        </Typography>
                            <span className="drawee-profile-view" >
                              {this.state.editSettlementCurrencyProfile.serviceProviderCode}
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
                              {this.state.editSettlementCurrencyProfile.productType}
                            </span>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                              Sub Product Type
                        </Typography>
                            <span className="drawee-profile-view" >
                              {this.state.editSettlementCurrencyProfile.subProductType}
                            </span>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                              Service Type
                        </Typography>
                            <span className="drawee-profile-view" >
                              {this.state.editSettlementCurrencyProfile.serviceType == null ? '--':this.state.editSettlementCurrencyProfile.serviceType}
                            </span>
                          </Grid>
                          <Grid item xs={12} className='grid-no-bottom-padding'>
                            <p><b>Receiving Country</b></p>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                              Receiving Country
                        </Typography>
                            <span className="drawee-profile-view" >
                              {this.state.editSettlementCurrencyProfile.countryName}
                            </span>
                          </Grid>
                          <Grid item xs={12} className='grid-no-bottom-padding'>
                            <p><b>Transaction Type</b></p>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                              Transaction Type
                            </Typography>
                            <span className="drawee-profile-view" >
                              {this.state.editSettlementCurrencyProfile.transactionType}
                            </span>
                          </Grid>
                          <Grid container spacing={24} className='global-font'>
                            <Grid item xs={12} className='grid-no-bottom-padding'>
                              <p><b>Currency Code</b></p>
                            </Grid>
                            <Grid item xs={6} className='grid-no-top-padding grid-error'>
                              <Selectable
                                id="payinCurrencyCode"
                                isRequired
                                label='PayIn Currency Code'
                                searchable={true}
                                isClearable={true}
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
                                placeholder={'Service Provider Currency'}
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
                                placeholder={'Pass Settlement Currency Code'}
                                onChange={this.handlePassSettlementCurrencyCodeChange}
                                onValueClick={this.handlePassSettlementCurrencyCodeValueClick}
                                onBlur={this.handleBlur}
                                isEnabled={this.state.passSettlementCurrencyCodeDisabled}
                              />
                              {this.state.passSettlementCurrencyCodeCheck ? <span className="errorMessage-add">{this.state.passSettlementCurrencyCodeerrMsg} </span> : ''}
                            </Grid>
                          </Grid>
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
                              <Grid item xs={6}>
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
                              <TextButton className="global-font save-clear" id="disabledTextButton" umSize="small" onClick={this.handleData} isEnabled={this.state.saveDisabled}>
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
      </div>
    );
  }
}

EditSettlementCurrency.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditSettlementCurrency);