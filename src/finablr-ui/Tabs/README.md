# Tabs Props

| Props         | Type                                 | Default | Description                                                                                                                                                                |
| ------------- | ------------------------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children*     | node                                 |         | the content of the component.                                                                                                                                              |
| id            | string &#124; number                 |         | HTML id attribute, necessary for accessibility                                                                                                                             |
| value         | any                                  |         | value of the currently selected Tab.                                                                                                                                       |
| centered      | boolean                              | false   | if true, the tabs will be centered.                                                                                                                                        |
| stepAction    | boolean                              | false   | if true, the ```tab``` after the active ```tab``` wil be in disabled state.                                                                                                |
| fullWidth     | boolean                              | false   | if true, the tabs will grow to use all the available space.                                                                                                                |
| scrollable    | boolean                              | false   | true invokes scrolling properties and allow for horizontally scrolling (or swiping) the tab bar.                                                                           |
| onChange      | function                             |         | callback for change event.                                                                                                                                                 |
| scrollButtons | 'auto', 'on', 'off'                  | auto    | behavior of scroll buttons when tabs are set to scroll auto will only present them on medium and larger viewports on will always present them off will never present them. |
| umStyle       | ['primary', 'secondary'. 'default' ] | primary | should be any of the mentioned                                                                                                                                             |
| style         | object                               |         | Override or extend the styles applied to the component. [Refer Tabs Style props](#tabs-style-props).                                                                       |
| rtl           | boolean                              | false   |                                                                                                                                                                            |

# Tabs style props

| Props             | Description                                                                           |
| ----------------- | ------------------------------------------------------------------------------------- |
| root              | styles applied to the root element.                                                   |
| flexContainer     | styles applied to the flex container element.                                         |
| centered          | styles applied to the flex container element if centered={true} & scrollable={false}. |
| scroller          | styles applied to the tablist element.                                                |
| fixed             | styles applied to the tablist element if scrollable={false}.                          |
| scrollable        | styles applied to the tablist element if scrollable={true}.                           |
| scrollButtons     | styles applied to the ScrollButtonComponent component.                                |
| scrollButtonsAuto | styles applied to the ScrollButtonComponent component if sscrollButtons="auto".       |
| indicator         | styles applied to the TabIndicator component.                                         |

# Tab props

| Props     | Type    | Default | Description                                                                                        |
| --------- | ------- | ------- | -------------------------------------------------------------------------------------------------- |
| id        | string  |         | unique identification string                                                                       |
| label     | node    |         | the label element.                                                                                 |
| value     | any     |         | can provide your own value. Otherwise, we fallback to the child position index.                    |
| icon      | node    |         | the icon element.                                                                                  |
| badge     | node    |         | the badge element.                                                                                 |
| isEnabled | boolean | true    | if false, the tab will be disabled.                                                                |
| style     | object  |         | Override or extend the styles applied to the component. [Refer Tab Style props](#tab-style-props). |

# Tab style props

| Props              | Description                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------ |
| root               | styles applied to the root element.                                                        |
| labelIcon          | styles applied to the root element if both icon and label are provided.                    |
| textColorInherit   | styles applied to the root element if textColor="inherit".                                 |
| textColorPrimary   | styles applied to the root element if textColor="primary".                                 |
| textColorSecondary | styles applied to the root element if textColor="secondary".                               |
| selected           | styles applied to the root element if selected={true} (controlled by the Tabs component).  |
| disabled           | styles applied to the root element if disabled={true} (controlled by the Tabs component).  |
| fullWidth          | styles applied to the root element if fullWidth={true} (controlled by the Tabs component). |
| wrapper            | styles applied to the icon and label's wrapper element.                                    |
| labelContainer     | styles applied to the label container element if label is provided.                        |
| label              | styles applied to the label wrapper element if label is provided.                          |
| labelWrapped       | styles applied to the label wrapper element if label is provided and the text is wrapped.  |

# Usage

```js
import { Tabs, Tab, Badge, Icon } from 'finablr-ui';

<Tabs value={value} umStyle="primary" onChange={this.handleChange}>
    <Tab badge={<Badges umStyle="orange" type="notifiyBadge" value="45" />} value="one" label="ITEM 1" />
    <Tab value="two" label="ITEM 2" />
    <Tab value="three" label="ITEM 3" />
</Tabs>

<Tabs value={value} umStyle="default" onChange={this.handleChange}>
    <Tab value="one" label="ITEM 1" />
    <Tab value="two" label="ITEM 2" />
    <Tab value="three" label="ITEM 3" />
</Tabs>

<Tabs
    value={type1ValueScrollable}
    umStyle="primary"
    scrollable
    onChange={this.handleChangeType1Scrollable}
>
    <Tab icon={<Icon iconName="file-excel" />} />
    <Tab icon={<Icon iconName="dice-5" />} />
    <Tab icon={<Icon iconName="cards-heart" />} />
    <Tab icon={<Icon iconName="camera-enhance" />} />
    <Tab icon={<Icon iconName="camera-front-variant" />} />
    <Tab icon={<Icon iconName="gas-station" />} />
    <Tab icon={<Icon iconName="camera-timer" />} />
</Tabs>
```
