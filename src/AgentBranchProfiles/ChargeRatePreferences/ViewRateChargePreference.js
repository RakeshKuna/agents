import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import EnchancedTabContainer from './../../container/TabContainer';
import * as config from '../../config/config';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        fontSize: 14,
        fontFamily: 'Gotham-Rounded'
    },
    headingtitle:{
        fontFamily: 'Gotham-Rounded'
    },
    rulestop: {
        marginTop: 50
    },

});


class ViewRateChargePreference extends React.Component {

    constructor(props) {
        super(props)
        console.log(this.props.rateChargePrefernce);
    }

    render() {
        const { classes } = this.props;
        return (
            <EnchancedTabContainer >
                <div className={classes.root}>
                    <Grid container spacing={24}>
                        <Grid item xs={12} className='grid-no-bottom-padding'>
                            <p className={classes.headingtitle}><b>Service Provider </b></p>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Service Provider Code
                                </Typography>
                            <span className="drawee-profile-view" >
                                {this.props.rateChargePrefernce.serviceProviderCode}
                            </span>
                        </Grid> 
                        <Grid item xs={12} className='grid-no-bottom-padding'>
                            <p className={classes.headingtitle}><b>Product</b></p>
                        </Grid>
                        
                        <Grid item xs={4}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Product Type
                                </Typography>
                            <span className="drawee-profile-view" >
                                {this.props.rateChargePrefernce.productType}
                            </span>
                        </Grid> 
                        <Grid item xs={4}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Sub Product Type
                                </Typography>
                            <span className="drawee-profile-view" >
                                {this.props.rateChargePrefernce.subProductType}
                            </span>
                        </Grid> 
                        <Grid item xs={4}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Service Type
                                </Typography>
                            <span className="drawee-profile-view" >
                                {this.props.rateChargePrefernce.serviceType}
                            </span>
                        </Grid> 
                        <Grid item xs={12} className='grid-no-bottom-padding'>
                            <p className={classes.headingtitle}><b>Rate/Charge</b></p>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Rate/Charge
                                </Typography>
                            <span className="drawee-profile-view" >
                                {this.props.rateChargePrefernce.rateCharge}
                            </span>
                        </Grid> 
                        
                        <Grid item xs={12} className='grid-no-bottom-padding'>
                            <p className={classes.headingtitle}><b>Preference</b></p>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Preference
                                </Typography>
                            <span className="drawee-profile-view" >
                                {this.props.rateChargePrefernce.preference}
                            </span>
                        </Grid> 

                        <Grid item xs={12} className='grid-no-bottom-padding'>
                            <p className={classes.headingtitle}><b>Status</b></p>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Status
                                </Typography>
                            <span className="drawee-profile-view" >
                                {this.props.rateChargePrefernce.status}
                            </span>
                        </Grid> 

                        
                    </Grid>
                </div>
            </EnchancedTabContainer>


        )
    }
}
export default withStyles(styles)(ViewRateChargePreference);
