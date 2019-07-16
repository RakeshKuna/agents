import React from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import '../vendor/common.css';



function TabContainer(props) {
  return (
  <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
  </Typography>
  );
}

class AuditingComponent extends React.Component{
  constructor(props) {
      super(props);
  }

  render(){
    const {classes} = this.props
      return (
        <TabContainer>
          <div className="card-header-content global-font">
            <Grid container spacing={24}>
              <Grid item xs={12}><p className="activity">{this.props.activity}</p></Grid>
              <Grid item xs={4}>
                <p className="create-label">Created by</p>
                <p className="name-label">{this.props.createBy}</p>
                <p className="date-label">{this.props.createDate}</p>
              </Grid>
              <Grid item xs={4}>
                <p className="create-label">Last modified by</p>
                <p className="name-label">{this.props.modifiedBy}</p>
                <p className="date-label">{this.props.modifiedDate}</p>
              </Grid>
            </Grid>
          </div>      
        </TabContainer>
      );
    }
}

export default AuditingComponent;