# Props
| Props      | Type                                      | Default | Description                                                                                               |
| :--------- | :---------------------------------------- | :------ | :-------------------------------------------------------------------------------------------------------- |
| children * | Node                                      |         | This can be DOM or text                                                                                   |
| id         | string                                    |         | for unique identification.                                                                                |
| type       | oneOf ['reset', 'submit',"button"]        | button  |
| isBlock    | boolean                                   | false   | if True,will be full width of container                                                                   |
| isEnabled  | boolean                                   | true    | to disable button                                                                                         |
| href       | String                                    |         | The URL to open, when the button is clicked. If defined, an anchor tag element will be used as root node. |
| target     | string                                    |         | To open href link in new tab or not                                                                       |
| inputProps | Object                                    |         | value added a props object to component.eg:aria-label,htmlFor,etc.,                                       |
| umSize     | oneOf ['small', 'medium',"large"]         | medium  |
| umClass    | string                                    |
| umStyle    | oneOf ['primary', 'secondary',"default" ] | primary |
| style      | Object                                    |         | Add custom css property                                                                                   |
| rtl        | boolean                                   | false   |

# Extra props for float and icon button

| Props      | Type           | Default | Description                                        |
| :--------- | :------------- | :------ | :------------------------------------------------- |
| icon       | string or Node |         | Material icon class name(string) or Node(function) |
| isExtended | boolean        | false   |                                                    |
| iconStyle  | object         |         | To override icon style                             |


# Usage
```js
import { Button,TextButton,OutLineButton,FloatButton,IconButton } from 'finablr-ui';

<TextButton umSize="small" disabled>Disabled</TextButton>

<OutLineButton umStyle="secondary" style={{"margin-right":"10px"}}>SECONDARY</OutLineButton>

<Button>Primary</Button>

<FloatButton umStyle="default" isExtended style={{ "margin-right": "10px" }}>SECONDARY</FloatButton>

<FloatButton isExtended iconStye={{ color:"black" }} style={{ "margin-right": "10px","color":"red" }}>SECONDARY</FloatButton>

<IconButton icon="delete" style={{ "margin-right": "10px" }} />


 ```

# Event Handler

```js
function clickEventHandler(){
    // custom code
}

function mouseOverEventHandler(e){
    // e = event object
}


<TextButton onMouseOver={mouseOverEventHandler} >DEFAULT</TextButton>

<Button onClick={e => clickEventHandler}>Primary</Button>
```


# Custom Icon component 

```js
css To be loaded in page level 

<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">

// Create custom react component
function CustomIconComponent() {
  return <i className="fas fa-american-sign-language-interpreting" style={{ fontSize: "30px" }} />;
}

// include in our icon button component
<IconButton umStyle="secondary" icon={<CustomIconComponent />} />
<IconButton icon={<CustomIconComponent />} style={{ color: "red" }} />

```