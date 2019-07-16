# Props
### TimePicker

| Props       | Type               | Default  | Description                                          |
| :---------- | :----------------- | :------- | :--------------------------------------------------- |
| id          | string             |          |                                                      |
| value       | string             |          | picker value                                         |
| label       | string             |          | text to be used in an enclosing label element        |
| is24hrs     | boolean            | false    | will show AM,PM                                      |
| placeholder | string             |          | place default value inside textbox                   |
| cancelLabel | node &#124; string | 'Cancel' | "Cancel" label message                               |
| okLabel     | node &#124; string | 'OK'     | "OK" label message                                   |
| format      | string             |          | format string                                        |
| showSeconds | boolean            | false    | show the seconds view                                |
| onOpen      | function           |          | on open callback                                     |
| onChange    | function           |          | callback firing when date accepted                   |
| onClose     | function           |          | on close callback                                    |
| tabIndex    | number             |          | tab-index for notification                           |
| isRequired  | boolean            | false    | if true, onBlur it will throw error when it is empty |
| rtl         | boolean            | false    | input component RTL to be handled                    |

#### Note: 
1. Since the TimePicker is a modal popup, the RTL has to be handled at page level `direction: rtl`.
2. Timepicker's appearance built based on material-ui theme. The stylesheet cannot be overrided using `umStyle` or `umClass` due to restriction in the material component.
3. To override the styles, need to update the `utils/theme.js` 
#### For instance:-
```js
MuiPickersToolbar: {
      toolbar: {
        backgroundColor: colorPattern.primary,
      },
    },
```

# Usage
```js
    import { TimePicker } from "finablr-ui";

    <TimePicker placeholder="hh:mm:ss" label="Enter Time"/>

 ```
