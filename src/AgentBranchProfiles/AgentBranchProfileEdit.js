import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import '../vendor/common.css';
import '../theme/theme';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ModalBox from './../component/Modalbox';
import * as ApiService from './ApiService';
import { Toggle, TextButton, OutLineButton, Input,Notifications } from 'finablr-ui';
import * as Exceptionhandler from './../ExceptionHandling';
import ErrorModalBox from '../component/ErrorModalbox';
import getMuiTheme from "../theme/theme";
import { MuiThemeProvider } from '@material-ui/core/styles';
import {SHOW_NOTIFICATION} from '../constants/action-types';
import {HIDE_NOTIFICATION} from '../constants/action-types';
import * as config from './../config/config';


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

class AgentBranchProfileEdit extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loading:true, 
            loaderMessage:'Retrieving Data',
            serverStatus:null,
            serverError:false,
            serverErrMessage:'',
            address1:'',
            address1Check:false,
            address1errMsg:'',
            address2:'',
            address2Check:false,
            address2errMsg:'',
            pobox:'',
            poboxCheck:false,
            poboxerrMsg:'',
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
            country:'',
            countryData:{},
            countryCheck:false,
            countryerrMsg:'',
            status:true,
            saveDisabled:true,
            confirmDelete:false,
            fromAction:'',
            countryDisabled:false,
            deleted:false,
            snackbarMsg:'',
            snackbar:false,
            shownogeneralrules:false,
            apiErrMsg:'',
            notificationType:'success',
        };
    }

    componentDidMount(){
        console.log(this.props);
        this.setState({
          address1:this.props.branchProfile.address1,
          address2:this.props.branchProfile.address2,
          zipCode:this.props.branchProfile.zip,
          email:this.props.branchProfile.email,
          mobile: this.props.branchProfile.hasOwnProperty('mobile') ? this.props.branchProfile.mobile:'',
          phone: this.props.branchProfile.hasOwnProperty('phone') ? this.props.branchProfile.phone:'',
          contactPerson: this.props.branchProfile.hasOwnProperty('contactPerson') ? this.props.branchProfile.contactPerson:'',
          fax: this.props.branchProfile.hasOwnProperty('fax') ? this.props.branchProfile.fax:'',
          pobox: this.props.branchProfile.hasOwnProperty('poBox') ? this.props.branchProfile.poBox:'',
          status: (this.props.branchProfile.status == 'ENABLED') ? true:false
        },()=>{
          this.handleEnable();
        })
        this.fetchCountryList();
        
    }

    fetchCountryList=()=>{
      let countryList = [];
      ApiService.fetchCountryList().then((response)=>{
        console.log(response);
        if(response.data.length > 0){
          response.data.map((obj)=>{
            let country = {};
            country.id = obj.id;
            country.label = obj.name;
            country.field = obj.countryCode;
            countryList.push(country);
          }) 
          this.setState({countryList},()=>{
           this.setCountryField();
          }); 
        }
        else{
          alert ('no country records');
        }
       }).catch(error=>{
        alert(error,'oops error in api call');
        throw(error)
     });   
    }

    setCountryField = () => {
      this.state.countryList.filter((user)=> {
        if((this.props.branchProfile.countryCode == user.field) || (this.props.branchProfile.country == user.label)){
          this.setState({countryData:user,country:user.label,countryDisabled:true});
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
      let pattern = /^[0-9]{3,20}$/;
      return pattern.test(pobox);
    }

    validateZip = (zip) => {
      let pattern = /^[0-9]{6}$/;
      return pattern.test(zip);
    }

    handleTextfieldChange = (e,value) => {
      let pattern = /^[a-zA-Z0-9]+$/i;
      let pattern1 = /^[a-zA-Z ]*$/;
      this.props.handleCompValueChange(true);
      switch(e.target.id){
        case('address1'):
          this.setState({address1:value,address1Check:false},()=>{
            if(this.state.address1.length == 0){
              this.setState({address1Check:true,address1errMsg:'Address1 can not be empty'},()=>{
                this.handleEnable();
              });
            }
            else{
              this.setState({address1Check:false,address1errMsg:''},()=>{
                this.handleEnable();
              });
            }
          })
        break;
        case('address2'):
          this.setState({address2:value,address2Check:false},()=>{
            if(this.state.address2.length == 0){
              this.setState({address2Check:true,address2errMsg:'Address2 can not be empty'},()=>{
                this.handleEnable();
              });
            }
            else{
              this.setState({address2Check:false,address2errMsg:''},()=>{
                this.handleEnable();
              });
            }
          })
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
                this.setState({poboxCheck:false,poboxerrMsg:''});
              }
              else{
                this.setState({poboxCheck:true,poboxerrMsg:'Enter valid pobox'});
              }
            }
            else if (this.state.pobox.length == 0){
              this.setState({poboxCheck:false,poboxerrMsg:''})
            }
            else{
              this.setState({poboxCheck:false,poboxerrMsg:''});
            }
          })
        break;
        case('fax'):
          this.setState({fax:value,faxCheck:false},()=>{
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
          })
        break;
        case('zipcode'):
          this.setState({zipCode:value,zipCodeCheck:false},()=>{
            if(this.state.zipCode.length > 0){
              if(this.validateZip(this.state.zipCode) == true){
                this.setState({zipCodeCheck:false,zipCodeerrMsg:''},()=>{
                  this.handleEnable();
                });
              }
              else{
                this.setState({zipCodeCheck:true,zipCodeerrMsg:'Enter valid zipcode'},()=>{
                  this.handleEnable();
                });
              }
            }
            else if(this.state.zipCode.length == 0){
              this.setState({zipCodeCheck:true,zipCodeerrMsg:'ZIPcode can not be empty'},()=>{
                this.handleEnable();
              });
            }
            else{
              this.setState({zipCodeCheck:false,zipCodeerrMsg:''},()=>{
                this.handleEnable();
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
                });
              }
              else{
                this.setState({emailCheck:true,emailerrMsg:'Enter valid email'},()=>{
                  this.handleEnable();
                });
              }
            }
            else if(this.state.email.length == 0){
              this.setState({emailCheck:true,emailerrMsg:'Email can not be empty'},()=>{
                this.handleEnable();
              });
            }
            else{
              this.setState({emailCheck:false,emailerrMsg:''},()=>{
                this.handleEnable();
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
                });
              }
              else if(this.validatePhone(this.state.phone) == true){
                this.setState({phoneCheck:false,phoneerrMsg:''},()=>{
                  this.handleEnable();
                });
              }
              else{
                this.setState({phoneCheck:true,phoneerrMsg:'Enter valid phone'},()=>{
                  this.handleEnable();
                });
              }
            }
            else if(this.state.phone.length == 0){
              this.setState({phoneCheck:true,phoneerrMsg:'Phone can not be empty'},()=>{
                this.handleEnable();
              });
            }
            else if(this.state.mobile.length > 0 && this.state.mobileCheck == false){
              this.setState({phoneCheck:false,phoneerrMsg:''},()=>{
                this.handleEnable();
              });
            }
            else{
              this.setState({phoneCheck:false,phoneerrMsg:''},()=>{
                this.handleEnable();
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
                });
              }
              else{
                this.setState({mobileCheck:true,mobileerrMsg:'Enter valid mobile'},()=>{
                  this.handleEnable();
                });
              }
            }
            else if((this.state.mobile.length < 10) || (this.state.mobile.length > 15)){
              this.setState({mobileCheck:true,mobileerrMsg:'Enter valid mobile'},()=>{
                this.handleEnable();
              });
            }
            else if((this.state.phone.length > 0) && (this.state.phoneCheck == false)){
              this.setState({mobileCheck:false,mobileerrMsg:''},()=>{
                this.handleEnable();
              });
            }
            else if(this.state.mobile.length == 0){
              this.setState({mobileCheck:true,mobileerrMsg:'Mobile can not be empty'},()=>{
                this.handleEnable();
              });
            }
            else{
              this.setState({mobileCheck:false,mobileerrMsg:''},()=>{
                this.handleEnable();
              });
            }
          })
        break;
        case ('status'):
        console.log(e.target.checked);
        let isChecked = e.target.checked;
        this.setState({ snackbar: false, status: e.target.checked }, () => {
          if (isChecked == true) {
            this.setState({ snackbar: false, snackbarMsg: '' })
          }
          else {
            this.setState({ snackbar: true,notificationType:'warning', snackbarMsg: 'This Agent branch profile will be disabled!' })
          }
        })
        break;
      }
    }

    handleEnable = () => {
      let branchNameLength = this.state.branchName == undefined || this.state.branchName == '' ? 0 : this.state.branchName.length;
      let branchCodeLength = this.state.branchCode == undefined || this.state.branchName == '' ? 0 : this.state.branchCode.length;
      let address1Length = this.state.address1 == undefined || this.state.address1 == '' ? 0 : this.state.address1.length;
      let address2Length = this.state.address2 == undefined || this.state.address2 == '' ? 0 : this.state.address2.length;
      let zipCodeLength = this.state.zipCode == undefined || this.state.zipCode == '' ? 0 : this.state.zipCode.length;
      let stateLength = this.state.state == undefined || this.state.state == '' ? 0 : this.state.state.length;
      let cityLength = this.state.city == undefined || this.state.city == '' ? 0 : this.state.city.length;
      let phoneLength = this.state.phone == undefined || this.state.phone == '' ? 0 : this.state.phone.length;
      let mobileLength = this.state.mobile == undefined || this.state.mobile == '' ? 0 : this.state.mobile.length;
      let emailLength = this.state.email == undefined || this.state.email == '' ? 0 : this.state.email.length;
      if((branchNameLength == 0) || (branchCodeLength == 0) || (address1Length == 0) 
      || (address2Length == 0) 
      || (stateLength == 0) || (cityLength == 0) ||
       (zipCodeLength == 0) || (this.state.zipCodeCheck == true) || 
       (((phoneLength == 0) || (this.state.phoneCheck == true)) && ((mobileLength == 0) ||
        (this.state.mobileCheck == true))) || (emailLength == 0) || (this.state.emailCheck == true) || 
        (this.state.poboxCheck == true) || (this.state.faxCheck == true)){
        this.setState({saveDisabled:true})
      }
      else{
        this.setState({saveDisabled:false})
      }
    }

    // handleChange = (data,type,obj) => {
    //   this.props.handleCompValueChange(true);
    //   switch(type){
    //     case ('status'):
    //       this.setState({status:data,snackbar:false},()=>{
    //         if(data==false){
    //           this.setState({snackbar:true,snackbarMsg:'This Agent branch profile will be disabled!'})
    //         }
    //         else{
    //           this.setState({snackbar:false});
    //         }
    //       });
    //     break;
    //   }
    // };

    handleData = () => {
      if(this.state.address1.length == 0){
        this.setState({address1Check:true,address1errMsg:'Address1 can not be empty'});
      }
      else if(this.state.address2.length == 0){
        this.setState({address2Check:true,address2errMsg:'Address2 can not be empty'});
      }
      else if(this.state.poboxCheck == true){
        this.setState({poboxCheck:true,poboxerrMsg:'Enter valid po box'})
      }
      else if((this.state.zipCode.length == 0) || (this.state.zipCodeCheck==true)){
        this.setState({zipCodeCheck:true,zipCodeerrMsg:'Enter valid zipcode'})
      }
      else if(this.state.faxCheck == true){
        this.setState({faxerrMsg:'Enter valid fax'})
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
          "status": this.state.status ? 'ENABLED':'DISABLED',
          "deleted" : false,
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
        this.editBranchProfile(data);
      }
    }

    handleDelete = () => {
      this.setState({confirmDelete:true,actionType:'Delete',modalMessage:' Are you sure you want to permanently delete this Agent Branch Profile?'});
    }

    handleModalResponse = (data)=> {
      console.log(data);
      if(data == true){
        // if(this.state.actionType == 'Yes'){
        //   var prevStatus = this.state.prevStatus;
        //   this.setState({status:prevStatus,confirmDelete:false,actionType:''},()=>{
        //     this.props.modalEditAction(null,'close');
        //   })
        // }
        if(this.state.actionType == 'Delete'){
          this.setState({confirmDelete:false,deleted:true},()=>{
            let data = {
              "address1":this.state.address1,
              "address2": this.state.address2,
              "status": this.state.status ? 'ENABLED':'DISABLED',
              "deleted" : true
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
            this.editBranchProfile(data);
          })
        } 
      }
      else{
        this.setState({confirmDelete:false,actionType:''});
      }
    }

    editBranchProfile = (data) => {
      if(sessionStorage.getItem('token') == undefined){
        window.location.replace(config.PAAS_LOGIN_URL);
        return (<h1>401 - Unauthorized Request</h1>)
      }
      else{
        let headers = {
          Authorization:sessionStorage.getItem('token')
        }
        this.setState({loading:true,loaderMessage:'posting data',snackbar:false},()=>{
          ApiService.editAgentBranch(data,this.props.match.params.branchid,headers)
          .then((response)=>{
            console.log(response)
            if(response.status == 200){
              this.props.handleCompValueChange(false);
              //console.log('success');
              this.setState({snackbar:true,notificationType:'success',snackbarMsg:'Agent Branch profile updated successfully'},()=>{
                setTimeout(()=>{
                  this.props.history.push(`/agentprofiles/${this.props.match.params.agentid}/branches`)
                },1600);
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

    handleStatusResponse=(data)=>{
      if(data == true){
        this.setState({shownogeneralrules:false},()=>{          
        });       
      } 
    }

    handleAddress1Error = (e) =>{
      console.log(e);
      switch(e) {
        case 'required':
        this.setState({
          address1Check: true,
          address1errMsg: 'Address1 cannot be Empty.'
        },()=>{
         this.handleEnable();
        })
        break;
        case 'regex':
        this.setState({
          address1Check: true,
          address1errMsg: 'should contain alphanumeric in first letter'
        },()=>{
         this.handleEnable();
         
        })
      }
    }

    handleAddress2Error = (e) =>{
      console.log(e);
      switch(e) {
        case 'required':
        this.setState({
          address2Check: true,
          address2errMsg: 'Address2 can not be Empty.'
        },()=>{
         this.handleEnable();
        })
        break;
        case 'regex':
        this.setState({
          address2Check: true,
          address2errMsg: 'should contain alphanumeric in first letter'
        },()=>{
         this.handleEnable();
         
        })
        break;
      }
    }

    handlePOBoxError = (e) =>{
      console.log(e);
      switch(e) {
        case 'regex':
          this.setState({poboxCheck:true,poboxerrMsg:'POBox should be numeric'},()=>{
            this.handleEnable();
          })
        break;
        case 'minLength':
        if(this.state.pobox.length > 0){
          this.setState({poboxCheck:true,poboxerrMsg:'Please Enter 3-20 numeric characters'},()=>{
            this.handleEnable();
          })
        }
        
        break;
        case 'maxLength':
        if(this.state.pobox.length > 0){
          this.setState({poboxCheck:true,poboxerrMsg:'Please Enter 3-20 numeric characters'},()=>{
            this.handleEnable();
          })
        }
        break;
        case 'required':
        this.setState({
          poboxCheck: true,
          poboxerrMsg: 'POBox can not be Empty.'
        },()=>{
          this.handleEnable();
        })
        break;
      }
    }

    handleStateError = (e) =>{
      console.log(e);
      switch(e) {
        case 'regex':
          this.setState({stateCheck:true,stateerrMsg:'state should contain only alphabets'},()=>{
            this.handleEnable();
          })
        break;
        case 'required':
        this.setState({
          stateCheck: true,
          stateerrMsg: 'state cannot be Empty.'
        },()=>{
         this.handleEnable();
        })
        break;
      }
    }

    handleCityError = (e) =>{
      console.log(e);
      switch(e) {
        case 'regex':
          this.setState({cityCheck:true,cityerrMsg:'city should contain only alphabets'},()=>{
            this.handleEnable();
          })
        break;
        case 'required':
        this.setState({
          cityCheck: true,
          cityerrMsg: 'city cannot be Empty.'
        },()=>{
         this.handleEnable();
        })
        break;
      }
    }

    handleZipcodeError = (e) =>{
      console.log(e);
      switch(e) {
        case 'regex':
          this.setState({zipCodeCheck:true,zipCodeerrMsg:'ZIP Code should be numeric'},()=>{
            this.handleEnable();
          })
        break;
        case 'minLength':
          this.setState({zipCodeCheck:true,zipCodeerrMsg:'Enter valid ZIP Code'},()=>{
            this.handleEnable();
          })
        break;
        case 'maxLength':
          this.setState({zipCodeCheck:true,zipCodeerrMsg:'Enter valid ZIP Code'},()=>{
            this.handleEnable();
          })
        break;
        case 'required':
        this.setState({
          poboxCheck: true,
          poboxerrMsg: 'ZIP Code can not be empty'
        },()=>{
         this.handleEnable();
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
          });
        }
        else{
          this.setState({phoneCheck:true,phoneerrMsg:'Enter valid phone'},()=>{
            this.handleEnable();
          });
        }
      }
      else if(this.state.phone.length == 0){
        this.setState({phoneCheck:true,phoneerrMsg:'Phone can not be empty'},()=>{
          this.handleEnable();
        });
      }
      else if(this.state.mobile.length > 0 && this.state.mobileCheck == false){
        this.setState({phoneCheck:false,phoneerrMsg:''},()=>{
          this.handleEnable();
        });
      }
      else{
        this.setState({phoneCheck:false,phoneerrMsg:''},()=>{
          this.handleEnable();
        });
      }
      switch (e) {
        case 'minLength':
        this.setState({phoneCheck:true,phoneerrMsg:'Enter valid phone'},()=>{
          this.handleEnable();
          
        });
        break;
        case 'maxLength':
        this.setState({phoneCheck:true,phoneerrMsg:'Enter valid phone'},()=>{
          this.handleEnable();
          
        });
        break;
      }
      if(this.state.phone.trim().length < 10 || this.state.phone.trim().length > 13){
        this.setState({phoneCheck:true,phoneerrMsg:'Enter valid phone'},()=>{
          this.handleEnable();
          
        });
      }
    }

    handleMobileError = () => {
      if((this.state.mobile.length >= 10) && (this.state.mobile.length <= 15)){
        if(this.validateMobile(this.state.mobile) == true){
          this.setState({mobileCheck:false,mobileerrMsg:''},()=>{
            this.handleEnable();
          });
        }
        else{
          this.setState({mobileCheck:true,mobileerrMsg:'Enter valid mobile'},()=>{
            this.handleEnable();
          });
        }
      }
      else if((this.state.mobile.length < 10) || (this.state.mobile.length > 15)){
        this.setState({mobileCheck:true,mobileerrMsg:'Enter valid mobile'},()=>{
          this.handleEnable();
        });
      }
      else if((this.state.phone.length > 0) && (this.state.phoneCheck == false)){
        this.setState({mobileCheck:false,mobileerrMsg:''},()=>{
          this.handleEnable();
        });
      }
      else if(this.state.mobile.length == 0){
        this.setState({mobileCheck:true,mobileerrMsg:'Mobile can not be empty'},()=>{
          this.handleEnable();
        });
      }
      else{
        this.setState({mobileCheck:false,mobileerrMsg:''},()=>{
          this.handleEnable();
        });
      }
    }

    handleEmailError = (e) => {
      switch (e){
        case('required'):
          this.setState({emailCheck:true,emailerrMsg:'Email cannot be empty'},()=>{
            this.handleEnable();
          });
        break;
        case('email'):
          this.setState({emailCheck:true,emailerrMsg:'Enter valid email'},()=>{
            this.handleEnable();
          });
        break;
      }
    }

    render() {
      const { classes } = this.props;
      return (
        <MuiThemeProvider theme={getMuiTheme}>
          <TabContainer>
              <div className={classes.root}>
                  <Grid container spacing={24} className='global-font'>
                      <Grid item xs={12} className='grid-no-bottom-padding'>
                          <p><b>Agent Information</b></p>
                      </Grid>
                      <Grid item xs={4} className='grid-no-top-padding'>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Agent Display Code
                        </Typography>
                        <span className="drawee-profile-view" >            
                            {this.props.branchProfile['agentName']}
                        </span>
                      </Grid>
                      <Grid item xs={4} className='grid-no-top-padding'>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Agent Name
                        </Typography>
                        <span className="drawee-profile-view" >            
                          {this.props.branchProfile['agentName']}
                        </span>
                      </Grid>
                  </Grid>
                  <Grid container spacing={24} className='global-font'>
                      <Grid item xs={12} className='grid-no-bottom-padding'>
                          <p><b>Agent Branch Information</b></p>
                      </Grid>
                      <Grid item xs={4} className='grid-no-top-padding'>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Branch Display Code
                        </Typography>
                        <span className="drawee-profile-view" >            
                            {this.props.branchProfile['branchDisplayName']}
                        </span>
                      </Grid>
                      <Grid item xs={4} className='grid-no-top-padding'>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Branch Name
                        </Typography>
                        <span className="drawee-profile-view" >            
                            {this.props.branchProfile['branchName']}
                        </span>
                      </Grid>
                  </Grid>
                  <Grid container spacing={24} className='global-font'>
                      <Grid item xs={12} className='grid-no-bottom-padding'>
                          <p><b>Address Details</b></p>
                      </Grid>
                      <Grid item xs={4} className='grid-no-top-padding'>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Country
                        </Typography>
                        <span className="drawee-profile-view" >            
                            {this.props.branchProfile['country']}
                        </span> 
                      </Grid>
                      <Grid item xs={4} className='grid-no-top-padding'>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            State
                        </Typography>
                        <span className="drawee-profile-view" >            
                            {this.props.branchProfile['state']}
                        </span> 
                      </Grid>
                      <Grid item xs={4} className='grid-no-top-padding'>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            City
                        </Typography>
                        <span className="drawee-profile-view" >            
                            {this.props.branchProfile['city']}
                        </span>  
                      </Grid>
                      <Grid item xs={5} className='grid-no-top-padding grid-error'>
                          {/* <RegulerTextfield value={this.state.address1} type='address1' label={'Address 1'} placeholder="address 1" getEnterText={this.handleTextfieldChange}/> */}
                          <Input id='address1' autocomplete="off"  value={this.state.address1} placeholder="Address1" label="Address1" type="freeText" isRequired regex={/^([a-zA-Z0-9]){1}.../} onChange={(e, value) => this.handleTextfieldChange(e,value)} onError={e => this.handleAddress1Error(e)}/>
                          {this.state.address1Check ? <span className="errorMessage-add">{this.state.address1errMsg} </span>:''}   
                      </Grid>
                      <Grid item xs={2} className='grid-no-top-padding'>   
                      </Grid>
                      <Grid item xs={5} className='grid-no-top-padding grid-error'>
                          {/* <RegulerTextfield  value={this.state.address2} type='address2' label={'Address 2'} placeholder="address 2" getEnterText={this.handleTextfieldChange}/> */}
                          <Input id='address2' autocomplete="off"  value={this.state.address2} placeholder="Address2" label="Address2" type="freeText" isRequired regex={/^([a-zA-Z0-9]){1}.../} onChange={(e, value) => this.handleTextfieldChange(e,value)} onError={e => this.handleAddress2Error(e)}/>
                          {this.state.address2Check ? <span className="errorMessage-add">{this.state.address2errMsg} </span>:''}
                      </Grid>
                      <Grid item xs={5} className='grid-no-top-padding grid-error'>
                          {/* <RegulerTextfield value={this.state.pobox} type='pobox' label={'PO Box'} placeholder="PO Box" getEnterText={this.handleTextfieldChange}/> */}
                          <Input id='pobox' autocomplete="off"  value={this.state.pobox} placeholder="PO Box" label="PO Box" regex={/^[0-9]+$/} type="freeText" minLength={3} maxLength={20} onChange={(e, value) => this.handleTextfieldChange(e,value)} onError={e => this.handlePOBoxError(e)}/>
                          {this.state.poboxCheck ? <span className="errorMessage-add">{this.state.poboxerrMsg} </span>:''}   
                      </Grid>
                      <Grid item xs={2} className='grid-no-top-padding'>   
                      </Grid>
                      <Grid item xs={5} className='grid-no-top-padding grid-error'>
                          {/* <RegulerTextfield value={this.state.zipCode} type='zipcode' label={'ZIP/PO Code'} placeholder="zip/po code" getEnterText={this.handleTextfieldChange}/> */}
                          <Input id='zipcode' autocomplete="off"  value={this.state.zipCode} placeholder="ZIP/PO Code" label="ZIP/PO Code" regex={/^[0-9]{1,6}$/} isRequired type="number" minLength={6} maxLength={6} onChange={(e, value) => this.handleTextfieldChange(e,value)} onError={e => this.handleZipcodeError(e)}/>
                          {this.state.zipCodeCheck ? <span className="errorMessage-add">{this.state.zipCodeerrMsg} </span>:''}   
                      </Grid>
                      <Grid item xs={5} className='grid-no-top-padding grid-error'>
                          {/* <RegulerTextfield  value={this.state.fax} type='fax' label={'Fax'} placeholder="fax" getEnterText={this.handleTextfieldChange}/> */}
                          <Input id='fax' autocomplete="off"  value={this.state.fax} placeholder="Fax" label="Fax" type="freeText" onChange={(e, value) => this.handleTextfieldChange(e,value)} onError={e => this.handleFaxError(e)}/>
                          {this.state.faxCheck ? <span className="errorMessage-add">{this.state.faxerrMsg} </span>:''}
                      </Grid>
                  </Grid>
                  <Grid container spacing={24} className='global-font'>
                      <Grid item xs={12} className='grid-no-bottom-padding'>
                          <p><b>Contact Details</b></p>
                      </Grid>
                      <Grid item xs={5} className='grid-no-top-padding grid-error'>
                          {/* <RegulerTextfield value={this.state.phone} type='phone' label={'Phone'} placeholder="phone" getEnterText={this.handleTextfieldChange}/> */}
                          <Input id='phone' autocomplete="off" value={this.state.phone} placeholder="Phone" label="Phone" minLength={10} maxLength={13} type="freeText" onChange={(e, value) => this.handleTextfieldChange(e,value)} onError={e => this.handlePhoneError(e)}/>
                          {this.state.phoneCheck ? <span className="errorMessage-add">{this.state.phoneerrMsg} </span>:''}   
                      </Grid>
                      <Grid item xs={2} className='grid-no-top-padding'>   
                      </Grid>
                      <Grid item xs={5} className='grid-no-top-padding grid-error'>
                          {/* <RegulerTextfield  value={this.state.mobile} type='mobile' label={'Mobile'} placeholder="mobile" getEnterText={this.handleTextfieldChange}/> */}
                          <Input id='mobile' autocomplete="off"  value={this.state.mobile} placeholder="Mobile" label="Mobile" type="freeText" onChange={(e, value) => this.handleTextfieldChange(e,value)} onError={e => this.handleMobileError(e)}/>
                          {this.state.mobileCheck ? <span className="errorMessage-add">{this.state.mobileerrMsg} </span>:''}
                      </Grid>
                      <Grid item xs={5} className='grid-no-top-padding grid-error'>
                          {/* <RegulerTextfield value={this.state.email} type='email' label={'Email'} placeholder="email" getEnterText={this.handleTextfieldChange}/> */}
                          <Input id='email' autocomplete="off"  value={this.state.email} placeholder="Email" label="Email" type="email" isRequired onChange={(e, value) => this.handleTextfieldChange(e,value)} onError={e => this.handleEmailError(e)}/>
                          {this.state.emailCheck ? <span className="errorMessage-add">{this.state.emailerrMsg} </span>:''}   
                      </Grid>
                      <Grid item xs={2} className='grid-no-top-padding'>   
                      </Grid>
                      <Grid item xs={5} className='grid-no-top-padding grid-error'>
                          {/* <RegulerTextfield  value={this.state.contactPerson} type='contactPerson' label={'Contact Person'} placeholder="contact person" getEnterText={this.handleTextfieldChange}/> */}
                          <Input id='contactPerson' autocomplete="off"  placeholder="Contact Person" label="Contact Person" value={this.state.contactPerson} type="alpha" regex={/^[a-zA-Z ]*$/} onChange={(e, value) => this.handleTextfieldChange(e,value)} onError={e => this.handleContactPersonError(e)}/>
                          {this.state.contactPersonCheck ? <span className="errorMessage-add">{this.state.contactPersonerrMsg} </span>:''}
                      </Grid>
                  </Grid>
                  <Grid container spacing={24} className='global-font'>
                    <Grid item xs={4}>
                      <p className="toggle-alignment"><b>Status :</b> Disable </p>
                      <div className="toggle-alignment">
                      <Toggle isChecked={this.state.status} id={'status'} isEnabled={true} onChange={this.handleTextfieldChange}/>
                      </div>
                      <p className="toggle-alignment">Enable</p>
                    </Grid>
                  </Grid>
                  <Grid container spacing={24} direction="row" justify="space-between" alignItems="space-between">
                    <Grid item xs={4}>
                      {/* <Button variant="outlined" color="#000" className={classes.button} onClick={this.handleDelete}>
                        Permanent Delete
                      </Button> */}

 <OutLineButton
          id="secondaryOutlineButton"
          umStyle="secondary"
          umClass={classes.button}
          style={{ color:"#19ace3" }}
          onClick={this.handleDelete}
        >
         Permanent Delete
        </OutLineButton>


                    </Grid>
                    <Grid item xs={4}> 
                      <Grid container spacing={24} direction="row" justify="flex-end" alignItems="flex-end"> 
                        {/* <Button 
                        className={classes.button}
                        style= {
                          {
                            color: '#19ace3'
                          }}
                          size="large" onClick={this.handleData}>
                          Save
                        </Button>  */}

                        <TextButton id="disabledTextButton"
                        umClass={classes.button}
                      style={
                        {
                          color: '#19ace3',
                          fontSize:18,
                          margin:20,
                        }}
                     umSize="small" onClick={this.handleData} className = "global-font save-clear">
                    Save
                 </TextButton>
                      </Grid>       
                    </Grid>
                  </Grid>
              </div>
              {
                this.state.confirmDelete ? <ModalBox isOpen={this.state.confirmDelete} fromAction={this.state.fromAction} actionType={this.state.actionType} message={(this.state.modalMessage)} modalAction={this.handleModalResponse}/> : null
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
          </MuiThemeProvider>
      );
    }
}

AgentBranchProfileEdit.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AgentBranchProfileEdit);