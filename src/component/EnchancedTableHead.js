import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {MuiThemeProvider} from '@material-ui/core/styles';
import getMuiTheme from "../theme/theme";

class EnhancedTableHead extends React.Component {
    render(){
        return(            
            <MuiThemeProvider theme={getMuiTheme}>
                <TableHead>
                    <TableRow>
                        {this.props.rows.map((row,index)=>{
                            return(
                                <TableCell style={{paddingLeft:(index === 0) ? '40px' : null,fontWeight:"900" }} key={row.id}>
                                    {row.label}
                                </TableCell>
                            )   
                        },this)}
                    </TableRow>
                </TableHead>        
             </MuiThemeProvider>       
        )
    }
}
export default EnhancedTableHead;