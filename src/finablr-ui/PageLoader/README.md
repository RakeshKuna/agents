# Props
# LinearProgress
| Props          | Type                      | Default                                                           | Description                                                 |
| :------------- | :------------------------ | :---------------------------------------------------------------- | :---------------------------------------------------------- |
| value*         | number                    |                                                                   | value of the progress indicator, Value between 0 and 100    |
| id             | string                    |                                                                   | id for the notification                                     |
| showPercentage | boolean                   | false                                                             | to show percentage text                                     |
| percentage     | function                  | (value, rtl) => (rtl ? &#96;%${value}&#96; : &#96;${value}%&#96;) | format of percentage text                                   |
| stripes        | boolean                   |                                                                   | to show stripes background in Progress bar                  |
| trackColor     | string                    |                                                                   | progress bar background color                               |
| pathColor      | string                    |                                                                   | progress bar color                                          |
| style          | object                    |                                                                   | CSS object to override the style [see style](#linear-style) |
| umStyle        | oneOf: primary, secondary | primary                                                           | theme style selection                                       |
| umClass        | string                    |                                                                   | add custom classname                                        |
| rtl            | boolean                   | false                                                             |                                                             |

**Note:** Use hex color code for trackColor when ```stripes=true```

### Linear Style
| Name       | Type   | Description                                     |
| :--------- | :----- | :---------------------------------------------- |
| root       | object | CSS object to override the root div style       |
| bar        | object | CSS object to override the bar                  |
| progress   | object | CSS object to override the progress bar         |
| stripes    | object | CSS object to override the when stripes enabled |
| percentage | object | CSS object to override the percentage text      |

# CircularProgress
| Props          | Type                      | Default                                                           | Description                                                   |
| :------------- | :------------------------ | :---------------------------------------------------------------- | :------------------------------------------------------------ |
| value*         | number                    |                                                                   | value of the progress indicator, Value between 0 and 100      |
| showPercentage | boolean                   | false                                                             | to show percentage text                                       |
| percentage     | function                  | (value, rtl) => (rtl ? &#96;%${value}&#96; : &#96;${value}%&#96;) | format of percentage text                                     |
| rtl            | boolean                   | false                                                             |                                                               |
| style          | object                    |                                                                   | CSS object to override the style [see style](#circular-style) |
| strokeWidth    | number                    |                                                                   | track bar width                                               |
| trackColor     | string                    |                                                                   | progress bar background color[color code]                     |
| pathColor      | string                    |                                                                   | progress bar color[color code]                                |
| umStyle        | oneOf: primary, secondary | primary                                                           | theme style selection                                         |
| umClass        | string                    |                                                                   | add custom classname                                          |

### Circular Style
| Name       | Type   | Description                                                |
| :--------- | :----- | :--------------------------------------------------------- |
| root       | object | CSS object to override the root div style                  |
| trail      | object | CSS object to override the trail component in the svg      |
| path       | object | CSS object to override the path component in the svg       |
| text       | object | CSS object to override the text component in the svg       |
| background | object | CSS object to override the background component in the svg |

# Usage
```js 

import { LinearProgress, CircularProgress } from "finablr-ui";

#Linear
<LinearProgress value={value} showPercentage style={{ root: { marginBottom: 20 } }} />

#RTL - Linear
<LinearProgress value={value}  rtl showPercentage style={{ root: { marginBottom: 20 } }} />

#circular
<CircularProgress value={value} showPercentage style={{ root: { marginBottom: 20 } }} />

#RTL - circular
<CircularProgress rtl value={value} showPercentage style={{ root: { marginBottom: 20 } }} />


 ```

