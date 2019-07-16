
# Exception handler HOC

### Method
```js
ExceptionHandler(Component, FallbackComponent, errorCallback);
```

### Description
Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.

##### Component
> Component to be validated.

##### FallbackComponent
> Component or Node used as fallback when error occurs.

##### errorCallback
> Callback method to emit error and info.

### Usage
```js
import { ExceptionHandler } from 'finablr-ui';

// Error Callback
const errorCallback = (error, info) => {
  console.log(error, info);
  //Do logic for error call back
};

// A class or component
class SelectableComponent extends React.Component {
    simpleSelect = value => {
    suggestions.forEach((k, i) => {
      // if (suggestions[i].label === value) {
      if (suggestions[i][0].label === value) {
        console.log(`Selected index: ${suggestions[i]}`);
      }
    });
  };
  render() {
    return (
      <Selectable
          placeholder="Search a country (start with a)"
          id="simpleSelect"
          options={suggestions}
          onChange={this.simpleSelect}
        />
    );
  }
}

// The component with Error handler HOC
const ErrorComponent = ExceptionHandler(
  SelectableComponent,
  <p className="error">Something went wrong!!</p>,
  errorCallback
);

<ErrorComponent />

 ```


