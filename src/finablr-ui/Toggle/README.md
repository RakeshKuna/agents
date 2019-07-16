# Props
| Props        | Type                                      | Default | Description                                               |
| ------------ | ----------------------------------------- | ------- | --------------------------------------------------------- |
| id           | string                                    |         | for unique identification.                                |
| label        | string                                    |         | the text to be used in an enclosing label element.        |
| isChecked    | boolean                                   |         | if true, the component appears selected.                  |
| isEnabled    | boolean                                   | true    | if false,  the control will be disabled..                 |
| onChange     | function                                  |         | callback for change event.                                |
| umLabelClass | string                                    |         | add custom class name for label                           |
| umStyle      | oneof['primary', 'secondary'. 'default' ] | primary | should be one from the list.                              |
| umClass      | string                                    |         | add custom class name                                     |
| style        | object                                    |         | add custom css property [Refer Style props](#style-props) |
| rtl          | boolean                                   | false   |

# Style props
| Name        | Description                                                           |
| ----------- | --------------------------------------------------------------------- |
| wrapper     | Styles applied to the root element.                                   |
| icon        | Styles applied to the icon.                                           |
| iconChecked | Styles applied the icon element when checked.                         |
| checked     | Styles applied to the internal SwitchBase component's checked class.  |
| disabled    | Styles applied to the internal SwitchBase component's disabled class. |
| bar         | Styles applied to the bar element.                                    |
| checkedBar  | Styles applied to the bar element when checked.                       |

# Usage
```js
import { Toggle } from 'finablr-ui';

<Toggle
    umStyle="primary"
    isChecked
    isEnabled
    label="PRIMARY"
    umLabelClass="label-custom-class"
    onChange={onChange}
/>
<Toggle umStyle="secondary" label="SECONDARY"  onChange={onChange} />
<Toggle umStyle="default" label="DEFAULT" />
<Toggle umStyle="default" isEnabled={false} />

 ```

# Custom Style example
```js

<Toggle
    umStyle="primary"
    isEnabled
    label="Custom Style"
    style={{
        bar: {
            borderRadius: 13,
            width: 42,
            height: 25,
            marginTop: -13,
            marginLeft: -21,
            border: "solid 1px",
            borderColor: "rgb(255,0,0,.8)",
            backgroundColor: theme.palette.common.white,
            transition: theme.transitions.create(["background-color", "border"]),
        },
        icon: {
            width: 25,
            height: 25,
        },
        checked: {
            color: theme.palette.common.white,
            transform: "translateX(18px)",
        },
        checkedBar: {
            backgroundColor: "red",
        },
    }}
/>
 ```

# Event Handler

```js

function onChange(e){
    // e = event object
}

<Toggle umStyle="primary" isEnabled={false} onChange={onChange} />


```
