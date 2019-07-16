# Props
| Props        | Type                                      | Default | Description                                        |
| :----------- | :---------------------------------------- | :------ | :------------------------------------------------- |
| id           | string                                    |         | for unique identification.                         |
| isChecked    | boolean                                   |         | If true, the component appears selected.           |
| isEnabled    | boolean                                   | true    | If false,  the control will be disabled..          |
| label        | string                                    |         | The text to be used in an enclosing label element. |
| onChange     | function                                  |         | The event source of the callback.                  |
| onClick      | function                                  |         | The event source of the callback.                  |
| umClass      | string                                    |         | Add custom class name                              |
| umLabelClass | string                                    |         | Add custom class name for label                    |
| umStyle      | enum,['primary', 'secondary'. 'default' ] | primary | should be any of the mentioned                     |
| style        | object                                    |         | Add custom css property                            |
| rtl          | boolean                                   | false   |                                                    |


# Style Api
|         | Description                                          |
| :------ | :--------------------------------------------------- |
| wrapper | Styles applied to the root element.                  |
| checked | Styles applied to the root element if checked={true} |



# Usage
```js
import { CheckBox } from 'finablr-ui';

class SampleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      isChecked: props.isChecked,
    };
  }

  handleChange() {
    const { isChecked } = this.state;
    this.setState({ isChecked: !isChecked });
  }
  
  render() {
    return (
      <CheckBox
        isChecked={this.state.isChecked}
        onChange={this.handleChange}
        isEnabled
        umClass="custom-class"
        umStyle="default"
        label="default"
        umLabelClass="custom-label-class"
      />
    );
  }
}



 ```

# Event Handler

```js
handleChange() {
    this.setState({ isChecked: !this.state.isChecked });
}

<CheckBox
    isChecked={this.state.isChecked}
    onChange={this.handleChange}
    isEnabled
    umClass="custom-class"
    umStyle="default"
    label="default"
    umLabelClass="custom-label-class"
    />

```
