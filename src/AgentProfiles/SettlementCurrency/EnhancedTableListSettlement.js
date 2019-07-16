import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EnhancedTableHead from '../../component/EnchancedTableHead';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';
import Edit from '@material-ui/icons/Edit';
import { Badges } from 'finablr-ui';
import * as config from '../../config/config';
import Tooltip from '@material-ui/core/Tooltip';


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

    componentDidMount(){
       console.log(this.props)
    }

    handleViewDetail = (id,e) => {
        console.log(this.props);
        let tabId = 0;
        // e.stopPropagation();
        this.props.history.push(`/agentprofiles/${this.props.match.params.agentid}/settlementcurrencyview/${id}`)
    }

    handleEditBank(id,e){
        // e.stopPropagation();
        this.props.history.push(
            (`/agentprofiles/${this.props.match.params.agentid}/editsettlement/${id}`)
        )
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
                              <TableCell style={{paddingLeft:40}}>{row.serviceProviderCode}</TableCell>
                              <TableCell>{row.productType ? row.productType : '--'}</TableCell>    
                              <TableCell>{row.subProductType?row.subProductType:'--'}</TableCell>    
                              <TableCell>{row.serviceType?row.serviceType:'--'}</TableCell>    
                              <TableCell>{row.transactionType?row.transactionType:'--'}</TableCell>    
                              <TableCell>{row.payIncurrencyName?row.payIncurrencyName:'--'}</TableCell>    
                              <TableCell>{row.serviceProviderCurrencyName?row.serviceProviderCurrencyName:'--'}</TableCell>    
                              <TableCell>{row.settlementCurrencyName?row.settlementCurrencyName:'--'}</TableCell>    
                              <TableCell>{row.paasSettlementCurrencyName?row.paasSettlementCurrencyName:'--'}</TableCell>    
                              <TableCell>{row.countryName?row.countryName:'--'}</TableCell>    
                              <TableCell>{row.agentName?row.agentName:'--'}</TableCell>    
                              <TableCell>
                                  <Badges type="labelBadge" umClass={(row.status == 'ENABLED' ? 'table-button-enabled' : 'table-button-disabled')} value={row.status}></Badges>
                              </TableCell>
                              <TableCell onClick={(e)=>{e.stopPropagation()}}>
                              <Tooltip title="Edit" placement="bottom">
                              <Edit className="edit-button" onClick={(e)=>this.handleEditBank(row.id,e)}/>
                              </Tooltip>
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