# Props
### DatePicker

| Props       | Type               | Default  | Description                                          |
| :---------- | :----------------- | :------- | :--------------------------------------------------- |
| id          | string             |          |                                                      |
| value       | string             |          | picker value                                         |
| label       | string             |          | text to be used in an enclosing label element        |
| placeholder | string             |          | place default value inside textbox                   |
| isRequired  | boolean            | false    | if true, onBlur it will throw error when it is empty |
| cancelLabel | node &#124; string | 'Cancel' | "Cancel" label message                               |
| format      | string             |          | format string                                        |
| okLabel     | node &#124; string | 'OK'     | "OK" label message                                   |
| onOpen      | function           |          | on open callback                                     |
| onChange    | function           |          | callback firing when date accepted                   |
| onClose     | function           |          | on close callback                                    |
| rtl         | boolean            | false    | input component RTL to be handled                    |

#### Note: 
1. Since the DatePicker is a modal popup, the RTL has to be handled at page level `direction: rtl`.
2. Datepicker's appearance built based on material-ui theme. The stylesheet cannot be overrided using `umStyle` or `umClass` due to restriction in the material component.
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
    import { DatePicker } from "finablr-ui";

    <DatePicker placeholder="dd/mm/yyyy" label="Enter Date"/>

 ```
