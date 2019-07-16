import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {MuiThemeProvider} from '@material-ui/core/styles';
import axios from 'axios';
import getMuiTheme from "../theme/theme";
import Loader from '../component/Loader';
import '../vendor/common.css'
import { isWidthDown } from '@material-ui/core/withWidth';
import * as config from './../config/config';

const styles = theme => ({
  button: {
    // margin: theme.spacing.unit,
    backgroundcolor:'black',
    color:'white',
    buttonText:'bold'

  },
  input: {
    display: 'none',
  },
})

class Import extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      value: '',
      loading:false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({loading:true});
    const data = new FormData();
    const imagedata = event.target.files[0];
    data.append('file', imagedata);
    var url = '';
    if(this.props.fromPage === 'banks'){
      url = config.IMPORT_BANKS;
    }
    else if(this.props.fromPage === 'branches'){
      url = config.IMPORT_BRANCHES;
    }
    var authOptions = {
      method: 'post',
      url: url,
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
       }
    };
     
    axios(authOptions)
     .then((response) => {
        this.setState({loading:false});
        this.props.getData(response);
      })
     .catch((error) => {
        this.setState({loading:false})
        this.props.getData(error);
    })
  }

  render() {
    const { classes } = this.props;
  return (
    <div>
      {
        this.state.loading?
        <Loader/>
        :
      <MuiThemeProvider theme={getMuiTheme}>
        <input
          accept="application/vnd.ms-excel,
          application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
          application/vnd.ms-excel.sheet.macroenabled.12, 
          application/vnd.ms-excel.sheet.binary.macroenabled.12"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file" onChange={(e) => this.handleChange(e)}
        />
        <label htmlFor="contained-button-file" className="button1">
          <Button variant="contained" component="span" className={classes.button} size="large" fullWidth={true}>
            {this.props.buttonText}
          </Button>
        </label>
        <p className='excel-file'>*Allows only Excel files</p>

      </MuiThemeProvider>}
    </div>
  );
}
}
Import.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Import);