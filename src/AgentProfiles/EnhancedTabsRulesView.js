import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import SettlementCurrencyTable from './SettlementCurrency/SettlementCurrencyTable';
import { Tabs, Tab, Badges, Icon } from 'finablr-ui';
import * as APISettlementService from './SettlementCurrency/APISettlementService';
import * as Exceptionhandler from './../ExceptionHandling';
import * as config from './../config/config';




const styles = theme => ({
    root: {
        flexGrow: 1,
        border: '1px solid lightgrey'
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

class EnchancedTabsRulesView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            totalRecords: null,
        };
    }

    componentDidMount() {
        console.log(this.props);
        isNaN(this.props.tabIndex) ? this.setState({ value: 0 }) : this.setState({ value: this.props.tabIndex });
        this.fetchSettlementCurrencyList(this.state.pageNum);
    }

    fetchSettlementCurrencyList = (pgno) => {
        if(sessionStorage.getItem('token') == undefined){
            window.location.replace(config.PAAS_LOGIN_URL);
            return (<h1>401 - Unauthorized Request</h1>)
        }
        else{
            let params = {
                pagenumber: pgno,
                pageelements: this.state.pageelements,
                query: (this.state.query == '') ? null : this.state.query,
                type: (this.state.columnFilter == '') ? null : this.state.columnFilter
            }
            let headers = {
                Authorization:sessionStorage.getItem('token')
            }
            this.setState({ loading: true }, () => {
                APISettlementService.getSettlementCurrencyList(params, this.props.match.params.agentid,headers)
                    .then((response) => {
                        console.log(response)
                        if (response.status == 200) {
                            this.setState({ totalRecords: response.data.total, loading: false, });
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
            })
        }
    }

    handleChange = (event, valt) => {
        this.props.history.push(`/agentprofiles/${this.props.match.params.agentid}?tabId=${valt}`)
        this.setState({ value: valt });
    };

    render() {
        const { classes } = this.props;
        const props = this.props;
        const { value } = this.state;
        return (
            <div>
                <div className={classes.root}>
                    <div>
                        <AppBar position="static" className={classes.appbar}>
                            <Tabs value={this.state.value} umStyle="primary" onChange={this.handleChange}>
                                <Tab style={{ fontSize: "16px", fontFamily: "Gotham-Rounded", maxWidth: "440px" }}
                                    badge={<Badges umStyle="primary" style={{ backgroundColor: '#25479e' }}
                                        type="notifiyBadge" value={this.state.totalRecords} />}
                                    label="SETTLEMENT CURRENCY" />
                                     </Tabs>
                        </AppBar>
                        {this.state.value === 0 && <SettlementCurrencyTable {...this.props} />}
                    </div>
                </div>
            </div>
        );
    }
}

EnchancedTabsRulesView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnchancedTabsRulesView);
