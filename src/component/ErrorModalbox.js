import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
      width: theme.spacing.unit * 75,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      outline: 'none',
    },
    button: {
      margin: theme.spacing.unit,
      color:"#19ace3",
      fontWeight:"bold"
    },
    input: {
      display: 'none',
    },
});
class SimpleModal extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        open: false,
      };
      this.handleClose = this.handleClose.bind(this);
      this.handleOpen = this.handleOpen.bind(this);
    }
    
    componentDidMount(){
      if(this.props.isOpen){
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
        this.props.modalAction(data);
      })
    }
  
    render() {
      const { classes } = this.props;
  
      return (
        <div className="global-font">
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <div style={getModalStyle()} className={classes.paper}>
              <h4 className="modal-content global-font">{this.props.message}</h4>
              <Grid container spacing={24} justify="flex-end">              
              <Grid item xs={2}>  
                <Button className={classes.button} onClick={() => this.handleData(true)}>
                  {this.props.actionType}
                </Button>       
              </Grid>
              </Grid>
              <SimpleModalWrapped />
            </div>
          </Modal>
        </div>
      );
    }
  }
  
  SimpleModal.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  // We need an intermediary variable for handling the recursive nesting.
  const SimpleModalWrapped = withStyles(styles)(SimpleModal);
  
  export default SimpleModalWrapped;