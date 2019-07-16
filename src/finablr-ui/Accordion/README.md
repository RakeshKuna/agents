
# Tab props
| Props           | Type    | Default | Description                                                |
| --------------- | ------- | ------- | ---------------------------------------------------------- |
| children*       | node    |         | the content of the component.                              |
| id              | string  |         | unique identification string                               |
| defaultExpanded | boolean | false   | if true, expands the panel by default.                     |
| expanded        | boolean | false   | if true, expands the panel, otherwise collapse it.         |
| panelHeading    | node    |         | node that placed as title                                  |
| panelAction     | node    |         | node that placed as footer action                          |
| expandIcon      | node    |         | the icon to display as the expand indicator.               |
| iconButtonProps | object  |         | properties applied to the expand icon wrapper.             |
| isEnabled       | boolean | true    | if false, the tab will be disabled.                        |
| style           | object  |         | CSS object to override the style [see style](#style)       |
| umPanelClass    | string  |         | custom class name to override the accordion root panel.    |
| umHeadingClass  | string  |         | custom class name to override the accordion header.        |
| umBodyClass     | string  |         | custom class name to override the accordion body.          |
| umActionClass   | string  |         | custom class name to override the accordion action footer. |
| rtl             | boolean | false   |                                                            |



# Style
| Name    | Type   | Description                                                             |
| :------ | :----- | :---------------------------------------------------------------------- |
| panel   | object | CSS object to override the panel, [see panel style](#panel-style)       |
| heading | object | CSS object to override the heading, [see heading style](#heading-style) |
| body    | object | CSS object to override the body root.                                   |
| action  | object | CSS object to override the action, [see action style](#action-style)    |

# Panel style
| Name     | Type   | Description                                                      |
| :------- | :----- | :--------------------------------------------------------------- |
| root     | object | CSS styles applied to the root element.                          |
| expanded | object | CSS styles applied to the root element if ```expanded={true}```. |
| disabled | object | CSS styles applied to the root element if ```disabled={true}```. |

# Heading style
| Name       | Type   | Description                                                                      |
| :--------- | :----- | :------------------------------------------------------------------------------- |
| root       | object | CSS styles applied to the root element.                                          |
| expanded   | object | CSS styles applied to the root element if ```expanded={true}```.                 |
| focused    | object | CSS styles applied to the root and children wrapper elements when focused.       |
| disabled   | object | CSS styles applied to the root element if ```disabled={true}```.                 |
| content    | object | CSS styles applied to the children wrapper element.                              |
| expandIcon | object | CSS styles applied to the ```IconButton``` component when expandIcon is supplied |


# Action style
| Name   | Type   | Description                             |
| :----- | :----- | :-------------------------------------- |
| root   | object | CSS styles applied to the root element. |
| action | object | CSS styles applied to the children.     |

# Usage
```sh
import { Accordion, Button } from 'finablr-ui';


function actionCmpt() {
  return (
    <div>
      <Button size="small">Cancel</Button>
      <Button size="small" color="primary">
        Save
      </Button>
    </div>
  );
}

<Accordion
    expanded={expanded === "panel1"}
    panelHeading={<div>Panel 1</div>}
    expandIcon={<Icon iconName="chevron-down" />}
    onChange={this.handleChange("panel1")}
>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
    est laborum.
</Accordion>


<Accordion
    panelHeading={<div>Panel 2</div>}
    panelAction={actionCmpt()}
    expandIcon={<Icon iconName="chevron-down" />}
>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</Accordion>
 ```

