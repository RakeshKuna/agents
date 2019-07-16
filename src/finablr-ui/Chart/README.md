# Props
| Props          | Type                   | Default | Description                                            |
| :------------- | :--------------------- | :------ | :----------------------------------------------------- |
| labels*        | array                  |         | labels to distinguish datasets.                        |
| datasets*      | array                  |         | array of object with data, colors and other properties |
| id             | string                 |         | for unique identification.                             |
| showTooltip    | boolean                | true    | if false, the tooltip hides.                           |
| showLegend     | boolean                | true    | if false, the legend hides.                            |
| tooltipStyle   | object                 |         | to configure tooltip.                                  |
| isInteractive  | boolean                | true    | if false, the chart becomes non intractive.            |
| legendPosition | oneOf["top", "bottom"] | bottom  | position of the legend.                                |
| umLegendClass  | string                 |         | class append to legend wrapper.                        |
| rtl            | boolean                | false   |                                                        |

# Datasets - Line
| Props                     | Type   | Default | Description                                                            |
| :------------------------ | :----- | :------ | :--------------------------------------------------------------------- |
| lineColor                 | Color  |         | the color of the line                                                  |
| lineWidth                 | number | 2       | the width of the line in pixels.                                       |
| pointBorderWidth          | number | 1       | the width of the point border in pixels.                               |
| pointRadius               | number | 3       | the radius of the point shape. If set to 0, the point is not rendered. |
| pointHitRadius            | number | 25      | the pixel size of the non-displayed point that reacts to mouse events. |
| pointHoverBackgroundColor | Color  |         | point background color when hovered.                                   |
| pointHoverBorderColor     | Color  |         | point border color when hovered.                                       |
| pointHoverBorderWidth     | number | 1       | Border width of point when hovered.                                    |
| pointHoverRadius          | number | 6       | the radius of the point when hovered.                                  |

# Datasets - Bar
| Props                | Type   | Default | Description                                 |
| :------------------- | :----- | :------ | :------------------------------------------ |
| backgroundColor      | Color  |         | the fill color of the bar                   |
| borderColor          | Color  |         | the color of the bar border.                |
| borderWidth          | number | 1       | the stroke width of the bar in pixels.      |
| hoverBackgroundColor | Color  |         | the fill colour of the bars when hovered.   |
| hoverBorderColor     | Color  |         | the stroke colour of the bars when hovered. |
| hoverBorderWidth     | number | 1       | the stroke width of the bars when hovered.  |

# Datasets - Pie & Dougnut
| Props                | Type     | Default | Description                                  |
| :------------------- | :------- | :------ | :------------------------------------------- |
| backgroundColor      | Color[]  |         | the fill color of the arcs in the dataset.   |
| borderColor          | Color[]  |         | the border color of the arcs in the dataset. |
| borderWidth          | Number[] |         | the border width of the arcs in the dataset. |
| hoverBackgroundColor | Color[]  |         | the fill colour of the arcs when hovered.    |
| hoverBorderColor     | Color[]  |         | the stroke colour of the arcs when hovered.  |
| hoverBorderWidth     | Number[] |         | the stroke width of the arcs when hovered.   |

# Tooltip Configuration
| Props           | Type   | Default           | Description                      |
| :-------------- | :----- | :---------------- | :------------------------------- |
| backgroundColor | Color  | 'rgba(0,0,0,0.8)' | background color of the tooltip. |
| bodyFontSize    | Number | 14                | title font size.                 |
| titleFontStyle  | String | 'bold'            | title font style                 |
| borderColor     | Color  | 'rgba(0,0,0,0)'   | color of the border.             |
| borderWidth     | Number | 0                 | size of the border               |

#### Note: 
 The color props is not mandatory, if not given it will generate a color range between primary color and secondary color from theme.


# Usage
```js
import { Line, Bar, Pie, Doughnut } from 'finablr-ui';

const labels1 =  ["Australia", "Hong Kong", "Malaysia", "UAE", "India"];
const datasets1 = [
    {
      data: [50, 50, 100, 100, 100],
      backgroundColor: ["#37a3ec", "#25479e", "#3667e5", "#3667fe", "#25479e"],
      hoverBackgroundColor: ["#37a3ec", "#25479e", "#3667e5", "#3667fe", "#25479e"],
    },
  ];

  const labels2 = ["AUS", "UAE", "KWT", "QAT", "UK", "USA", "IND"];
  const datasets2 =[
    {
      label: "PV",
      backgroundColor: "rgba(37,71,158,0.8)",
      lineColor: "rgba(37,71,158,1)",
      hoverBackgroundColor: "rgba(37,71,158,1)",
      hoverBorderColor: "rgba(37,71,158,1)",
      data: [2005, 7556, 4580, 6512, 4511, 5290, 5050],
    },
    {
      label: "UV",
      backgroundColor: "rgba(55,163,236,0.8)",
      lineColor: "rgb(55,163,236,1)",
      hoverBackgroundColor: "rgba(55,163,236,1)",
      hoverBorderColor: "rgba(55,163,236,1)",
      data: [4565, 5259, 6580, 3281, 5056, 1555, 6440],
    },
  ];

//  Doughnut

<Doughnut labels={labels} datasets={datasets1} />

//  Pie

<Pie labels={labels} datasets={datasets1} />

//  Line

<Line labels={barlabels} datasets={datasets2} />

//  Bar

<Bar
    labels={barlabels}
    datasets={datasets2}
    legend={legend}
/>


 ```

# Event Handler

```js

const onClick = (e, item) => {
        console.log("on click e", e);
        console.log("on click item", item);
    };

const getElementAtEvent = (ChartElement, event) => {
    };
  
<Bar
  labels={barlabels}
  datasets={datasets2}
  legend={legend}
  onClick={onClick}
  getElementAtEvent={getElementAtEvent}
/>


```
