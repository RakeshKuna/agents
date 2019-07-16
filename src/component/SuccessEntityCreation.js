import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

function getModalStyle() {
    return {
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
      borderRadius: "16px"
    };
}

const styles = theme => ({
    paper: {
      position: 'absolute',
      width: 628,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      outline: 'none',
    },
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
});

class RoutingModal extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        open: false,
      };
      this.handleClose = this.handleClose.bind(this);
      this.handleOpen = this.handleOpen.bind(this);
    }
    
    componentDidMount(){
      if(this.props.isOpenOne){
        this.handleOpen();
      }
    }

    handleOpen = () => {
      this.setState({ open: true });
    };

    handleClose = () => {
      this.setState({ open: false });
    };

    handleData = (data) => {
      this.setState({open: data},()=>{
        this.props.modalActionOne(data,this.props.fromActionOne);
      })
    }
  
    render() {
      const { classes } = this.props;
  
      return (
        <div>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <div style={getModalStyle()} className={classes.paper}>
              <h4 className="global-font">{this.props.mainheading}</h4>
               <p className="file-content global-font">{this.props.messageone}</p>
               <p className="file-content global-font">{this.props.messagetwo}</p>
              <Grid container spacing={24} direction="row" justify="flex-end" alignItems="flex-end">
            <Grid item xs={4}>
              <Grid container spacing={24} direction="row" justify="flex-end" alignItems="flex-end">
              <Button 
                 style={{color:null,fontSize:18}}
                onClick={() => this.handleData(false)}>
                  No
                </Button> 
                <Button 
                 style={{color: '#19ace3',fontSize:18}}
                onClick={() => this.handleData(true)}>
                  {this.props.actionTypeOne}
                </Button>     
              </Grid>
            </Grid>
          </Grid>

              <RoutingModalWrapped />
            </div>
          </Modal>
        </div>
      );
    }
  }
  
  RoutingModal.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  // We need an intermediary variable for handling the recursive nesting.
  const RoutingModalWrapped = withStyles(styles)(RoutingModal);
  
  export default RoutingModalWrapped;