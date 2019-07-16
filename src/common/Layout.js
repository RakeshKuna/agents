import React, { Component } from 'react';
import PrimaryAppBar from '../common/Header';
import PersistentDrawerLeft from '../common/Sidebar';
import { withRouter } from 'react-router-dom';
import { MuiThemeProvider,createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { HashRouter, Redirect } from 'react-router-dom';
import { BrowserRouter as Router, IndexRoute, Route, Switch } from 'react-router-dom';
import AgentProfileList from '../AgentProfiles/AgentProfileList';
import AgentProfileView from '../AgentProfiles/EnchancedTabs';
import AgentCreate from '../AgentProfiles/EnhancedTabsCreate';
import AgentEditProfile from '../AgentProfiles/EnhancedTabsEdit';
import AgentBranchList from '../AgentBranchProfiles/AgentBranchProfilesList';
import AgentBranchProfileView from '../AgentBranchProfiles/EnhancedTabProfileView';
import EnhancedTabsProfileCreate from '../AgentBranchProfiles/EnhancedTabsProfileCreate';
import EnhancedTabsProfileEdit from '../AgentBranchProfiles/EnhancedTabsProfileEdit';
import CreateTokenTransactionExpiry from '../AgentBranchProfiles/TokenTransaction/CreateTokenTransaction'
import EditTokenTransactionExpiry from '../AgentBranchProfiles/TokenTransaction/EditTokenTransaction';
import ViewTokenExpiryProfile from '../AgentBranchProfiles/TokenTransaction/EnhancedTabsProfileView';
import CreateAllowedProduct from '../AgentBranchProfiles/AllowedProducts/CreateAllowedProducts';
import ViewAllowedProduct from '../AgentBranchProfiles/AllowedProducts/EnhancedTabsViewAllowedProducts';
import EditAllowedProduct from '../AgentBranchProfiles/AllowedProducts/EditAllowedProducts';
import CreateSettlementCurrency from '../AgentProfiles/SettlementCurrency/CreateSettlementCurrency';
import EditSettlementCurrency from '../AgentProfiles/SettlementCurrency/EditSettlementCurrency';
import SettlementCurrencyTabView from '../AgentProfiles/SettlementCurrency/SettlementCurrencyTabView';
import CreateChargeRules from '../AgentBranchProfiles/ChargesRule/CreateChargeRules';
import EditChargeRules from '../AgentBranchProfiles/ChargesRule/EditChargeRules';
import ViewChargeRules from '../AgentBranchProfiles/ChargesRule/EnhancedTabsViewChargeRules';
import CreateChargePreference from'../AgentBranchProfiles/ChargeRatePreferences/CreateChargePerferences';
import ViewRateChargePrefernce from '../AgentBranchProfiles/ChargeRatePreferences/EnchancedTabsViewRateChargePreferences';
import EditRateChargePrefernce from '../AgentBranchProfiles/ChargeRatePreferences/EditRateChargePreference';

const drawerWidth = 240;

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    button: {
        margin: theme.spacing.unit,
      },
    content: {
        flexGrow: 1,
        padding: "15px 24px",
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 73,
      },
    contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 270,
      },
  });

  const LayoutTheme = createMuiTheme({
    palette: {
      primary: {
        main: '#fff', 
        light:'#16ace3'     
      },
      secondary: {      
        main: '#19ace3',     
        contrastText: '#fff',
      },
      error: {
         main:'#0044ff',      
      },
    },
    CommonLayout:{
      content:{
        marginTop:60
      }
    }
  });

class CommonLayout extends Component {
  constructor(props){
    super(props)
    this.state = {
        open:true        
    }
  }

  componentDidMount(){
    console.log(this.props);
  }

  sbar(val){
    this.setState({open:val})
  }

  render() {    
    const { open } = this.state;
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={LayoutTheme}>
          <div className="App">
            <PrimaryAppBar {...this.state}  sbar={this.sbar.bind(this)}/>         
            <PersistentDrawerLeft {...this.state} {...this.props}/> 
            <main
              className={classNames(classes.content,'main-content', {
              [classes.contentShift]: open,
              })}
              >              
               {this.props.children}          
            </main>
          </div>
      </MuiThemeProvider>
    );
  }
}

CommonLayout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommonLayout);