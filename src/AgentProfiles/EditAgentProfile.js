import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import * as ApiService from './ApiService';
import * as Exceptionhandler from './../ExceptionHandling';
import Grid from '@material-ui/core/Grid';
import { Toggle, TextButton, OutLineButton,Input,Notifications } from 'finablr-ui';
import ModalBox from './../component/Modalbox';
import Typography from '@material-ui/core/Typography';
import ErrorModalBox from './../component/ErrorModalbox';
import getMuiTheme from "../theme/theme";
import { MuiThemeProvider } from '@material-ui/core/styles';
import {SHOW_NOTIFICATION} from '../constants/action-types';
import {HIDE_NOTIFICATION} from '../constants/action-types';
import * as config from './../config/config';
import '../vendor/common.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Gotham-Rounded'
  },
  button: {
    color: '#19ace3',
    border: '1px solid #19ace3',
    fontFamily: 'Gotham-Rounded'
  }
});

function TabContainer(props) {
  return (
    <Typography component="div" style={{ border: '1px solid lightgrey', padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

class EditAgentProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      agentProfile: {},
      status: true,
      snackbar: false,
      prevStatus: false,
      notificationType:'success',
      snackbarMessage: '',
      modalMessage: '',
      serverStatus: null,
      serverError: false,
      serverErrMessage: '',
      loading: true,
      bussinessunitmappingvalidation:false,
      bussinessunitmappingvalidationErrmessage:'',
      businessunitmapping:'',
      shownogeneralrules: false,
      confirmDelete: false,
      actionType: '',
      deleted: false,
      apiErrMsg: '',
      agentdisplayname:'',
      agentdisplaynameErrmessage: '',
      agentdisplaynamevalidation: false,
      loaderMessage: 'Retrieving Data',
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.setState({
      agentdisplayname: '',
      businessunitmapping:'',
      status: (this.props.agentinfo.status == 'ENABLED') ? true:false
    },()=>{
      let displayname=this.props.agentinfo.displayName;
      let mapping=this.props.agentinfo.businessMappingUnit; 
     this.setState({
      agentdisplayname: displayname,
      businessunitmapping:mapping,
      status: (this.props.agentinfo.status == 'ENABLED') ? true:false
     },()=>{
     })
    })
  }

  handleChange = (e, value) => {
    console.log(e.target.id, value);
    switch (e.target.id) {
      case ('agentdisplayname'):
        this.setState({ agentdisplayname: value, agentdisplaynamevalidation: false }, () => {
          if (this.state.agentdisplayname.length === 0) {
            this.setState({
              agentdisplaynamevalidation: true,
              agentdisplaynameErrmessage: 'Agent Display Name can not be empty'
            })
          }
          else {
            this.setState({
              agentdisplaynamevalidation: false,
              agentdisplaynameErrmessage: ''
            })
          }
        });
        break;
        case ('businessunitmapping'):
        this.setState({ businessunitmapping: value, bussinessunitmappingvalidation: false }, () => {
          if (this.state.businessunitmapping.length === 0) {
            this.setState({
              bussinessunitmappingvalidation: true,
              bussinessunitmappingvalidationErrmessage: 'Actimize Business Unit  can not be Empty.'
            }, () => {
              this.setState({
                bussinessunitmappingvalidation: false,
                bussinessunitmappingvalidationErrmessage: ''
              })
            })
          }});
          break;
      case ('status'):
        console.log(e.target.checked);
        let isChecked = e.target.checked;
        this.setState({ snackbar: false, status: e.target.checked }, () => {
          if (isChecked == true) {
            this.setState({ snackbar: false, snackbarMessage: '' })
          }
          else {
            this.setState({ snackbar: true, notificationType:'warning',snackbarMessage: 'Agent profile disabled. Any branches created under it will be disabled as well!' })
          }
        })
        break;
      case ('permanentstatus'):
        this.setState({ deleted: true });
        break;
    }
  }


  handleAgentDisplayNameError = (e) => {
    console.log(e);
    switch (e) {
      case 'regex':
        this.setState({ agentdisplaynamevalidation: true, agentdisplaynameErrmessage: 'Only alphanumeric followed by `&` is allowed' })
        break;
      case 'required':
        this.setState({
          agentdisplaynamevalidation: true,
          agentdisplaynameErrmessage: 'Agent Display name can not be empty'
        })
      break;
    }
  }

  handleBenificaryMappingError = (e) => {
    switch (e) {
      case 'regex':
        this.setState({ bussinessunitmappingvalidation: true, bussinessunitmappingvalidationErrmessage: 'only alphabets are allowed' }, () => {
        })
        break;
      case 'required':
        this.setState({
          bussinessunitmappingvalidation: true,
          bussinessunitmappingvalidationErrmessage: 'Actimize Business Unit can not be empty'
        }, () => {
        })
        break;
    }
  }

  handleData = (type) => {
    this.setState({ confirmDelete: false, actionType: '', modalMessage: '' }, () => {
      switch (type) {
        case 'submit':
          this.setState({ confirmDelete: false, actionType: '', modalMessage: '' }, () => {
            let data = {};
            data.displayName = this.state.agentdisplayname;
            data.businessUnitMapping=this.state.businessunitmapping;
            data.status = (this.state.status == true) ? 'ENABLED' : 'DISABLED';
            this.setState({ snackbar: false }, () => {
              if(sessionStorage.getItem('token') == undefined){
                window.location.replace(config.PAAS_LOGIN_URL);
                return (<h1>401 - Unauthorized Request</h1>)
              }
              else{
                let headers = {
                  Authorization:sessionStorage.getItem('token')
                }
                ApiService.editAgentProfile(data,this.props.match.params.id,headers).then((response) => {
                  if (response.status == 200) {
                    console.log(response)
                    this.setState({ serverError: false, loading: false, loaderMessage: '', snackbar: true,notificationType:'success', snackbarMessage: 'Agent Profile is Edited Successfully.' }, () => {
                      setTimeout(() => {
                        this.props.history.push('/agentprofiles');
                      }, 1500);

                    });
                  }
                })
                .catch(error => {
                  if(Exceptionhandler.throwErrorType(error).status == 401){
                    window.location.replace(config.PAAS_LOGIN_URL);
                    return (<h1>401 - Unauthorized Request</h1>)
                  }
                  else if (Exceptionhandler.throwErrorType(error).status == 500 || Exceptionhandler.throwErrorType(error).status == 503 || Exceptionhandler.throwErrorType(error).status == 400) {
                    this.setState({ loading: false, serverError: true, shownogeneralrules: true, apiErrMsg: error.response.data.error, serverStatus: Exceptionhandler.throwErrorType(error).status, serverErrMessage: Exceptionhandler.throwErrorType(error).message })
                  }
                  else {
                    this.setState({ loading: false, serverError: false, shownogeneralrules: true, apiErrMsg: error.response.data.error, actionType: 'OK' })
                  }
                });
              }
            })
          })
          break;
        case 'delete':
          this.setState({ confirmDelete: true, actionType: 'Delete', modalMessage: ' Are you sure you want to permanently delete this profile? This action cannot be undone! Yes/No' });
        break;
      }
    })
  }

  handleModalResponse = (data) => {
    console.log(data);
    if (data == true) {
      if (this.state.actionType == 'Yes') {
        var prevStatus = this.state.prevStatus;
        this.setState({ status: prevStatus, confirmDelete: false, actionType: '' }, () => {
          this.props.modalEditAction(null, 'close');
        })
      }
      else if (this.state.actionType == 'Delete') {
        this.setState({ deleted: true, confirmDelete: true, actionType: 'Delete' }, () => {
          if(sessionStorage.getItem('token') == undefined){
            window.location.replace(config.PAAS_LOGIN_URL);
            return (<h1>401 - Unauthorized Request</h1>)
          }
          else {
            let headers = {
              Authorization:sessionStorage.getItem('token')
            }
            let data = {};
            data.status = (this.state.status == true) ? 'ENABLED' : 'DISABLED';
            data.deleted = this.state.deleted;
            data.businessUnitMapping=this.state.businessunitmapping;
            ApiService.editAgentProfile(data, this.props.match.params.id, headers).then((response) => {
              if (response.status == 200) {
                console.log(response)
                this.setState({ serverError: false, loading: false, loaderMessage: '',notificationType:'success', snackbar: true, snackbarMessage: 'Agent Profile is Edited Successfully.' }, () => {
                  //this.props.location.push('/agentprofiles');
                  setTimeout(() => {
                    this.props.history.push('/agentprofiles');
                  }, 1000);
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
                  this.setState({ loading: false, serverError: true, shownogeneralrules: true, apiErrMsg: error.response.data.error, serverStatus: Exceptionhandler.throwErrorType(error).status, serverErrMessage: Exceptionhandler.throwErrorType(error).message })
                })
              }
              else {
                this.setState({shownogeneralrules: false, serverError: false},()=>{
                  this.setState({ loading: false, serverError: false, shownogeneralrules: true, apiErrMsg: error.response.data.error, actionType: 'OK' })
                })
              }
            });
          }
        })
      }
    }
    else {
      this.setState({ confirmDelete: false, actionType: '' });
    }
  }

  handleStatusResponse = (data) => {
    if (data == true) {
      this.setState({ shownogeneralrules: false }, () => {
      });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={getMuiTheme}>
        <div>
          <TabContainer>
            <div className={classes.root}>
              <Grid container spacing={24}>
                <Grid item xs={4} className="grid-margin">
                  <p className="bank-profile-detail-view">Agent Display Code</p>
                  <p className="bank-profile-detail">{this.props.agentinfo.code}</p>
                </Grid>
                <Grid item xs={4} className="grid-margin">
                  <p className="bank-profile-detail-view">Agent Name</p>
                  <p className="bank-profile-detail">{this.props.agentinfo.name}</p>
                </Grid>
                <Grid item xs={4} className="grid-margin">
                  <p className="bank-profile-detail-view">Country</p>
                  <p className="bank-profile-detail">{this.props.agentinfo.country}</p>
                </Grid>
                <Grid item xs={4} className="grid-margin grid-error">
                   <Input id='agentdisplayname' autocomplete="off"  value={this.state.agentdisplayname} placeholder="Agent Display Name" label="Agent Display Name" regex={/^^[a-zA-Z][a-zA-Z0-9\s&]+$/} type="freeText" isRequired onChange={(e, value) => this.handleChange(e, value)} onError={e => this.handleAgentDisplayNameError(e)} />
                  {this.state.agentdisplaynamevalidation ? <span className="errorMessage-add">{this.state.agentdisplaynameErrmessage}</span> : null}
                </Grid>
                <Grid item xs={4} className="grid-margin grid-error">
                   <Input id='businessunitmapping' autocomplete="off"  value={this.state.businessunitmapping} placeholder = "Actmize Business Unit"  regex={/^[a-zA-Z0-9]*$/} label="Benificary Unit Mapping" type="freeText" isRequired onChange={(e, value) => this.handleChange(e, value)} onError={e => this.handleBenificaryMappingError(e)} />
                  {this.state.bussinessunitmappingvalidation ? <span className="errorMessage-add">{this.state.bussinessunitmappingvalidationErrmessage}</span> : null}
                </Grid>
                <Grid className="global-font" item xs={12}>
                  <p className="toggle-alignment"><b>Status :</b> Disable </p>
                  <div className="toggle-alignment">
                    <Toggle isChecked={this.state.status} id={'status'} onChange={this.handleChange} />
                  </div>
                  <p className="toggle-alignment">Enable</p>
                </Grid>

                <Grid container spacing={24} direction="row" justify="space-between" >
                  <Grid item xs={4}>


                    <OutLineButton
                      id="secondaryOutlineButton"
                      umStyle="secondary"
                      umClass={classes.button}
                      style={{ color: "#19ace3" }}
                      onClick={() => this.handleData('delete')}
                    >
                      Permanent Delete
        </OutLineButton>
                    {/* <Button variant="outlined" color="#19ace3" className={classes.button} onClick={() => this.handleData('delete')}>
                  Permanent Delete
                </Button> */}
                  </Grid>

                  <Grid item xs={4}>
                    <Grid container spacing={24} direction="row" justify="flex-end" alignItems="flex-end">
                      {/* <Button
                    style={
                      {
                        color: '#19ace3',
                        fontSize:18
                      }}
                    size="large" onClick={() => this.handleData('submit')}>
                    Save
                    </Button> */}


                      <TextButton id="disabledTextButton"
                        style={
                          {
                            color: '#19ace3',
                            fontSize: 18,
                            margin: 20,
                          }}
                        umSize="small" onClick={() => this.handleData('submit')} className="global-font save-clear">
                        Save
                 </TextButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/* {
                this.state.snackbar ? <Snackbarcomp message={this.state.snackbarMessage} isOpen={this.state.snackbar} /> : null
              } */}
              {
                this.state.snackbar ?
                         <Notifications
                             id="timerSuccess"
                             umStyle={this.state.notificationType}
                             placement="bottom-right"
                             children={this.state.snackbarMessage}
                             delayShow={SHOW_NOTIFICATION}
                
                             delayHide={HIDE_NOTIFICATION}
                             
                               />
                         : null
                         
                     
                 }

              {
                this.state.confirmDelete ? <ModalBox isOpen={this.state.confirmDelete} actionType={this.state.actionType} message={(this.state.modalMessage)} modalAction={this.handleModalResponse} /> : null
              }

              {
                this.state.shownogeneralrules ? <ErrorModalBox isOpen={this.state.shownogeneralrules} actionType="OK" message={this.state.apiErrMsg} modalAction={this.handleStatusResponse} /> : null
              }

            </div>
          </TabContainer>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(EditAgentProfile);