import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EnhancedTableHead from '../component/EnchancedTableHead';
import { withRouter } from 'react-router';
import ToggleMenu from '../container/ToggleMenu';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Badges, Button,TextButton,OutLineButton,FloatButton,IconButton } from 'finablr-ui';
import * as config from './../config/config';


const drawerWidth = 240;
const styles = theme => ({
    root: {
      width: '100%',
      overflowX: 'auto',
      padding:'0',
      boxShadow:'none',
    //   marginTop:20,
    },
    table: {
      minWidth: 700,
    },
    button: {
        margin: theme.spacing.unit,
        width: '70%',
        boxShadow:'none',
        textTransform:'capitalize',
        marginLeft:0
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
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
        marginLeft: 240,
    },
});
 
class EnhancedTable extends React.Component{
    constructor(props){
        super(props)        
        this.state={            
        }
    }

    handleViewDetail(id,e){   
        let tabId = 0;
        e.stopPropagation();
        this.props.history.push(`/agentprofiles/${id}?tabId=${tabId}`)
    }

    handleToggleAction=(field,index)=>{
        this.props.handleToggleAction(field,index);
    }
  
    render(){

        const {classes,theme1}=this.props;
        return(
            <Paper className={classes.root}>
            <div>
                <Table className='global-font' style={{whiteSpace:`nowrap`}}>
                    <EnhancedTableHead rows={this.props.rowsHdr} />
                    <TableBody>
                        {this.props.bankList  && this.props.bankList ['data'] && this.props.bankList ['data'].map((row,index)=>{
                          return(
                            <TableRow key={row.id}
                            hover
                            onClick={(e) => this.handleViewDetail(row.id,e)}
                            >
                              <TableCell style={{paddingLeft:40}}>{row.code}</TableCell>
                              <TableCell>{row.name}</TableCell>    
                              <TableCell>{row.displayName?row.displayName:'--'}</TableCell>    
                              <TableCell>{row.businessMappingUnit?row.businessMappingUnit:'--'}</TableCell> 
                              <TableCell>{row.country}</TableCell>                                        
                              <TableCell>
                                <Badges type="labelBadge" umClass={(row.status == 'ENABLED' ? 'table-button-enabled' : 'table-button-disabled')} value={row.status}></Badges>
                              </TableCell>
                              <TableCell onClick={(e)=>{e.stopPropagation()}}>
                              <ToggleMenu menuArray={[{id:1,label:'Edit',field:'edit'},{id:2,label:'View Branches',field:'viewbranches'}]}   isOpen={row.isMenuOpen} tableIndex={index} handleToggleAction={this.handleToggleAction}/>
                            </TableCell>
                            </TableRow>
                          )                                  
                        })}                            
                    </TableBody>
                </Table>                    
            </div>
             </Paper>
            )
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(EnhancedTable));
