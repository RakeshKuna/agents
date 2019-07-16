import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    height: 30,
    flexGrow: 1,
    marginBottom:'3%'
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
    maxHeight:200,
    overflowY:`scroll`,
    overflowX:`hidden`
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

class IntegrationAutosuggest extends React.Component {
  state = {
    single: '',
    suggestions: [],
    suggestedObj:{},
    alwaysRenderSuggestions:true
  };

  componentDidMount(){
    //console.log(this.props);
  }

  renderInputComponent = (inputProps) => {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;
    return (
      <TextField
        fullWidth
        InputProps={{
          inputRef: node => {
            ref(node);
            inputRef(node);
          },
          classes: {
            input: classes.input,
          },
        }}
        {...other}
      />
    );
  }

  handleSelectMenuItem = (e,data) =>{
    //e.stopPropagation();
    this.setState({
      single: data.label,
      suggestedObj: data,
    },()=>{
      this.handleSubmitData(this.state.single,this.props.type,this.state.suggestedObj);
      this.handleSuggestionsClearRequested();
    });
  }
  
  renderSuggestion =(suggestion, { query, isHighlighted }) => {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);
    return (
      <MenuItem onClick={(e) => this.handleSelectMenuItem(e,suggestion)} selected={isHighlighted} component="div">
        <div className="global-font">
          {parts.map((part, index) =>
            part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            ),
          )}
        </div>
      </MenuItem>
    );
  }
  
  getSuggestions = (value) => {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
    let beginsWithArr =[];
    let containsArr =[];

    if(inputLength === 0) {
      this.setState({suggestions:this.props.suggestionFields},()=>{
        return this.state.suggestions;
      });
    }
    this.props.suggestionFields.filter(suggestion => {
        if ((count < this.props.suggestionFields.length && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue)) {
          beginsWithArr.push(suggestion)
        } 
        else if (count < this.props.suggestionFields.length && suggestion.label.toLowerCase().includes(inputValue)) {
          containsArr.push(suggestion);
        }       
    });

    return beginsWithArr.concat(containsArr);
  }
  
  getSuggestionValue = (suggestion) => {
    this.setState({suggestedObj:suggestion})
    return suggestion.label;
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    // console.log(this.getSuggestions(value))
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
      suggestedObj:{},
      alwaysRenderSuggestions:false
    });
  };

  handleChange = name => (event, { newValue }) => {
    //console.log(this.state.suggestions);
    this.setState({
      single:newValue,
    },()=>{
      if(this.props.value.length == 0){
        this.handleFocus();
      }
      this.handleSubmitData(newValue,this.props.type,this.state.suggestedObj);
    });
  };

  handleBlur = () => {
    console.log('on blur');
    this.setState({
      suggestions: [],
      alwaysRenderSuggestions:false
    },()=>{
      this.props.getHandleBlurValue(this.props.value,this.props.type);
    });
  };

  handleFocus = () => {
    //console.log(this.props.suggestionFields);
    //this.setState({})
    console.log('focus in')
    if(this.props.value.length == 0){
      this.setState({suggestions:this.props.suggestionFields,alwaysRenderSuggestions:true},()=>{
        
      })
    }
  };

  handleSubmitData = (data,type,obj) =>{
    this.props.getAutoSelectValue(data,type,obj);
  }

  render() {
    const { classes } = this.props;
    // console.log(this.state.suggestions);
    const autosuggestProps = {
      renderInputComponent:this.renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      alwaysRenderSuggestions:this.state.alwaysRenderSuggestions,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue:this.getSuggestionValue,
      renderSuggestion:this.renderSuggestion,
    };

    return (
      <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            label: this.props.label,
            disabled:this.props.disabled,
            placeholder: this.props.placeholder,
            value: this.props.value,
            onChange: this.handleChange('single'),
            onBlur: this.handleBlur,
            onFocus:this.handleFocus,
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
      </div>
    );
  }
}

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntegrationAutosuggest);
