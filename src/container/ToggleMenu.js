import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
  menuList:{
    zIndex:1
  }
});

class MenuListComposition extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
    };
  }

  componentDidMount(){
    //console.log(this.props);
  }

  handleToggle = () => {
    this.setState({ open: !this.state.open },()=>{
      // this.props.isToggleOpen(this.state.open,this.props.tableIndex);
    });
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  };

  handleClickMenu = (field,index) => {
    this.props.handleToggleAction(field,index);
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <div>
          {/* <Button
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}
          >
            <MoreVertIcon />
          </Button> */}
          <IconButton
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}
          >
            <MoreVertIcon />
          </IconButton>
          <Popper style={{zIndex:1}} open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ zIndex:1,transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList className={classes.menuList}>
                      {
                        this.props.menuArray.map((obj)=>{
                          return (
                            <MenuItem value={obj.field} onClick={(e) => this.handleClickMenu(obj.field,this.props.tableIndex)}>{obj.label}</MenuItem>
                          )
                        })
                      }
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    );
  }
}

MenuListComposition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuListComposition);