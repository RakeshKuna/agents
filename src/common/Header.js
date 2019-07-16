import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import unimoniLogoU from '../images/unimoni-logoU.png';
import unimoniLogo from '../images/unimoni-logo.png';
import Dashboard from '@material-ui/icons/Dashboard';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Input from '@material-ui/icons/Input';
import { MuiThemeProvider } from '@material-ui/core/styles';
import getMuiTheme from "../theme/theme";
import Tooltip from '@material-ui/core/Tooltip';
import * as config from './../config/config';
import * as AuthService from './../AuthService/AuthService';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
       flexBasis:3
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  gridOpen:{
   flexBasis:0,
   marginLeft: '2%',
   marginTop: 0
  },
  gridClose:{
    flexBasis:'3%'
  },
  avataropen: {
    width:190, 
    height: 'auto',
    borderRadius: 0,
    marginLeft:'1%'
  },
  avatarclose: {
    width: 50,
    height: 50,
    borderRadius: '0'
  },
});

class PrimaryAppBar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
           open:true,
            anchorEl: null,
            mobileMoreAnchorEl: null,
            uName:''
          };
    }

  componentDidMount(){
    console.log(AuthService.userDetails(sessionStorage.getItem('token')));
    let uName = (AuthService.userDetails(sessionStorage.getItem('token')).decoded.hasOwnProperty('given_name') && AuthService.userDetails(sessionStorage.getItem('token')).decoded.hasOwnProperty('family_name')) ? AuthService.userDetails(sessionStorage.getItem('token')).decoded.given_name + ' ' + AuthService.userDetails(sessionStorage.getItem('token')).decoded.family_name : AuthService.userDetails(sessionStorage.getItem('token')).decoded.preferred_username;
    this.setState({uName})
  }
  
  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };
  handleDrawer = () => {
    this.setState(prevState=>({ open: !prevState.open }),()=>this.props.sbar(this.state.open));
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl,open } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <MuiThemeProvider theme={getMuiTheme}>

      <div className={classes.root }>
       <Grid container spacing={24}>
        <Grid item xs={12}>          
        <AppBar position="fixed">

          <Toolbar>
          <Grid item xs={open?3:1} className={open?classes.gridOpen:classes.gridClose}>
          <Avatar alt="Unimoni" src={open?unimoniLogo:unimoniLogoU}  className={open?classes.avataropen:classes.avatarclose}/>
          </Grid>         
          <Grid item xs={open?2:1} style={open? { paddingLeft: '3.5%'}:{paddingLeft: '1%'}}>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer"  onClick={this.handleDrawer.bind(this)}>
            <MenuIcon className={classes.menuIconCss} />
          </IconButton>                     
          </Grid>        
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>

            <a href={config.PAAS_DASHBOARD_URL}>
            <Tooltip title="Dashboard" placement="bottom">
              <IconButton color="inherit">
                  <Dashboard />
              </IconButton>
              </Tooltip>
              </a>

              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                // onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <p className="profile-name">{this.state.uName}</p>
              {/* <a href="http://paas-home-ui.dev.apps.ocp.uaeexchange.com">
                <Tooltip title="Logout" placement="bottom">
                  <IconButton color="inherit">
                      <Input />
                  </IconButton>
                </Tooltip>
              </a> */}
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        </Grid>
        </Grid>
        {renderMenu}
        {renderMobileMenu}
      </div>
      </MuiThemeProvider>
    );
  }
}

PrimaryAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrimaryAppBar);