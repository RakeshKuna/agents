import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import EnchancedTabContainer from '../container/TabContainer';
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


class AgentProfileView extends React.Component {

    constructor(props) {
        super(props)
        console.log(props.data);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <EnchancedTabContainer >
                    <div className={classes.root}>
                        <Grid container spacing={24}>
                            <Grid item xs={4}>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Agent Display Code
                                </Typography>
                                <span className="drawee-profile-view" >
                                    {this.props.data.code}
                                </span>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Agent Name
                        </Typography>
                                <span className="drawee-profile-view" >
                                    {this.props.data.name}
                                </span>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Agent Display Name
                        </Typography>
                                <span className="drawee-profile-view" >
                                    {this.props.data.displayName ? this.props.data.displayName : '--'}
                                </span>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Actmize Business Unit
                        </Typography>
                                <span className="drawee-profile-view" >
                                    {this.props.data.businessMappingUnit ? this.props.data.businessMappingUnit : '--'}
                                </span>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Country
                        </Typography>
                                <span className="drawee-profile-view" >
                                    {/* {this.props.data.country} */}
                                    {this.props.data.country}
                                </span>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Status
                        </Typography>
                                <span className="drawee-profile-view" >
                                    {this.props.data.status}
                                </span>
                            </Grid>
                        </Grid>
                    </div>
                </EnchancedTabContainer>
            </div>
        )
    }
}

export default withStyles(styles)(AgentProfileView);
