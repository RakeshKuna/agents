import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const actionsStyles = theme => ({
    root: {
      flexShrink: 0,
      color: theme.palette.text.secondary,
      marginLeft: theme.spacing.unit * 2.5,
    },
  });
  
  class TablePaginationActionsWrapped extends React.Component {
    handleFirstPageButtonClick = event => {
      // sessionStorage.setItem("PageNumber",0) ; 
      // let Tpgno1=JSON.parse(sessionStorage.getItem("PageNumber"));
      let Tpgno1 = 0;       
      this.props.onChangePage(event, Tpgno1);
    };
  
    handleBackButtonClick = (event) => { 
      var Tpgno=this.props.page;   
      //sessionStorage.setItem("PageNumber",Tpgno - 1) ; 
      let Tpgno1=this.props.page-1;        
      this.props.onChangePage(event, Tpgno1);
    };
  
    handleNextButtonClick = (event)=> { 
      var Tpgno=this.props.page;   
      //sessionStorage.setItem("PageNumber",Tpgno + 1) ; 
      let Tpgno1=this.props.page+1;          
      this.props.onChangePage(event, Tpgno1);
    };
  
    handleLastPageButtonClick = event => {
      var pgLast=Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage)-1);
      //sessionStorage.setItem("PageNumber",pgLast ) ; 
      let Tpgno1=this.props.page;
      this.props.onChangePage(event,pgLast);
    };
  
    render() {
      const { classes, count, page, rowsPerPage, theme } = this.props;
      return (
        <div className={classes.root}>
          <IconButton
            onClick={this.handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="First Page"
          >
            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
          </IconButton>
          <IconButton
            onClick={this.handleBackButtonClick}
            disabled={page === 0}
            aria-label="Previous Page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </IconButton>
          <IconButton
            onClick={this.handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="Next Page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </IconButton>
          <IconButton
            onClick={this.handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="Last Page"
          >
            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
          </IconButton>
        </div>
      );
    }
  }
  
  TablePaginationActionsWrapped.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
  };
  
  export default withStyles(actionsStyles, { withTheme: true })(TablePaginationActionsWrapped);