import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import EnchancedTabContainer from '../../container/TabContainer';
import * as config from '../../config/config';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        fontSize: 14,
        fontFamily: 'Gotham-Rounded'
    },
    rulestop: {
        marginTop: 50
    },
});


class SettlementCurrencyProfileView extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log(this.props)
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <EnchancedTabContainer >
                    <div className={classes.root}>
                        <Grid container spacing={24}>
                            <Grid item xs={12} className='grid-no-bottom-padding'>
                                <p className="global-font"><b>Settlement Currency</b></p>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Service Provider
                        </Typography>
                                <span className="drawee-profile-view" >
                                    {this.props.settlementCurrencyProfile.serviceProviderCode}
                                </span>
                            </Grid>
                            <Grid item xs={12} className='grid-no-bottom-padding'>
                                <p className="global-font"><b>Product</b></p>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Product Type
                        </Typography>
                                <span className="drawee-profile-view" >
                                    {this.props.settlementCurrencyProfile.productType}
                                </span>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Sub Product Type
                        </Typography>
                                <span className="drawee-profile-view" >
                                    {this.props.settlementCurrencyProfile.subProductType}
                                </span>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Service Type
                        </Typography>
                                <span className="drawee-profile-view" >
                                    {this.props.settlementCurrencyProfile.serviceType}
                                </span>
                            </Grid>
                            <Grid item xs={12} className='grid-no-bottom-padding'>
                                <p className="global-font"><b>Transaction Type</b></p>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Transaction Type
                        </Typography>
                                <span className="drawee-profile-view" >
                                    {this.props.settlementCurrencyProfile.transactionType}
                                </span>
                            </Grid>
                            <Grid item xs={12} className='grid-no-bottom-padding'>
                                <p className="global-font"><b>Currency Codes</b></p>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Payin Currency Code
                        </Typography>
                                <span className="drawee-profile-view" >
                                    {this.props.settlementCurrencyProfile.payIncurrencyName}
                                </span>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Service Provider Currency
                        </Typography>
                                <span className="drawee-profile-view" >
                                    {this.props.settlementCurrencyProfile.serviceProviderCurrencyName}
                                </span>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Settlement Currency Code
                        </Typography>
                                <span className="drawee-profile-view" >
                                    {this.props.settlementCurrencyProfile.settlementCurrencyName}
                                </span>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    PASS Settlement Currency Code
                        </Typography>
                                <span className="drawee-profile-view" >
                                    {this.props.settlementCurrencyProfile.paasSettlementCurrencyName}
                                </span>
                            </Grid>

                            <Grid item xs={12} className='grid-no-bottom-padding'>
                                <p className="global-font"><b>Receiving Country</b></p>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Receiving Country
                        </Typography>
                                <span className="drawee-profile-view" >
                                    {this.props.settlementCurrencyProfile.countryName}
                                </span>
                            </Grid>
                        </Grid>
                    </div>
                </EnchancedTabContainer>
            </div>
        )
    }
}

export default withStyles(styles)(SettlementCurrencyProfileView);
