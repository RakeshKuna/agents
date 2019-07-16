import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import '../vendor/common.css';
import '../theme/theme';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import RegulerTextfield from '../container/RegulerTextfield';
// import Toggleswitch from './../container/Toggleswitch';

import ModalBox from './../component/Modalbox';
import * as ApiService from './ApiService';
import DownshiftMultiple from './../container/AutoselectTextfield';
import { Toggle, TextButton, Input,Notifications, Selectable} from 'finablr-ui';
import * as Exceptionhandler from './../ExceptionHandling';
import EmptyListComponent from '../component/EmptylistComponent';
import Loader from '../component/Loader';

import ErrorModalBox from '../component/ErrorModalbox';

import getMuiTheme from "../theme/theme";
import { MuiThemeProvider } from '@material-ui/core/styles';

import {SHOW_NOTIFICATION} from '../constants/action-types';
import {HIDE_NOTIFICATION} from '../constants/action-types';
import * as config from './../config/config';
import { isNull } from 'util';


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

class AgentBranchProfileDetails extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loading:true, 
            loaderMessage:'Retrieving Data',
            serverStatus:null,
            serverError:false,
            serverErrMessage:'',
            branchName:'',
            branchNameCheck:false,
            branchNameerrMsg:'',
            branchCode:'',
            branchCodeCheck:false,
            branchCodeerrMsg:'',
            address1:'',
            address1Check:false,
            notificationType:'success',
            address1errMsg:'',
            address2:'',
            address2Check:false,
            address2errMsg:'',
            pobox:'',
            poboxCheck:false,
            poboxerrMsg:'',
            state:'',
            stateCheck:false,
            stateerrMsg:'',
            city:'',
            cityCheck:false,
            cityerrMsg:'',
            zipCode:'',
            zipCodeCheck:false,
            zipCodeerrMsg:'',
            fax:'',
            faxCheck:false,
            faxerrMsg:'',
            phone:'',
            phoneCheck:false,
            phoneerrMsg:'',
            mobile:'',
            mobileCheck:false,
            mobileerrMsg:'',
            email:'',
            emailCheck:false,
            emailerrMsg:'',
            contactPerson:'',
            contactPersonCheck:false,
            contactPersonerrMsg:'',
            countryList:[],
            country:null,
            countryData:{},
            countryCheck:false,
            countryerrMsg:'',
            status:true,
            isClearEnabled: false,
            saveDisabled:false,
            confirmDelete:false,
            fromAction:'',
            countryDisabled:false,
            snackbarMsg:'',
            snackbar:false,
            shownogeneralrules:false,
            apiErrMsg:'',
            isdCodes:'',
        };
    }

    componentDidMount(){
       console.log(this.props);
       this.fetchCountryList(); 
    }

    fetchCountryList=()=>{
      if(sessionStorage.getItem('token') == undefined){
        window.location.replace(config.PAAS_LOGIN_URL);
        return (<h1>401 - Unauthorized Request</h1>)
      }
      else{
        let headers = {
          Authorization:sessionStorage.getItem('token')
        }
        let countryList = [];
        ApiService.fetchCountryList().then((response)=>{
          console.log(response);
          if(response.data.length > 0){
            response.data.map((obj)=>{
              let country = {};
              country.id = obj.id;
              country.label = obj.name;
              country.value = obj.countryCode;
              country.isdCodes = obj.isdCode;
              countryList.push(country);
            }) 
            this.setState({countryList,loading:false},()=>{
            this.setCountryField();
            console.log(this.state.countryList);
            }); 
          }
          else{
            this.setState({ loading: false })
            alert ('no country records');
          }
        })
        .catch(error=>{
          if(Exceptionhandler.throwErrorType(error).status == 401){
            window.location.replace(config.PAAS_LOGIN_URL)
            return (<h1>401 - Unauthorized Request</h1>)
          }
          else if(Exceptionhandler.throwErrorType(error).status == 500 || Exceptionhandler.throwErrorType(error).status == 503 || Exceptionhandler.throwErrorType(error).status == 404){
            this.setState({loading:false,serverError:true,serverStatus:Exceptionhandler.throwErrorType(error).status,serverErrMessage:Exceptionhandler.throwErrorType(error).message})
          }
          else{
            this.setState({loading:false,serverError:false,shownogeneralrules:true,apiErrMsg:error.response.data.error || error.response.data.message,actionType:'OK'})
          }
        }); 
      } 
    }

    setCountryField = () => {
      console.log(this.props);
      this.state.countryList.filter((user)=> {
        if((this.props.agentProfile.countryCode == user.value) || (this.props.agentProfile.country == user.label)){
          this.setState({countryData:user,country:user.label,countryDisabled:false,isdCodes:user.isdCodes})
        }
      });
    }

    validateEmail = (email) => {
      let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    validateMobile = (mobile) => {
      var pattern1 = /^[0-9]{10,15}$/;
      var pattern2 = /^([0|\+[0-9]{1,5})?([0-9]{12})$/
      let pattern1Flag = pattern1.test(mobile);
      let pattern2Flag = pattern2.test(mobile);
      if(pattern1Flag || pattern2Flag){
        console.log(pattern1Flag,pattern2Flag)
        return true;
      }
      else{
        return false;
      }
    }

    validatePhone = (phone) => {
      // sample
      // (123) 456-7890
      // (123)456-7890
      // 123-456-7890
      // 123.456.7890
      // 1234567890
      // +31636363634
      // 075-63546725
      // (123) 456-7890
      // 123-456-7890
      // 123.456.7890
      // 1234567890
      // (123) 456-7890
      // +(123) 456-7890
      // +(123)-456-7890
      // +(123) - 456-7890
      // +(123) - 456-78-90
      // 123-456-7890
      // 123.456.7890
      // 1234567890
      // +31636363634
      // 075-63546725
      // (541) 754-3010 
      // +1-541-754-3010 
      // 1-541-754-3010 
      // 001-541-754-3010 
      // 191 541 754 3010 
      let pattern1 = /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g;
      let pattern2 = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      let pattern3 = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
      let pattern_backend = /^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*/;
    
      let pattern1Flag = pattern1.test(phone)
      let pattern2Flag = pattern2.test(phone)
      let pattern3Flag = pattern3.test(phone)
      let patternBackendTrue = pattern_backend.test(phone)
      if(pattern1Flag || pattern2Flag || pattern3Flag){
        return true;
      }
      else{
        return false;
      }
    }

    validateFax = (fax) => {
      // sample fax
      // +44 161 999 8888
      // 011 44 (161) 999 8888
      // +1 (212) 222 8888
      // 1-212-222 8888
      // 11111111222
      let faxRegExp = /^(\+?\d{1,}(\s?|\-?)\d*(\s?|\-?)\(?\d{2,}\)?(\s?|\-?)\d{3,}\s?\d{3,})$/gm;
      return faxRegExp.test(fax);
    }

    validatePOBox = (pobox) => {
      let pattern = /^([0-9]){3,10}$/; 
      return pattern.test(pobox);
    }

    // regex={/^([A-Z0-9 _-]+)$/} 

    validateZip = (zip) => {
      let pattern = /^[0-9a-zA-Z]{2,20}$/;
      return pattern.test(zip);
    }

    handleTextfieldChange = (e,value) => {
      let pattern = /^[a-zA-Z0-9]+$/i;
      let pattern1 =/^[a-zA-Z ]*$/;
      this.props.handleCompValueChange(true);
      switch(e.target.id){
        case ('branchCode'):
          this.setState({branchCode:value,branchCodeCheck:false},()=>{
            if(this.state.branchCode.length == 0){
              this.setState({branchCodeCheck:true,branchCodeerrMsg:'Branch Code can not be empty'},()=>{
                this.handleEnable();
                this.handleClearEnable();
              });
            }
            // else if(pattern.test(this.state.branchCode) == false){
            //   this.setState({branchCodeCheck:true,branchCodeerrMsg:'Branch code should be Alphanumeric'},()=>{
            //     this.handleEnable();
            //   });
            // }
            else{
              this.setState({branchCodeCheck:false,branchCodeerrMsg:''},()=>{
                this.handleEnable();
                this.handleClearEnable();
              });
            }
          })
        break;
        case('branchName'):
          this.setState({branchName:value,branchNameCheck:false},()=>{
            if(this.state.branchName.length == 0){
              this.setState({branchNameCheck:true,branchNameerrMsg:'Branch Name can not be empty'},()=>{
                this.handleEnable();
                this.handleClearEnable();
              });
            }
            // else if (pattern1.test(this.state.branchName) == false){
            //   this.setState({branchNameCheck:true,branchNameerrMsg:'Branch name should contain only alphabets'},()=>{
            //     this.handleEnable();
            //   });
            // }
            else{
              this.setState({branchNameCheck:false,branchNameerrMsg:''},()=>{
                this.handleEnable();
                this.handleClearEnable();
              });
            }
          })
        break;
        case('address1'):
          this.setState({address1:value,address1Check:false},()=>{
            if(this.state.address1.length == 0){
              this.setState({address1Check:true,address1errMsg:'Address1 can not be empty'},()=>{
                this.handleEnable();
                this.handleClearEnable();
              });
            }
            else{
              this.setState({address1Check:false,address1errMsg:''},()=>{
                this.handleEnable();
                this.handleClearEnable();
              });
            }
          })
        break;
        case('address2'):
          this.setState({address2:value,address2Check:false},()=>{
            if(this.state.address2.length == 0){
              this.setState({address2Check:true,address2errMsg:'Address2 can not be empty'},()=>{
                this.handleEnable();
                this.handleClearEnable();
              });
            }
            else{
              this.setState({address2Check:false,address2errMsg:''},()=>{
                this.handleEnable();
                this.handleClearEnable();
              });
            }
          })
        break;
        case('state'):
          this.setState({state:value,stateCheck:false},()=>{
            if(this.state.state.length == 0){
              this.setState({stateCheck:true,stateerrMsg:'State can not be empty'},()=>{
                this.handleEnable();
                this.handleClearEnable();
              });
            }
            else{
              this.setState({stateCheck:false,stateerrMsg:''},()=>{
                this.handleEnable();
                this.handleClearEnable();
              });
            }
          })
        break;
        case('city'):
          this.setState({city:value,cityCheck:false},()=>{
            if(this.state.city.length == 0){
              this.setState({cityCheck:true,cityerrMsg:'City can not be empty'},()=>{
                this.handleEnable();
                this.handleClearEnable();
              });
            }
            else{
              this.setState({cityCheck:false,cityerrMsg:''},()=>{
                this.handleEnable();
                this.handleClearEnable();
              });
            }
          })
        break;
        case ('status'):
        this.setState({ status: e.target.checked }, () => {
          console.log(this.state.status);
        });
        break;
        case('contactPerson'):
          this.setState({contactPerson:value,contactPersonCheck:false},()=>{
            if(this.state.contactPerson.length > 0){
              if(pattern1.test(this.state.contactPerson) == false){
                this.setState({contactPersonCheck:true,contactPersonerrMsg:'Should contain only alphabets'})
              }
            }else{
              this.setState({contactPersonCheck:false,contactPersonerrMsg:''},()=>{
                this.handleEnable();
                this.handleClearEnable();
              })
            }
            // if(this.state.contactPerson.length == 0){
            //   this.setState({contactPersonCheck:true,contactPersonerrMsg:'contactPerson cannot be empty'});
            // }
            // else{
            //   this.setState({contactPersonCheck:false,contactPersonerrMsg:''});
            // }
          })
        break;
        case('pobox'):
          this.setState({pobox:value,poboxCheck:false},()=>{
            if(this.state.pobox.length > 0){
              if(this.validatePOBox(this.state.pobox) == true){
                this.setState({poboxCheck:false,poboxerrMsg:''},()=>{
                  this.handleEnable();
                  this.handleClearEnable();
                });
              }
              else{
                this.setState({poboxCheck:true,poboxerrMsg:'Please Enter 3-10 Numeric characters'},()=>{
                  this.handleEnable();
                  this.handleClearEnable();
                });
              }
            }
            else if (this.state.pobox.length == 0){
              this.setState({poboxCheck:false,poboxerrMsg:''},()=>{
                this.handleEnable();
                this.handleClearEnable();
              })
            }
            else{
              this.setState({poboxCheck:false,poboxerrMsg:''},()=>{
                this.handleEnable();
                this.handleClearEnable();
              });
            }
          })
        break;
        case('fax'):
          this.setState({fax:value,faxCheck:false},()=>{
            if(this.state.fax.length > 0){
              if(this.validateFax(this.state.fax) == true){
                this.setState({faxCheck:false,faxerrMsg:''},()=>{
                  this.handleEnable();
                  this.handleClearEnable();
                });
              }
              else{
                this.setState({faxCheck:true,faxerrMsg:'Enter valid fax'},()=>{
                  this.handleEnable();
                  this.handleClearEnable();
                });
              }
            }
            else if(this.state.fax.length == 0){
              this.setState({faxCheck:false,faxerrMsg:''},()=>{
                this.handleEnable();
                this.handleClearEnable();
              })
            }
            else{
              this.setState({faxCheck:false,faxerrMsg:''},()=>{
                this.handleEnable();
                this.handleClearEnable();
              });
            }
          })
        break;
        case('zipcode'):
          this.setState({zipCode:value,zipCodeCheck:false},()=>{
            if(this.state.zipCode.length > 0){
              if(this.validateZip(this.state.zipCode) == true){
                this.setState({zipCodeCheck:false,zipCodeerrMsg:''},()=>{
                  this.handleEnable();
                  this.handleClearEnable();
                });
              }
              else{
                this.setState({zipCodeCheck:true,zipCodeerrMsg:'Enter valid Zip code'},()=>{
                  this.handleEnable();
                  this.handleClearEnable();
                });
              }
            }
            else if(this.state.zipCode.length == 0){
              this.setState({zipCodeCheck:true,zipCodeerrMsg:'Zip code can not be empty'},()=>{
                this.handleEnable();
                this.handleClearEnable();
              });
            }
            else{
              this.setState({zipCodeCheck:false,zipCodeerrMsg:''},()=>{
                this.handleEnable();
                this.handleClearEnable();
              });
            }
          })
        break;
        case('email'):
          this.setState({email:value,emailCheck:false},()=>{
            if(this.state.email.length > 0){
              if(this.validateEmail(this.state.email) == true){
                this.setState({emailCheck:false,emailerrMsg:''},()=>{
                  this.handleEnable();
                  this.handleClearEnable();
                });
              }
              else{
                this.setState({emailCheck:true,emailerrMsg:'Enter valid email'},()=>{
                  this.handleEnable();
                  this.handleClearEnable();
                });
              }
            }
            else if(this.state.email.length == 0){
              this.setState({emailCheck:true,emailerrMsg:'Email can not be empty'},()=>{
                this.handleEnable();
                this.handleClearEnable();
              });
            }
            else{
              this.setState({emailCheck:false,emailerrMsg:''},()=>{
                this.handleEnable();
                this.handleClearEnable();
              });
            }
          })
        break;
        case('phone'):
          this.setState({phone:value,phoneCheck:false},()=>{
            if(this.state.phone.length > 0){
              if(this.state.phone.trim().length < 10 || this.state.phone.trim().length > 13){
                this.setState({phoneCheck:true,phoneerrMsg:'Enter valid phone'},()=>{
                  this.handleEnable();
                  this.handleClearEnable();
                });
              }
              else if(this.validatePhone(this.state.phone) == true){
                this.setState({phoneCheck:false,phoneerrMsg:''},()=>{
                  this.handleEnable();
                  this.handleClearEnable();
                });
              }
              else{
                this.setState({phoneCheck:true,phoneerrMsg:'Enter valid phone'},()=>{
                  this.handleEnable();
                  this.handleClearEnable();
                });
              }
            }
            else if(this.state.phone.length == 0){
              this.setState({phoneCheck:true,phoneerrMsg:'Phone can not be empty'},()=>{
                this.handleEnable();
                this.handleClearEnable();
              });
            }
            else if(this.state.mobile.length > 0 && this.state.mobileCheck == false){
              this.setState({phoneCheck:false,phoneerrMsg:''},()=>{
                this.handleEnable();
                this.handleClearEnable();
              });
            }
            else{
              this.setState({phoneCheck:false,phoneerrMsg:''},()=>{
                this.handleEnable();
                this.handleClearEnable();
              });
            }
          })
        break;
        case('mobile'):
          this.setState({mobile:value,mobileCheck:false},()=>{
            if((this.state.mobile.length >= 10) && (this.state.mobile.length <= 15)){
              console.log(this.validateMobile(this.state.mobile));
              if(this.validateMobile(this.state.mobile) == true){
                this.setState({mobileCheck:false,mobileerrMsg:''},()=>{
                  this.handleEnable();
                  this.handleClearEnable();
                });
              }
              else{
                this.setState({mobileCheck:true,mobileerrMsg:'Enter valid mobile'},()=>{
                  this.handleEnable();
                  this.handleClearEnable();
                });
              }
            }
            else if((this.state.mobile.length < 10) || (this.state.mobile.length > 15)){
              this.setState({mobileCheck:true,mobileerrMsg:'Enter valid mobile'},()=>{
                this.handleEnable();
                this.handleClearEnable();
              });
            }
            else if((this.state.phone.length > 0) && (this.state.phoneCheck == false)){
              this.setState({mobileCheck:false,mobileerrMsg:''},()=>{
                this.handleEnable();
                this.handleClearEnable();
              });
            }
            else if(this.state.mobile.length == 0){
              this.setState({mobileCheck:true,mobileerrMsg:'Mobile can not be empty'},()=>{
                this.handleEnable();
                this.handleClearEnable();
              });
            }
            else{
              this.setState({mobileCheck:false,mobileerrMsg:''},()=>{
                this.handleEnable();
                this.handleClearEnable();
              });
            }
          })
        break;
      }
    }

    handleBlur = (e) => {
      console.log(e.target.id);
      switch (e.target.id) {
        case 'country':
        this.setState({ countryCheck: false }, () => {
          if (this.state.country == undefined) {
            this.setState({ countryCheck: true, countryerrMsg: 'Country can not be empty' }, () => {
              this.handleEnable();
              this.handleClearEnable();
            })

          }
          else if (this.state.country.length == 0) {
            this.setState({ countryCheck: true, countryerrMsg: 'Country can not be empty' }, () => {
              this.handleEnable();
              this.handleClearEnable();
            })
          }
          else {
            this.handleEnable();
            this.handleClearEnable();
          }
        })
        break;
      }
    }

    handleChange = (data,type,obj) => {
      console.log(data.target.checked,type,obj);
      this.props.handleCompValueChange(true);
      var format = /^[a-zA-Z]*$/;
      switch(type){
        case ('country'):
          this.setState({country:data,countryData:obj},()=>{
            if(!format.test(this.state.country)){
              this.setState({countryCheck:true,countryerrMsg:'No special chars allowed'},()=>{
                this.handleEnable();
                this.handleClearEnable();
              });
            }
            else if(this.state.country.length == 0){
              this.setState({countryCheck:true,countryerrMsg:'Country can not be empty'},()=>{
                this.handleEnable();
                this.handleClearEnable();
              }); 
            }
            else{
              this.setState({countryCheck:false,countryerrMsg:''},()=>{
                this.handleEnable();
                this.handleClearEnable();
              });
            }
          });
        break;
        
      }
    };

    handleData = () => {
      console.log(Object.keys(this.state.countryData).length == 0);
      if(this.state.branchName.length == 0){
        this.setState({branchNameCheck:true,branchNameerrMsg:'Branch Name can not be empty'});
      }
      else if(this.state.branchCode.length == 0){
        this.setState({branchCodeCheck:true,branchCodeerrMsg:'Branch Code can not be empty'});
      }
      else if(this.state.address1.length == 0){
        this.setState({address1Check:true,address1errMsg:'Address1 can not be empty'});
      }
      else if(this.state.address2.length == 0){
        this.setState({address2Check:true,address2errMsg:'Address2 can not be empty'});
      }
      else if(this.state.state.length == 0){
        this.setState({stateCheck:true,stateerrMsg:'State can not be empty'});
      }
      else if(this.state.city.length == 0){
        this.setState({cityCheck:true,cityerrMsg:'City can not be empty'});
      }
      else if(this.state.poboxCheck == true){
        this.setState({poboxCheck:true,poboxerrMsg:'Enter valid PO Box'})
      }
      else if((this.state.zipCode.length == 0) || (this.state.zipCodeCheck==true)){
        this.setState({zipCodeCheck:true,zipCodeerrMsg:'Enter valid Zip code'})
      }
      else if(this.state.faxCheck == true){
        this.setState({faxerrMsg:'Enter valid fax'})
      }
      else if((this.state.country.length == 0) || (Object.keys(this.state.countryData).length == 0)){
        this.setState({countryCheck:true,countryerrMsg:'Select valid country'})
      }
      else if(((this.state.phone.length == 0) || (this.state.phoneCheck==true)) && ((this.state.mobile.length == 0) || (this.state.mobileCheck==true))){
        this.setState({phoneCheck:true,phoneerrMsg:'Enter valid phone',mobileCheck:true,mobileerrMsg:'Enter valid phone'})
      }
      else if((this.state.email.length == 0) || (this.state.emailCheck==true)){
        this.setState({emailCheck:true,emailerrMsg:'Enter valid email'})
      }
      else{
        let data = {
          "address1":this.state.address1,
          "address2": this.state.address2,
          "branchName": this.state.branchName,
          "city": this.state.city,
          "country": this.state.countryData.label,
          "countryCode": this.state.countryData.value,
          "isdCodes":this.state.isdCodes,
          "displayName": this.state.branchCode,
          "state": this.state.state,
          "status": this.state.status ? 'ENABLED':'DISABLED',
        }
        if((this.state.phone.length > 0) && (this.state.phoneCheck==false)){
          data.phone = this.state.phone;
        }
        if((this.state.mobile.length > 0) && (this.state.mobileCheck==false)){
          data.mobile = this.state.mobile;
        }
        if(this.state.contactPerson.length > 0){
          data.contactPerson = this.state.contactPerson;
        }
        if((this.state.fax.length > 0) && (this.state.faxCheck==false)){
          data.fax = this.state.fax;
        }
        if((this.state.pobox.length > 0) && (this.state.poboxCheck==false)){
          data.postBox = this.state.pobox;
        }
        if((this.state.zipCode.length > 0) && (this.state.zipCodeCheck==false)){
          data.zipCode = this.state.zipCode;
        }
        if((this.state.email.length > 0) && (this.state.emailCheck==false)){
          data.email = this.state.email;
        }
        console.log('success, do api', data);
        this.createAgentBranchCall(data);
      }
    }

    createAgentBranchCall = (data) =>{
      if(sessionStorage.getItem('token') == undefined){
        window.location.replace(config.PAAS_LOGIN_URL)
        return (<h1>401 - Unauthorized Request</h1>)
      }
      else{
        let headers = {
          Authorization:sessionStorage.getItem('token')
        }
        this.setState({loading:true,loaderMessage:'posting data',snackbar:false},()=>{
          ApiService.createAgentBranch(data,this.props.agentProfile.id,headers)
          .then((response)=>{
            console.log(response)
            if(response.status == 200){
              this.props.handleCompValueChange(false);
              //console.log('success');
              this.setState({snackbar:true,notificationType:'success',snackbarMsg:'Agent Branch profile created successfully'},()=>{
                setTimeout(()=>{
                  this.props.history.push(`/agentprofiles/${this.props.match.params.agentid}/branches`)
                },1800);
              })
            }
          })
          .catch(error=>{
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
              this.setState({loading:false,serverError:false,shownogeneralrules:true,apiErrMsg:error.response.data.error || error.response.data.message,actionType:'OK'})
              })
            }
          });
        })
      }
    }

    handleEnable = () => {
      let branchNameLen = (this.state.branchName == undefined || this.state.branchName == isNull || this.state.branchName == '') ? 0 : this.state.branchName.replace(/\s/g, '').length;
      let branchCodeLen = (this.state.branchCode == undefined || this.state.branchCode == isNull || this.state.branchCode == '') ? 0 : this.state.branchCode.replace(/\s/g, '').length;
      let address1Len = (this.state.address1 == undefined || this.state.address1 == isNull || this.state.address1 == '') ? 0 : this.state.address1.replace(/\s/g, '').length;
      let address2Len = (this.state.address2 == undefined || this.state.address2 == isNull || this.state.address2 == '') ? 0 : this.state.address2.replace(/\s/g, '').length;
      let stateLen = (this.state.state == undefined || this.state.state == isNull || this.state.state == '') ? 0 : this.state.state.replace(/\s/g, '').length;
      let cityLen = (this.state.city == undefined || this.state.city == isNull || this.state.city == '') ? 0 : this.state.city.replace(/\s/g, '').length;
      let zipCodeLen = (this.state.zipCode == undefined || this.state.zipCode == isNull || this.state.zipCode == '') ? 0 : this.state.zipCode.replace(/\s/g, '').length;
      let phoneLen = (this.state.phone == undefined || this.state.phone == isNull || this.state.phone == '') ? 0 : this.state.phone.replace(/\s/g, '').length;
      let mobileLen = (this.state.mobile == undefined || this.state.mobile == isNull || this.state.mobile == '') ? 0 : this.state.mobile.replace(/\s/g, '').length;
      let emailLen = (this.state.email == undefined || this.state.email == isNull || this.state.email == '') ? 0 : this.state.email.replace(/\s/g, '').length;
      let contactPersonLen = (this.state.contactPerson == undefined || this.state.contactPerson == isNull || this.state.contactPerson == '') ? 0 : this.state.contactPerson.replace(/\s/g, '').length;
      if((branchNameLen == 0) || (branchCodeLen == 0) || (address1Len == 0)
       || (address2Len == 0) || (stateLen == 0) || (cityLen == 0) || (zipCodeLen == 0) ||
        (this.state.zipCodeCheck == true) || (((phoneLen == 0) ||
         (this.state.phoneCheck == true)) && ((mobileLen == 0) ||
          (this.state.mobileCheck == true))) || (emailLen == 0) ||
           (this.state.emailCheck == true) || (this.state.poboxCheck == true)
            || (this.state.faxCheck == true) ||
             (contactPersonLen > 0 && this.state.contactPersonCheck == true) || this.state.branchCodeCheck || this.state.branchNameCheck || this.state.address1Check || this.state.address2Check
            || this.state.stateCheck || this.state.cityCheck || this.state.zipCodeCheck || this.state.emailCheck || this.state.mobileCheck || this.state.phoneCheck ){
        this.setState({saveDisabled:false})
      }
      else{
        this.setState({saveDisabled:true})
      }
    }

    handleClearEnable = () => {
      let branchNameLen = (this.state.branchName == undefined || this.state.branchName == isNull || this.state.branchName == '') ? 0 : this.state.branchName.length;
      let branchCodeLen = (this.state.branchCode == undefined || this.state.branchCode == isNull || this.state.branchCode == '') ? 0 : this.state.branchCode.length;
      let address1Len = (this.state.address1 == undefined || this.state.address1 == isNull || this.state.address1 == '') ? 0 : this.state.address1.length;
      let address2Len = (this.state.address2 == undefined || this.state.address2 == isNull || this.state.address2 == '') ? 0 : this.state.address2.length;
      let stateLen = (this.state.state == undefined || this.state.state == isNull || this.state.state == '') ? 0 : this.state.state.length;
      let cityLen = (this.state.city == undefined || this.state.city == isNull || this.state.city == '') ? 0 : this.state.city.length;
      let zipCodeLen = (this.state.zipCode == undefined || this.state.zipCode == isNull || this.state.zipCode == '') ? 0 : this.state.zipCode.length;
      let phoneLen = (this.state.phone == undefined || this.state.phone == isNull || this.state.phone == '') ? 0 : this.state.phone.length;
      let mobileLen = (this.state.mobile == undefined || this.state.mobile == isNull || this.state.mobile == '') ? 0 : this.state.mobile.length;
      let emailLen = (this.state.email == undefined || this.state.email == isNull || this.state.email == '') ? 0 : this.state.email.length;
      let contactPersonLen = (this.state.contactPerson == undefined || this.state.contactPerson == isNull || this.state.contactPerson == '') ? 0 : this.state.contactPerson.length;
      let poboxLen = (this.state.pobox == undefined || this.state.pobox == isNull || this.state.pobox == '') ? 0 : this.state.pobox.length;
      let faxLen = (this.state.fax == undefined || this.state.fax == isNull || this.state.fax == '') ? 0 : this.state.fax.length;
      if(branchCodeLen > 0 || branchNameLen > 0 || address1Len > 0 || address2Len > 0 || poboxLen > 0 || stateLen > 0 || cityLen > 0 || zipCodeLen > 0 || faxLen > 0 || phoneLen > 0 || mobileLen > 0 || emailLen > 0 || contactPersonLen > 0){
        this.setState({
          isClearEnabled: true
        })
      }
      else {
        this.setState({
          isClearEnabled: false
        })
      }
    }

    handleClear = () => {
      let branchNameLen = (this.state.branchName == undefined || this.state.branchName == isNull || this.state.branchName == '') ? 0 : this.state.branchName.length;
      let branchCodeLen = (this.state.branchCode == undefined || this.state.branchCode == isNull || this.state.branchCode == '') ? 0 : this.state.branchCode.length;
      let address1Len = (this.state.address1 == undefined || this.state.address1 == isNull || this.state.address1 == '') ? 0 : this.state.address1.length;
      let address2Len = (this.state.address2 == undefined || this.state.address2 == isNull || this.state.address2 == '') ? 0 : this.state.address2.length;
      let stateLen = (this.state.state == undefined || this.state.state == isNull || this.state.state == '') ? 0 : this.state.state.length;
      let cityLen = (this.state.city == undefined || this.state.city == isNull || this.state.city == '') ? 0 : this.state.city.length;
      let zipCodeLen = (this.state.zipCode == undefined || this.state.zipCode == isNull || this.state.zipCode == '') ? 0 : this.state.zipCode.length;
      let phoneLen = (this.state.phone == undefined || this.state.phone == isNull || this.state.phone == '') ? 0 : this.state.phone.length;
      let mobileLen = (this.state.mobile == undefined || this.state.mobile == isNull || this.state.mobile == '') ? 0 : this.state.mobile.length;
      let emailLen = (this.state.email == undefined || this.state.email == isNull || this.state.email == '') ? 0 : this.state.email.length;
      let contactPersonLen = (this.state.contactPerson == undefined || this.state.contactPerson == isNull || this.state.contactPerson == '') ? 0 : this.state.contactPerson.length;
      let poboxLen = (this.state.pobox == undefined || this.state.pobox == isNull || this.state.pobox == '') ? 0 : this.state.pobox.length;
      let faxLen = (this.state.fax == undefined || this.state.fax == isNull || this.state.fax == '') ? 0 : this.state.fax.length;
      this.setState({ confirmDelete: false, snackbar: false }, () => {
        if( branchCodeLen > 0 || branchNameLen > 0 || address1Len > 0 || address2Len > 0 || poboxLen > 0 || stateLen > 0 || cityLen > 0 || zipCodeLen > 0 || faxLen > 0 || phoneLen > 0 || mobileLen > 0 || emailLen > 0 || contactPersonLen > 0){
          this.setState({ confirmDelete: true, fromAction: 'clear', modalMessage: 'This will clear all data. Are you sure you want to continue?' })
        }
      })
    }

    handleModalResponse = (data, from)=> {
      if(data==true && from =='clear'){
        this.setState({
          confirmDelete:false,
          status:true,
          snackbar:false,
          branchName:isNull,
          branchNameCheck:false,
          branchNameerrMsg:'',
          branchCode:isNull,
          branchCodeCheck:false,
          branchCodeerrMsg:'',
          address1:isNull,
          address1Check:false,
          address1errMsg:'',
          address2:isNull,
          address2Check:false,
          address2errMsg:'',
          pobox:isNull,
          poboxCheck:false,
          poboxerrMsg:'',
          state:isNull,
          stateCheck:false,
          stateerrMsg:'',
          city:isNull,
          cityCheck:false,
          cityerrMsg:'',
          zipCode:isNull,
          zipCodeCheck:false,
          zipCodeerrMsg:'',
          fax:isNull,
          faxCheck:false,
          faxerrMsg:'',
          phone:isNull,
          phoneCheck:false,
          phoneerrMsg:'',
          mobile:isNull,
          mobileCheck:false,
          mobileerrMsg:'',
          email:isNull,
          emailCheck:false,
          emailerrMsg:'',
          contactPerson:isNull,
          contactPersonCheck:false,
          contactPersonerrMsg:'',
          countryCheck:false,
          countryerrMsg:'',
          saveDisabled:false,
          fromAction:'',
          shownogeneralrules:false,
          apiErrMsg:'',
          isClearEnabled: false
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

    handleBranchCodeError = (e) =>{
      console.log(e);
      switch(e) {
        case 'regex':
          this.setState({branchCodeCheck:true,branchCodeerrMsg:'Only Alphanumeric are allowed'},()=>{
            this.handleEnable();
            this.handleClearEnable();
          })
        break;
        case 'maxLength':
          this.setState({branchCodeCheck:true,branchCodeerrMsg:'Bank Code should be 1-12 characters'},()=>{
            this.handleEnable();
            this.handleClearEnable();
          })
        break;
        case 'required':
        this.setState({
          branchCodeCheck: true,
          branchCodeerrMsg: 'Branch Code can not be empty'
        },()=>{
         this.handleEnable();
         this.handleClearEnable();
        })
        break;
      }
    }

    handleBranchNameError = (e) =>{
      console.log(e);
      switch(e) {
        case 'regex':
          this.setState({branchNameCheck:true,branchNameerrMsg:"Start's with Alphanumeric & all Special characters allowed"},()=>{
            this.handleEnable();
            this.handleClearEnable();
          })
        break;
        case 'required':
        this.setState({
          branchNameCheck: true,
          branchNameerrMsg: 'Branch Name can not be empty'
        },()=>{
         this.handleEnable();
         this.handleClearEnable();
        })
        break;
      }
    }

    handleAddress1Error = (e) =>{
      console.log(e);
      switch(e) {
        case 'required':
        this.setState({
          address1Check: true,
          address1errMsg: 'Address1 can not be empty'
        },()=>{
         this.handleEnable();
         this.handleClearEnable();
        })
        break;
        case 'regex':
        this.setState({
          address1Check: true,
          address1errMsg: 'should contain alphanumeric in first letter'
        },()=>{
         this.handleEnable();
         this.handleClearEnable();
        })
      }
    }

    handleAddress2Error = (e) =>{
      console.log(e);
      switch(e) {
        case 'required':
        this.setState({
          address2Check: true,
          address2errMsg: 'Address2 can not be empty'
        },()=>{
         this.handleEnable();
         this.handleClearEnable();
        })
        break;
        case 'regex':
        this.setState({
          address2Check: true,
          address2errMsg: 'should contain alphanumeric in first letter'
        },()=>{
         this.handleEnable();
         this.handleClearEnable();
        })
        break;
      }
    }

    handlePOBoxError = (e) =>{
      console.log(e);
    //  let  POBOXLen = (this.state.pobox == undefined) ? 0 : this.state.pobox.length;
    //  if(POBOXLen > 0){
      switch(e) {
        case 'regex':
          this.setState({poboxCheck:true,poboxerrMsg:'POBox should be Only Numeric'},()=>{
            this.handleEnable();
            this.handleClearEnable();
          })
        break;
        case 'minLength':
        if(this.state.pobox.length > 0){
          this.setState({poboxCheck:true,poboxerrMsg:'Please Enter 3-10 Numeric characters'},()=>{
            this.handleEnable();
            this.handleClearEnable();
          })
        }
        else {
          this.setState({ poboxCheck:true,poboxerrMsg:'Please Enter 3-10 Numeric characters'},()=>{
            this.handleEnable();
            this.handleClearEnable();
          })
        }
        break;
        case 'maxLength':
        if(this.state.pobox.length > 0){
          this.setState({poboxCheck:true,poboxerrMsg:'Please Enter 3-10 Numeric characters'},()=>{
            this.handleEnable();
            this.handleClearEnable();
          })
        }
        break;
        case 'required':
        this.setState({
          poboxCheck: true,
          poboxerrMsg: 'POBox can not be empty'
        },()=>{
         this.handleEnable();
         this.handleClearEnable();
        })
        break;
      }
    // }
  }

    handleStateError = (e) =>{
      console.log(e);
      switch(e) {
        case 'regex':
          this.setState({stateCheck:true,stateerrMsg:'State should contain only alphabets'},()=>{
            this.handleEnable();
            this.handleClearEnable();
          })
        break;
        case 'required':
        this.setState({
          stateCheck: true,
          stateerrMsg: 'State can not be empty'
        },()=>{
         this.handleEnable();
         this.handleClearEnable();
        })
        break;
      }
    }

    handleCityError = (e) =>{
      console.log(e);
      switch(e) {
        case 'regex':
          this.setState({cityCheck:true,cityerrMsg:'City should contain only alphabets'},()=>{
            this.handleEnable();
            this.handleClearEnable();
          })
        break;
        case 'required':
        this.setState({
          cityCheck: true,
          cityerrMsg: 'City can not be empty'
        },()=>{
         this.handleEnable();
         this.handleClearEnable();
        })
        break;
      }
    }

    handleCountryChange = (e) => {
      this.setState({ country: e, countryCheck: false }, () => {
        if (this.state.country == undefined) {
          this.setState({ countryCheck: true, countryerrMsg: 'Country can not be empty' })
        }
        else if (this.state.country.length == 0) {
          this.setState({ countryCheck: true, countryerrMsg: 'Country can not be empty' })
        }
        else {
          this.handleEnable();
          this.handleClearEnable();
        }
  
      });
    }

    handleCountryValueClick = (e) => {
      let value = e.code;
      this.setState({ countryData: e, country: value }, () => {
        this.handleEnable();
        this.handleClearEnable();
      })
    }

    handleZipcodeError = (e) =>{
      console.log(e);
      switch(e) {
        case 'regex':
          this.setState({zipCodeCheck:true,zipCodeerrMsg:'Should be Alphanumeric atleast 2 Characters'},()=>{
            this.handleEnable();
            this.handleClearEnable();
          })
        break;
        case 'minLength':
          this.setState({zipCodeCheck:true,zipCodeerrMsg:'Enter valid Zip code'},()=>{
            this.handleEnable();
            this.handleClearEnable();
          })
        break;
        case 'maxLength':
          this.setState({zipCodeCheck:true,zipCodeerrMsg:'Enter valid Zip code'},()=>{
            this.handleEnable();
            this.handleClearEnable();
          })
        break;
        case 'required':
        this.setState({
          zipCodeCheck: true,
          zipCodeerrMsg: 'Zip Code can not be empty'
        },()=>{
         this.handleEnable();
         this.handleClearEnable();
        })
        break;
      }
    }

    handleFaxError = () => {
      if(this.state.fax.length > 0){
        if(this.validateFax(this.state.fax) == true){
          this.setState({faxCheck:false,faxerrMsg:''});
        }
        else{
          this.setState({faxCheck:true,faxerrMsg:'Enter valid fax'});
        }
      }
      else if(this.state.fax.length == 0){
        this.setState({faxCheck:false,faxerrMsg:''})
      }
      else{
        this.setState({faxCheck:false,faxerrMsg:''});
      }
    }

    handleContactPersonError = (e) => {
      switch (e){
        case 'alpha':
          if(this.state.contactPerson.length > 0){
            this.setState({contactPersonCheck:true,contactPersonerrMsg:'Contact person should contain alphabets'});
          }
        break;
        case 'regex':
          if(this.state.contactPerson.length > 0){
            this.setState({contactPersonCheck:true,contactPersonerrMsg:'Contact person should contain alphabets'});
          }
        break;
      }
    }

    handlePhoneError = (e) => {
      if(this.state.phone.length > 0){
        if(this.validatePhone(this.state.phone) == true){
          this.setState({phoneCheck:false,phoneerrMsg:''},()=>{
            this.handleEnable();
            this.handleClearEnable();
          });
        }
        else{
          this.setState({phoneCheck:true,phoneerrMsg:'Enter valid phone'},()=>{
            this.handleEnable();
            this.handleClearEnable();
          });
        }
      }
      else if(this.state.phone.length == 0){
        this.setState({phoneCheck:true,phoneerrMsg:'Phone can not be empty'},()=>{
          this.handleEnable();
          this.handleClearEnable();
        });
      }
      else if(this.state.mobile.length > 0 && this.state.mobileCheck == false){
        this.setState({phoneCheck:false,phoneerrMsg:''},()=>{
          this.handleEnable();
          this.handleClearEnable();
        });
      }
      else{
        this.setState({phoneCheck:false,phoneerrMsg:''},()=>{
          this.handleEnable();
          this.handleClearEnable();
        });
      }
      switch (e) {
        case 'minLength':
        this.setState({phoneCheck:true,phoneerrMsg:'Enter valid phone'},()=>{
          this.handleEnable();
          this.handleClearEnable();
        });
        break;
        case 'maxLength':
        this.setState({phoneCheck:true,phoneerrMsg:'Enter valid phone'},()=>{
          this.handleEnable();
          this.handleClearEnable();
        });
        break;
      }
    }

    handleMobileError = () => {
      if((this.state.mobile.length >= 10) && (this.state.mobile.length <= 15)){
        if(this.validateMobile(this.state.mobile) == true){
          this.setState({mobileCheck:false,mobileerrMsg:''},()=>{
            this.handleEnable();
            this.handleClearEnable();
          });
        }
        else{
          this.setState({mobileCheck:true,mobileerrMsg:'Enter valid mobile'},()=>{
            this.handleEnable();
            this.handleClearEnable();
          });
        }
      }
      else if((this.state.mobile.length < 10) || (this.state.mobile.length > 15)){
        this.setState({mobileCheck:true,mobileerrMsg:'Enter valid mobile'},()=>{
          this.handleEnable();
          this.handleClearEnable();
        });
      }
      else if((this.state.phone.length > 0) && (this.state.phoneCheck == false)){
        this.setState({mobileCheck:false,mobileerrMsg:''},()=>{
          this.handleEnable();
          this.handleClearEnable();
        });
      }
      else if(this.state.mobile.length == 0){
        this.setState({mobileCheck:true,mobileerrMsg:'mobile can not be empty'},()=>{
          this.handleEnable();
          this.handleClearEnable();
        });
      }
      else{
        this.setState({mobileCheck:false,mobileerrMsg:''},()=>{
          this.handleEnable();
          this.handleClearEnable();
        });
      }
    }

    handleEmailError = (e) => {
      switch (e){
        case('required'):
          this.setState({emailCheck:true,emailerrMsg:'Email can not be empty'},()=>{
            this.handleEnable();
            this.handleClearEnable();
          });
        break;
        case('email'):
          this.setState({emailCheck:true,emailerrMsg:'Enter valid email'},()=>{
            this.handleEnable();
            this.handleClearEnable();
          });
        break;
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
            <TabContainer>
                <div className={classes.root}>
                    <Grid container spacing={24} className='global-font'>
                        <Grid item xs={12} className='grid-no-bottom-padding'>
                            <p><b>Agent Information</b></p>
                        </Grid>
                        <Grid item xs={5} className='grid-no-top-padding'>
                         
                            <Input isEnabled={false} autocomplete='off' value={this.props.agentProfile.code} placeholder="Agent Display Code"  label="Agent Display Code"  />
                         
                        </Grid>
                        <Grid item xs={2} className='grid-no-top-padding'>   
                        </Grid>
                        <Grid item xs={5} className='grid-no-top-padding'>
                            {/* <RegulerTextfield required={true}  value={this.props.agentProfile.name} type='agentName' label={'Agent Name'} placeholder="Agent Name" disabled={true}/>
                         */}
                            <Input isEnabled={false} autocomplete='off' value={this.props.agentProfile.name} placeholder="Agent Name"  label="Agent Name"  />
                         
                        </Grid>
                    </Grid>
                    <Grid container spacing={24} className='global-font'>
                        <Grid item xs={12} className='grid-no-bottom-padding'>
                            <p><b>Agent Branch Information</b></p>
                        </Grid>
                        <Grid item xs={5} className='grid-no-top-padding grid-error'>
                            {/* <RegulerTextfield required={true} value={this.state.branchCode} type='branchCode' label={'Branch Display Code'} placeholder="Branch Display Code" getEnterText={this.handleTextfieldChange}/> */}
                            <Input id='branchCode' autocomplete='off' value={this.state.branchCode} placeholder="Branch Code" label="Branch Code *" type="freeText" regex={/^[a-zA-Z0-9]+$/} maxLength={12} isRequired onChange={(e, value) => this.handleTextfieldChange(e,value)} onError={e => this.handleBranchCodeError(e)}/>
                            {this.state.branchCodeCheck ? <span className="errorMessage-add">{this.state.branchCodeerrMsg} </span>:''} 
                        </Grid>
                        <Grid item xs={2} className='grid-no-top-padding'>   
                        </Grid>
                        <Grid item xs={5} className='grid-no-top-padding grid-error'>
                            {/* <RegulerTextfield required={true}  value={this.state.branchName} type='branchName' label={'Branch Name'} placeholder="Branch Name" getEnterText={this.handleTextfieldChange}/> */}
                            <Input id='branchName' autocomplete='off' value={this.state.branchName} placeholder="Branch Name" label="Branch Name *" type="freeText" regex={/^^[a-zA-Z0-9][a-zA-Z0-9!@#$&()-` .+,/\"]+$/} isRequired onChange={(e, value) => this.handleTextfieldChange(e,value)} onError={e => this.handleBranchNameError(e)}/>
                            {this.state.branchNameCheck ? <span className="errorMessage-add">{this.state.branchNameerrMsg} </span>:''}
                        </Grid>
                    </Grid>
                    <Grid container spacing={24} className='global-font'>
                        <Grid item xs={12} className='grid-no-bottom-padding'>
                            <p><b>Address Details</b></p>
                        </Grid>
                        <Grid item xs={5} className='grid-no-top-padding grid-error'>
                            {/* <RegulerTextfield required={true} value={this.state.address1} type='address1' label={'Address 1'} placeholder="address 1" getEnterText={this.handleTextfieldChange}/> */}
                            <Input id='address1' autocomplete="off" value={this.state.address1} placeholder="Address Line 1" label="Address Line 1 *" type="freeText" regex={/^([a-zA-Z0-9]){1}.../} isRequired onChange={(e, value) => this.handleTextfieldChange(e,value)} onError={e => this.handleAddress1Error(e)}/>
                            {this.state.address1Check ? <span className="errorMessage-add">{this.state.address1errMsg} </span>:''}   
                        </Grid>
                        <Grid item xs={2} className='grid-no-top-padding grid-error'>   
                        </Grid>
                        <Grid item xs={5} className='grid-no-top-padding'>
                            {/* <RegulerTextfield required={true}  value={this.state.address2} type='address2' label={'Address 2'} placeholder="address 2" getEnterText={this.handleTextfieldChange}/> */}
                            <Input id='address2' autocomplete='off' value={this.state.address2} placeholder="Address Line 2" label="Address Line 2 *" type="freeText" regex={/^([a-zA-Z0-9]){1}.../} isRequired onChange={(e, value) => this.handleTextfieldChange(e,value)} onError={e => this.handleAddress2Error(e)}/>
                            {this.state.address2Check ? <span className="errorMessage-add">{this.state.address2errMsg} </span>:''}
                        </Grid>
                        <Grid item xs={5} className='grid-no-top-padding grid-error'>
                            {/* <RegulerTextfield value={this.state.pobox} type='pobox' label={'PO Box'} placeholder="PO Box" getEnterText={this.handleTextfieldChange}/> */}
                            <Input id='pobox' autocomplete='off' value={this.state.pobox} placeholder="PO Box" label="PO Box" regex={/^[0-9]+$/} type="numeric" minLength={3} maxLength={10} onChange={(e, value) => this.handleTextfieldChange(e,value)} onBlur={this.handlePoBlur} onError={e => this.handlePOBoxError(e)}/>
                            {this.state.poboxCheck ? <span className="errorMessage-add">{this.state.poboxerrMsg} </span>:''}   
                        </Grid>
                        <Grid item xs={2} className='grid-no-top-padding'>   
                        </Grid>
                        <Grid item xs={5} className='grid-no-top-padding'>
                          {/* <DownshiftMultiple value={this.state.country} label='Country' type='country' suggestionFields={this.state.countryList} placeholder={'Country'} disabled={this.state.countryDisabled} getAutoSelectValue={this.handleChange} getHandleBlurValue={this.handleBlur}/> */}
                          <Selectable
                          id="country"
                          isRequired
                          label='Country'
                          searchable={true}
                          isClearable={true}
                          value={this.props.agentProfile.countryCode}
                          options={this.state.countryList}
                          noResultsText="No Country Found"
                          searchBy={'any'}
                          onChange={this.handleCountryChange}
                          onValueClick={this.handleCountryValueClick}
                          onBlur={this.handleBlur}
                          isEnabled={this.state.countryDisabled}
                        />
                          {this.state.countryCheck ? <span className="errorMessage">{this.state.countryerrMsg} </span>:''}
                        </Grid>
                        <Grid item xs={5} className='grid-no-top-padding grid-error'>
                            {/* <RegulerTextfield required={true} value={this.state.state} type='state' label={'State'} placeholder="State" getEnterText={this.handleTextfieldChange}/> */}
                            <Input id='state' autocomplete='off' value={this.state.state} placeholder="State" regex={/^[a-zA-Z]+$/i} label="State *" type="alpha" isRequired onChange={(e, value) => this.handleTextfieldChange(e,value)} onError={e => this.handleStateError(e)}/>
                            {this.state.stateCheck ? <span className="errorMessage-add">{this.state.stateerrMsg} </span>:''}  
                        </Grid>
                        <Grid item xs={2} className='grid-no-top-padding'>   
                        </Grid>
                        <Grid item xs={5} className='grid-no-top-padding grid-error'>
                            {/* <RegulerTextfield required={true}  value={this.state.city} type='city' label={'City'} placeholder="City" getEnterText={this.handleTextfieldChange}/> */}
                            <Input id='city' autocomplete='off' value={this.state.city} placeholder="City" regex={/^[a-zA-Z]*$/} label="City *" type="alpha" isRequired onChange={(e, value) => this.handleTextfieldChange(e,value)} onError={e => this.handleCityError(e)}/>
                            {this.state.cityCheck ? <span className="errorMessage-add">{this.state.cityerrMsg} </span>:''}
                        </Grid>
                        <Grid item xs={5} className='grid-no-top-padding grid-error'>
                            {/* <RegulerTextfield required={true} value={this.state.zipCode} type='zipcode' label={'ZIP/PO Code'} placeholder="zip/po code" getEnterText={this.handleTextfieldChange}/> */}
                            <Input id='zipcode' autocomplete='off' value={this.state.zipCode} placeholder="ZIP/PO Code" label="ZIP/PO Code *" regex={/^[0-9a-zA-Z]{2,20}$/} isRequired type="alphaNumeric" minLength={2} maxLength={20} onChange={(e, value) => this.handleTextfieldChange(e,value)} onError={e => this.handleZipcodeError(e)}/>
                            {this.state.zipCodeCheck ? <span className="errorMessage-add">{this.state.zipCodeerrMsg} </span>:''}   
                        </Grid>
                        <Grid item xs={2} className='grid-no-top-padding'>   
                        </Grid>
                        <Grid item xs={5} className='grid-no-top-padding grid-error'>
                            {/* <RegulerTextfield  value={this.state.fax} type='fax' label={'Fax'} placeholder="fax" getEnterText={this.handleTextfieldChange}/> */}
                            <Input id='fax' autocomplete='off' value={this.state.fax} placeholder="Fax" label="Fax" type="freeText" onChange={(e, value) => this.handleTextfieldChange(e,value)} onError={e => this.handleFaxError(e)}/>
                            {this.state.faxCheck ? <span className="errorMessage-add">{this.state.faxerrMsg} </span>:''}
                        </Grid>
                    </Grid>
                    <Grid container spacing={24} className='global-font'>
                        <Grid item xs={12} className='grid-no-bottom-padding'>
                            <p><b>Contact Details</b></p>
                            <small>(*Please Specify Phone or  Mobile Number)</small>
                        </Grid>
                        <Grid item xs={5} className='grid-no-top-padding grid-error'>
                            {/* <RegulerTextfield value={this.state.phone} type='phone' label={'Phone'} placeholder="phone" getEnterText={this.handleTextfieldChange}/> */}
                            <Input id='phone' autocomplete='off' value={this.state.phone} placeholder="Phone" minLength={10} maxLength={13} label="Phone *" type="freeText" onChange={(e, value) => this.handleTextfieldChange(e,value)} onError={e => this.handlePhoneError(e)}/>
                            {this.state.phoneCheck ? <span className="errorMessage-add">{this.state.phoneerrMsg} </span>:''}   
                        </Grid>
                        <Grid item xs={2} className='grid-no-top-padding'>   
                        </Grid>
                        
                        {this.state.isdCodes == null ?
                        null 
                        :
                        <Grid item xs={1} className='grid-no-top-padding grid-error'>
                          <Input label="ISDCode" value= {this.state.isdCodes} isEnabled={false} />
                        </Grid>
                        }
                        <Grid item xs={this.state.isdCodes == null ? 5 : 4} className='grid-no-top-padding grid-error'>
                            {/* <RegulerTextfield  value={this.state.mobile} type='mobile' label={'Mobile'} placeholder="mobile" getEnterText={this.handleTextfieldChange}/> */}
                            <Input id='mobile' autocomplete='off' value={this.state.mobile} placeholder="Mobile" label="Mobile *" type="freeText" onChange={(e, value) => this.handleTextfieldChange(e,value)} onError={e => this.handleMobileError(e)}/>
                            {this.state.mobileCheck ? <span className="errorMessage-add">{this.state.mobileerrMsg} </span>:''}
                        </Grid>
                        <Grid item xs={5} className='grid-no-top-padding grid-error'>
                            {/* <RegulerTextfield required={true} value={this.state.email} type='email' label={'Email'} placeholder="email" getEnterText={this.handleTextfieldChange}/> */}
                            <Input id='email' autocomplete='off' value={this.state.email} placeholder="Email" label="Email *" type="email" isRequired onChange={(e, value) => this.handleTextfieldChange(e,value)} onError={e => this.handleEmailError(e)}/>
                            {this.state.emailCheck ? <span className="errorMessage-add">{this.state.emailerrMsg} </span>:''}   
                        </Grid>
                        <Grid item xs={2} className='grid-no-top-padding'>   
                        </Grid>
                        <Grid item xs={5} className='grid-no-top-padding grid-error'>
                            {/* <RegulerTextfield  value={this.state.contactPerson} type='contactPerson' label={'Contact Person'} placeholder="contact person" getEnterText={this.handleTextfieldChange}/> */}
                            <Input id='contactPerson' autocomplete='off' value={this.state.contactPerson} placeholder="Contact Person" label="Contact Person" type="freeText" regex={/^[a-zA-Z ]*$/} onChange={(e, value) => this.handleTextfieldChange(e,value)} onError={e => this.handleContactPersonError(e)}/>
                            {this.state.contactPersonCheck ? <span className="errorMessage-add">{this.state.contactPersonerrMsg} </span>:''}
                        </Grid>
                    </Grid>
                    <Grid container spacing={24} className='global-font'>
                      <Grid item xs={4}>
                        <p className="toggle-alignment"><b>Status :</b> Disable </p>
                        <div className="toggle-alignment">
                        {/* <Toggleswitch value={this.state.status} type='status' getToggleValue={this.handleChange}/> */}
                        <Toggle isChecked={this.state.status} id={'status'} isEnabled={true} onChange={this.handleTextfieldChange} />
                        </div>
                        <p className="toggle-alignment">Enable</p>
                      </Grid>
                    </Grid>
                    <Grid container spacing={24} direction="row" justify="flex-end" alignItems="flex-end">
                      <Grid item xs={4}> 
                        <Grid container spacing={24} direction="row" justify="flex-end" alignItems="flex-end">
                        <TextButton id="defaultTextButton" className = "global-font save-clear" isEnabled={this.state.isClearEnabled} umStyle="default" onClick={this.handleClear} style={{ marginRight: "10px" }}>Clear </TextButton> 
                          {/* <Button 
                          className={classes.button}
                          style= {
                            {
                              color: this.state.saveDisabled?null:'#19ace3'
                            }}
                            size="large" onClick={this.handleData} disabled={this.state.saveDisabled}>
                            Save
                          </Button>  */}

                           <TextButton id="disabledTextButton" className = "global-font save-clear" umSize="small" onClick={this.handleData} isEnabled={this.state.saveDisabled}>
                    Save
                 </TextButton>
                        </Grid>       
                      </Grid>
                    </Grid>
                </div>
                {
                  this.state.confirmDelete ? <ModalBox isOpen={this.state.confirmDelete}  fromAction={this.state.fromAction} actionType="Yes" message={(this.state.modalMessage)} modalAction={this.handleModalResponse}/> : null
                }
                {/* {
                  this.state.snackbar ? <Snackbarcomp message={this.state.snackbarMsg} isOpen={this.state.snackbar}/> : null
                } */}

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

AgentBranchProfileDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(AgentBranchProfileDetails);