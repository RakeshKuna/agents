# Props
| Props        | Type                                      | Default | Description                                                   |
| :----------- | :---------------------------------------- | :------ | :------------------------------------------------------------ |
| id           | string                                    |         | for unique identification.                                    |
| isChecked    | boolean                                   |         | If true, the component appears selected.                      |
| isEnabled    | boolean                                   | true    | If false,  the control will be disabled.                      |
| label        | string                                    |         | The text to be used in an enclosing label element.            |
| onChange     | function                                  |         | The event source of the callback.                             |
| onClick      | function                                  |         | The event source of the callback.                             |
| umClass      | string                                    |         | Add custom class name                                         |
| umLabelClass | string                                    |         | Add custom class name for label                               |
| umStyle      | enum,['primary', 'secondary'. 'default' ] | primary | should be any of the mentioned                                |
| style        | object                                    |         | Add custom css property.See Style API below for more details. |
| rtl          | boolean                                   | false   |                                                               |

# Style Api
|         | Description                                          |
| :------ | :--------------------------------------------------- |
| wrapper | Styles applied to the root element.                  |
| checked | Styles applied to the root element if checked={true} |



# Usage
```js
import { Radio } from 'finablr-ui';

<Radio
    isChecked={this.state.selectedValue === 'male'}
    onChange={this.handleChange}
    umStyle="primary"
    value="male"
    name="radio-button-demo"
    aria-label="A"
/>

<h2>With label</h2>
<Radio
    isChecked={this.state.selectedValue === 'female'}
    onChange={this.handleChange}
    name="mainRAid"
    value="female"
    umClass="custom-class"
    umStyle="secondary"
    label="Label 1"
    umLabelClass="label-class"
/>


 ```

# Event Handler

```js

function handleChange(e){
    // e = event object
}

<Radio
    isChecked={this.state.selectedValue === 'trans'}
    onChange={this.handleChange}
    name="mainRAid"
    value="trans"
    umClass="custom-class"
    umStyle="secondary"
    label="Label 1"
    umLabelClass="label-class"
/>


```
