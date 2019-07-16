# Props
### Sliders

| Props             | Type                                              | Default                            | Description                                                                                                                                                                                            |
| :---------------- | :------------------------------------------------ | :--------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sliderId          | string                                            |                                    |                                                                                                                                                                                                        |
| values            | array                                             | [0]                                | an array of numbers. one or more values can be supplied to have single or multi sliders                                                                                                                |
| mode              | oneOf(["allowCross", "noAllowCross", "pushable"]) | allowCross                         | `allowCross` will allow handles to cross each other. `noAllowCross` will keep the sliders from crossing and separated by a step. `pushable` will make the handles pushable and keep them a step apart. |
| allowCross        | boolean                                           | true                               | allow handles to cross each other if there are more than one sliders                                                                                                                                   |
| min               | number                                            | 0                                  | minimum value for slider                                                                                                                                                                               |
| max               | number                                            | 100                                | maximum value for slider                                                                                                                                                                               |
| marks             | number                                            | 0                                  | to enable slider marks the values always would be greater than 0                                                                                                                                       |
| step              | number                                            | 1                                  | step value for slider                                                                                                                                                                                  |
| isVertical        | boolean                                           | false                              | set to true if the slider to be displayed vertically and provide height to `rootStyle` api. Refer CSS api.                                                                                             |
| isEnabled         | boolean                                           | true                               | set to false if the slider has to be disabled                                                                                                                                                          |
| hasTooltip        | boolean                                           | false                              | set to true to display tooltip                                                                                                                                                                         |
| showTooltipBg     | boolean                                           | true                               | set to false to hide the tooltip background image. Recommended to hide the tooltip background if the value is greater than 3 digits                                                                    |
| showAlwaysTooltip | boolean                                           | false                              | set to true to display tooltip forever                                                                                                                                                                 |
| tabIndex          | number                                            |                                    | tab index for slider                                                                                                                                                                                   |
| handle            | function                                          |                                    | a handle generator to customize handle. It provides id, value, percentage of slider                                                                                                                    |
| track             | function                                          |                                    | a track generator to customize track. It provides id(string), source{id, value, percent} and target{id, value, percent} of slider                                                                      |
| tick              | function                                          |                                    | a tick generator to customize tick. It provides id, value, percentage of slider                                                                                                                        |
| umClass           | string                                            | add custom class to override style |                                                                                                                                                                                                        |
| style             | object                                            |                                    | CSS object to override the style [see style](#style)                                                                                                                                                   |
| rtl               | boolean                                           | false                              | set to true to enable RTL                                                                                                                                                                              |

# Events

| Props          | Type     | Default | Description                                       |
| :------------- | :------- | :------ | :------------------------------------------------ |
| onBeforeChange | function |         | invoked for the change. Returns value of slider   |
| onChange       | function |         | callback firing when value changes. Returns value |

# Style
| Name           | Type   | Description                                                   |
| :------------- | :----- | :------------------------------------------------------------ |
| root           | object | CSS object to override the root slider style                  |
| disabled       | object | CSS object to override the root disabled slider style         |
| trackRoot      | object | CSS object to override the track common style                 |
| track          | object | CSS object to override the track style if slider is enabled   |
| trackDisabled  | object | CSS object to override the track style if slider is disabled  |
| railRoot       | object | CSS object to override the rail common style                  |
| rail           | object | CSS object to override the rail style if slider is enabled    |
| railDisabled   | object | CSS object to override the rail style if slider is disabled   |
| handleRoot     | object | CSS object to override the handle common style                |
| handle         | object | CSS object to override the handle style if slider is enabled  |
| handleDisabled | object | CSS object to override the handle style if slider is disabled |
| tickValue      | object | CSS object to override the tick value style                   |
| tickMark       | object | CSS object to override the tick mark style                    |
| tooltip        | object | CSS object to override the tooltip style with background      |
| tooltipRoot    | object | CSS object to override the tooltip common style               |
| tooltipNoBg    | object | CSS object to override the tooltip style with out background  |


# Usage
#### Import Component
```js
import { Sliders } from "finablr-ui";
```

#### Basic Slider
```js
<Sliders min={0} max={50} />
```

#### Vertical Slider
```js
<Sliders min={0} max={50} rootStyle={{ height: 400 }} isVertical />
```

#### RTL Slider
```js
<Sliders rtl />
```

#### Show Tooltip
```js
<Sliders min={-50} max={50} hasTooltip />
```

#### Pushable
```js
<Sliders values={[10, 30, 50, 80]} mode="pushable" />
```

#### No Allow Cross
```js
<Sliders values={[10, 30]} mode="noAllowCross" />
```

#### Slider with min and max values
```js
<Sliders min={0} max={500} hasTooltip />
```

#### Slider with marks
```js
<Sliders min={0} max={100} marks={10} />
```

#### Slider with marks and step
```js
<Sliders min={0} max={100} marks={5} step={20} />
```

#### Disabled Slider
```js
<Sliders isEnabled={false} values={[30]} />
```

#### Tooltip without background
```js
<Sliders hasTooltip showTooltipBg={false} />
```

#### Show Tooltip always
```js
<Sliders showAlwaysTooltip />
```
