import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import TokenTransaction from './TokenTransaction/TokenTransaction'; 
// import { Tabs, Tab, Badges } from 'finablr-ui';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Badge from '@material-ui/core/Badge';
import * as ApiService from './TokenTransaction/ApiService';
import * as Exceptionhandler from './../ExceptionHandling';
import EmptyListComponent from '../component/EmptylistComponent';
import ErrorModalBox from '../component/ErrorModalbox';
import AllowedProductsList from './AllowedProducts/AllowedProductsList';
import * as ApiAllowedProductService from './AllowedProducts/ApiService';
import AgentBranchFieldValidations from './AgentBranchFieldValidations';
import ModalBox from './../component/Modalbox';
import ChargeRules from './ChargesRule/ChargeRules';
import * as ApiChargeRules from './ChargesRule/ApiService';
import ChargePreferences from './ChargeRatePreferences/ChargePreferences';
import  * as ApiRateChargePreference from './ChargeRatePreferences/ApiChargePerferences';
import RoundOffRate from './RoundOffRate/RoundOffRate';
import * as config from './../config/config';
import * as AgentBranchApiService from './ApiService';
import getMuiTheme from '../theme/theme';

const styles = theme => ({
    root: {
        flexGrow: 1,
        
    },
    badge: {
        background: `#25479e`,
        marginRight:-13,
        width:24,
        height:24,
        borderRadius: '12px',
      },
    indicator: {
        backgroundColor: 'white',
        height: `3px`
    },
    appbar: {
        boxShadow: 'none'
    },
    tabs: {
        backgroundColor: '#19ace3',
        color: '#fff',
        fontSize: '16px'
    },
    testColor: {
        color: 'blue !important'
    }
});

let currentVal = 0;
class EnchancedTabsRulesView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            tokenExpiryCount:null,
            allowedProductsListCount:null,
            chargeRulesCount:null,
            rateChargePerference:null,
            serverError:false,
            serverErrMessage:'',
            shownogeneralrules:false,
            apiErrMsg:'',
            actionCompChange: false,
            confirmChange: false,
            modalMessage: 'There are un saved changes on this page. These will be lost if not saved! Are you sure you want to continue?',
            actionType: '',
            loading:true,
            loaderMessage:'Retrieving Data',
        };
    }

    componentDidMount() {
        console.log(this.props);
        isNaN(this.props.tabIndex) ? this.setState({ value: 0 }) : this.setState({ value: this.props.tabIndex });
        this.fetchRuleBadgeCounts(this.props.match.params.agentid,this.props.match.params.agentbranchId)
    }

    fetchRuleBadgeCounts = (agentid,agentbranchid) =>{
        if(sessionStorage.getItem('token') == undefined){
            window.location.replace(config.PAAS_LOGIN_URL)
            return (<h1>401 - Unauthorized Request</h1>)
        }
        else{
            let headers = {
                Authorization:sessionStorage.getItem('token')
            } 
            let params = {
                agentId : agentid,
                agentBranchId : agentbranchid
            }
            this.setState({ loading: true }, () => {
                AgentBranchApiService.getRulesCount(params,agentid,agentbranchid,headers)
                    .then((response) => {
                        console.log(response)
                        if (response.status == 200) {
                            this.setState({
                                tokenExpiryCount:response.data.agentTokenOrTransactionExpiryCount,
                                allowedProductsListCount:response.data.allowedProductsSendRulesCount,
                                chargeRulesCount:response.data.chargesRulesCount,
                                rateChargePerference:response.data.rateChargePreferenceSettingsCount,
                                loading:false
                            });
                        }
                    })
                    .catch(error => {
                        if(Exceptionhandler.throwErrorType(error).status == 401){
                            window.location.replace(config.PAAS_LOGIN_URL)
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

    handleChange = (event, valt) => {
      this.setState({ confirmChange: false }, () => {
          currentVal = valt;
          if (this.state.actionCompChange === true) {
              this.setState({ confirmChange: true, actionType: 'Yes' });
          }
          else {
              this.props.history.push(`/agentprofiles/${this.props.match.params.agentid}/branches/${this.props.match.params.agentbranchId}?tabId=${valt}`)
              this.setState({ confirmChange: false, actionCompChange: false, value: valt }, () => {
                  
            });
          }
      })
    };

    handleCompValueChange = (data) => {
      this.setState({ actionCompChange: data });
    }

    handleModalResponse = (data) => {
      if (data) {
        this.setState({ value: currentVal, confirmChange: false });
      }
      else {
        this.setState({ confirmChange: false });
      }
    }

    render() {
        const { classes } = this.props;
        const { value } = this.state;
        return (
            <MuiThemeProvider theme={getMuiTheme}>
                <div>
                    {
                        this.state.serverError ? <EmptyListComponent text={this.state.serverErrMessage} fromPage="Errors" /> : 
                        <div className={classes.root}>
                            <div>
                                <AppBar position="static" className={classes.appbar}>
                                    <Tabs value={this.state.value} 
                                    onChange={this.handleChange} 
                                    variant="scrollable" 
                                    scrollButtons="auto"  classes={{ root: classes.tabs, indicator: classes.indicator }}>
                                        <Tab style={{ height: '70px', fontSize: '16px', minWidth: '300px' }} label={<Badge invisible={false} classes={{badge:classes.badge}}  badgeContent={this.state.allowedProductsListCount}> ALLOWED PRODUCTS SEND </Badge>} /> 
                                        <Tab style={{ fontSize: '16px', minWidth: '310px' }} label={<Badge invisible={false} classes={{badge:classes.badge}}  badgeContent={this.state.tokenExpiryCount}> TOKEN/TRANSACTION EXPIRY </Badge>} />
                                        <Tab style={{ fontSize: '16px', minWidth: '200px' }} label="FIELD VALIDATIONS" />
                                        <Tab style={{ fontSize: '16px', minWidth: '200px' }} label={<Badge invisible={false} classes={{badge:classes.badge}}  badgeContent={this.state.chargeRulesCount}> CHARGE RULES </Badge>} />
                                        <Tab style={{ fontSize: '16px', minWidth: '300px' }} label={<Badge invisible={false} classes={{badge:classes.badge}}  badgeContent={this.state.rateChargePerference}> RATE/CHARGE PREFERENCE </Badge>} />
                                        <Tab style={{ fontSize: '16px', minWidth: '300px' }} label="ROUND OFF/CUT OFF RATE" />
                                    </Tabs>

                                    {/* <Tabs value={this.state.value} scrollable={true} umStyle="primary" onChange={this.handleChange}>
                                    <Tab style={{maxWidth:`440px`,fontSize: "16px",fontFamily: "Gotham-Rounded"}} badge={<Badges umStyle="primary" style={{backgroundColor:'#25479e'}} type="notifiyBadge" value={this.state.allowedProductsListCount} />}label="ALLOWED PRODUCTS SEND" />
                                        <Tab style={{maxWidth:`440px`,fontSize: "16px",fontFamily: "Gotham-Rounded"}} badge={<Badges umStyle="primary" style={{backgroundColor:'#25479e'}} type="notifiyBadge" value={this.state.tokenExpiryCount} />} label="TOKEN/TRANSACTION EXPIRY" />
                                        <Tab style={{maxWidth:`440px`,fontSize: "16px",fontFamily: "Gotham-Rounded"}} label="FIELD VALIDATIONS" />
                                        <Tab style={{maxWidth:`440px`,fontSize: "16px",fontFamily: "Gotham-Rounded"}} badge={<Badges umStyle="primary" style={{backgroundColor:'#25479e'}} type="notifiyBadge" value={this.state.chargeRulesCount} />} label="CHARGE RULES" />
                                    <Tab style={{maxWidth:`500px`,fontSize: "16px",fontFamily: "Gotham-Rounded"}} badge={<Badges umStyle="primary" style={{backgroundColor:'#25479e'}} type="notifiyBadge" value={this.state.rateChargePerference} />} label="RATE/CHARGE PREFERENCE"/>
                                        <Tab label="ROUND OFF/CUT OFF RATE" />
                                    </Tabs> */}
                                </AppBar>
                                {this.state.value === 0 && <AllowedProductsList {...this.props} handleCompValueChange={this.handleCompValueChange}/>}
                                {this.state.value === 1 && <TokenTransaction {...this.props} handleCompValueChange={this.handleCompValueChange}/>}
                                {this.state.value === 2 && <AgentBranchFieldValidations handleCompValueChange={this.handleCompValueChange} {...this.props} />}
                                {this.state.value === 3 && <ChargeRules handleCompValueChange={this.handleCompValueChange} {...this.props} />}
                                {this.state.value === 4 && <ChargePreferences handleCompValueChange={this.handleCompValueChange} {...this.props} />}
                                {this.state.value === 5 && <RoundOffRate handleCompValueChange={this.handleCompValueChange} {...this.props} />}
                            </div>
                        </div>
                    }
                    {
                        this.state.shownogeneralrules ? <ErrorModalBox isOpen={this.state.shownogeneralrules} actionType="OK" message={this.state.apiErrMsg} modalAction={this.handleStatusResponse}/> : null
                    }  
                    {
                        this.state.confirmChange ? <ModalBox isOpen={this.state.confirmChange} actionType={this.state.actionType} message={(this.state.modalMessage)} modalAction={this.handleModalResponse} /> : null
                    }
                </div>
            </MuiThemeProvider>
        );
    }
}

EnchancedTabsRulesView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnchancedTabsRulesView);