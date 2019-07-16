import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import '../vendor/common.css';
import '../theme/theme';
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

class AgentBranchProfileDetails extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loading:true, 
            loaderMessage:'Retrieving Data',
            serverStatus:null,
            serverError:false,
            serverErrMessage:'',
            countryRuleProfile:{},
            breadcrumps:[]
        };
    }

    componentDidMount(){
       console.log(this.props); 
       this.props.handleCompValueChange(false);
    }

    render() {
        const { classes } = this.props;
        return (
            <TabContainer>
                <div className={classes.root} style={{ padding: 8 * 3 }}>
                    <Grid container spacing={24} className='global-font'>
                        <Grid item xs={12} className='grid-no-bottom-padding'>
                            <p><b>Agent Information</b></p>
                        </Grid>
                        <Grid item xs={4} className='grid-no-top-padding'>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Agent Display Code
                            </Typography>
                            <span className="drawee-profile-view" >            
                                {this.props.agentBranchDetails['agentCode']}
                            </span>
                        </Grid>
                        <Grid item xs={4} className='grid-no-top-padding'>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Agent Name
                            </Typography>
                            <span className="drawee-profile-view" >            
                            {this.props.agentBranchDetails['agentName']}
                            </span>
                        </Grid>
                    </Grid>
                    <Grid container spacing={24} className='global-font'>
                        <Grid item xs={12} className='grid-no-bottom-padding'>
                            <p><b>Agent Branch Information</b></p>
                        </Grid>
                        <Grid item xs={4} className='grid-no-top-padding'>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Branch Display Code
                            </Typography>
                            <span className="drawee-profile-view" >            
                                {this.props.agentBranchDetails['branchDisplayName']}
                            </span>
                        </Grid>
                        <Grid item xs={4} className='grid-no-top-padding'>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Branch Name
                            </Typography>
                            <span className="drawee-profile-view" >            
                            {this.props.agentBranchDetails['branchName']}
                            </span>
                        </Grid>
                    </Grid>
                    <Grid container spacing={24} className='global-font'>
                        <Grid item xs={12} className='grid-no-bottom-padding'>
                            <p><b>Address Details</b></p>
                        </Grid>
                        <Grid item xs={4} className='grid-content-top-padding'>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Address 1
                            </Typography>
                            <span className="drawee-profile-view" >  
                            {this.props.agentBranchDetails['address1']}
                            </span>
                        </Grid>
                        <Grid item xs={4} className='grid-content-top-padding'>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Address 2
                            </Typography>
                            <span className="drawee-profile-view" >            
                            {this.props.agentBranchDetails['address2']}
                            </span>
                        </Grid>
                        <Grid item xs={4} className='grid-content-top-padding'>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Post Box
                            </Typography>
                            <span className="drawee-profile-view" > 
                            {this.props.agentBranchDetails['poBox']}           
                            </span>
                        </Grid>
                        <Grid item xs={4} className='grid-content-top-padding'>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Country
                            </Typography>
                            <span className="drawee-profile-view" >            
                            {this.props.agentBranchDetails['country']}
                            </span>
                        </Grid>
                        <Grid item xs={4} className='grid-content-top-padding'>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                State
                            </Typography>
                            <span className="drawee-profile-view" >            
                            {this.props.agentBranchDetails['state']}
                            </span>
                        </Grid>
                        <Grid item xs={4} className='grid-content-top-padding'>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                City
                            </Typography>
                            <span className="drawee-profile-view" >            
                            {this.props.agentBranchDetails['city']}
                            </span>
                        </Grid>
                        <Grid item xs={4} className='grid-no-top-padding'>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Zip/PO Code
                            </Typography>
                            <span className="drawee-profile-view" >            
                            {this.props.agentBranchDetails['zip']}
                            </span>
                        </Grid>
                        <Grid item xs={4} className='grid-no-top-padding'>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Fax
                            </Typography>
                            <span className="drawee-profile-view" >            
                            {this.props.agentBranchDetails['fax']}
                            </span>
                        </Grid>
                    </Grid>
                    <Grid container spacing={24} className='global-font'>
                        <Grid item xs={12} className='grid-no-bottom-padding'>
                            <p><b>Contact Details</b></p>
                        </Grid>
                        <Grid item xs={4} className='grid-content-top-padding'>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Phone
                            </Typography>
                            <span className="drawee-profile-view" >            
                            {this.props.agentBranchDetails['phone']}
                            </span>
                        </Grid>
                        <Grid item xs={4} className='grid-content-top-padding'>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Mobile
                            </Typography>
                            <span className="drawee-profile-view" >            
                            {this.props.agentBranchDetails['mobile']}
                            </span>
                        </Grid>
                        <Grid item xs={4} className='grid-content-top-padding'>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Email
                            </Typography>
                            <span className="drawee-profile-view" >            
                            {this.props.agentBranchDetails['email']}
                            </span>
                        </Grid>
                        <Grid item xs={4} className='grid-content-top-padding'>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Contact Person
                            </Typography>
                            <span className="drawee-profile-view" >            
                            {this.props.agentBranchDetails['contactPerson']}
                            </span>
                        </Grid>  
                    </Grid>
                </div>
            </TabContainer>
        );
      }
}

AgentBranchProfileDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(AgentBranchProfileDetails);