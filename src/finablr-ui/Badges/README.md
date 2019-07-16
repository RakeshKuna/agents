# Props
| Props       | Type                                                                                   | Default      | Description                          |
| :---------- | :------------------------------------------------------------------------------------- | :----------- | :----------------------------------- |
| value*      | string, number                                                                         |              | the value to be shown                |
| id          | string                                                                                 |              | for unique identification.           |
| type        | oneOf['notifiyBadge', 'labelBadge']                                                    | notifiyBadge |                                      |
| onMouseOver | function                                                                               |              | The event source of the callback.    |
| onfocus     | function                                                                               |              | The event source of the callback.    |
| umStyle     | oneOf['red', 'green', 'blue', 'orange', 'black', 'disabled', 'primary', 'secondary', ] | primary      |                                      |
| umClass     | string                                                                                 |              | custom class name to overide the CSS |
| style       | object                                                                                 |              | CSS object to overide the style      |

# Usage
```js
import { Badges } from 'finablr-ui';

<Badges
    id="BadgeRed"
    umStyle="red"
    umClass="custom-class"
    style={{ fontSize: "20px", "background-color": "#ccc" }}
    type="labelBadge"
    value="Label 3"
/>


<Badges umStyle="primary" type="notifiyBadge" value="23" umClass="custom-class" />
<Badges umStyle="green" type="notifiyBadge" value="67" />

    

 ```

# Event Handler

```js

function mouseOverEventHandler(e){
    // e = event object
}

<Badges umStyle="primary" type="notifiyBadge" value="45" onMouseOver={mouseOverEventHandler} />


```
