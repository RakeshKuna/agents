import { createMuiTheme, withTheme} from '@material-ui/core/styles';
import color from '@material-ui/core/colors/teal';
import { red } from '@material-ui/core/colors';
import { rgbToHex } from '@material-ui/core/styles/colorManipulator';
import { nominalTypeHack } from 'prop-types';

const getMuiTheme =  createMuiTheme({

  typography: {
    fontFamily:
    'Gotham-Rounded'
  },
  overrides: {
    palette: {
      primary: {
        main: '#25479e',
        light:'#fff'
      },
      secondary: {
        main: '#19ace3',
      },
      accent: { 
        color: 'red !important',
    },
    },
    MuiFab:{
      root:{
        minHeight:0
      }
    },
    MuiButton:{
        contained:{
          boxShadow:'none',
          backgroundColor: "#000000",
        '&:hover': {
            backgroundColor: "#000000",
          },
        }
    },
    MuiToolbar: {
      gutters: {
        paddingLeft: '5px !important'
      }
    },
    MuiList: {
      padding: {
        paddingTop: 0
      }
    },  
    MuiCircularProgress:{
      colorPrimary:{
      color:'white',
      }
    },
    MuiGrid:{
    spacing:{
      margin:0
    },
    container:{
      marginTop:10,
    },
    item:{
      marginTop:10
    }
  },
  CommonLayout:{
      content:{
        padding:'0px',
        marginLeft:'70px',
      }
  },
  MuiTableCell:{
    head:{
      color:'#333',
      backgroundColor:'#f1f1f1',
      fontSize:"16px",
    },
    body: {
      fontSize: '14px',
    }
  },
  MuiCardActionArea:{
    root:{
    backgroundColor:"rgb(241, 245, 248)",
    paddingBottom:27,
    }
  },
  MuiOutlinedInput:{
    input:{MuiFormControlLabel: {
      root: {
        marginLeft: '0px', marginRight:'0px',
      }
    },
      padding:'11.5px 32px 11.5px 14px',
      border:`none`
    }
  },
  MuiSwitch: {
    root: {
      display: 'block',
    }
  },
  MuiFormControlLabel: {
    root: {
      marginLeft: '0px', marginRight:'0px',
    }
  },
  MuiNativeSelect:{
    select:{
      minWidth:'18px',
    }
  },
  MuiGrid: {
    item: {
      marginTop: '3px',
    }
  },
  RegulerSelect: {
    formControl: {
      margin: '10px',
    }
  },
  RegulerSelect: {
    selectEmpty:{
      marginTop:'1px',
    }
  },
  MuiSwitch: {
    root: {
      display: 'block',
    }
  },
  MuiFormGroup:{
    root:{
      display:'block',
    }
  },
  MuiInput:{
    underline:{
      '&:hover:not($disabled):not($focused):not($error):before':{
        'border-bottom':'2px solid #19ace3'
      },
      '&:active':{
        'border-bottom':'2px solid #19ace3'
      },
    },
  },
  MuiInputBase:{
    root:{
      color:"rgb(93,91,91)",
    }
    },
    MuiIconButton:{
      colorInherit:{
        color: 'None',
      }
    },
    MuiAppBar:{
      colorPrimary:{
        color:'None',
        backgroundColor:"None"
    
      }
    },
    Icon:{
      root:{
        fontSize:'15px'
    }
    },
    MuiInput:{
      input:{
        padding:12
    }
    },
    MuiInputLabel: { 
      root: { 
        "&$focused": { 
          color: "#19ace3"
        }
      }
    },
    MuiNativeSelect:{
      outlined:{
        padding: '11.5px 20px 11.5px 14px',
        width:'calc(100% - 32px) !important'
      },
      root:{
        '&:hover': {
          borderColor: "#19ace3 !important",
       },
      }
    },
    MuiOutlinedInput:{
      notchedOutline:{
        paddingLeft:'56px !important',
      },
      root:{
        "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
          borderColor: "#19ace3 !important",
        }, 
        '&$focused $notchedOutline': {
          borderColor: '#19ace3 !important',
          borderWidth: 1,
      },
      }
    }
  }
})

export default getMuiTheme;