import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, TextButton, Toggle, Input, Selectable, Notifications, } from 'finablr-ui';
import Grid from '@material-ui/core/Grid';
import getMuiTheme from "../theme/theme";
import { MuiThemeProvider } from '@material-ui/core/styles';
import * as ApiService from './ApiService';
import Snackbarcomp from '../component/snackbar';
import * as Exceptionhandler from './../ExceptionHandling';
import ModalBox from '../component/Modalbox';
import Typography from '@material-ui/core/Typography';
import Filess from '../component/SuccessEntityCreation';
import ErrorModalBox from './../component/ErrorModalbox';
import { SHOW_NOTIFICATION } from '../constants/action-types';
import { HIDE_NOTIFICATION } from '../constants/action-types';
import Loader from './../component/Loader';
import * as config from './../config/config';
import '../vendor/common.css';
import {isNull} from 'util';

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
    <Typography component="div" style={{ border: '1px solid lightgrey', padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}


const validAgentNamePattern = /^[a-zA-Z\s-]+$/;
const validAgentCodePattern = /^[a-z0-9]+([a-z0-9]+#)?$/i;
let format = /^[a-zA-Z ]*$/;

let regex=/^[a-zA-Z\s-]+$/;

class AgentProfileCreation extends React.Component {

  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      countryList: [],
      snackbar: false,
      snackbarMessage: '',
      shownogeneralrules: false,
      country: '',
      agentname: '',
      agentcode: '',
      businessunitmapping: '',
      serverStatus: null,
      serverError: false,
      serverErrMessage: '',
      agentdisplayname: '',
      notificationType: 'success',
      agentnamevalidation: false,
      bussinessunitmappingvalidation: false,
      agentcodevalidation: false,
      agentdisplaynamevalidation: false,
      agentnameErrmessage: '',
      agentcodeErrmessage: '',
      bussinessunitmappingvalidationErrmessage: '',
      agentdisplaynameErrmessage: '',
      saveDisabled: false,
      clearDisabled:false,
      status: true,
      confirmDelete: false,
      confirmDeleteOne: false,
      fromActionOne: '',
      fromAction: '',
      apiErrMsg: '',
      modalMessage: '',
      actionType: '',
      loading: true,
      countryData: {},
      actionTypeOne: '',
      mainheading: '',
      messageone: '',
      messagetwo: '',
      createdagentId: null
    }
  }

  componentDidMount() {
    this.fetchCountryList();
    this.handlesaveenable();
    this.handleClearEnable();
    console.log(this.props)
  }

  fetchCountryList = () => {
    if(sessionStorage.getItem('token') == undefined){
      window.location.replace(config.PAAS_LOGIN_URL)
      return (<h1>401 - Unauthorized Request</h1>)
    }
    else{
      let headers = {
        Authorization:sessionStorage.getItem('token')
      }
      let countryList = [];
      ApiService.fetchCountryList(headers).then((response) => {
        if (response.data.length > 0) {
          response.data.map((obj) => {
            let country = {};
            country.id = obj.id;
            country.label = obj.name + ' - '+ obj.countryCode;
            country.value = obj.countryCode;
            countryList.push(country);
          })
          this.setState({ countryList, loading: false }, () => {
          })
        }
        else {
          this.setState({ snackbar: true, notificationType: 'warning', snackbarMessage: 'no country records' });
        }
      }).catch(error => {
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

  handleBlur = (e) => {
    switch (e.target.id) {
      case 'country':
        this.setState({ countryCheck: false }, () => {
          if (this.state.country == undefined) {
            this.setState({ countryCheck: true, countryerrMsg: 'Country can not be empty', countryData: {} }, () => {
              this.handlesaveenable();
              this.handleClearEnable();
            })
          }
          else if (this.state.country.length == 0) {
            this.setState({ countryCheck: true, countryerrMsg: ' Country can not be empty', countryData: {} }, () => {
              this.handlesaveenable();
              this.handleClearEnable();
            })
          }
          else {
            this.handlesaveenable();
            this.handleClearEnable();
          }
        })
      break;
    }
  }

  handleCountryChange = (e, id) => {
    this.setState({ country: e }, () => {
      if (this.state.country == undefined) {
        this.setState({ countryCheck: true, countryerrMsg: 'Country can not be empty', countryData: {} }, () => {
          this.handlesaveenable();
          this.handleClearEnable();
        })
      }
      else if (this.state.country.length == 0) {
        this.setState({ countryCheck: true, countryerrMsg: 'Country can not be empty', countryData: {} }, () => {
          this.handlesaveenable();
          this.handleClearEnable();
        })
      }
      else if(this.state.country.length > 0){
        this.state.countryList.map((obj)=>{
          if(this.state.country == obj.value){
            this.setState({country:obj.value,countryData:obj,countryCheck:false},()=>{
              this.handlesaveenable();
              this.handleClearEnable();
            })
          }
        })
      }
      else {
        this.handlesaveenable();
        this.handleClearEnable();
      }
    });
  }

  handleCountryValueClick = (e, id) => {
    console.log(e, id);
    let value = e.value
    this.setState({ countryData: e, country: value }, () => {
      console.log(this.state.countryData)
      // this.fetchAgentBranches(this.state.currencyCodeData.value)
      this.handlesaveenable();
      this.handleClearEnable();
    })
  }

  handleChange = (e, value) => {
    // this.setState({ dataFieldsError: false });
    switch (e.target.id) {
      case ('agentname'):
        this.setState({ agentname: value, agentnamevalidation: false }, () => {
          if (this.state.agentname.length === 0) {
            this.setState({
              agentnamevalidation: true,
              agentnameErrmessage: 'Agent Name can not be empty'
            }, () => {
              this.handlesaveenable();
              this.handleClearEnable();
            })
          }
          else {
            this.setState({
              agentnamevalidation: false,
              agentnameErrmessage: ''
            },
            () => {
             this.handlesaveenable();
             this.handleClearEnable();
           })
         }
       });
       break;
      case ('agentcode'):
        this.setState({ agentcode: value, agentcodevalidation: false }, () => {
          if (this.state.agentcode.length === 0) {
            this.setState({
              agentcodevalidation: true,
              agentcodeErrmessage: 'Agent Code can not be empty'
            }, () => {
              this.handlesaveenable();
              this.handleClearEnable();
            })
          }

          else if (this.state.agentcode.length > 12) {
            this.setState({
              agentcodevalidation: true,
              agentcodeErrmessage: 'Agent Code can not be more than 12'
            }, () => {
              this.handlesaveenable();
              this.handleClearEnable();
            })
          }
          else {
            this.setState({
              agentcodevalidation: false,
              agentcodeErrmessage: ''
            },
             () => {
              this.handlesaveenable();
              this.handleClearEnable();
            })
          }
        });
        break;
      case ('agentdisplayname'):
        this.setState({ agentdisplayname: value, agentdisplaynamevalidation: false }, () => {
          if (this.state.agentdisplayname.length === 0) {
            this.setState({
              agentdisplaynamevalidation: true,
              agentdisplaynameErrmessage: 'Agent Display Name can not be empty'
            }, () => {
              this.handlesaveenable();
              this.handleClearEnable();
            })
          }
          else {
            this.setState({
              agentdisplaynamevalidation: false,
              agentdisplaynameErrmessage: ''
            },
            () => {
             this.handlesaveenable();
             this.handleClearEnable();
           })
         }
       });
       break;

      case ('businessunitmapping'):
        this.setState({ businessunitmapping: value, bussinessunitmappingvalidation: false }, () => {
          if (this.state.businessunitmapping.length === 0) {
            this.setState({
              bussinessunitmappingvalidation: false,
              bussinessunitmappingvalidationErrmessage: 'Actimize Business Unit can not be empty'
            }, () => {
              // this.handlesaveenable();
              this.handleClearEnable();
            })
          }
          else {
            this.setState({
              bussinessunitmappingvalidation: false,
              bussinessunitmappingvalidationErrmessage: ''
            },
            () => {
             this.handlesaveenable();
             this.handleClearEnable();
           })
         }
       });
       break;
      case ('status'):
        this.setState({ status: e.target.checked }, () => {
          console.log(this.state.status);
        });
        break;
    }
    // if ((this.state.agentcode.length > 0) && (this.state.agentname.length > 0) && (this.state.country.length > 0) && (this.state.businessunitmapping.length > 0)) {
    //   this.setState({ saveDisabled: true });
    // }
  };

  handleAgentNameError = (e) => {
    switch (e) {
      case 'regex':
        this.setState({ agentnamevalidation: true, agentnameErrmessage: 'Only alphanumeric followed by `&` is allowed'}, () => {
          this.handlesaveenable();
          this.handleClearEnable();
        })
        break;
      case 'required':
        this.setState({
          agentnamevalidation: true,
          agentnameErrmessage: 'Agent Name can not be empty'
        }, () => {
          this.handlesaveenable();
          this.handleClearEnable();
        })
        break;
    }
  }

  handleBenificaryMappingError = (e) => {
    switch (e) {
      case 'regex':
        this.setState({ bussinessunitmappingvalidation: true, bussinessunitmappingvalidationErrmessage: 'Only alphanumeric values are allowed' }, () => {
          this.handlesaveenable();
          this.handleClearEnable();
        })
        break;
      case 'required':
        this.setState({
          bussinessunitmappingvalidation: false,
          bussinessunitmappingvalidationErrmessage: 'Actimize Business Unit can not be empty'
        }, () => {
          this.handlesaveenable();
          this.handleClearEnable();
        })
        break;
    }
  }

  handleAgentCodeError = (e) => {
    console.log(e);
    switch (e) {
      case 'regex':
        this.setState({ agentcodevalidation: true, agentcodeErrmessage: 'Only alphabets followed by # are allowed' }, () => {
          this.handlesaveenable();
          this.handleClearEnable();
        })
        break;
      case 'maxLength':
        this.setState({
          agentcodevalidation: true,
          agentcodeErrmessage: 'Value can not be Greater than 12'
        }, () => {
          this.handlesaveenable();
          this.handleClearEnable();
        })
        break;
      case 'required':
        this.setState({
          agentcodevalidation: true,
          agentcodeErrmessage: 'Agent Code can not be empty'
        }, () => {
          this.handlesaveenable();
          this.handleClearEnable();
        })
        break;
    }
  }

  handleAgentDisplayNameError = (e) => {
    console.log(e);
    switch (e) {
      case 'regex':
        this.setState({ agentdisplaynamevalidation: true, agentdisplaynameErrmessage: 'Only alphanumeric followed by `&` is allowed' }, () => {
          this.handlesaveenable();
          this.handleClearEnable();
        })
        break;
      case 'required':
        this.setState({
          agentdisplaynamevalidation: true,
          agentdisplaynameErrmessage: 'Agent Display Name can not be empty'
        }, () => {
          this.handlesaveenable();
          this.handleClearEnable();
        })
        break;
        case 'maxLength':
        this.setState({
          agentdisplaynamevalidation: true,
          agentdisplaynameErrmessage: 'Please Enter Max 12 characters'
        }, () => {
          this.handlesaveenable();
          this.handleClearEnable();
        })
        break;
    }
  }

  handleData = () => {
    console.log(this.state)
    this.setState({ modalMessage: '' });
    let agentProfile = {};
    agentProfile.name = this.state.agentname;
    agentProfile.code = this.state.agentcode;
    agentProfile.displayName = this.state.agentdisplayname;
    agentProfile.businessUnitMapping = this.state.businessunitmapping;
    if (Object.keys(this.state.countryData).length > 0) {
      agentProfile.country = this.state.countryData.label;
      agentProfile.countryCode = this.state.countryData.value
    }
    agentProfile.status = (this.state.status == true) ? 'ENABLED' : 'DISABLED';
    console.log(agentProfile);
    if(sessionStorage.getItem('token') == undefined){
      window.location.replace(config.PAAS_LOGIN_URL);
      return (<h1>401 - Unauthorized Request</h1>)
    }
    else{
      let headers = {
        Authorization:sessionStorage.getItem('token')
      }
      ApiService.createAgentProfile(agentProfile,headers).then((response) => {
        if (response.status == 200) {
          console.log(response)
          this.setState({ createdagentId: response.data.id, confirmDeleteOne: true, serverError: false, loading: false, loaderMessage: '', notificationType: 'success', snackbarMessage: 'Agent Profile is Created Successfully', fromAction: 'Yes', fromActionOne: 'Yes', mainheading: 'Create Agent Branch Profile?', messageone: 'Agent Profile is created successfully', messagetwo: 'Do you want to create agent branches now?' }, () => {
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

  handleClear = () => {
    let agentcodeLen = (this.state.agentcode == undefined || this.state.agentcode == isNull || this.state.agentcode == '') ? 0 : this.state.agentcode.length;
    let agentnameLen = (this.state.agentname == undefined || this.state.agentname == isNull || this.state.agentname == '') ? 0 : this.state.agentname.length;
    let agentdisplaynameLen = (this.state.agentdisplayname == undefined || this.state.agentdisplayname == isNull || this.state.agentdisplayname == '') ? 0 : this.state.agentdisplayname.length;
    let businessunitmappingLen = (this.state.businessunitmapping == undefined || this.state.businessunitmapping == isNull || this.state.businessunitmapping == '') ? 0 : this.state.businessunitmapping.length;
    this.setState({ confirmDelete: false, snackbar: false }, () => {
      if (agentcodeLen > 0 || agentnameLen > 0 || agentdisplaynameLen > 0 || (Object.keys(this.state.countryData).length > 0) || businessunitmappingLen > 0) {
        this.setState({ confirmDelete: true, fromAction: 'clear', modalMessage: 'This will clear all data. Are you sure you want to continue?' })
      }
    })
  }

  handleClearEnable = () => {
    let agentcodeLen = (this.state.agentcode == undefined || this.state.agentcode == isNull || this.state.agentcode == '') ? 0 : this.state.agentcode.length;
    let agentnameLen = (this.state.agentname == undefined || this.state.agentname == isNull || this.state.agentname == '') ? 0 : this.state.agentname.length;
    let agentdisplaynameLen = (this.state.agentdisplayname == undefined || this.state.agentdisplayname == isNull || this.state.agentdisplayname == '') ? 0 : this.state.agentdisplayname.length;
    let businessunitmappingLen = (this.state.businessunitmapping == undefined || this.state.businessunitmapping == isNull || this.state.businessunitmapping == '') ? 0 : this.state.businessunitmapping.length;
    if ((agentcodeLen > 0) || (agentnameLen > 0) || (agentdisplaynameLen > 0)
     || (businessunitmappingLen > 0) || (Object.keys(this.state.countryData).length > 0))
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

  handleModalResponse = (data, from) => {
    console.log(this.props.history);
    if (data == true && from == 'clear') {
      this.setState({
        country: undefined,
        countryData:{},
        status: true,
        agentcode: isNull,
        agentname: isNull,
        businessunitmapping: isNull,
        agentdisplayname: isNull,
        snackbar: false,
        confirmDelete: false,
        saveDisabled: false,
        clearDisabled:false,
        agentnamevalidation:false,
        agentcodevalidation:false,
        agentdisplaynamevalidation:false,
        countryCheck:false,
        bussinessunitmappingvalidation:false
      }, () => {
        console.log(this.state)
      })
    }
    else {
      this.setState({ confirmDelete: true }, () => {
      });
    }
  }

  handleModalResponseOne = (data, from) => {
    if (data == true && from == 'Yes') {
      this.setState({ confirmDeleteOne: false }, () => {
        this.props.history.push(`/agentprofiles/${this.state.createdagentId}/branches/create`)
      })
    }
    else {
      this.setState({ confirmDeleteOne: false }, () => {
        this.props.history.push("/agentprofiles")
      });
    }
  }

  handleStatusResponse = (data) => {
    if (data == true) {
      this.setState({ shownogeneralrules: false }, () => {
      });
    }
  }

  handlesaveenable = () => {
    let agentnameLength = (this.state.agentname == undefined || this.state.agentname == isNull || this.state.agentname == '') ? 0 : this.state.agentname.replace(/\s/g, '').length;
    let agentdisplaynameLength = (this.state.agentdisplayname == undefined || this.state.agentdisplayname == isNull || this.state.agentdisplayname == '') ? 0 : this.state.agentdisplayname.replace(/\s/g, '').length;
    let agentcodeLength = (this.state.agentcode == undefined || this.state.agentcode == isNull || this.state.agentcode == '') ? 0 : this.state.agentcode.replace(/\s/g, '').length;
    // let businessunitmappingLength = (this.state.businessunitmapping == undefined || this.state.businessunitmapping == isNull || this.state.businessunitmapping == '') ? 0 : this.state.businessunitmapping.replace(/\s/g, '').length;
    console.log("business" +this.state.businessunitmapping);
    if ((agentnameLength == 0) || (agentdisplaynameLength == 0) || (agentcodeLength == 0) || (Object.keys(this.state.countryData).length == 0) || this.state.agentnamevalidation || this.state.agentcodevalidation || this.state.agentdisplaynamevalidation || this.state.countryCheck ) {
      this.setState({
        saveDisabled: false
      })
    }
    else {
      this.setState({
        saveDisabled: true
      })
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={getMuiTheme}>
        {
          this.state.loading ?
            <Loader action={this.state.loaderMsg} />
            :
            <TabContainer>
              <div className={classes.root}>
                <Grid container spacing={16} className='global-font'>
                  <Grid item xs={5} className='grid-no-top-padding grid-error'>
                    <Input id='agentname' autocomplete='off' value={this.state.agentname} regex={/^^[a-zA-Z0-9][a-zA-Z0-9\s&]+$/} placeholder="Agent Name"   label="Agent Name *" type="freeText" isRequired onChange={(e, value) => this.handleChange(e, value)} onError={e => this.handleAgentNameError(e)} />
                    {this.state.agentnamevalidation ? <span className="errorMessage-add">{this.state.agentnameErrmessage}</span> : null}
                  </Grid>
                  <Grid item xs={2} className='grid-no-top-padding'>
                  </Grid>
                  <Grid item xs={5} className='grid-no-top-padding grid-error'>
                    <Input id='agentcode' autocomplete='off' value={this.state.agentcode} placeholder="Agent Code" label="Agent Code *" type="freeText" regex={/^^[a-zA-Z0-9][a-zA-Z\s#]+$/} isRequired onChange={(e, value) => this.handleChange(e, value)} onError={e => this.handleAgentCodeError(e)} />
                    {this.state.agentcodevalidation ? <span className="errorMessage-add">{this.state.agentcodeErrmessage}</span> : null}
                  </Grid>
                </Grid>
                <Grid container spacing={24} className='global-font'>
                  <Grid item xs={5} className='grid-no-top-padding grid-error' style={{marginTop:12}}>
                    <Input id='agentdisplayname' autocomplete='off' value={this.state.agentdisplayname} placeholder="Agent Display Name" label="Agent Display Name *" type="freeText" regex={/^^[a-zA-Z][a-zA-Z0-9\s&]+$/} isRequired onChange={(e, value) => this.handleChange(e, value)} onError={e => this.handleAgentDisplayNameError(e)} />
                    {this.state.agentdisplaynamevalidation ? <span className="errorMessage-add">{this.state.agentdisplaynameErrmessage}</span> : null}
                  </Grid>
                  <Grid item xs={2} className='grid-no-top-padding'>
                  </Grid>
                  <Grid item xs={5} className='grid-no-top-padding grid-error'>
                    <Selectable
                      id="country"
                      ref="Selectable"
                      label="Country *"
                      isRequired
                      searchable={true}
                      isCreatable={false}
                      isClearable={true}
                      value={this.state.country}
                      options={this.state.countryList}
                      noResultsText="No  Country Found"
                      searchBy={'any'}
                      placeholder={'Country'}
                      onChange={(e) => this.handleCountryChange(e, 'country')}
                      onValueClick={(e) => this.handleCountryValueClick(e, 'country')}
                      onBlur={this.handleBlur}
                    />
                    {this.state.countryCheck ? <span className="errorMessage-add">{this.state.countryerrMsg} </span> : ''}
                  </Grid>
                </Grid>
                <Grid container spacing={16} className='global-font'>
                  <Grid item xs={5} className='grid-no-top-padding grid-error'>
                    <Input id='businessunitmapping' autocomplete='off' value={this.state.businessunitmapping} placeholder="Actimize Business Unit" regex={/^[a-zA-Z0-9]*$/} label="Actimize Business Unit" type="freeText" isRequired onChange={(e, value) => this.handleChange(e, value)} onError={e => this.handleBenificaryMappingError(e)} />
                    {this.state.bussinessunitmappingvalidation ? <span className="errorMessage-add">{this.state.bussinessunitmappingvalidationErrmessage}</span> : null}
                  </Grid>
                </Grid>
                <Grid container spacing={24} className='global-font'>
                  <Grid item xs={4}>
                    <p className="toggle-alignment"><b>Status :</b> Disable </p>
                    <div className="toggle-alignment">
                      <Toggle isChecked={this.state.status} id={'status'} isEnabled={true} onChange={this.handleChange} />
                    </div>
                    <p className="toggle-alignment">Enable</p>
                  </Grid>
                </Grid>
                <Grid container spacing={24} direction="row" justify="flex-end" alignItems="flex-end">
                  <Grid item xs={4}>
                    <Grid container spacing={24} direction="row" justify="flex-end" alignItems="flex-end">
                      <TextButton
                        id="defaultTextButton"
                        umStyle="default"
                        onClick={this.handleClear}
                        className="global-font save-clear"
                        style={{ marginRight: "10px" }} isEnabled={this.state.clearDisabled}
                      >
                        Clear
                      </TextButton>
                      <TextButton id="disabledTextButton" umSize="small" onClick={this.handleData}
                        isEnabled={this.state.saveDisabled} className="global-font save-clear"
                      >
                        Save
                      </TextButton>
                    </Grid>
                  </Grid>
                </Grid>
                {
                  this.state.confirmDelete ? <ModalBox isOpen={this.state.confirmDelete} fromAction={this.state.fromAction} actionType="Yes" message={(this.state.modalMessage)} modalAction={this.handleModalResponse} /> : null
                }
                {
                  this.state.confirmDeleteOne ? <Filess isOpenOne={this.state.confirmDeleteOne} fromActionOne={this.state.fromActionOne} actionTypeOne="Yes" mainheading={(this.state.mainheading)} messageone={(this.state.messageone)} messagetwo={this.state.messagetwo} modalActionOne={this.handleModalResponseOne} /> : null
                }
                {
                  this.state.snackbar ? <Snackbarcomp message={this.state.snackbarMessage} isOpen={this.state.snackbar} /> : null
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
              </div>
            </TabContainer>}
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(AgentProfileCreation);