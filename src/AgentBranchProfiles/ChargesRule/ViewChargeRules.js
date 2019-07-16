import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import EnchancedTabContainer from './../../container/TabContainer';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        fontSize: 14,
        fontFamily: 'Gotham-Rounded'
    },
    headingtitle: {
        fontFamily: 'Gotham-Rounded'
    },
    rulestop: {
        marginTop: 50
    },
});

class ViewChargeRules extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props.allowedProductsProfile);
    }
    render() {
        const { classes } = this.props;
        return (
            <EnchancedTabContainer >
                <div className={classes.root}>
                    <Grid container spacing={24}>
                        <Grid item xs={12} className='grid-no-bottom-padding'>
                            <p className={classes.headingtitle}><b>Charges Rule</b></p>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Product Type
                                </Typography>
                            <span className="drawee-profile-view" >
                                {this.props.chargeRulesProfile.productType}
                            </span>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Sub Product Type
                                </Typography>
                            <span className="drawee-profile-view" >
                                {this.props.chargeRulesProfile.subProductType}
                            </span>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Service Type
                                </Typography>
                            <span className="drawee-profile-view" >
                                {this.props.chargeRulesProfile.serviceType}
                            </span>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Reason Code
                                </Typography>
                            <span className="drawee-profile-view" >
                                {this.props.chargeRulesProfile.reasonCode}
                            </span>
                        </Grid>
                        <Grid item xs={12} className='grid-no-bottom-padding'>
                            <p className={classes.headingtitle}><b>Selected</b></p>
                        </Grid>
                        {this.props.chargeRulesProfile.chargesRuleSettings.otherCharges ?
                            <Grid item xs={4}>
                                <span className="drawee-profile-view" className={classes.headingtitle} >
                                    Other Charges
                            </span>
                            </Grid> : ''}
                        {this.props.chargeRulesProfile.chargesRuleSettings.commission ?
                            <Grid item xs={4}>
                                <span className="drawee-profile-view" >
                                    Commission
                            </span>
                            </Grid> : ''}
                        {this.props.chargeRulesProfile.chargesRuleSettings.tax ?
                            <Grid item xs={4}>
                                <span className="drawee-profile-view"  >
                                    Tax
                            </span>
                            </Grid> : ''}

                        {this.props.chargeRulesProfile.chargesRuleSettings.cardCharges ?
                            <Grid item xs={4}>
                                <span className="drawee-profile-view" >
                                    Card Charges
                            </span>
                            </Grid> : ''}
                        {this.props.chargeRulesProfile.chargesRuleSettings.additionalCharges ?
                            <Grid item xs={4}>
                                <span className="drawee-profile-view" >
                                    Additional Charges
                            </span>
                            </Grid> : ''}
                        <Grid item xs={12} className='grid-no-bottom-padding'>
                            <p className={classes.headingtitle}><b>Status</b></p>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Status
                                </Typography>
                            <span className="drawee-profile-view" >
                                {this.props.chargeRulesProfile.status}
                            </span>
                        </Grid>
                    </Grid>
                </div>
            </EnchancedTabContainer>
        );
    }
}

export default withStyles(styles)(ViewChargeRules);