import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Breadcrumps from '../component/Breadcrumps';
import Loader from '../component/Loader';
import EmptyListComponent from '../component/EmptylistComponent';
import * as ApiService from './ApiService';
import * as Exceptionhandler from './../ExceptionHandling';
import AgentProfileView from './AgentProfileView';
import EnchancedTabsRulesView from './EnhancedTabsRulesView';
import { Tabs, Tab, Badge, Icon } from 'finablr-ui';
import * as config from './../config/config';
import AuditingComponent from './../component/AuditingComponent';
import moment from 'moment';


const styles = theme => ({
  root: {
    flexGrow: 1,
    border: '1px solid lightgrey',
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

const queryString = require('query-string');
var parsed = null;

class EnchancedTabs extends React.Component {
  constructor(props) {
    super(props)
    parsed = queryString.parse(props.location.search);
    this.state = {
      value: 0,
      loading: true,
      loaderMessage: 'Retrieving Data',
      serverStatus: null,
      serverError: false,
      serverErrMessage: '',
      agentProfile: {},
      breadcrumps: [],
      activityDetails: {},
    };
  }

  dateFormater = (data) => {
    let activityDetails = {
      createBy: data.createdBy,
      modifiedBy: data.modifiedBy,
      createDate: moment(data.createdDate).format("DD/MM/YYYY hh:mm a"),
      modifiedDate: moment(data.modifiedDate).format("DD/MM/YYYY hh:mm a"),
    }
    this.setState({ activityDetails }, () => {
      console.log(activityDetails);
    })
  }

  componentDidMount() {
    console.log(this.props);
    this.getAgentProfile();
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
      ApiService.getAgentProfile(this.props.match.params.agentid,headers)
      .then((response) => {
        if (response.status == 200) {
          console.log(response);
          this.setState({ loading: false }, () => {
            this.setState({ agentProfile: response.data }, () => {
              let breadcrumps = [];
              breadcrumps = [{link:'/agentprofiles',text:'Agent Profiles'},{link:'#',text:response.data.name + ' ('+response.data.id+')'}];
              this.setState({ breadcrumps }, () => {
                this.getActivity();
              });
            });
          })
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

  getActivity = () => {
    if(sessionStorage.getItem('token') == undefined){
      window.location.replace(config.PAAS_LOGIN_URL);
      return (<h1>401 - Unauthorized Request</h1>)
    }
    else {
      let headers = {
        Authorization:sessionStorage.getItem('token')
      }
      this.setState({ loading: true }, () => {
        ApiService.getActivity(this.props.match.params.agentid)
          .then((response) => {
            if (response.status == 200) {
              console.log(response);
              this.setState({ loading: false, serverError: false, activityDetails: response.data }, () => {
                console.log(this.state.activityDetails);
                this.dateFormater(this.state.activityDetails)
              })
            }
          })
          .catch(error => {
            if(Exceptionhandler.throwErrorType(error).status == 401){
              window.location.replace(config.PAAS_LOGIN_URL);
              return (<h1>401 - Unauthorized Request</h1>)
            }
            else if (Exceptionhandler.throwErrorType(error).status == 500 || Exceptionhandler.throwErrorType(error).status == 503 || Exceptionhandler.throwErrorType(error).status == 400 ) {
              this.setState({ loading: false, serverError: true, serverStatus: Exceptionhandler.throwErrorType(error).status, serverErrMessage: Exceptionhandler.throwErrorType(error).message })
            }
            else {
              this.setState({ loading: false, serverError: false, confirmStatus: true, apiErrMsg: error.response.data.error, actionType: 'OK' })
            }
          });
      })
    }
  }

  handleChange = (event, valt) => {
    this.setState({ value: valt });
  };

  render() {
    const { classes } = this.props;
    const { value, activityDetails } = this.state;
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12} style={{ marginBottom: 10, marginTop: 10 }}>
            <Breadcrumps links={this.state.breadcrumps} />
          </Grid>
        </Grid>
        <div className={classes.root}>
          {
            this.state.serverError ? <EmptyListComponent text={this.state.serverErrMessage} fromPage="Errors" /> :
              [
                this.state.loading ?
                  <Loader action={this.state.loaderMessage} />
                  :
                  <div>
                    <AppBar position="static" className={classes.appbar}>

                      <Tabs value={value} umStyle="primary" onChange={this.handleChange}>
                        <Tab style={{ fontSize: "16px", fontFamily: "Gotham-Rounded" }} label="AGENT PROFILE DETAILS" />
                        <Tab style={{ fontSize: "16px", fontFamily: "Gotham-Rounded" }} label="ACTIVITY" />
                      </Tabs>
                      {/* <Tabs value={value}
                        classes={{
                          indicator: classes.indicator
                        }}
                        onChange={this.handleChange} className={classes.tabs} >
                        <Tab style={{ fontSize: "16px", fontFamily: "Gotham-Rounded" }} label="AGENT PROFILE DETAILS" />
                        <Tab style={{ fontSize: "16px", fontFamily: "Gotham-Rounded" }} label="ACTIVITY" />
                      </Tabs> */}
                    </AppBar>
                    {this.state.value === 0 && <AgentProfileView data={this.state.agentProfile} />}
                    {this.state.value === 1 && <AuditingComponent createDate={activityDetails.createDate} createBy={activityDetails.createBy} modifiedBy={activityDetails.modifiedBy} modifiedDate={activityDetails.modifiedDate}/>}
                  </div>
              ]
          }
        </div>
        <div>
          {
            this.state.value === 0 ?
            <Grid item xs={12} style={{ marginTop: 40 }}>
              <EnchancedTabsRulesView {...this.props} tabIndex={parseInt(parsed.tabId)}/>
            </Grid>
            : null
          }

        </div>
      </div>
    );
  }
}

EnchancedTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnchancedTabs);