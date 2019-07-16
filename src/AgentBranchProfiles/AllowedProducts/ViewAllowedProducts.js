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

class ViewAllowedProducts extends React.Component {
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
                            <p className={classes.headingtitle}><b>Allowed Products Send</b></p>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Service Provider Code
                                </Typography>
                            <span className="drawee-profile-view" >
                                {this.props.allowedProductsProfile.serviceProviderCode}
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
                                {this.props.allowedProductsProfile.productType}
                            </span>
                        </Grid> 
                        <Grid item xs={4}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Sub Product Type
                                </Typography>
                            <span className="drawee-profile-view" >
                                {this.props.allowedProductsProfile.subProductType}
                            </span>
                        </Grid> 
                        <Grid item xs={4}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Service Type
                                </Typography>
                            <span className="drawee-profile-view" >
                                {this.props.allowedProductsProfile.serviceType}
                            </span>
                        </Grid> 
                        <Grid item xs={12} className='grid-no-bottom-padding'>
                            <p className={classes.headingtitle}><b>PayIn Limit</b></p>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                            PayIn Limit
                                </Typography>
                            <span className="drawee-profile-view" >
                                {this.props.allowedProductsProfile.payInLimit}
                            </span>
                        </Grid> 
                        <Grid item xs={12} className='grid-no-bottom-padding'>
                            <p className={classes.headingtitle}><b>Currency Codes</b></p>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                PayIn Currency Codes
                            </Typography>
                            <Grid container spacing={24}>
                            {this.props.allowedProductsProfile.currencyCodes.map((item,i)=>{
                                    return(

                                    <Grid item xs={4} >
                                
                                    <span className="drawee-profile-view" >
                                {item.code}
                                </span>
                                </Grid>
                                
                                )
                            })}
                            </Grid>
                        </Grid> 
                        <Grid item xs={12}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Set Currency Code as default
                                </Typography>
                            <span className="drawee-profile-view" >
                                {this.props.allowedProductsProfile.defaultCurrencyCode ==null?'--':this.props.allowedProductsProfile.defaultCurrencyCode.code}
                            </span>
                        </Grid> 
                    </Grid>
                </div>
            </EnchancedTabContainer>
        )
    }
}

export default withStyles(styles)(ViewAllowedProducts);