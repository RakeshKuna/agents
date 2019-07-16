import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

class EnchancedTabContainer extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return(                    
            <Typography component="div" style={{ padding: 8 * 3 }}>
                {this.props.children}
            </Typography>                                                  
        )
    }
}  

EnchancedTabContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default EnchancedTabContainer;