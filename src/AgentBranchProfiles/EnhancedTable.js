import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EnhancedTableHead from '../component/EnchancedTableHead';
import { Badges,Button, TextButton, OutLineButton, FloatButton, IconButton } from 'finablr-ui';
import { withRouter } from 'react-router';
import ToggleMenu from '../container/ToggleMenu';
import Edit from '@material-ui/icons/Edit';
import * as config from './../config/config';
import Tooltip from '@material-ui/core/Tooltip';


const drawerWidth = 240;
const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        padding: '0',
        //   marginTop:20,
        boxShadow: 'none',
    },
    table: {
        minWidth: 700,
    },
    button: {
        margin: theme.spacing.unit,
        width: '70%',
        boxShadow: 'none',
        textTransform: 'capitalize',
        marginLeft: 0
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

class EnhancedTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    handleDetailView = (e, id) => {
        console.log(this.props);
        let tabId = 0;
        e.stopPropagation();
        this.props.history.push( `/agentprofiles/${this.props.props.match.params.agentid}/branches/${id}?tabId=${tabId}`)
    }

    handleEdit = (e, index, id) => {
        console.log(index, id);
        e.stopPropagation();
        this.props.history.push({
            pathname: `/agentprofiles/${this.props.props.match.params.agentid}/branches/${id}/edit`
        })
    }

    render() {
        const { classes, theme1 } = this.props;
        return (
            <Paper className={classes.root}>
                <div>
                    <Table className='global-font' style={{ whiteSpace: `nowrap` }}>
                        <EnhancedTableHead rows={this.props.rowsHdr} />
                        <TableBody>
                            {this.props.bankList && this.props.bankList['data'] && this.props.bankList['data'].map((row, index) => {
                                return (
                                    <TableRow key={row.id}
                                        hover
                                        className="table-row"
                                        onClick={(e) => this.handleDetailView(e, row.id)}
                                    >
                                        <TableCell style={{ paddingLeft: 40 }}>{row.branchDisplayName}</TableCell>
                                        <TableCell>{row.branchName}</TableCell>
                                        <TableCell>{row.city}</TableCell>
                                        <TableCell>{row.country}</TableCell>
                                        <TableCell>
                                            <Badges type="labelBadge" umClass={(row.status == 'ENABLED' ? 'table-button-enabled' : 'table-button-disabled')} value={row.status}></Badges>
                                        </TableCell>
                                        <TableCell>
                                           <Tooltip title="Edit" placement="bottom">
                                            <Edit className="edit-button" onClick={(e) => this.handleEdit(e, index, row.id)} />
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