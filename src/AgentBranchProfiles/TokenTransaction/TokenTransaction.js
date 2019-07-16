import React, { Component } from 'react';
import EnhancedTable from './EnhancedTable';
import Pagination from '../../container/Pagination';
import Search from '../../container/Search';
import { Button, FloatButton } from 'finablr-ui';
import Typography from '@material-ui/core/Typography';
import Select from '../../container/Select';
import '../../vendor/common.css';
import '../../theme/theme';
import rows from './EnhancedTableHeader';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import EmptyListComponent from '../../component/EmptylistComponent';
import Loader from '../../component/Loader';
import Noresult from '../../component/NoResults';
import ModalBox from './../../component/Modalbox';
import * as ApiService from './ApiService';
import * as Exceptionhandler from './../../ExceptionHandling';
import Card from '@material-ui/core/Card';
import ErrorModalBox from '../../component/ErrorModalbox';
import * as config from '../../config/config';
import Icon from '@material-ui/core/Icon';

const queryString = require('query-string');
var parsed = null;
function TabContainer(props) {
  return (
  <Typography component="div">
  {props.children}
  </Typography>
  );
}

const styles = theme => ({
    root: {
      flexGrow: 1,      
    },
    fab: {
      margin: theme.spacing.unit,
      backgroundColor: "#19ace3",
      color:'white'
    },
});

const selectLabels = [{'id':1,'label':'Service Provider Code','value':'SERVICE_PROVIDER_CODE'},{'id':2,'label':'Product Type','value':'PRODUCT_TYPE'},{'id':3,'label':'Sub Product Type','value':'SUB_PRODUCT_TYPE'},{'id':3,'label':'Service Type','value':'SERVICE_TYPE'},{'id':4,'label':'Transaction Type',value:'TRANSACTION_TYPE'}];
const rowsPerpage = [{'id':5,'label':'5','value':'5'},{'id':10,'label':'10','value':'10'},{'id':15,'label':'15','value':'15'},{'id':20,'label':'20','value':'20'}];

class TokenTransactionList extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      tableHeader:rows,
      breadcrumps:[],
      bankList:'',
      pageNum:0,
      pageelements:'5',
      bankListLen:'',
      totalRecords:'',
      loading:true,
      buttonText:'',
      errMessage:'Enter atleast 1 character',
      errCheck:false,
      query:'',
      fromSearch:false,
      columnFilter:'',
      fromAction:'',
      snackbar:false,
      snackbarMessage:'',
      actionType:'',
      loaderMessage:'Retrieving Data',
      confirmStatus:false,
      apiErrMsg:'',
      serverStatus:null,
      serverError:false,
      serverErrMessage:'',
      createdServiceProvider:'',
      shownogeneralrules:false,
      apiErrMsg:''
    }
  }

  componentDidMount(){
    console.log(this.props);
    this.props.handleCompValueChange(false);
    parsed = queryString.parse(this.props.location.search);
    let totalMatch = 0;
    let colCountMatch = 0;
    this.setState({loading:true,loaderMessage:'Retrieving Data'},()=>{
      if("pageelements" in parsed){
        let count = 0;
        rowsPerpage.map((obj)=>{
          if(obj.id == parseInt(parsed.pageelements)){
            count = count+1;
            this.setState({pageelements:parseInt(parsed.pageelements)},()=>{
              //this.fetchCountryRestrictions(this.state.pageNum);
            })
          }
          else{
            return null;
          }
        })
        if(count == 0){
          this.setState({serverError:true,serverErrMessage:"Web URL you entered is not a functioning page on our site."});
        }
        else{
          this.setState({serverError:false,serverErrMessage:''});
        }
      }
      if("pagenum" in parsed){
        this.setState({pageNum:parsed.pagenum});
      }
      if("columnType" in parsed){
        selectLabels.map((obj)=>{
          if(obj.value == parsed.columnType){
            colCountMatch = colCountMatch+1;
            this.setState({columnFilter:parsed.columnType,fromSearch:true},()=>{
              //{this.fetchCountryRestrictions(this.state.pageNum);}
            })
          }
          else{
            return null;
          }
        })
        if(colCountMatch == 0){
          this.setState({serverError:true,serverErrMessage:"Web URL you entered is not a functioning page on our site."});
        }
        else{
          this.setState({serverError:false,serverErrMessage:''});
        }
      }
      if(colCountMatch > 0){
        if("search" in parsed){
          if(parsed.search.length > 0){
            totalMatch = totalMatch+1;
            this.setState({query:parsed.search,fromSearch:true},()=>{
              this.fetchAgentBranchTokenExpiry(this.state.pageNum);
            })
          }
          else{
            this.setState({query:''})
          }
        } 
      }
      // if(!("pageElements" in parsed) || !("pageNum" in parsed)){
      //   this.setState({serverError:true,serverErrMessage:'Page you are looking is not functioning in our site'})
      // }
      // else if(totalMatch == 0){
      //   this.setState({loading:true},()=>{
      //     this.fetchAgentBranchTokenExpiry(this.state.pageNum);
      //   })
      // }
      if(totalMatch == 0){
        this.setState({loading:true},()=>{
          this.fetchAgentBranchTokenExpiry(this.state.pageNum);
        })
      }
    }) 
    //this.fetchPurposeTypes();
  }

  fetchAgentBranchTokenExpiry = (pgno) => {
    // let params = {
    //   pagenumber:pgno,                 
    //   pageelements:this.state.pageelements,
    //   query:(this.state.query == '')? null:this.state.query,
    //   type:(this.state.columnFilter == '')?null:this.state.columnFilter
    // }
    let params = {};
    if(this.state.query.trim().length == 0){
      params = {
        pagenumber: pgno,
        pageelements: this.state.pageelements
      }
    }
    else {
      params = {
        pagenumber: pgno,
        pageelements: this.state.pageelements,
        query: (this.state.query == '') ? null : this.state.query,
        type: (this.state.columnFilter == '') ? null : this.state.columnFilter
      }
    }
    if(sessionStorage.getItem('token') == undefined){
      window.location.replace(config.PAAS_LOGIN_URL);
      return (<h1>401 - Unauthorized Request</h1>)
    }
    else{
      let headers = {
        Authorization:sessionStorage.getItem('token')
      }
      this.setState({loading:true},()=>{
        ApiService.ListOfTokenExpiry(params,this.props.match.params.agentid,this.props.match.params.agentbranchId,headers)
        .then((response)=>{
          console.log(response)
          if(response.status == 200){
            this.setState({serverError:false,bankList:response.data,bankListLen: response.data.total,totalRecords:response.data.total,loading:false,loaderMessage:''},()=>{
              // let breadcrumpData = [{link:'/agentprofiles',text:'Agent Profiles'},{link:'#',text:response.data.data[0].agent_display_name}];
              // this.setState({breadcrumps:breadcrumpData})
            });
          }
        })
        .catch(error=>{
          if(Exceptionhandler.throwErrorType(error).status == 401){
            window.location.replace(config.PAAS_LOGIN_URL)
            return (<h1>401 - Unauthorized Request</h1>)
          }
          else if(Exceptionhandler.throwErrorType(error).status == 500 || Exceptionhandler.throwErrorType(error).status == 503 || Exceptionhandler.throwErrorType(error).status == 400 || Exceptionhandler.throwErrorType(error).status == 404){
            this.setState({loading:false,serverError:true,serverStatus:Exceptionhandler.throwErrorType(error).status,serverErrMessage:Exceptionhandler.throwErrorType(error).message})
          }
          else{
            this.setState({loading:false,serverError:false,shownogeneralrules:true,apiErrMsg:error.response.data.error,actionType:'OK'})
          }
        });
      })
    }
  }

  handleSelect = (data, fromPage, type) => {
    switch (fromPage, type) {
      case ('AgentBranchListSelectRows', 'rowsPerpage'):
        this.setState({ pageelements: data, pageNum: 0, loaderMessage: 'Retrieving Data', loading: true }, () => {
          this.props.history.push({
            pathname: `/agentprofiles/${this.props.match.params.agentid}/branches/${this.props.match.params.agentbranchId}`,
            search: `?tabId=${1}&pageelements=${this.state.pageelements}&pagenum=${this.state.pageNum}`
          })
          this.fetchAgentBranchTokenExpiry(0);
        });
        break;
      case ('AgentBranchListSelect', 'columnFilter'):
        this.setState({ columnFilter: data }, () => {
          if ((this.state.query.length > 0) && (this.state.columnFilter.length > 0)) {
             this.setState({ fromSearch: true, loaderMessage: 'Retrieving Data', errCheck: false,pageNum:0 }, () => {
              this.props.history.push({
                pathname: `/agentprofiles/${this.props.match.params.agentid}/branches/${this.props.match.params.agentbranchId}`,
                search: `?tabId=${1}&pageelements=${this.state.pageelements}&pagenum=${this.state.pageNum}&columnType=${this.state.columnFilter}&search=${this.state.query}`
              })
              this.fetchAgentBranchTokenExpiry(this.state.pageNum);
            })
          }
          else if ((this.state.query.length == 0) && (this.state.columnFilter.length == 0)) {
            this.setState({ fromSearch: false, pageNum: 0, query: '', loaderMessage: 'Retrieving Data', columnFilter: '',errCheck: false }, () => {
              this.props.history.push({
                pathname: `/agentprofiles/${this.props.match.params.agentid}/branches/${this.props.match.params.agentbranchId}`,
                search: `?tabId=${1}&pageelements=${this.state.pageelements}&pagenum=${this.state.pageNum}`
              })
              this.fetchAgentBranchTokenExpiry(this.state.pageNum);
            })
          }
          else if ((this.state.columnFilter.length == 0) && (this.state.query.length > 0)) {
            this.setState({ fromSearch: false, pageNum: 0, query: '', loaderMessage: 'Retrieving Data' }, () => {
              this.props.history.push({
                pathname: `/agentprofiles/${this.props.match.params.agentid}/branches/${this.props.match.params.agentbranchId}`,
                search: `?tabId=${1}pageelements=${this.state.pageelements}&pagenum=${this.state.pageNum}`
              })
              this.fetchAgentBranchTokenExpiry(this.state.pageNum);
            })
          }
        });
      break;
    }
  }

  handleSearch = (dataEvent, value) => {
    if (dataEvent.keyCode == 13) {
      this.setState({ query: value }, () => {
        this.handleSearchCheck(this.state.query, true);
      })
    }
    else if(dataEvent.keyCode == 9){
      this.setState({ query: value });
    }
    else {
      this.setState({ query: value }, () => {
        this.handleSearchCheck(this.state.query, false);
      })
    }
  }

  handleSearchCheck(data, enter) {
    let dataLen = null;
    if (data == undefined) {
      dataLen = 0;
    }
    else {
      dataLen = data.length;
    }
    switch (enter) {
      case (true):
        if ((dataLen == 0) && (this.state.columnFilter.length == 0)) {
          this.setState({ query: '', errCheck: false }, () => {
            this.handleSearchData(data);
          });
        }
        else if ((dataLen == 0) && (this.state.columnFilter.length > 0)) {
          this.setState({ query: '', errCheck: true, errMessage: 'Enter atleast 1 char' });
        }
        else if ((dataLen >= 1) && (this.state.columnFilter.length == 0)) {
          this.setState({ query: data, errMessage: 'Please select column type', errCheck: true });
        }
        else if ((dataLen >= 1) && (this.state.columnFilter.length > 0)) {
          this.setState({ query: data, errCheck: false, fromSearch: true }, () => {
            this.handleSearchData(data);
          });
        }
        break;
      case (false):
        if (dataLen == 0 && this.state.columnFilter.length == 0) {
          this.setState({ query: '', errCheck: false, columnFilter: "" }, () => {
            this.handleSearchData(this.state.query);
          })
        }
        else if (dataLen >= 1) {
          this.setState({ query: data, errCheck: false })
        }
        break;
    }
  }

  handleSearchData = (data) => {
    this.setState({ query: data, loaderMessage: 'Retrieving Data',pageNum:0 }, () => {
      this.props.history.push({
        pathname: `/agentprofiles/${this.props.match.params.agentid}/branches/${this.props.match.params.agentbranchId}`,
        search: `?tabId=${1}&pageelements=${this.state.pageelements}&pagenum=${this.state.pageNum}&columnType=${this.state.columnFilter}&search=${this.state.query}`
      })
      this.fetchAgentBranchTokenExpiry(this.state.pageNum);
    })
  }

  handlePagingListing = (pgno) => {
    console.log(pgno);
    this.setState({pageNum:pgno,loaderMessage:'Retrieving Data'},()=>{
      if((this.state.columnFilter.length > 0) && (this.state.query.length > 0)){
        this.props.history.push({
          pathname:`/agentprofiles/${this.props.match.params.agentid}/branches/${this.props.match.params.agentbranchId}`,
          search:`?tabId=${1}&pageelements=${this.state.pageelements}&pagenum=${this.state.pageNum}&columnType=${this.state.columnFilter}&search=${this.state.query}`
        })
        this.fetchAgentBranchTokenExpiry(this.state.pageNum);
      }
      else{
        this.props.history.push({
          pathname:`/agentprofiles/${this.props.match.params.agentid}/branches/${this.props.match.params.agentbranchId}`,
          search:`?tabId=${1}&pageelements=${this.state.pageelements}&pagenum=${this.state.pageNum}`
        })
        this.fetchAgentBranchTokenExpiry(this.state.pageNum);
      }
    })
  }

  handleCreateBranchProfile = () => {
    this.props.history.push({
      pathname:`/agentprofiles/${this.props.match.params.agentid}/branches/${this.props.match.params.agentbranchId}/createtokenexpiry`
    })
  }

  handleStatusResponse=(data)=>{
    if(data == true){
      this.setState({shownogeneralrules:false},()=>{          
      });       
    } 
  }

  render(){
    const props = this.props;
    const { classes } = this.props;
    return(
        <div className={classes.root}>
        {
          this.state.serverError ? <EmptyListComponent text={this.state.serverErrMessage} fromPage="Errors" /> :    
            <div className="grid" style={{padding:"20px 30px"}}>
              <div className="title-create-button">
                <p className="bank-profile global-font" >Token/Transaction Expiry</p>
                {/* {
                  // (this.state.bankListLen == 0) ?
                    <Button className="create-button" onClick={this.handleCreateBranchProfile}>
                      <Icon style={{ padding: "1px 5px 0 0" }} color="">
                          +
                      </Icon>
                      CREATE
                    </Button>
                    // : null
                } */}
              </div>
              {
                this.state.loading?
                  <Loader action={this.state.loaderMessage}/>
                :
              <div>                         
                <Card>
                  {
                    (((this.state.bankListLen == 0) && (this.state.fromSearch == true)) || (this.state.bankListLen != 0)) ?
                      <Grid container spacing={24} className="page-element-grid" justify="space-between">
                        <Grid item xs={1}>
                          <Select fromPage="AgentBranchListSelectRows" value={this.state.pageelements} type="rowsPerpage" selectLabels={rowsPerpage} getSelectText={this.handleSelect} />
                        </Grid>
                        <Grid item xs={6} style={{ padding: `16px 0 0 0` }}><div className="global-font"><p>Entries</p></div></Grid>
                        <Grid item xs={5}>
                          <Grid direction="row" container spacing={24} justify="flex-end" >
                            <Grid item xs={5} style={{paddingRight:'0px'}}>
                              <Select fromPage="AgentBranchListSelect" value={this.state.columnFilter} type="columnFilter" selectLabels={selectLabels} getSelectText={this.handleSelect} />
                            </Grid>
                            <Grid item xs={5} style={{ paddingRight: '0px' }} className="grid-error">
                              <Search fromPage="AgentBranchListSelect" value={this.state.query} getSearchText={this.handleSearch} />
                              <span className="errorMessage-list">{this.state.errCheck ? this.state.errMessage : ''}</span>
                            </Grid>
                            <Grid item xs={2} >
                              <div className="plus-icon-div">
                              <Icon  className="plus-icon" color="" onClick={this.handleCreateBranchProfile}>
                                +
                              </Icon>
                              </div>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      :
                      null
                  }
                  {
                    ((this.state.fromSearch == true) && (this.state.bankListLen==0))?
                    <Noresult text="Agent Branches" />
                    :
                    [
                      ((this.state.fromSearch == false) && (this.state.bankListLen==0))? 
                        <div style={{position:'relative'}}>
                          <EmptyListComponent text="Token/Transaction Expiry Rules" fromPage="TokenExpiry" />
                          {
                            <div className="plus-icon-div plus-icon-position">
                              <Icon  className="plus-icon" color="" onClick={this.handleCreateBranchProfile}>
                                  +
                              </Icon>
                            </div>
                          }
                        </div>
                        : null
                    ]
                  }
                  {
                    (this.state.bankListLen!=0)?
                    <div>
                      <EnhancedTable bankList={this.state.bankList} rowsHdr={this.state.tableHeader}  {...this.state} {...this.props} props={props}/>
                      <Pagination totalNumberOfRows={this.state.totalRecords} page={this.state.pageNum} rowsPerPage={this.state.pageelements} handlePagingListing={this.handlePagingListing.bind(this)} {...this.state} />
                    </div> : null
                  }
                </Card> 
              </div>
            }
            {
              this.state.shownogeneralrules ? <ErrorModalBox isOpen={this.state.shownogeneralrules} actionType="OK" message={this.state.apiErrMsg} modalAction={this.handleStatusResponse}/> : null
            }
          </div>
        }
      </div>
    )
  }
}

TokenTransactionList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TokenTransactionList);