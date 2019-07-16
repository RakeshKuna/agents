import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import '../../vendor/common.css';
import '../../theme/theme';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Loader from './../../component/Loader';
import ModalBox from './../../component/Modalbox';
import {TextButton, FloatButton,Toggle,Radio,Selectable,CheckBox,Notifications,Input, InputWithIcon } from 'finablr-ui';
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
import {SHOW_NOTIFICATION} from '../../constants/action-types';
import {HIDE_NOTIFICATION} from '../../constants/action-types';
import * as config from '../../config/config';


const styles = theme => ({
    root: {
      flexGrow: 1,       
    },
    indicator: {
      backgroundColor: 'white',
      height:`4px`
    },
    appbar:{
      boxShadow:'none'
    },
    tabs:{
      backgroundColor:'#19ace3',
      color:'#fff'
    },
    testColor:{
      color:'blue !important'
    }
});

function TabContainer(props) {
    return (
    <Typography component="div" style={{ padding: 8 * 3, border:`1px solid lightgrey` }}>
        {props.children}
    </Typography>
    );
}

const transactionTypeList = [{id:1,label:'Send',value:'send'},{id:2,label:'Cancel',value:'cancel'}]

const transactionStatusList = [{id:1,label:'Awaiting Funds',value:'AWAITING_FUNDS'},{id:2,label:'Transaction Initiated',value:'TRANSACTION_INITIATED'}]

class CreateTokenExpiry extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            breadcrumps:[],
            loading:true, 
            loaderMessage:'Retrieving Data',
            serviceProviderList:[],
            serviceProviderData:{},
            serviceProvider:'',
            serviceProviderDisabled:true,
            productTypeDisabled:true,
            productsList:[],
            productType:'',
            productTypeData:{},
            productTypeCheck:false,
            productTypeerrMsg:'',
            subProductsResponse:[],
            subProductsList:[],
            subProductType:'',
            subProductTypeData:{},
            subProductTypeCheck:false,
            subProductTypeerrMsg:'',
            subProductTypeDisasbled:true,
            serviceTypeList:[],
            serviceType:'',
            serviceTypeData:{},
            serviceTypeCheck:false,
            serviceTypeerrMsg:'',
            serviceTypeDisabled:false,
            transactionType:'',
            transactionTypeData:{},
            transactionTypeCheck:false,
            transactionTypeerrMsg:'',
            transactionStatus:'',
            transactionStatusData:{},
            transactionStatusCheck:false,
            transactionStatuserrMsg:'',
            serverStatus:null,
            serverError:false,
            serverErrMessage:'',
            status:true,
            saveDisabled:false,
            isClearEnabled: false,
            confirmDelete:false,
            fromAction:'',
            snackbarMsg:'',
            snackbar:false,
            shownogeneralrules:false,
            apiErrMsg:'',
            isToken:false,
            isTransaction:false,
            tokenExpiryHours:'00',
            tokenExpiryCheck:false,
            tokenExpiryerrMsg:'',
            tokenExpiryMins:'00',
            tokenExpirySecs:'00',
            custTypeCountryArr:[],
            agentBranchesDisabled:true,
            agentBranchesList:[],
            replicateToSelfAgent:false,
            notificationType:'success',
            replicateToOtherAgent:false,
            agentsList:[],
            replicateAgentsData:[{agentProfile:{},agentBranches:[],agentProfileCheck:false,agentProfileerrMsg:'',agentBranchesCheck:false,agentBrancheserrMsg:'',agentBranchesDisabled:true,agentBranchesList:[]}],
            newPushObj:{agentProfile:{},agentBranches:[],agentProfileCheck:false,agentProfileerrMsg:'',agentBranchesCheck:false,agentBrancheserrMsg:'',agentBranchesDisabled:true,agentBranchesList:[]}
        };
    }

    componentDidMount(){
      //  console.log(this.props);
       this.fetchServiceProviderList(); 
       this.fetchProductsList();
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
            let breadcrumpData = [{link:'/agentprofiles',text:'Agent Profiles'},{link:'/agentprofiles/'+this.props.match.params.agentid+'/branches',text:response.data.agentName+' ('+response.data.agentId+')'},{link:'/agentprofiles/'+this.props.match.params.agentid+'/branches/'+this.props.match.params.agentbranchId,text:response.data.branchDisplayName+' ('+response.data.id+')'},{link:'#',text:'Create'}];
            this.setState({breadcrumps:breadcrumpData});
          }
        })
        .catch(error=>{
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
      }
    }

    fetchServiceProviderList=()=>{
      let serviceProviderList = [];
      if(sessionStorage.getItem('token') == undefined){
        window.location.replace(config.PAAS_LOGIN_URL)
        return (<h1>401 - Unauthorized Request</h1>)
      }
      else{
        let headers = {
          Authorization:sessionStorage.getItem('token')
        }
        ApiService.serviceProviderList(headers)
        .then((response)=>{
          if(response.data.length > 0){
            response.data.map((obj)=>{
              let serviceProvider = {};
              serviceProvider.id = obj.id;
              serviceProvider.label = obj.serviceProvider;
              serviceProvider.value = obj.code;
              serviceProviderList.push(serviceProvider);
            }) 
            this.setState({serviceProviderList,serviceProviderDisabled:true},()=>{
              //console.log(this.state.serviceProviderList);
            }); 
          }
          else{
            this.setState({serviceProviderDisabled:false})
            
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
      }   
    }

    fetchProductsList=()=>{
      let productsList = [];
      if(sessionStorage.getItem('token') == undefined){
        window.location.replace(config.PAAS_LOGIN_URL)
        return (<h1>401 - Unauthorized Request</h1>)
      }
      else{
        let headers = {
          Authorization:sessionStorage.getItem('token')
        }
        ApiService.ProductList(headers).then((response)=>{
          if(response.status == 200){
            if(response.data.response.length > 0){
              response.data.response.map((obj,index)=>{
                let product = {};
                product.id = index;
                product.label = obj.product;
                product.value = obj.product;
                if(obj.product == 'Remittance'){
                  let subProductsList=[];
                  this.setState({productType:obj.product,productTypeData:obj,productTypeDisabled:false,subProductsResponse:obj.subProducts},()=>{
                    if(obj.subProducts.length > 0){
                      obj.subProducts.map((obj,index)=>{
                        let subProductType = {};
                        subProductType.id = index;
                        subProductType.label = obj.subProduct;
                        subProductType.value = obj.subProduct;
                        subProductsList.push(subProductType);
                      })
                      this.setState({subProductsList,subProductTypeDisasbled:true})
                    }
                    else{
                      this.setState({subProductsList,subProductTypeDisasbled:false})
                    }
                  })
                }
                productsList.push(product);
              }) 
              this.setState({productsList,loading:false},()=>{
                // console.log(this.state.productsList);
              }); 
            }
            else{
              this.setState({productTypeDisabled:false});
            }
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
      }   
    }

    handleClear = () => {
      this.setState({ confirmDelete: false, snackbar: false }, () => {
        if(this.state.serviceProvider != undefined || this.state.productType != undefined || this.state.subProductType != undefined || this.state.serviceType !== undefined  || this.state.transactionStatus != undefined || this.state.transactionType != undefined || this.state.tokenExpiryHours != undefined || this.state.tokenExpiryMins != undefined || this.state.tokenExpirySecs != undefined || this.state.replicateToSelfAgent == true || this.state.replicateToOtherAgent == true){
          this.setState({ confirmDelete: true, fromAction: 'clear', modalMessage: 'This will clear all data. Are you sure you want to continue?' })
        }
      })
    }

    handleModalResponse = (data, from)=> {
      if(data==true && from =='clear'){
        this.setState({
          confirmDelete:false,
          serviceProvider:undefined,
          serviceProviderData:{},
          serviceProviderCheck:false,
          serviceProvidererrMsg:'',
          productTypeCheck:false,
          productTypeerrMsg:false,
          subProductType:undefined,
          subProductTypeData:{},
          subProductTypeCheck:false,
          subProductTypeerrMsg:'',
          serviceType:undefined,
          serviceTypeData:{},
          serviceTypeCheck:false,
          serviceTypeerrMsg:'',
          serviceTypeDisabled:false,
          transactionStatus:undefined,
          transactionStatusData:{},
          transactionStatusCheck:false,
          transactionStatuserrMsg:'',
          transactionType:undefined,
          transactionTypeData:{},
          transactionTypeCheck:false,
          transactionTypeerrMsg:'',
          tokenExpiryHours:'00',
          tokenExpiryMins:'00',
          tokenExpirySecs:'00',
          tokenExpiryCheck: false,
          isToken:false,
          isTransaction:false,
          replicateToSelfAgent:false,
          replicateToOtherAgent:false,
          status:true,
          snackbar:false,
          saveDisabled:false,
          fromAction:'',
          shownogeneralrules:false,
          apiErrMsg:'',
        },()=>{
          let replicateAgentsData = [];
          let obj = this.state.newPushObj;
          replicateAgentsData.push(obj);
          this.setState({replicateAgentsData}, () => {
            this.handleSaveEnable();
            this.handleClearEnable();
          });
        })
      }
      else {
        this.setState({ confirmDelete: true }, () => {
          //this.props.modalAction(null,'Try Again closed');
        });
      }
    }

    handleStatusResponse=(data)=>{
      if(data == true){
        this.setState({shownogeneralrules:false},()=>{          
        });       
      } 
    }

    handleServiceProviderChange = (e) => {
      console.log(e)
      this.setState({serviceProvider:e,serviceProviderCheck:false},()=>{
        if(this.state.serviceProvider == undefined){
          this.setState({serviceProviderCheck:true,serviceProvidererrMsg:'Service Provider can not be empty',serviceProviderData:{}},()=>{
            this.handleSaveEnable();
            this.handleClearEnable();
          })
        }
        else if(this.state.serviceProvider.length == 0){
          this.setState({serviceProviderCheck:true,serviceProvidererrMsg:'Service Provider can not be empty',serviceProviderData:{}},()=>{
            this.handleSaveEnable();
            this.handleClearEnable();
          })
        }
        else if(this.state.serviceProvider.length > 0){
          this.state.serviceProviderList.map((obj)=>{
            if(this.state.serviceProvider == obj.value){
              this.setState({serviceProviderData:obj,serviceProvider:obj.value,serviceProviderCheck:false},()=>{
                this.handleSaveEnable();
                this.handleClearEnable();
              })
            }
          })
        }
        else{
          this.handleSaveEnable();
          this.handleClearEnable();
        }
      });
    }

    handleServiceProviderValueClick = (e) => {
      let value = e.value;
      this.setState({serviceProviderData:e,serviceProvider:value},()=>{
        this.handleSaveEnable();
        this.handleClearEnable();
      })
    }

    handleBlur = (e) => {
      // console.log(e.target.id);
      switch(e.target.id){
        case 'serviceProvider':
          this.setState({serviceProviderCheck:false},()=>{
            if( this.state.serviceProvider == undefined){
              this.setState({serviceProviderCheck:true,serviceProvidererrMsg:'Service Provider can not be empty'},()=>{
                this.handleSaveEnable();
                this.handleClearEnable();
              })
            }
            else if(this.state.serviceProvider.length == 0){
              this.setState({serviceProviderCheck:true,serviceProvidererrMsg:'Service Provider can not be empty'},()=>{
                this.handleSaveEnable();
                this.handleClearEnable();
              })
            }
            else{
              this.handleSaveEnable();
              this.handleClearEnable();
            }
          })
        break;
        case 'productType':
          this.setState({productTypeCheck:false},()=>{
            if( this.state.productType == undefined){
              this.setState({productTypeCheck:true,productTypeerrMsg:'Product Type can not be empty'},()=>{
                this.handleSaveEnable();
                this.handleClearEnable();
              })
            }
            else if(this.state.productType.length == 0){
              this.setState({productTypeCheck:true,productTypeerrMsg:'Product Type can not be empty'},()=>{
                this.handleSaveEnable();
                this.handleClearEnable();
              })
            }
            else{
              this.handleSaveEnable();
              this.handleClearEnable();
            }
          })
        break;
        case 'subProductType':
          this.setState({subProductTypeCheck:false},()=>{
            if( this.state.subProductType == undefined){
              this.setState({subProductTypeCheck:true,subProductTypeerrMsg:'Sub Product Type can not be empty'})
            }
            else if(this.state.subProductType.length == 0){
              this.setState({subProductTypeCheck:true,subProductTypeerrMsg:'Sub Product Type can not be empty'})
            }
            else{
              this.handleSaveEnable();
              this.handleClearEnable();
            }
          })
        break;
        case 'serviceType':
          this.setState({serviceTypeCheck:false},()=>{
            if( this.state.serviceType == undefined){
              this.setState({serviceTypeCheck:true,serviceTypeerrMsg:'Service Type can not be empty'})
            }
            else{
              this.handleSaveEnable();
              this.handleClearEnable();
            }
          })
        break;
        case 'transactionType':
          // console.log('switch',this.state.transactionTypeCheck)
          this.setState({transactionTypeCheck:false},()=>{
            if( this.state.transactionType == undefined){
              this.setState({transactionTypeCheck:true,transactionTypeerrMsg:'Transaction Type can not be empty'})
            }
            else if(this.state.transactionType.length == 0){
              this.setState({transactionTypeCheck:true,transactionTypeerrMsg:'Transaction Type can not be empty'})
            }
            else{
              this.handleSaveEnable();
              this.handleClearEnable();
            }
          })
        break;
        case 'transactionStatus':
          // console.log('switch',this.state.transactionStatusCheck)
          this.setState({transactionStatusCheck:false},()=>{
            if( this.state.transactionStatus == undefined){
              this.setState({transactionStatusCheck:true,transactionStatuserrMsg:'Transaction Status can not be empty'})
            }
            else if(this.state.transactionStatus.length == 0){
              this.setState({transactionStatusCheck:true,transactionStatuserrMsg:'Transaction Status can not be empty'})
            }
            else{
              this.handleSaveEnable();
              this.handleClearEnable();
            }
          })
        break;
      } 
    }

    handleProductTypeChange = (e) => {
      this.setState({productType:e,productTypeCheck:false},()=>{
        if(this.state.productType == undefined){
          this.setState({productTypeCheck:true,productTypeerrMsg:'Product Type can not be empty'})
        }
        else if(this.state.productType.length == 0){
          this.setState({productTypeCheck:true,productTypeerrMsg:'Product Type can not be empty'})
        }
        else{
          this.handleSaveEnable();
          this.handleClearEnable();
        }
      });
    }

    handleProductTypeValueClick = (e) => {
      let value = e.value;
      this.setState({productTypeData:e,productType:value,snackbar:false},()=>{
          this.handleSaveEnable();
          this.handleClearEnable();
      })
    }

    handleSubProductTypeChange = (e) => {
      this.setState({subProductType:e,subProductTypeCheck:false},()=>{
        if(this.state.subProductType == undefined){
          this.setState({subProductTypeCheck:true,subProductTypeerrMsg:'Sub Product Type can not be empty',subProductTypeData:{},serviceTypeList: []},()=>{
            this.handleSaveEnable();
            this.handleClearEnable();
          })
        }
        else if(this.state.subProductType.length == 0){
          this.setState({subProductTypeCheck:true,subProductTypeerrMsg:'Sub Product Type can not be empty',subProductTypeData:{},serviceTypeList: []},()=>{
            this.handleSaveEnable();
            this.handleClearEnable();
          })
        }
        else if(this.state.subProductType.length > 0){
          this.state.subProductsList.map((obj)=>{
            if(this.state.subProductType == obj.value){
              this.setState({subProductTypeData:obj,subProductType:obj.value,snackbar:false,serviceTypeList:[]},()=>{
                let count = 0;
                this.state.subProductsResponse.map((obj,index)=>{
                  //TODO after getting id in service types, change index to obj.id in if loop
                  if(this.state.subProductTypeData.id == index){
                    if(obj.hasOwnProperty('serviceTypes')){
                      if(obj.serviceTypes.length > 0){
                        count = count+1;
                        let serviceTypeList = [];
                        obj.serviceTypes.map((obj,index)=>{
                          let serviceType = {};
                          serviceType.id = index;
                          serviceType.label = obj;
                          serviceType.value = obj;
                          serviceTypeList.push(serviceType);
                        })
                        this.setState({serviceTypeList: serviceTypeList,serviceTypeDisabled:true},()=>{
                          console.log(this.state.serviceTypeList);
                        })
                      }
                    }
                  }
                })
                if(count == 0){
                  this.setState({snackbar:true,notificationType:'warning',snackbarMsg:'No service types found',serviceTypeDisabled:false,serviceTypeList:[]})
                }
              })
            }
          })
        }
        else{
          this.handleSaveEnable();
          this.handleClearEnable();
        }
      });
    }

    handleSubProductTypeValueClick = (e) => {
      let value = e.value;
      this.setState({subProductTypeData:e,subProductType:value,snackbar:false,serviceTypeList:[]},()=>{
        let count = 0;
        this.state.subProductsResponse.map((obj,index)=>{
          //TODO after getting id in service types, change index to obj.id in if loop
          if(this.state.subProductTypeData.id == index){
            if(obj.hasOwnProperty('serviceTypes')){
              if(obj.serviceTypes.length > 0){
                count = count+1;
                let serviceTypeList = [];
                obj.serviceTypes.map((obj,index)=>{
                  let serviceType = {};
                  serviceType.id = index;
                  serviceType.label = obj;
                  serviceType.value = obj;
                  serviceTypeList.push(serviceType);
                })
                this.setState({serviceTypeList: serviceTypeList,serviceTypeDisabled:true},()=>{
                  console.log(this.state.serviceTypeList);
                })
              }
            }
          }
        })
        if(count == 0){
          this.setState({snackbar:true,notificationType:'warning',snackbarMsg:'No service types found',serviceTypeDisabled:false,serviceTypeList:[]})
        }
      })
    }

    handleServiceTypeChange = (e) => {
      this.setState({serviceType:e,serviceTypeCheck:false},()=>{
        if(this.state.serviceType == undefined){
          this.setState({serviceTypeCheck:true,serviceTypeerrMsg:'Service Type can not be empty',serviceTypeData:{}},()=>{
            this.handleSaveEnable();
            this.handleClearEnable();
          })
        }
        else if(this.state.serviceType.length == 0){
          this.setState({serviceTypeCheck:true,serviceTypeerrMsg:'Service Type can not be empty',serviceTypeData:{}},()=>{
            this.handleSaveEnable();
            this.handleClearEnable();
          })
        }
        else if(this.state.serviceType.length > 0){
          this.state.serviceTypeList.map((obj)=>{
            if(this.state.serviceType == obj.value){
              this.setState({serviceTypeData:obj,serviceType:obj.value,serviceTypeCheck:false},()=>{
                this.handleSaveEnable();
                this.handleClearEnable();
              })
            }
          })
        }
        else{
          this.handleSaveEnable();
          this.handleClearEnable();
        }
      });
    }

    handleServiceTypeValueClick = (e) => {
      let value = e.value;
      this.setState({serviceTypeData:e,serviceType:value},()=>{
          this.handleSaveEnable();
          this.handleClearEnable();
      })
    }

    handleTransactionTypeChange = (e) => {
      this.setState({transactionType:e,transactionTypeCheck:false},()=>{
        if(this.state.transactionType == undefined){
          this.setState({transactionTypeCheck:true,transactionTypeerrMsg:'Transaction Type can not be empty',transactionTypeData:{}},()=>{
            this.handleSaveEnable();
            this.handleClearEnable();
          })
        }
        else if(this.state.transactionType.length == 0){
          this.setState({transactionTypeCheck:true,transactionTypeerrMsg:'Transaction Type can not be empty',transactionTypeData:{}},()=>{
            this.handleSaveEnable();
            this.handleClearEnable();
          })
        }
        else if(this.state.transactionType.length > 0){
          transactionTypeList.map((obj)=>{
            if(this.state.transactionType == obj.value){
              this.setState({transactionTypeData:obj,transactionType:obj.value,transactionTypeCheck:false},()=>{
                this.handleSaveEnable();
                this.handleClearEnable();
            })
            }
          })
        }
        else{
          this.handleSaveEnable();
          this.handleClearEnable();
        }
      });
    }

    handleTransactionTypeValueClick = (e) => {
      let value = e.value;
      this.setState({transactionTypeData:e,transactionType:value},()=>{
          this.handleSaveEnable();
          this.handleClearEnable();
      })
    }

    handleExpiryChange = (e) => {
      switch(e.target.id){
        case 'Token':
          this.setState({isToken:true,isTransaction:false},()=>{
            this.handleSaveEnable();
            this.handleClearEnable();
        })
        break;
        case 'Transaction':
        this.setState({isToken:false,isTransaction:true},()=>{
          this.handleSaveEnable();
          this.handleClearEnable();
      })
        break;
      }
    }

    handleTransactionStatusChange = (e) => {
      this.setState({transactionStatus:e,transactionStatusCheck:false},()=>{
        if(this.state.transactionStatus == undefined){
          this.setState({transactionStatusCheck:true,transactionStatuserrMsg:'Transaction Status can not be empty',transactionStatusData:{}},()=>{
            this.handleSaveEnable();
            this.handleClearEnable();
          })
        }
        else if(this.state.transactionStatus.length == 0){
          this.setState({transactionStatusCheck:true,transactionStatuserrMsg:'Transaction Status can not be empty',transactionStatusData:{}},()=>{
            this.handleSaveEnable();
            this.handleClearEnable();
          })
        }
        else if(this.state.transactionStatus.length > 0){
          transactionStatusList.map((obj)=>{
            if(this.state.transactionStatus == obj.value){
              this.setState({transactionStatusData:obj,transactionStatus:obj.value},()=>{
                this.handleSaveEnable();
                this.handleClearEnable();
            })
            }
          })
        }
        else{
          this.handleSaveEnable();
          this.handleClearEnable();
        }
      });
    }

    handleTransactionStatusValueClick = (e) => {
      let value = e.value;
      this.setState({transactionStatusData:e,transactionStatus:value},()=>{
          this.handleSaveEnable();
          this.handleClearEnable();
      })
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
                this.handleClearEnable();
              })
            }
            else if(this.state.tokenExpiryHours.length == 0){
              this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Expiry time can not be empty'},()=>{
                this.handleSaveEnable();
                this.handleClearEnable();
              })
            }
            else{
              this.setState({tokenExpiryCheck:false,tokenExpiryerrMsg:''},()=>{
                this.handleSaveEnable();
                this.handleClearEnable();
              })
            }
          })
        break;
        case 'tokenExpiryMins':
          this.setState({tokenExpiryMins:value,tokenExpiryCheck:false},()=>{
            if(pattern.test(this.state.tokenExpiryMins) == false){
              this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
                this.handleSaveEnable();
                this.handleClearEnable();
              })
            }
            else if(this.state.tokenExpiryMins.length == 0){
              this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Expiry time can not be empty'},()=>{
                this.handleSaveEnable();
                this.handleClearEnable();
              })
            }
            else{
              this.setState({tokenExpiryCheck:false,tokenExpiryerrMsg:''},()=>{
                this.handleSaveEnable();
                this.handleClearEnable();
              });
            }
          })
        break;
        case 'tokenExpirySecs':
          this.setState({tokenExpirySecs:value,tokenExpiryCheck:false},()=>{
            if(pattern.test(this.state.tokenExpirySecs) == false){
              this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
                this.handleSaveEnable();
                this.handleClearEnable();
              })
            }
            else if(this.state.tokenExpirySecs.length == 0){
              this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Expiry time can not be empty'},()=>{
                this.handleSaveEnable();
                this.handleClearEnable();
              })
            }
            else{
              this.setState({tokenExpiryCheck:false,tokenExpiryerrMsg:''},()=>{
                this.handleSaveEnable();
                this.handleClearEnable();
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
            this.handleClearEnable();
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
            this.handleClearEnable();
          });
        break;
        case('regex'):
          this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
            this.handleSaveEnable();
            this.handleClearEnable();
          });
        break;
      }
    }

    handleTokenExpiryMinsError = (e) => {
      console.log(e);
      switch (e){
        case('required'):
          this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Expiry time can not be empty'},()=>{
            this.handleSaveEnable();
            this.handleClearEnable();
          });
        break;
        case('regex'):
          this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
            this.handleSaveEnable();
            this.handleClearEnable();
          });
        break;
        case('max'):
        this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
          this.handleSaveEnable();
          this.handleClearEnable();
        });
        break;
        case('min'):
        this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
          this.handleSaveEnable();
          this.handleClearEnable();
        });
        break;
        case('maxLength'):
        this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
          this.handleSaveEnable();
          this.handleClearEnable();
        });
        break;
        case('minLength'):
        this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
          this.handleSaveEnable();
          this.handleClearEnable();
        });
        break;
      }
    }

    handleTokenExpirySecsError = (e) => {
      console.log(e);
      switch (e){
        case('required'):
          this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Expiry time can not be empty'},()=>{
            this.handleSaveEnable();
            this.handleClearEnable();
          });
        break;
        case('regex'):
          this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
            this.handleSaveEnable();
            this.handleClearEnable();
          });
        break;
        case('max'):
        this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
          this.handleSaveEnable();
          this.handleClearEnable();
        });
        break;
        case('min'):
        this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
          this.handleSaveEnable();
          this.handleClearEnable();
        });
        break;
        case('maxLength'):
        this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
          this.handleSaveEnable();
          this.handleClearEnable();
        });
        break;
        case('minLength'):
        this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
          this.handleSaveEnable();
          this.handleClearEnable();
        });
        break;
      }
    }

    handleChangeCustAgentBranch = (data) => {
      this.setState({custTypeCountryArr:data},()=>{
          this.handleSaveEnable();
          this.handleClearEnable();
      })
    }

    handleViewCustAgentBranchValues = (data) =>{
      this.setState({custTypeCountryArr:data},()=>{
        this.handleSaveEnable();
        this.handleClearEnable();
      })
    }

    fetchAgentBranches = (agentId) => {
      let params = {};
      let agentBranchesList=[];
      if(sessionStorage.getItem('token') == undefined){
        window.location.replace(config.PAAS_LOGIN_URL)
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
                this.setState({serviceProviderDisabled:true,loading:false,notificationType:'warning',snackbar:true,snackbarMsg:'no agent branches records found'})
              }
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
        this.setState({loading:true,loaderMessage:'Retrieving Agent Profiles'},()=>{
          AgentApiService.getAllAgentProfiles(params,headers)
          .then((response)=>{
            // console.log(response);
            if(response.status == 200){
              if(response.data.total > 0){
                response.data.data.map((obj)=>{
                  if(this.props.match.params.agentid == obj.id){
                    return null;
                  }
                  else{
                    let agentProfile = {};
                    agentProfile.id = obj.id;
                    agentProfile.label = obj.name;
                    agentProfile.value = obj.displayName;
                    agentsList.push(agentProfile);
                  }
                }) 
                this.setState({agentsList,snackbar:false,loading:false},()=>{
                  //console.log(this.state.agentBranchesList);
                }); 
              }
              else{
                this.setState({loading:false,notificationType:'warning',snackbar:true,snackbarMsg:'no agent records found'})
              }
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

    handleReplicaAgentBlur = (e,index) => {
      console.log(e,index);
      let replicateAgentsData = this.state.replicateAgentsData;
      if(e.target.id == undefined){
          replicateAgentsData[index].agentProfile= {};
        replicateAgentsData[index].agentProfileCheck=true;
        replicateAgentsData[index].agentProfileerrMsg = 'Agent can not be empty';
        replicateAgentsData[index].agentBranches = [];
        replicateAgentsData[index].agentBranchesDisabled = true;
        replicateAgentsData[index].agentBranchesList = [{}];
        this.setState({replicateAgentsData},()=>{
          this.handleSaveEnable();
          this.handleClearEnable();
        })
      }
      else if(Object.keys(replicateAgentsData[index].agentProfile).length == 0){
        replicateAgentsData[index].agentProfileCheck=true;
        replicateAgentsData[index].agentProfileerrMsg = 'Agent can not be empty';
        replicateAgentsData[index].agentBranches = [];
        replicateAgentsData[index].agentBranchesDisabled = true;
        replicateAgentsData[index].agentBranchesList = [{}];
        this.setState({replicateAgentsData},()=>{
          this.handleSaveEnable();
          this.handleClearEnable();
        })
      }
      else{
          replicateAgentsData[index].agentProfileCheck=false;
          replicateAgentsData[index].agentProfileerrMsg = '';
          this.setState({replicateAgentsData},()=>{
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

    handleReplicaAgentValueClick = (e,indexValue) => {
      // let index = index;
      let existingIndex = null;
      let checkExistingRule = e;
      this.setState({snackbar:false},()=>{
        if(this.state.replicateAgentsData.length > 0){
          this.state.replicateAgentsData.map((obj,index)=>{
            if(indexValue == index){
              return null;
            }
            else{
              if(checkExistingRule.id == obj.agentProfile.id){
                existingIndex = index;
              }
            }
          })
          if(existingIndex == null){
            let replicateAgentsData = this.state.replicateAgentsData;
            replicateAgentsData[indexValue].agentProfileCheck=false;
            replicateAgentsData[indexValue].agentBranches = [];
            replicateAgentsData[indexValue].agentProfile = e;
            this.setState({replicateAgentsData},()=>{
              this.fetchSelectedAgentBranches(e.id,indexValue);
              this.handleSaveEnable();
              this.handleClearEnable();
            })
          }
          else{
            this.setState({snackbar:true,notificationType:'warning',snackbarMsg:`Agent rules are already added in row ${existingIndex+1}`},()=>{
              let replicateAgentsData = this.state.replicateAgentsData;
              replicateAgentsData[indexValue].agentProfileCheck=true;
              replicateAgentsData[indexValue].agentProfileerrMsg = 'Duplicate Agent rule';
              replicateAgentsData[indexValue].agentBranches = [];
              replicateAgentsData[indexValue].agentProfile={};
              replicateAgentsData[indexValue].agentProfile.value = undefined;
              this.setState({replicateAgentsData},()=>{
                this.handleSaveEnable();
                this.handleClearEnable();
              });
            })
          }
        }
      }) 
    }

    fetchSelectedAgentBranches = (id,index) => {
      let params = {};
      let replicateAgentsData = this.state.replicateAgentsData;
      let agentBranchesList=[];
      if(sessionStorage.getItem('token') == undefined){
        window.location.replace(config.PAAS_LOGIN_URL)
        return (<h1>401 - Unauthorized Request</h1>)
      }
      else{
        let headers = {
          Authorization:sessionStorage.getItem('token')
        }
        this.setState({loading:true,loaderMessage:'Retrieving Agent Branches'},()=>{
          BranchApiService.getAllAgentBranchProfiles(params,id,headers)
          .then((response)=>{
            console.log(response);
            if(response.status == 200){
              if(response.data.total > 0){
              response.data.data.map((obj)=>{
                let agentBranch = {};
                agentBranch.id = obj.id;
                agentBranch.label = obj.branchName;
                agentBranch.value = obj.branchDisplayName;
                agentBranchesList.push(agentBranch);
              }) 
              replicateAgentsData[index].agentBranchesList = agentBranchesList;
              replicateAgentsData[index].agentBranchesDisabled = false;
              this.setState({replicateAgentsData,snackbar:false,loading:false},()=>{
                //console.log(this.state.agentBranchesList);
              }); 
              }
              else{
                replicateAgentsData[index].agentBranchesList = agentBranchesList;
                replicateAgentsData[index].agentBranchesDisabled = true;
                this.setState({replicateAgentsData,loading:false,notificationType:'warning',snackbar:true,snackbarMsg:'no agent branches records found'})
          
              }
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

    handleChangeAgentBranches = (data,id) => {
      let index = parseInt(id.replace('agentbranches',''));
      let replicateAgentsData = this.state.replicateAgentsData;
      replicateAgentsData[index].agentBranches = data;
      this.setState({replicateAgentsData},()=>{
          this.handleSaveEnable();
          this.handleClearEnable();
      });
    }

    handleViewAgentBranches = (data,id) => {
      let index = parseInt(id.replace('agentbranches',''));
      let replicateAgentsData = this.state.replicateAgentsData;
      replicateAgentsData[index].agentBranches = data;
      this.setState({replicateAgentsData},()=>{
          this.handleSaveEnable();
          this.handleClearEnable();
      });
    }

    handleAddAgentRule = (indexValue) => {
      let existingIndex = null;
      let replicateAgentsData = this.state.replicateAgentsData;
      let checkExistingRule = this.state.replicateAgentsData[indexValue];
      this.setState({snackbar:false},()=>{
        if(this.state.replicateAgentsData.length > 0){
          this.state.replicateAgentsData.map((obj,index)=>{
            if(indexValue == index){
              return null;
            }
            else{
              if(checkExistingRule.agentProfile.id == obj.agentProfile.id){
                existingIndex = index;
              }
            }
          })
          if(existingIndex == null){
            replicateAgentsData.push(Object.assign({},this.state.newPushObj));
            this.setState({replicateAgentsData},()=>{
              this.handleSaveEnable();
              this.handleClearEnable();
            });
          }
          else{
            this.setState({snackbar:true,notificationType:'warning',snackbarMsg:`Agent rules are already added in row ${existingIndex+1}`})
          }
        }
      }) 
    }

    handleDeleteAgentRule = (index) => {
      let replicateAgentsData = this.state.replicateAgentsData;
      replicateAgentsData.splice(index,1);
      this.setState({replicateAgentsData},()=>{
        this.handleSaveEnable();
        this.handleClearEnable();
      });
    }

    handleSaveEnable = () => {
      if((Object.keys(this.state.serviceProviderData).length == 0) || (Object.keys(this.state.productTypeData).length == 0) || (Object.keys(this.state.subProductTypeData).length == 0) || ((this.state.serviceTypeList.length > 0) && ((Object.keys(this.state.serviceTypeData).length == 0))) || (Object.keys(this.state.transactionTypeData).length == 0)){
        this.setState({saveDisabled:false})
      }
      else if((this.state.isToken == true) && ((this.state.tokenExpiryCheck == true) || (this.state.tokenExpiryHours.length == 0) || (this.state.tokenExpiryMins.length == 0) || (this.state.tokenExpirySecs.length == 0))){
          this.setState({saveDisabled:false})
      }
      else if((this.state.isTransaction == true) && ((this.state.tokenExpiryCheck == true) || (Object.keys(this.state.transactionStatusData).length == 0) || (this.state.tokenExpiryHours.length == 0) || (this.state.tokenExpiryMins.length == 0) || (this.state.tokenExpirySecs.length == 0))){
        this.setState({saveDisabled:false})
      }
      else if((this.state.isTransaction == false) && (this.state.isToken == false)){
        this.setState({saveDisabled:false})
      }
      else if(this.state.replicateToOtherAgent == true){
        let errCount = 0;
        this.state.replicateAgentsData.map((obj,index)=>{
          if((obj.agentProfileCheck == true) || (obj.agentBranchesCheck == true) || (Object.keys(obj.agentProfile).length == 0)){
            errCount = errCount+1;
          }
        })
        if(errCount > 0){
          this.setState({saveDisabled:false})
        }
        else{
          this.setState({saveDisabled:true})
        }
      }
      else {
        this.setState({saveDisabled:true})
      }
    }

    handleClearEnable = () => {
      if((Object.keys(this.state.serviceProviderData).length > 0) || (Object.keys(this.state.subProductTypeData).length > 0) || (Object.keys(this.state.serviceTypeData).length > 0) || (Object.keys(this.state.transactionTypeData).length > 0) || (this.state.isToken == true) || (this.state.isTransaction == true) || (this.state.tokenExpiryCheck == true) || (Object.keys(this.state.transactionStatusData).length > 0) || (this.state.replicateToOtherAgent == true) || (this.state.replicateToSelfAgent == true)) {
        this.setState({
          isClearEnabled: true,
        })
      }
      else {
        this.setState({
          isClearEnabled: false,
        })
      }
    }

    handleData = () => {
      var data = {};
      data.serviceProviderName = this.state.serviceProviderData.label;
      data.serviceProviderCode = this.state.serviceProviderData.value;
      data.productType = this.state.productType;
      data.subProductType = this.state.subProductTypeData.value;
      data.transactionType = this.state.transactionTypeData.value;
      if(this.state.serviceTypeDisabled == true){
        data.serviceType = this.state.serviceTypeData.value;
      }
      if(this.state.isTransaction == true){ 
        data.transactionStatus = this.state.transactionStatusData.value;
      }
      data.tokenOrTransactionType = this.state.isTransaction ? 'TRANSACTION':'TOKEN';
      data.time = this.state.tokenExpiryHours+':'+this.state.tokenExpiryMins+':'+this.state.tokenExpirySecs;
      if(this.state.replicateToSelfAgent == true || this.state.replicateToOtherAgent == true){
        data.agentReplications = [];
      }
      if(this.state.replicateToSelfAgent == true){
        let selfAgent = {};
        selfAgent.agentId = parseInt(this.props.match.params.agentid);
        selfAgent.agentBranchesId = [];
        if(this.state.custTypeCountryArr.length>0){ 
          this.state.custTypeCountryArr.map((obj)=>{
            selfAgent.agentBranchesId.push(obj.id);
          })
          data.agentReplications.push(selfAgent);
        }
      }
      if(this.state.replicateToOtherAgent == true){
        if(this.state.replicateAgentsData.length>0){
          this.state.replicateAgentsData.map((obj)=>{
            let selfAgent = {};
            selfAgent.agentId = obj.agentProfile.id;
            selfAgent.agentBranchesId = [];
            if(obj.agentBranches.length > 0){
              obj.agentBranches.map((branch)=>{
                selfAgent.agentBranchesId.push(branch.id);
              })
            }
            data.agentReplications.push(selfAgent)
          })
        }
      }
      
      data.status = this.state.status ? 'ENABLED' : 'DISABLED';
      this.createTokenExpiry(data);
    }

    createTokenExpiry = (data) => {
      if(sessionStorage.getItem('token') == undefined){
        window.location.replace(config.PAAS_LOGIN_URL)
        return (<h1>401 - Unauthorized Request</h1>)
      }
      else{
        let headers = {
          Authorization:sessionStorage.getItem('token')
        }
        this.setState({loading:true,loaderMessage:'Posting Data'},()=>{
          ApiService.CreateTokenExpiry(data,this.props.match.params.agentid,this.props.match.params.agentbranchId,headers)
          .then((response)=>{
            console.log(response);
            let snackbarMsg = (this.state.replicateToSelfAgent || this.state.replicateToOtherAgent) ? 'The rule has been replicated to the agents and branches and will be available under them.' : 'Token/Transaction Expiry rule created successfully';
            this.setState({loading:false,snackbar:true,notificationType:'success',snackbarMsg},()=>{
              setTimeout(()=>{
                this.props.history.push(`/agentprofiles/${this.props.match.params.agentid}/branches/${this.props.match.params.agentbranchId}?tabId=${1}&pageelements=${5}`)
              },1600)
            })
          }).catch(error=>{
            if(Exceptionhandler.throwErrorType(error).status == 401){
              window.location.replace(config.PAAS_LOGIN_URL)
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
      console.log(regex.test(this.state.tokenExpiryHours));
      console.log(this.state.tokenExpiryHours.length)
      if(this.state.tokenExpiryHours.length == 0 || this.state.tokenExpiryMins.length == 0 || this.state.tokenExpirySecs.length == 0){
        this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
          this.handleSaveEnable();
          this.handleClearEnable();
        })
      }
      else if(regex.test(this.state.tokenExpiryHours) == false || regex.test(this.state.tokenExpiryMins) == false || regex.test(this.state.tokenExpirySecs) == false){
        this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
          this.handleSaveEnable();
          this.handleClearEnable();
        })
      }
      else if((this.state.tokenExpiryHours == 0 && this.state.tokenExpiryHours.length > 0) || (this.state.tokenExpiryHours < 10 && this.state.tokenExpiryHours > 0 && !this.state.tokenExpiryCheck && this.state.tokenExpiryHours.length == 1)){
        let tokenExpiryHours = this.state.tokenExpiryHours;
        tokenExpiryHours = ('0' + tokenExpiryHours).slice(-2);
        this.setState({tokenExpiryHours},()=>{
          this.handleSaveEnable();
          this.handleClearEnable();
        })
      }
      else if(this.state.tokenExpiryHours.length > 2 && parseInt(this.state.tokenExpiryHours) == 0 && !this.state.tokenExpiryCheck){
        this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
          this.handleSaveEnable();
          this.handleClearEnable();
        })
      }
      else if(this.state.tokenExpiryHours.length > 2 && parseInt(this.state.tokenExpiryHours) > 9 && !this.state.tokenExpiryCheck){
        let tokenExpiryHours = ''+parseInt(this.state.tokenExpiryHours);
        this.setState({tokenExpiryHours:tokenExpiryHours},()=>{
          this.handleSaveEnable();
          this.handleClearEnable();
        })
      }
      else if(this.state.tokenExpiryHours.length > 2 && parseInt(this.state.tokenExpiryHours) < 9 && parseInt(this.state.tokenExpiryHours) > 0 && !this.state.tokenExpiryCheck){
        let tokenExpiryHours = '0'+parseInt(this.state.tokenExpiryHours);
        this.setState({tokenExpiryHours:tokenExpiryHours},()=>{
          this.handleSaveEnable();
          this.handleClearEnable();
        })
      }
      else if((this.state.tokenExpiryMins == 0 && this.state.tokenExpiryMins.length > 0) || (this.state.tokenExpiryMins < 10 && this.state.tokenExpiryMins > 0 && !this.state.tokenExpiryCheck && this.state.tokenExpiryMins.length == 1)){
        let tokenExpiryMins = this.state.tokenExpiryMins;
        tokenExpiryMins = ('0' + tokenExpiryMins).slice(-2);
        this.setState({tokenExpiryMins},()=>{
          this.handleSaveEnable();
          this.handleClearEnable();
        })
      }
      else if(this.state.tokenExpiryMins.length > 2 && parseInt(this.state.tokenExpiryMins) == 0 && !this.state.tokenExpiryCheck){
        this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
          this.handleSaveEnable();
          this.handleClearEnable();
        })
      }
      else if(this.state.tokenExpiryMins.length > 2 && parseInt(this.state.tokenExpiryMins) > 9 && !this.state.tokenExpiryCheck){
        let tokenExpiryMins = ''+parseInt(this.state.tokenExpiryMins);
        this.setState({tokenExpiryMins},()=>{
          this.handleSaveEnable();
          this.handleClearEnable();
        })
      }
      else if(this.state.tokenExpiryMins.length > 2 && parseInt(this.state.tokenExpiryMins) > 0 && parseInt(this.state.tokenExpiryMins) < 9 && !this.state.tokenExpiryCheck){
        let tokenExpiryMins = '0'+parseInt(this.state.tokenExpiryMins);
        this.setState({tokenExpiryMins},()=>{
          this.handleSaveEnable();
          this.handleClearEnable();
        })
      }
      else if((this.state.tokenExpirySecs == 0 && this.state.tokenExpirySecs.length > 0) || (this.state.tokenExpirySecs < 10 && this.state.tokenExpirySecs > 0 && !this.state.tokenExpiryCheck && this.state.tokenExpirySecs.length == 1)){
        let tokenExpirySecs = this.state.tokenExpirySecs;
        tokenExpirySecs = ('0' + tokenExpirySecs).slice(-2);
        this.setState({tokenExpirySecs},()=>{
          this.handleSaveEnable();
          this.handleClearEnable();
        })
      }
      else if(this.state.tokenExpirySecs.length > 2 && parseInt(this.state.tokenExpirySecs) == 0 && !this.state.tokenExpiryCheck){
        this.setState({tokenExpiryCheck:true,tokenExpiryerrMsg:'Enter valid expiry time'},()=>{
          this.handleSaveEnable();
          this.handleClearEnable();
        })
      }
      else if(this.state.tokenExpirySecs.length > 2 && parseInt(this.state.tokenExpirySecs) > 9 && !this.state.tokenExpiryCheck){
        let tokenExpirySecs = ''+parseInt(this.state.tokenExpirySecs);
        this.setState({tokenExpirySecs},()=>{
          this.handleSaveEnable();
          this.handleClearEnable();
        })
      }
      else if(this.state.tokenExpirySecs.length > 2 && parseInt(this.state.tokenExpirySecs) > 0 && parseInt(this.state.tokenExpirySecs) < 9 && !this.state.tokenExpiryCheck){
        let tokenExpirySecs = '0'+parseInt(this.state.tokenExpirySecs);
        this.setState({tokenExpirySecs},()=>{
          this.handleSaveEnable();
          this.handleClearEnable();
        })
      }
      else {
        this.handleSaveEnable();
        this.handleClearEnable();
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
              <Loader action={this.state.loaderMessage}/>
              :
              <div>
                <Breadcrumps  links={this.state.breadcrumps}/> 
                <p className="bank-profile global-font" style={{marginTop:25,marginBottom:30,color:`#19ace3`}}>Token/Transaction Expiry (Create)</p>
                <TabContainer>
                    <div className={classes.root}>
                        <Grid container spacing={24} className='global-font'>
                            <Grid item xs={12} className='grid-no-bottom-padding'>
                                <p><b>Token/Transaction Expiry</b></p>
                            </Grid>
                            <Grid item xs={6} className='grid-no-top-padding grid-error'>
                            <Selectable
                              id="serviceProvider"
                              ref="Selectable"
                              label='Service Provider'
                              isRequired
                              searchable={true}
                              isCreatable={false}
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
                            {this.state.serviceProviderCheck ? <span className="errorMessage-add">{this.state.serviceProvidererrMsg} </span>:''}
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
                              {this.state.productTypeCheck ? <span className="errorMessage">{this.state.productTypeerrMsg} </span>:''}
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
                              {this.state.subProductTypeCheck ? <span className="errorMessage-add">{this.state.subProductTypeerrMsg} </span>:''}  
                            </Grid>
                            <Grid item xs={4} className='grid-no-top-padding grid-error'>
                            {
                              this.state.serviceTypeList.length > 0 ?
                              <div>
                                <Selectable
                                id="serviceType"
                                label='Service Type'
                                searchable={true}
                                value={this.state.serviceType}
                                options={this.state.serviceTypeList}
                                noResultsText="No Service Types Found"
                                searchBy={'any'}
                                placeholder={'Service Type'}
                                onChange={this.handleServiceTypeChange}
                                onValueClick={this.handleServiceTypeValueClick}
                                onBlur={this.handleBlur}
                                isEnabled={this.state.serviceTypeList.length > 0?true:false}
                              />
                              {this.state.serviceTypeCheck ? <span className="errorMessage-add">{this.state.serviceTypeerrMsg} </span>:''}
                              </div>:null
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
                                label='Transaction Type'
                                isRequired
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
                              {this.state.transactionTypeCheck ? <span className="errorMessage-add">{this.state.transactionTypeerrMsg} </span>:''}
                            </Grid> 
                        </Grid>
                        <Grid container spacing={24} className='global-font'>
                            <Grid item xs={12} className='grid-no-bottom-padding'>
                                <p><b>Set Expiry Time for</b></p>
                                <small>(Based on your selection, respective rule parameters will become visible for Token/Transaction)</small>
                            </Grid>
                            <Grid item xs={5} className='grid-no-top-padding'>
                              <Radio
                                isChecked={this.state.isToken}
                                onChange={this.handleExpiryChange}
                                id="Token"
                                value="Token"
                                umStyle="primary"
                                label="Token"
                                umLabelClass="label-class"
                                umClass="global-font"
                              />  
                              <Radio
                                isChecked={this.state.isTransaction}
                                onChange={this.handleExpiryChange}
                                id="Transaction"
                                value="Transaction"
                                umStyle="primary"
                                label="Transaction"
                                umLabelClass="label-class"
                              />  
                            </Grid>
                        </Grid>
                        {
                          this.state.isToken ? 
                            <Grid container spacing={24} className='global-font'>
                              <Grid item xs={12} className='grid-no-bottom-padding'>
                                  <p><b>Token Options</b></p>
                              </Grid>
                              <Grid item xs={2} className='grid-no-bottom-padding grid-error'>
                                <div style={{display:'flex'}}>
                                  <Input autocomplete="off" inputStyle={{width:"37px"}} style={{width:"37px"}} id='tokenExpiryHrs' value={this.state.tokenExpiryHours} placeholder="hh" regex={/^[0-9]+$/i} label="hh" type="numeric" isRequired onChange={(e, value) => this.handleTextfieldChange(e,value)} onError={e => this.handleTokenExpiryHoursError(e)} onBlur={(e) => this.handleTimeBlur(e,"tokenExpiryHrs")}/>
                                  <p style={{paddingTop:6,paddingRight:6}}>:</p>
                                  <Input autocomplete="off" style={{width:"37px"}}  id='tokenExpiryMins' value={this.state.tokenExpiryMins} placeholder="mm" regex={/^[0-9]+$/i} label="mm" type="numeric" max={60} isRequired onChange={(e, value) => this.handleTextfieldChange(e,value)} onError={e => this.handleTokenExpiryMinsError(e)} onBlur={(e) => this.handleTimeBlur(e,"tokenExpiryMins")}/>
                                  <p style={{paddingTop:6,paddingRight:6}}>:</p>
                                  <Input autocomplete="off" style={{width:"37px"}}  id='tokenExpirySecs' value={this.state.tokenExpirySecs} placeholder="ss" regex={/^[0-9]+$/i} label="ss" type="numeric" max={60} isRequired onChange={(e, value) => this.handleTextfieldChange(e,value)} onError={e => this.handleTokenExpirySecsError(e)} onBlur={(e) => this.handleTimeBlur(e,"tokenExpirySecs")}/>
                                </div>
                              {this.state.tokenExpiryCheck ? <span style={{whiteSpace:"nowrap",bottom:"-7px"}} className="errorMessage-add">{this.state.tokenExpiryerrMsg} </span>:''}
                              </Grid> 
                            </Grid>
                          :
                          [
                            this.state.isTransaction ? 
                            <Grid container spacing={24} className='global-font'>
                              <Grid item xs={12} className='grid-no-bottom-padding'>
                                  <p><b>Transaction Options</b></p>
                              </Grid> 
                              <Grid item xs={4} className='global-font grid-error'>
                                <Selectable
                                  id="transactionStatus"
                                  isRequired
                                  searchable={true}
                                  value={this.state.transactionStatus}
                                  options={transactionStatusList}
                                  noResultsText="No Transaction Status Found"
                                  searchBy={'any'}
                                  placeholder={'Transaction Status'}
                                  onChange={this.handleTransactionStatusChange}
                                  onValueClick={this.handleTransactionStatusValueClick}
                                  onBlur={this.handleBlur}
                                />
                                {this.state.transactionStatusCheck ? <span className="errorMessage-add">{this.state.transactionStatuserrMsg} </span>:''}
                              </Grid>
                              <Grid item xs={8} className='global-font'></Grid>
                              <Grid item xs={2} className='grid-no-bottom-padding grid-error'>
                                <div style={{display:'flex'}}>
                                  <Input autocomplete="off" inputStyle={{width:"37px"}} style={{width:"37px"}} id='tokenExpiryHrs' value={this.state.tokenExpiryHours} placeholder="hh" regex={/^[0-9]+$/i} label="hh" type="numeric" isRequired onChange={(e, value) => this.handleTextfieldChange(e,value)} onError={e => this.handleTokenExpiryHoursError(e)} onBlur={(e) => this.handleTimeBlur(e,"tokenExpiryHrs")}/>
                                  <p style={{paddingTop:6,paddingRight:6}}>:</p>
                                  <Input autocomplete="off"  style={{width:"37px"}}  id='tokenExpiryMins' value={this.state.tokenExpiryMins} placeholder="mm" regex={/^[0-9]+$/i} label="mm" type="numeric" max={60} isRequired onChange={(e, value) => this.handleTextfieldChange(e,value)} onError={e => this.handleTokenExpiryMinsError(e)} onBlur={(e) => this.handleTimeBlur(e,"tokenExpiryMins")}/>
                                  <p style={{paddingTop:6,paddingRight:6}}>:</p>
                                  <Input autocomplete="off" style={{width:"37px"}}  id='tokenExpirySecs' value={this.state.tokenExpirySecs} placeholder="ss" regex={/^[0-9]+$/i} label="ss" type="numeric" max={60} isRequired onChange={(e, value) => this.handleTextfieldChange(e,value)} onError={e => this.handleTokenExpirySecsError(e)} onBlur={(e) => this.handleTimeBlur(e,"tokenExpirySecs")}/>
                                </div>
                              {this.state.tokenExpiryCheck ? <span style={{whiteSpace:"nowrap",bottom:"-7px"}} className="errorMessage-add">{this.state.tokenExpiryerrMsg} </span>:''}
                              </Grid> 
                            </Grid>:null
                          ]
                        }
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
                              <MultiSelectTextField disabled={this.state.agentBranchesDisabled} value={this.state.custTypeCountryArr} label='Agent Branches' type='agentbranches' suggestionFields={this.state.agentBranchesList} placeholder={'Agent Branches'} MultiSelectText='Agent Branches' getAutoSelectValue={this.handleChangeCustAgentBranch} getViewValues={this.handleViewCustAgentBranchValues}/>
                            </Grid>:null
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
                              this.state.replicateAgentsData.map((obj,index)=>{
                                return (
                                  <Grid container spacing={24} className='global-font grid-error'>
                                    <Grid item xs={5}>
                                      <Selectable
                                        id={'agent'+index}
                                        label="Agent"
                                        isRequired
                                        searchable={true}
                                        isClearable={true}
                                        value={obj.agentProfile.value}
                                        options={this.state.agentsList}
                                        noResultsText="No Agents List Found"
                                        searchBy={'any'}
                                        placeholder={'Agent'}
                                        onChange={(e)=>this.handleReplicaAgentChange(e,index)}
                                        onValueClick={(e)=>this.handleReplicaAgentValueClick(e,index)}
                                        onBlur={(e)=>this.handleReplicaAgentBlur(e,index)}
                                      />
                                      {obj.agentProfileCheck ? <span className="errorMessage-add">{obj.agentProfileerrMsg} </span>:''}
                                    </Grid>
                                    <Grid item xs={5}>
                                      <MultiSelectTextField disabled={obj.agentBranchesDisabled} value={obj.agentBranches} label='Agent Branches' type={'agentbranches'+index} suggestionFields={obj.agentBranchesList} placeholder={'Agent Branches'} MultiSelectText='Agent Branches' getAutoSelectValue={this.handleChangeAgentBranches} getViewValues={this.handleViewAgentBranches}/>
                                      {obj.agentBranchesCheck ? <span className="errorMessage">{obj.agentBranchesCheckerrMsg} </span>:''}
                                    </Grid>
                                    <Grid item xs={2} alignItems="flex-end">
                                    {
                                      (index == this.state.replicateAgentsData.length - 1) ?
                                      <FloatButton
                                        id="floatButton"
                                        icon="plus"
                                        iconStyle={{fontSize:20}}
                                        isEnabled={((Object.keys(obj.agentProfile).length == 0) || (obj.agentProfileCheck == true) || (obj.agentBranchesCheck == true)) ? false : true}
                                        onClick={(e)=>this.handleAddAgentRule(index)}
                                        style={{ "margin-right": "10px", height: 32, width: 32 }}
                                      />
                                      :
                                      <FloatButton iconStyle={{fontSize:20}} icon="delete" style={{ "margin-right": "10px", height: 32, width: 32, backgroundColor:'#c03018' }}  onClick={(e)=>this.handleDeleteAgentRule(index)}/>
                                    }
                                    </Grid>
                                  </Grid>
                                )
                              })
                            ]
                            :null
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
                            <TextButton className = "global-font save-clear" id="defaultTextButton" umStyle="default" onClick={this.handleClear} isEnabled={this.state.isClearEnabled} style={{ marginRight: "10px" }}>Clear</TextButton> 
                            <TextButton className = "global-font save-clear" id="disabledTextButton" umSize="small" onClick={this.handleData} isEnabled={this.state.saveDisabled}>Save</TextButton>
                            </Grid>       
                          </Grid>
                        </Grid>
                    </div>
                    {
                      this.state.confirmDelete ? <ModalBox isOpen={this.state.confirmDelete}  fromAction={this.state.fromAction} actionType="Yes" message={(this.state.modalMessage)} modalAction={this.handleModalResponse}/> : null
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
                      this.state.shownogeneralrules ? <ErrorModalBox isOpen={this.state.shownogeneralrules} actionType="OK" message={this.state.apiErrMsg} modalAction={this.handleStatusResponse}/> : null
                    }
                </TabContainer>
              </div>
            ]
          }
          </MuiThemeProvider>
        );
      }
}

CreateTokenExpiry.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(CreateTokenExpiry);