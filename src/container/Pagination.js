import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActionsWrapped from './TablePaginationActionsWrapped';


const styles = theme => ({
  /* Styles applied to the Select component `root` class. */
  selectRoot: {
     marginRight: 32,
     marginLeft: 8,
  },
  select: {
    display:'none',
    paddingLeft: 8,
    paddingRight: 16,
  },
  /* Styles applied to the caption Typography components if `variant="caption"`. */
  caption: {
    flexShrink: 0,
    display:'none',
  },
  /* Styles applied to the Toolbar component. */
  toolbar: {
    display:'none',
    height: 56,
    minHeight: 56,
    paddingRight: 2,
  },
});

class Pagination extends React.Component{

  constructor(props)
  {
    super(props)
    this.state={
      page:0
    }
  }

  componentDidMount(){
  
  }

  handleChangePage(e,pgno){
    console.log(pgno);
    // if(sessionStorage.getItem("PageNumber"))
    // {
    //   this.setState({page:JSON.parse(sessionStorage.getItem('PageNumber'))},()=>this.props.handlePagingListing(this.state.page));    
    // }
    this.props.handlePagingListing(pgno)
  }

    render(){
      let page=JSON.parse(sessionStorage.getItem('PageNumber'))
      return(
        <TablePagination        
          component="div"
          count={this.props.totalNumberOfRows}
          rowsPerPage={this.props.rowsPerPage}
          rowsPerPageOptions={[2]} 
          page={this.props.page}//this.props.page
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage.bind(this)}
          ActionsComponent={TablePaginationActionsWrapped}          
        />
      )
    }
}
export default withStyles(styles)(Pagination);