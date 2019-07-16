import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import {MuiThemeProvider} from '@material-ui/core/styles';
import getMuiTheme from "../theme/theme";

    const styles = theme => ({
      root: {
        width: '100%',
      },
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        // backgroundColor: fade(theme.palette.common.white, 0.15),
        // '&:hover': {
        //   backgroundColor: fade(theme.palette.common.white, 0.25),
        // },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: 'auto',
        },
      },
      searchIcon: {
        width: theme.spacing.unit * 4,
        height: '100%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        // color: 'inherit',
        width: '100%',
        borderRadius:50,
        opacity:1,
      },
      inputInput: {
        paddingTop: "10px",
        paddingRight: theme.spacing.unit,
        paddingBottom: "10px",
        paddingLeft: theme.spacing.unit * 4,
        transition: theme.transitions.create('width'),
        width: '150%',
        [theme.breakpoints.up('md')]: {
        },
      },
    });
     
    class Search extends React.Component {
      constructor(props){
        super(props);
        this.state = {
          value:''
        };
      }

        
      handleSearchKeyUp = (e) =>{
        this.props.getSearchText(e,this.state.value);
      }

      handleSearchChange = (e) => {
        this.setState({value:e.target.value});
      }

      handleSearch = () =>{
        var event = {};
        event.keyCode = 13;
        this.props.getSearchText(event,this.state.value);
      }

      render() {
        const { classes } = this.props;
        return (
          <div>
            <MuiThemeProvider theme={getMuiTheme}>
              <div className="searchbar">
                <div className={classes.root}>
                  <AppBar position="static">
                    <div className={classes.search}>
                      <div className={classes.searchIcon}>
                      <IconButton className={classes.iconButton} aria-label="Search" onClick={this.handleSearch}>
                        <SearchIcon />
                      </IconButton>
                      </div>
                      <InputBase
                        placeholder="Search…"
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                        ref = {this.input}
                        value={this.props.value}
                        onKeyUp={this.handleSearchKeyUp}
                        onChange={(e) =>this.handleSearchChange(e)}
                      />
                    </div>
                  </AppBar>
                </div>
              </div>
            </MuiThemeProvider>
          </div>
        );
      }
    }
    
    Search.propTypes = {
      classes: PropTypes.object.isRequired,
    };
      
export default withStyles(styles)(Search);