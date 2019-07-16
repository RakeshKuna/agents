import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

class PositionedSnackbar extends React.Component {
  state = {
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
  };

  componentDidMount(){
    if(this.props.isOpen){
        this.setState({open:true});
    }
  }

  handleClick = state => () => {
    this.setState({ open: true, ...state });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { vertical, horizontal, open } = this.state;
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          autoHideDuration={3000}
          message={<span className="global-font" id="message-id">{this.props.message}</span>}
        />
      </div>
    );
  }
}

export default PositionedSnackbar;