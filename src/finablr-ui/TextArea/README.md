# Text area component


# Props
| Props       | Type             | Default                                                             | Description                                                       |
| ----------- | ---------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------- |
| id          | string           |                                                                     |
| name        | string           |                                                                     |
| placeholder | string           |                                                                     | To show shadow text inside textbox                                |
| value       | string or number |                                                                     | Place default value inside textbox                                |
| isRequired  | boolean          | false                                                               | if true, On blur it will throw eroor when its empty               |
| isEnabled   | boolean          | true                                                                | To disable the textbox                                            |
| regex       | regex            | override default regex for validation.default Regex mentioned below |
| showCount   | boolean          | true                                                                | show count in right bottom                                        |
| charText    | string           | Chars                                                               | change text for custom or other language                          |
| autoHeight  | boolean          | false                                                               | textarea height will increase based on text height [no scrollbar] |
| minLength   | number           | min length of text                                                  |
| maxLength   | number           | max length of text                                                  |
| errorState  | boolean          | Default error state of textBox                                      |
| boxtype     | boolean          | false                                                               | textarea with border                                              |
| onError     | function         |                                                                     | When validation error happen this function will trigger           |
| onChange    | function         |                                                                     | on textbox value change this function will trigger                |
| onFocus     | function         |                                                                     | on textbox focus this function will trigger                       |
| onBlur      | function         |                                                                     | on blur from textbox this function will trigger                   |
| umClass     | string           |
| rtl         | boolean          |

# Usage of text area
 
```js

import {TextArea} from from "finablr-ui";

# Text area with placeholder

<TextArea placeholder="Text area Type 1" />


# Text area with placeholder and label

<TextArea placeholder="Text area Type 1" label="Text area Type 1" />

# Text area with placeholder and label

<TextArea boxtype placeholder="Text area Type 2" label="Text area Type 2" />

# RTL

<TextArea boxtype placeholder="Text area Type 2" rtl label="Text area Type 2" />

# validation

<TextArea boxtype placeholder="Text area Type 2" onError={()=>{}} isRequired  label="Text area Type 2" />

# validation

<TextArea boxtype placeholder="Text area Type 2" onError={()=>{}} regex={/^[a-z0-9]+$/i} label="Text area Type 2" />

```