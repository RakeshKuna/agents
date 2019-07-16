import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBalance from '@material-ui/icons/AccountBalance';
import {Link} from 'react-router-dom';
import { fontSize } from '@material-ui/system';
import getMuiTheme from "../theme/theme";
import {MuiThemeProvider} from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Contacts from '@material-ui/icons/Contacts';
import Tooltip from "@material-ui/core/Tooltip";

//import '../vendor/layout.css';
const drawerWidth = 270;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  icon: {
    color: `white`
  },
  textcolor:{
    color:`${getMuiTheme.palette.primary.light} !important`
  },
  selected: {
      backgroundColor: `#19ace3 !important`,
      color: `${getMuiTheme.palette.primary.light} !important`,
      fontWeight: 600
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    top:64,
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor:getMuiTheme.palette.primary.main,
  },
  drawerClose: {
    top:64,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      // width: theme.spacing.unit * 9 + 1,
      width: 56
    },
    backgroundColor:getMuiTheme.palette.primary.main,
    
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  listItemText:{
    fontSize:'.8em',
    color:getMuiTheme.palette.primary.links,
  }
});

const sidebarLinks = [
  {
    link:'/agentprofiles',
    text:'Agent Profiles',
    icon:'Contacts',
  }
]
 
class PersistentDrawerLeft extends React.Component { 
  constructor(props){
    super(props);
    this.state={
      selectedIndex: 0,
    }
  }

  componentDidMount(){
    if(sessionStorage.getItem('selectedIndexs'))
    {this.setState({ selectedIndex: JSON.parse(sessionStorage.getItem('selectedIndexs'))});}
  }

  handleListItemClick = (event, index) => {
    sessionStorage.setItem("selectedIndexs",index)
    let emptydatasearch = '';
    sessionStorage.setItem('bankquery',JSON.stringify(emptydatasearch));
    sessionStorage.setItem('draweebankquery',JSON.stringify(emptydatasearch));
    sessionStorage.setItem('branchquery',JSON.stringify(emptydatasearch));
    sessionStorage.setItem('individualbankbranchquery',JSON.stringify(emptydatasearch));
    sessionStorage.setItem('draweebankbranchquery',JSON.stringify(emptydatasearch));
    sessionStorage.setItem('draweebanksFilter',JSON.stringify(emptydatasearch));
    sessionStorage.setItem('nationalityrestrictionquery',JSON.stringify(emptydatasearch));
    sessionStorage.setItem('nationalitybanksFilter',JSON.stringify(emptydatasearch));
    sessionStorage.setItem('nationalityrestrictionsRows',JSON.stringify(5));
    
    this.setState({ selectedIndex: index });
    sessionStorage.setItem("PageNumber",0)
  };

  renderIcon = (icon) =>{
    switch(icon) {
      case ('Contacts'):
        return <Contacts />;
      break;
    }
  }


  render() {
    const { classes, theme } = this.props;
    const { open } = this.props;

    return (
      <MuiThemeProvider theme={getMuiTheme}>

      <div className={classes.root}>
        <CssBaseline />        
        <Drawer
          variant="permanent"
          
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: open, 
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          open={open}
        >         
          <Divider />
          <List>
            {sidebarLinks.map((obj, index) => (
              <Link to={obj.link} style={{ textDecoration: 'none' }}><ListItem button key={index}
              selected={this.state.selectedIndex === index}
              onClick={event => this.handleListItemClick(event, index)}
              primary={obj.text}  
              classes={{ selected: classes.selected }}
              >
                <Tooltip title={obj.text} placement="bottom">
                <ListItemIcon className={classes.icon} >
                  {this.renderIcon(obj.icon)}
                </ListItemIcon>
                </Tooltip>
                <ListItemText   disableTypography
                  primary={<Typography type="body2" style={{ color: '#FFFFFF',fontFamily:'Gotham-Rounded' }}>{obj.text}</Typography>}
                  classes={{primary:classes.listItemText}}/>
              </ListItem><Divider /></Link>
            ))}
          </List>
        </Drawer>
      </div>
      </MuiThemeProvider>
    );
  }
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);