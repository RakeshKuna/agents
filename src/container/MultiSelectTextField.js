import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import keycode from 'keycode';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Close from '@material-ui/icons/Close';
import More from '@material-ui/icons/MoreHoriz';
import getMuiTheme from '../theme/theme';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          input: classes.inputInput,
          root:classes.inputRoot,
          underline: classes.underline,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};



class DownshiftMultiple extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      inputValue: '',
      selectedItem: [],
      open: false,
      isOpen:false
    };
  }

  componentDidMount(){
    this.setState({selectedItem:this.props.data.value})
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    this.setState({selectedItem:nextProps.data.value})
  }

  handleClickOpen = () => {
    //console.log('open modal');
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  getSuggestions = (value) => {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
    let beginsWithArr =[];
    let containsArr =[];

    if(inputLength === 0) {
      // this.setState({suggestions:this.props.data.suggestionFields},()=>{
      //   return this.state.suggestions;
      // });
      return this.props.data.suggestionFields;
    }

    this.props.data.suggestionFields.filter(suggestion => {
        if ((count < this.props.data.suggestionFields.length && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue)) {
          beginsWithArr.push(suggestion)
        } 
        else if (count < this.props.data.suggestionFields.length && suggestion.label.toLowerCase().includes(inputValue)) {
          containsArr.push(suggestion);
        }       
    });

    return beginsWithArr.concat(containsArr);
  }

  handleKeyDown = event => {
    const { inputValue, selectedItem } = this.state;
    if (selectedItem.length && !inputValue.length && keycode(event) === 'backspace') {
      this.setState({
        selectedItem: selectedItem.slice(0, selectedItem.length - 1),
      },()=>{
        this.props.fnData.getAutoSelectValue(this.state.selectedItem,this.props.data.type);
      });
    }
  };

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleFocus = () => {
    console.log('on focus');
    if(this.state.inputValue.length == 0){
      this.getSuggestions('');
      this.setState({isOpen:true});
    }
  }

  handleBlur = () => {
    this.setState({isOpen:false,inputValue:''});
  }

  handleChange = item => {
    let { selectedItem } = this.state;

    if (selectedItem.indexOf(item) === -1) {
      selectedItem = [item,...selectedItem].filter(selectedItem => selectedItem);
    }

    this.setState({
      inputValue: '',
      selectedItem,
    },()=>{
      this.props.fnData.getAutoSelectValue(selectedItem,this.props.data.type);
    });
    
  };

  handleDelete = item => () => {
    this.setState(state => {
      const selectedItem = [...state.selectedItem];
      selectedItem.splice(selectedItem.indexOf(item), 1);
      this.props.fnData.getAutoSelectValue(selectedItem,this.props.data.type);
      return { selectedItem };
    });
  };

  handleView = () => {
    this.handleClickOpen();
    this.props.fnData.getViewValues(this.state.selectedItem,this.props.data.type);
  }

  handleClear = () => {
    let selectedItem = this.state.selectedItem;
    selectedItem = [];
    this.setState({selectedItem,open:false},()=>{
      this.props.fnData.getViewValues(this.state.selectedItem,this.props.data.type);
    });
  }

  render() {
    const { classes } = this.props;
    const { inputValue, selectedItem, open } = this.state;

    return (
      <div>
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        onChange={this.handleChange}
        selectedItem={selectedItem}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue: inputValue2,
          selectedItem: selectedItem2,
          highlightedIndex,
        }) => (
          <div className={classes.container}>
            {renderInput({
              fullWidth: true,
              classes,
              InputProps: getInputProps({
                startAdornment: selectedItem.map((item,index) => 
                  (index==0 || index == 1) ?
                  <Chip
                  key={item.id}
                  tabIndex={-1}
                  label={item.label}
                  className={classes.chip}
                  onDelete={this.handleDelete(item)}
                  />:
                  [(index == 2) ?
                  <Button size="small" className={classes.button} onClick={this.handleView}>
                    <More style={{cursor:`pointer`}} />
                  </Button>
                  :false]
                ),
                onChange: this.handleInputChange,
                onFocus:this.handleFocus,
                onBlur:this.handleBlur,
                onKeyDown: this.handleKeyDown,
                placeholder: (selectedItem.length == 0) ? this.props.data.placeholder:'',
                disabled:this.props.data.disabled
              }),
              label: this.props.data.label,
            })}
            {this.state.isOpen ? (
              <Paper className={classes.paper} square>
                {this.getSuggestions(inputValue2).map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion }),
                    highlightedIndex,
                    selectedItem: selectedItem2,
                  }),
                )}
              </Paper>
            ) : null}
          </div>
        )}
      </Downshift>
      <div>
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={this.handleClose}
            className={classes.modalBody}
          >
            <div style={getModalStyle()} className={classes.modalPaper}>
              <div className="modal-card-header">
                <div className="modal-card-header-content">
                  <Grid container spacing={12}>
                    <Grid item xs={6}>
                      <h3 className="global-font">{this.props.data.MultiSelectText}</h3>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid direction="column" alignItems="flex-end" container spacing={12}>
                        <Fab size="small" color="secondary" aria-label="Add" className={classes.fab} onClick={this.handleClose}>
                            <Close />
                        </Fab>
                        </Grid>
                    </Grid>
                  </Grid>
                  <Grid container spacing={12}>
                    {
                      selectedItem.map((item)=>{
                        return (<Grid item xs={4}>
                          <Chip
                            key={item.id}
                            tabIndex={-1}
                            label={item.label}
                            className={classes.chip}
                            onDelete={this.handleDelete(item)}
                          />
                        </Grid>)
                      })
                    }
                  </Grid>
                </div>
              </div>
              <Grid container spacing={12} direction="row" justify="flex-end" alignItems="flex-end">
                <Button className={classes.modalbutton} size="large" onClick={this.handleClear} style= {{color: '#19ace3'}}>
                  Clear All
                </Button>   
              </Grid>   
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

DownshiftMultiple.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxHeight: 200,
    position: 'relative',
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
    maxHeight:200,
    overflowY:`scroll`,
    overflowX:`hidden`
  },
  chip: {
    margin: '0 0 0 2px',
    backgroundColor:`transparent`
  },
  inputRoot: {
    flexWrap: 'wrap',
    '&:hover:after':{
      'border-bottom':'2px solid #19ace3'
    },
    '&:active:after':{
      'border-bottom':'2px solid #19ace3'
    }
  },
  underline: {
    '&:hover': {
      '&:before': {
        borderBottom: ['2px solid #19ace3', '!important'],
      }
    },
    '&:active': {
      '&:before': {
        borderBottom: ['2px solid #19ace3', '!important'],
      }
    },
    '&:before': {
      borderBottom: '2px solid #A9A9A9',
    },
    '&:after': {
      borderBottom: '2px solid #19ace3',
      MuiFormLabel:{
        root:{
          color:'#19ace3'
        }
      }
    }
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
    padding:'12px 12px 12px 0'
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
  button: {
    position: 'absolute',
    top:`-5px`,
    right:`24%`,
    zIndex:2,
    backgroundColor:`transparent`,
    '&:hover': {
      backgroundColor:`transparent`
    },
    '&:focus': {
      backgroundColor:`transparent`
    },
    '&:after': {
      backgroundColor:`transparent`
    },
    '&:active': {
      backgroundColor:`transparent`
    }
  },
  input: {
    display: 'none',
  },
  modalPaper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: `38px 32px 0px 32px`,
    outline: 'none',
    height:`auto`,
    minWidth:`60vw`,
  },
  modalbutton: {
    margin: theme.spacing.unit,
  },
  fab: {
    margin: theme.spacing.unit,
    backgroundColor: "#000",
    boxShadow:`none`
  },
  // input: {
  //   display: 'none',
  // },
});

let popperNode;

function IntegrationDownshift(props) {
  let fnData = props;
  let data = {};
  data.MultiSelectText=props.MultiSelectText;
  data.suggestionFields = props.suggestionFields;
  data.value=props.value;
  data.placeholder = props.placeholder;
  data.type = props.type;
  data.label = props.label;
  data.disabled= props.disabled;
  const { classes } = props;

  return (
    <MuiThemeProvider theme={getMuiTheme}>
      <div className={classes.root}>
        <DownshiftMultiple classes={classes} data={data} fnData={fnData}/>
      </div>
    </MuiThemeProvider>
  );
}

IntegrationDownshift.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntegrationDownshift);
