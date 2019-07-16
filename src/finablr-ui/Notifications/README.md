# Props
| Props         | Type                                                | Default                                                                                    | Description                                                                                                                                                                                                    |
| :------------ | :-------------------------------------------------- | :----------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id            | string                                              |                                                                                            | id for the notification                                                                                                                                                                                        |
| children      | node                                                |                                                                                            | content for the notification                                                                                                                                                                                   |
| onClose       | function                                            |                                                                                            | close event for notification                                                                                                                                                                                   |
| showCloseIcon | boolean                                             | true                                                                                       | show close button. If showCloseIcon is true, then the values of delay, delayShow, delayHide props should be 0                                                                                                  |
| customIcon    | string, DOM elements                                |                                                                                            | for custom icons                                                                                                                                                                                               |
| delay         | number                                              | 0                                                                                          | delay timer applies delay for show and hide. If delay prop is used, then showCloseIcon flag should be false                                                                                                    |
| delayShow     | number                                              | 0                                                                                          | delayShow timer applies delay for displaying the notification. If delayShow prop is used, then showCloseIcon flag should be false. Value of delay will be considered if both delay and delayShow are assigned. |
| delayHide     | number                                              | 0                                                                                          | delayHide timer applies delay for displaying the notification. If delayHide prop is used, then showCloseIcon flag should be false. Value of delay will be considered if both delay and delayHide are assigned. |
| tabIndex      | number                                              |                                                                                            | tab-index for notification                                                                                                                                                                                     |
| showIcon      | boolean                                             | true                                                                                       | show/hide icon                                                                                                                                                                                                 |
| placement     | oneof["top-right", "bottom-right", "bottom-left"]   | top-right                                                                                  | placement for the notification.                                                                                                                                                                                |
| top           | string                                              | top value should be provided only when top-right placement is defined                      |
| bottom        | string                                              | bottom value should be provided only when bottom-right or bottom-left placement is defined |
| left          | string                                              | 20px                                                                                       | left value should be provided only when bottom-left placement is defined                                                                                                                                       |
| right         | string                                              | 20px                                                                                       | right value should be provided only when bottom-right or top-right placement is defined                                                                                                                        |
| umClass       | string                                              | for custom classes                                                                         |
| umStyle       | oneof['warning', 'success',"error", "information" ] | information                                                                                | different types of notification                                                                                                                                                                                |
| style         | object                                              |                                                                                            | CSS object to override the style                                                                                                                                                                               |
| rtl           | boolean                                             | false                                                                                      |


# Usage
```js
import { Notifications } from 'finablr-ui';

<Notifications
    umStyle="warning"
    umClass="notificationClass"
    heading="I am warning notification"
    content="Lorem ipsum dolor sit amet consectetur adiper scing, elit sed do"
    style={{ top: "60px", right: "20px" }}
/>

<Notifications
    umStyle="warning"
    umClass="notificationClass"
    heading="I am warning notification"
    content="Lorem ipsum dolor sit amet consectetur adiper scing, elit sed do"
    delay={2000}
/>

<Notifications
    umStyle="warning"
    umClass="notificationClass"
    heading="I am warning notification"
    content="Lorem ipsum dolor sit amet consectetur adiper scing, elit sed do"
    delayShow={2000}
/>

<Notifications
    umStyle="warning"
    umClass="notificationClass"
    heading="I am warning notification"
    content="Lorem ipsum dolor sit amet consectetur adiper scing, elit sed do"
    delayHide={2000}
/>


 ```

# Event Handler

```js
function closeBtnClick(){
    // custom code
}

function onMouseOver(e){
    // e = event object
}

<Notifications
    umStyle="warning"
    umClass="notificationClass"
    heading="I am warning notification"
    content="Lorem ipsum dolor sit amet consectetur adiper scing, elit sed do"
    style={{ top: "60px", right: "20px" }}
    onMouseOver={onMouseOver}
/>
<Notifications
    umStyle="warning"
    umClass="notificationClass"
    heading="I am warning notification"
    content="Lorem ipsum dolor sit amet consectetur adiper scing, elit sed do"
    style={{ top: "60px", right: "20px" }}
    closeBtnClick={closeBtnClick}
/>


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
<Notifications umStyle="warning"
    umClass="notificationClass"
    heading="I am warning notification"
    content="Lorem ipsum dolor sit amet consectetur adiper scing, elit sed do"
    style={{ top: "60px", right: "20px" }} 
    customIcon={<CustomIconComponent />} 
/>

```