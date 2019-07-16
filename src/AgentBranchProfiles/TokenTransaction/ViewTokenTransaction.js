import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import '../../vendor/common.css';
import '../../theme/theme';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
      flexGrow: 1,       
    },
    indicator: {
      backgroundColor: 'white',
      height:`4px`
    },
    appbar:{
      boxShadow:'none'
    },
    title: {
        fontSize: 14,
        fontFamily: 'Gotham-Rounded'
    },
    tabs:{
        backgroundColor:'#19ace3',
        color:'#fff'
    },
    testColor:{
        color:'blue !important'
    }
});

function TabContainer(props) {
    return (
    <Typography component="div">
        {props.children}
    </Typography>
    );
}

class TokenExpiryProfileDetails extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        };
    }

    componentDidMount(){
       console.log(this.props); 
    }

    render() {
        const { classes } = this.props;
        return (
            <TabContainer>
                <div className={classes.root} style={{ padding: 8 * 3, border:`transparent` }}>
                    <Grid container spacing={24} className='global-font'>
                        <Grid item xs={12} className='grid-no-bottom-padding'>
                            <p><b>Token/Transaction Expiry</b></p>
                        </Grid>
                        <Grid item xs={4} className='grid-no-top-padding'>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Service Provider Code
                            </Typography>
                            <span className="drawee-profile-view" >            
                                {this.props.tokenExpiryProfile['serviceProviderCode']}
                            </span>
                        </Grid>
                    </Grid>
                    <Grid container spacing={24} className='global-font'>
                        <Grid item xs={12} className='grid-no-bottom-padding'>
                            <p><b>Product</b></p>
                        </Grid>
                        <Grid item xs={4} className='grid-no-top-padding'>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Product Type
                            </Typography>
                            <span className="drawee-profile-view" >            
                                {this.props.tokenExpiryProfile['productType']}
                            </span>
                        </Grid>
                        <Grid item xs={4} className='grid-no-top-padding'>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Sub Product Type
                            </Typography>
                            <span className="drawee-profile-view" >            
                            {this.props.tokenExpiryProfile['subProductType']}
                            </span>
                        </Grid>
                        <Grid item xs={4} className='grid-no-top-padding'>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Service Type
                            </Typography>
                            <span className="drawee-profile-view" >            
                            {this.props.tokenExpiryProfile['serviceType']}
                            </span>
                        </Grid>
                    </Grid>
                    <Grid container spacing={24} className='global-font'>
                        <Grid item xs={12} className='grid-no-bottom-padding'>
                            <p><b>Transaction Type</b></p>
                        </Grid>
                        <Grid item xs={4} className='grid-content-top-padding'>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Transaction Type
                            </Typography>
                            <span className="drawee-profile-view" >  
                            {this.props.tokenExpiryProfile['transactionType']}
                            </span>
                        </Grid>
                    </Grid>
                    <Grid container spacing={24} className='global-font'>
                        <Grid item xs={12} className='grid-no-bottom-padding'>
                            <p><b>Set Expiry Time For</b></p>
                        </Grid>
                        <Grid item xs={4} className='grid-content-top-padding'>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Set Expiry Time For
                            </Typography>
                            <span className="drawee-profile-view" >            
                            {this.props.tokenExpiryProfile['tokenOrTransactionType']}
                            </span>
                        </Grid>
                    </Grid>
                    <Grid container spacing={24} className='global-font'>
                        <Grid item xs={12} className='grid-no-bottom-padding'>
                            <p><b>Transaction Status</b></p>
                        </Grid>
                        <Grid item xs={4} className='grid-content-top-padding'>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Transaction Status
                            </Typography>
                            <span className="drawee-profile-view" >            
                            {this.props.tokenExpiryProfile['transactionStatus'] == null ? '---' : this.props.tokenExpiryProfile['transactionStatus']}
                            </span>
                        </Grid>
                        <Grid item xs={4} className='grid-content-top-padding'>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Token/Transaction Time
                            </Typography>
                            <span className="drawee-profile-view" >            
                            {this.props.tokenExpiryProfile['time']}
                            </span>
                        </Grid>
                    </Grid>
                </div>
            </TabContainer>
        );
      }
}

TokenExpiryProfileDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(TokenExpiryProfileDetails);