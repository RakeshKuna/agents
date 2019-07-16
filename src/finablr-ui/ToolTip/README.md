# Props
### ToolTip

| Props     | Type                                                                                                                                                    | Default | Description                                                                                                   |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ | :------ | :------------------------------------------------------------------------------------------------------------ |
| id*       | string &#124; number                                                                                                                                    |         | HTML id attribute, necessary for accessibility                                                                |
| title*    | node or string                                                                                                                                          |         | tooltip title                                                                                                 |
| placement | oneOf['top', 'top-left', 'top-right', 'left', 'left-top', 'left-bottom', 'right', 'right-top', 'right-bottom', 'bottom', 'bottom-left', 'bottom-right'] | top     | tooltip placement                                                                                             |
| delay     | number                                                                                                                                                  | 0       | delay to show and hide tooltip in milliseconds                                                                |
| delayShow | number                                                                                                                                                  | 0       | delay to show tooltip in milliseconds, value of delay is considered if both delay and delay show are assigned |
| delayHide | number                                                                                                                                                  | 0       | delay to hide tooltip in milliseconds, value of delay is considered if both delay and delay show are assigned |
| onShow    | function                                                                                                                                                |         | Callback when the tooltip shown                                                                               |
| onHide    | function                                                                                                                                                |         | Callback when the tooltip closed                                                                              |
| style     | object                                                                                                                                                  |         | CSS object to override the style                                                                              |

### ToolTipWithArrow
| Props          | Type                                         | Default            | Description                                                                                                   |
| -------------- | -------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------- |
| id*            | string &#124; number                         |                    | HTML id attribute, necessary for accessibility                                                                |
| content        | node                                         |                    | tooltip content                                                                                               |
| placement      | oneOf['top', 'left', 'right', 'bottom']      | top                | tooltip placement                                                                                             |
| toShow         | oneOf['click', 'hover', 'focus']             | ['hover', 'focus'] | action or actions to trigger to show tooltip                                                                  |
| delay          | number                                       | 0                  | delay to show and hide tooltip in milliseconds                                                                |
| delayShow      | number                                       | 0                  | delay to show tooltip in milliseconds, value of delay is considered if both delay and delay show are assigned |
| delayHide      | number                                       | 0                  | delay to hide tooltip in milliseconds, value of delay is considered if both delay and delay show are assigned |
| onShow         | function                                     |                    | callback when the tooltip shown                                                                               |
| onHide         | function                                     |                    | callback when the tooltip closed                                                                              |
| style          | object {tooltip: {}, content: {}, arrow: {}} |                    | CSS object to override the style                                                                              |
| umClass        | string                                       |                    | custom class name to override the tooltip                                                                     |
| umClassContent | string                                       |                    | custom class to override the content div of the tooltip                                                       |
| umClassArrow   | string                                       |                    | custom class to override the arrow of the tooltip                                                             |
| rtl            | boolean                                      | false              |

# Usage
```js
    import { ToolTip, ToolTipWithArrow, TextButton } from 'finablr-ui';

    <ToolTip id="tooltip-top-left" title="Add" placement="top-left">
        <TextButton>top-left</TextButton>
    </ToolTip>

    <ToolTipWithArrow id="tooltip-top" content="Tooltip Content" placement="right">
        <span>tooltip right</span>
    </ToolTipWithArrow>

 ```

# Event Handler

```js

function onShowEventHandler(e){
    // e = event object
}
function onHideEventHandler(e){
    // e = event object
}

<ToolTip 
    id="tooltip-top-left"
    title="Add"
    placement="top-left"
    onShow={onShowEventHandler}
    onHide={onHideEventHandler}
    delayShow={100}
    delayHide={500}
>
    <TextButton>top-left</TextButton>
</ToolTip>

<ToolTipWithArrow 
    id="tooltip-top"
    content={<div>div with custom styles and content</div>}
    placement="top"
    onShow={onShowEventHandler}
    onHide={onHideEventHandler}
>
    <span>Tooltip with arrow</span>
</ToolTipWithArrow>


```
