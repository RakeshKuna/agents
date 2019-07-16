import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CommonLayout from './common/Layout';
import AgentProfileList from './AgentProfiles/AgentProfileList';
import AgentProfileView from './AgentProfiles/EnchancedTabs';
import AgentCreate from './AgentProfiles/EnhancedTabsCreate';
import AgentEditProfile from './AgentProfiles/EnhancedTabsEdit';
import AgentBranchList from './AgentBranchProfiles/AgentBranchProfilesList';
import AgentBranchProfileView from './AgentBranchProfiles/EnhancedTabProfileView';
import EnhancedTabsProfileCreate from './AgentBranchProfiles/EnhancedTabsProfileCreate';
import EnhancedTabsProfileEdit from './AgentBranchProfiles/EnhancedTabsProfileEdit';
import CreateTokenTransactionExpiry from './AgentBranchProfiles/TokenTransaction/CreateTokenTransaction'
import EditTokenTransactionExpiry from './AgentBranchProfiles/TokenTransaction/EditTokenTransaction';
import ViewTokenExpiryProfile from './AgentBranchProfiles/TokenTransaction/EnhancedTabsProfileView';
import CreateAllowedProduct from './AgentBranchProfiles/AllowedProducts/CreateAllowedProducts';
import ViewAllowedProduct from './AgentBranchProfiles/AllowedProducts/EnhancedTabsViewAllowedProducts';
import EditAllowedProduct from './AgentBranchProfiles/AllowedProducts/EditAllowedProducts';
import CreateSettlementCurrency from './AgentProfiles/SettlementCurrency/CreateSettlementCurrency';
import EditSettlementCurrency from './AgentProfiles/SettlementCurrency/EditSettlementCurrency';
import SettlementCurrencyTabView from './AgentProfiles/SettlementCurrency/SettlementCurrencyTabView';
import CreateChargeRules from './AgentBranchProfiles/ChargesRule/CreateChargeRules';
import EditChargeRules from './AgentBranchProfiles/ChargesRule/EditChargeRules';
import ViewChargeRules from './AgentBranchProfiles/ChargesRule/EnhancedTabsViewChargeRules';
import CreateChargePreference from'./AgentBranchProfiles/ChargeRatePreferences/CreateChargePerferences';
import ViewRateChargePrefernce from './AgentBranchProfiles/ChargeRatePreferences/EnchancedTabsViewRateChargePreferences';
import EditRateChargePrefernce from './AgentBranchProfiles/ChargeRatePreferences/EditRateChargePreference';
import * as AuthService from './AuthService/AuthService';
import * as config from './config/config';

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/agentprofiles" render={props=>{
                if(sessionStorage.getItem('token') == undefined){
                    window.location.replace(config.PAAS_LOGIN_URL);
                    return (<h1>401 - Unauthorized Request</h1>)
                }
                else{
                    return(
                        <CommonLayout>
                            <Switch>
                                <Route path="/agentprofiles/:agentid/branches/create" component={EnhancedTabsProfileCreate} />
                                <Route path="/agentprofiles/:agentid/branches/:branchid/edit" component={EnhancedTabsProfileEdit} />
                                <Route path="/agentprofiles/:agentid/branches/:agentbranchId/editRateChargePreference/:ratechargeprefernceid" component={EditRateChargePrefernce} />                                   
                                <Route path="/agentprofiles/:agentid/branches/:agentbranchId/ratechargepreference/:ratechargeprefernceid" component={ViewRateChargePrefernce} />                
                                <Route path="/agentprofiles/:agentid/branches/:agentbranchId/createChargeRatePreferences" component={CreateChargePreference} />
                                <Route path="/agentprofiles/:agentid/branches/:agentbranchId/editChargeRules/:chargerulesid" component={EditChargeRules} />
                                <Route path="/agentprofiles/:agentid/branches/:agentbranchId/viewChargeRules/:chargerulesid" component={ViewChargeRules} />
                                <Route path="/agentprofiles/:agentid/branches/:agentbranchId/createChargeRules" component={CreateChargeRules} />
                                <Route path="/agentprofiles/:agentid/branches/:agentbranchId/createtokenexpiry" component={CreateTokenTransactionExpiry} />
                                <Route path="/agentprofiles/:agentid/branches/:agentbranchId/edittokenexpiry/:tokenexpiryid" component={EditTokenTransactionExpiry} />
                                <Route path="/agentprofiles/:agentid/branches/:agentbranchId/tokenexpiry/:tokenexpiryid" component={ViewTokenExpiryProfile} />
                                <Route path="/agentprofiles/:agentid/branches/:agentbranchId/editallowedproducts/:allowedproductsid" component={EditAllowedProduct} />
                                <Route path="/agentprofiles/:agentid/branches/:agentbranchId/viewallowedproductlist/:allowedproductsid" component={ViewAllowedProduct} />
                                <Route path="/agentprofiles/:agentid/branches/:agentbranchId/createallowedproductlist" component={CreateAllowedProduct} />
                                <Route path="/agentprofiles/:agentid/branches/:agentbranchId" component={AgentBranchProfileView} />
                                <Route path="/agentprofiles/:agentid/branches" component={AgentBranchList} />
                                <Route path="/agentprofiles/createagent" component={AgentCreate} />
                                <Route path="/agentprofiles/list" component={AgentProfileList} />
                                <Route path="/agentprofiles/:id/editAgent" component={AgentEditProfile} />
                                <Route path='/agentprofiles/:agentid/settlementcurrencyview/:settlementcurrencyid' component={SettlementCurrencyTabView}/>
                                <Route path='/agentprofiles/:agentid/createsettlement' component={CreateSettlementCurrency}/>
                                <Route path='/agentprofiles/:agentid/editsettlement/:settlementcurrencyid' component={EditSettlementCurrency}/>
                                <Route path="/agentprofiles/:agentid" component={AgentProfileView} />
                                <Redirect from="/agentprofiles" to="/agentprofiles/list" />
                            </Switch>
                        </CommonLayout>
                    );
                }
            }} />
            <Route path="/:token" render={props=>{
                if(props.match.params.hasOwnProperty('token')){
                    sessionStorage.setItem("token", props.match.params.token+props.location.search);
                }
                else{
                    let token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3c2p2SW1fVHNqeHNGZlVrY0cwMmpMLXNvS2ZhUGMwWURPRnpLZnpMZTlzIn0.eyJqdGkiOiI1ODE4MmM4MC1jZDAxLTQ5YzQtOWJhYi0wOGRiZDg5NzNkZjAiLCJleHAiOjE1NTM5MzUxOTIsIm5iZiI6MCwiaWF0IjoxNTUzOTM0NTkyLCJpc3MiOiJodHRwOi8vc3NvLXJoLXNzby1hcHAuYXBwcy5vY3AudWFlZXhjaGFuZ2UuY29tL2F1dGgvcmVhbG1zL2RldiIsImF1ZCI6InVhbSIsInN1YiI6ImE3NGI2ODA2LTE0YTEtNGM5Ny1iMzIwLTQ2NjYyNDFjZTIwYyIsInR5cCI6IkJlYXJlciIsImF6cCI6InVhbSIsImF1dGhfdGltZSI6MCwic2Vzc2lvbl9zdGF0ZSI6IjYwY2E2ZTVmLWNhZGUtNDcyZS1iYTViLTc5M2IzYWYyMTE5MSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOltdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicmF0ZS1hZG1pbiIsIm15Z3JvdXAtMSIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsicmVhbG0tbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJ2aWV3LXJlYWxtIl19LCJyby11c2VyIjp7InJvbGVzIjpbInJvIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhbWx1c2VyMSJ9.P7expPQJWiV7PD1xZM1HGXWRGJsJx_KekCBg0h4vSOuXTl3fjiySafyjOP8jpmL1bKhOGyj5z47Ieq-II5HXLxuS0Ts1KDcQS1QBavdCp8I2BzcfganxLf2DFOL_PPATa2-yHmPCetIDf3bpBQTridbjsQkQCimlhP3JdtCqkwU8RrNV3EXkTGAylQ9TuX8ojZbJx0le5KY8jY2Ajxdumc8uz7ZASmOI4Bvvt7F8zX51ICES8Vj6CI99twZcFpq2RrQaeo_CfAh-G8U-ZuVFhIQuJqwi-TKXanuAD_hO7ZWaO0OipPWuCWn8BDfNYeQdkRsZsGikpElxwQlGGCNpxA?7";
                    sessionStorage.setItem('token',token);
                }
                // sessionStorage.setItem("token", props.match.params.token+props.location.search);
                if(AuthService.userDetails(sessionStorage.getItem('token')).valid){
                    return <Redirect to="/agentprofiles" />
                }
                // after testing uncomment below code and comment above if loop
                // if(AuthService.userDetails(props.match.params.token+props.location.search).valid){
                //     return <Redirect to="/agentprofiles" />
                // }
                else{
                    window.location.replace(config.PAAS_LOGIN_URL)
                    return (<h1>401 - Unauthorized Request</h1>)
                }
            }}/>
            {/* unnecessary code */}
            <Route path="/" render={props=>{
                if(props.match.params.hasOwnProperty('token')){
                    sessionStorage.setItem("token", props.match.params.token+props.location.search);
                }
                else{
                    let token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3c2p2SW1fVHNqeHNGZlVrY0cwMmpMLXNvS2ZhUGMwWURPRnpLZnpMZTlzIn0.eyJqdGkiOiI1ODE4MmM4MC1jZDAxLTQ5YzQtOWJhYi0wOGRiZDg5NzNkZjAiLCJleHAiOjE1NTM5MzUxOTIsIm5iZiI6MCwiaWF0IjoxNTUzOTM0NTkyLCJpc3MiOiJodHRwOi8vc3NvLXJoLXNzby1hcHAuYXBwcy5vY3AudWFlZXhjaGFuZ2UuY29tL2F1dGgvcmVhbG1zL2RldiIsImF1ZCI6InVhbSIsInN1YiI6ImE3NGI2ODA2LTE0YTEtNGM5Ny1iMzIwLTQ2NjYyNDFjZTIwYyIsInR5cCI6IkJlYXJlciIsImF6cCI6InVhbSIsImF1dGhfdGltZSI6MCwic2Vzc2lvbl9zdGF0ZSI6IjYwY2E2ZTVmLWNhZGUtNDcyZS1iYTViLTc5M2IzYWYyMTE5MSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOltdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicmF0ZS1hZG1pbiIsIm15Z3JvdXAtMSIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsicmVhbG0tbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJ2aWV3LXJlYWxtIl19LCJyby11c2VyIjp7InJvbGVzIjpbInJvIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhbWx1c2VyMSJ9.P7expPQJWiV7PD1xZM1HGXWRGJsJx_KekCBg0h4vSOuXTl3fjiySafyjOP8jpmL1bKhOGyj5z47Ieq-II5HXLxuS0Ts1KDcQS1QBavdCp8I2BzcfganxLf2DFOL_PPATa2-yHmPCetIDf3bpBQTridbjsQkQCimlhP3JdtCqkwU8RrNV3EXkTGAylQ9TuX8ojZbJx0le5KY8jY2Ajxdumc8uz7ZASmOI4Bvvt7F8zX51ICES8Vj6CI99twZcFpq2RrQaeo_CfAh-G8U-ZuVFhIQuJqwi-TKXanuAD_hO7ZWaO0OipPWuCWn8BDfNYeQdkRsZsGikpElxwQlGGCNpxA?7";
                    sessionStorage.setItem('token',token);
                }
                // sessionStorage.setItem("token", props.match.params.token+props.location.search);
                if(AuthService.userDetails(sessionStorage.getItem('token')).valid){
                    return <Redirect to="/agentprofiles" />
                }
                else{
                    window.location.replace(config.PAAS_LOGIN_URL)
                    return (<h1>401 - Unauthorized Request</h1>)
                }
            }}/>
        </Switch>
    </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();