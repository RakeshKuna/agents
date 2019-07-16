# Input Component

# Props
| Props        | Type                                                      | Default                                                             | Description                                             |
| :----------- | :-------------------------------------------------------- | :------------------------------------------------------------------ | :------------------------------------------------------ |
| id           | string                                                    |                                                                     |
| placeholder  | string                                                    |                                                                     | To show shadow text inside textbox                      |
| value        | string or number                                          |                                                                     | Place default value inside textbox                      |
| isRequired   | boolean                                                   | false                                                               | if true, onBlur it will throw error when it is empty    |
| name         | string                                                    |
| isEnabled    | boolean                                                   | true                                                                | To disable the textbox                                  |
| minLength    | number                                                    |
| maxLength    | number                                                    |
| min          | number                                                    | For numeric, min number to be type in input box                     |
| max          | number                                                    | For numeric, max number to be type in input box                     |
| tabIndex     | number                                                    |
| type         | enum,[password,freeText,alpha,alphaNumeric,decimal,email] | freeText                                                            |                                                         |
| regex        | regex                                                     | override default regex for validation.default Regex mentioned below |
| errorState   | boolean                                                   | Default error state of textBox                                      |
| roundOff     | number                                                    |                                                                     | roundoff from given place                               |
| decimalChar  | number                                                    |                                                                     | After . how many decimal need to show                   |
| charValidate | boolean                                                   | false                                                               | if true, validate on keypress                           |
| onError      | function                                                  |                                                                     | When validation error happen this function will trigger |
| onChange     | function                                                  |                                                                     | on textbox value change this function will trigger      |
| onFocus      | function                                                  |                                                                     | on textbox focus this function will trigger             |
| onBlur       | function                                                  |                                                                     | on blur from textbox this function will trigger         |
| onClick      | function                                                  |                                                                     | on click from textbox this function will trigger        |
| inputStyle   | object                                                    | css object for input                                                |
| umClass      | string                                                    |
| style        | object                                                    | css style object for container                                      |
| rtl          | boolean                                                   | false                                                               |



# Additional props for Type 2
| Props     |Type                                           | Default  | Description|
| :--       |:--                                            | :--|:--|
|boxtype|boolean| false| show Border around textbox|

# Additional props for Type 3
| Props     |Type                                           | Default  | Description|
| :--       |:--                                            | :--|:--|
|label     | string or number               |      |Show label above the textbox|
|icon| string or React node| |Icon will place inside right side of input Text. String will class name of https://materialdesignicons.com/ website or react node will be custom component|
|iconClick| function|| when Click on right icon this function will trigger |
|iconStyle|object||To apply custom style to icon|

*Other HTML attribute can pass to component in same props itself.eg:aria-label,htmlFor,etc.,


# Props For AutoComplete
| Props     |Type                                           | Default  | Description|
| :--       |:--                                            | :--|:--|
| data      | array | | to show Static array value, eg:- ["search-string"]|
| baseURL   | URL | | To get async data based on search text. eg:- http://localhost:9001/autocomplete.json?q={value} or http://localhost:9001/{value}/autocomplete.json or http://localhost:9001/{value},  {value} will be dynamically replaced in component level finally like http://localhost:9001/autocomplete.json?q=search-text |
|minLength| number|1| min charcter for autoComplete suggestion list|
|onChange| function || every change this function will trigger |
|inputComponentProps|Object ||all input component props can be used|
| service            | instanceOf: utils/Service | utils/Service | instance of service handler to be used for auto complete                                 |
|dropDownStyle|Object|| css to override autocomplete style|



# Default Regex validation 

```js
Numeric = /^-?(0|[1-9][0-9]*)$/;
Decimal = /^-?(0|[1-9]\d*)(\.\d+)?$/;
email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
alpha = /^[a-z]+$/i;
alphaNumeric = /^[a-z0-9]+$/i;
```

# Usage of input 

```js
import { Input, InputWithIcon } from "finablr-ui";

placeholder:-

    <Input placeholder="Enter alpha only" type="alpha" isRequired onChange={(e, value) => {console.log(value);}} onError={e => {console.log(e);}}/>

Texbox with Box:-

    <Input boxtype placeholder="Enter alpha and numeric"  label="Enter alpha and numeric" type="alphaNumeric" isRequired onChange={(e, value) => {console.log(value);}} onError={e => {console.log(e);}}/>

Textbox with placeholder and label:-

    <Input placeholder="Enter your Password" label="Enter your Password" type="password" />

TextBox with left and right icon:-

    <InputWithIcon icon="account-circle">
        <Input
            placeholder="Icon Right Component"
            label="Helper Component"
            icon="keyboard-backspace"
            iconStyle={{ color: "#8d8d8d" }}
            iconClick={() => {}}
        />
    </InputWithIcon>

Custom Regex 

<Input type="freeText" placeholder="/^[a-z0-9]+$/i" label="/^[a-z0-9]+$/i" regex={/^[a-z0-9]+$/i} onError={error => {console.log(error);}} />

```

# Usage of Autocomplete 


```js

import { InputWithIcon, AutoComplete } from "finablr-ui";

# async example
<AutoComplete baseURL="http://localhost:9001/autocomplete.json?q={value}" inputComponentProps={{placeholder: "type a",type: "alpha",label: "Auto complete"}} onChange={value => {console.log(value);}}  />

# static Data
<AutoComplete data={[ "search-string", "search-suggestion", "search-params", "search-query-parser", "search-issues", "search-text-tokenizer", "search-prototype.js", "search-query-tester", "search-nth", "search-employee" ]} inputComponentProps={{ placeholder: "type a", type: "alpha", isRequired: true, label: "Auto complete" }} />

# Fixed height

<AutoComplete baseURL="http://localhost:9001/autocomplete.json?q={value}" inputComponentProps={{placeholder: "type a",type: "alpha",label: "Auto complete"}} onChange={value => {console.log(value);}} dropDownStyle={{maxHeight: 200, overflow: "auto"}} />

# AutoComplete with Icon

<InputWithIcon icon="account-circle">
    <AutoComplete baseURL="http://localhost:9001/autocomplete.json?q={value}" inputComponentProps={{ placeholder: "type a", type: "alpha", label: "Auto complete", icon: "keyboard-backspace" }} onChange={value=> { console.log(value); }} />
</InputWithIcon>

```