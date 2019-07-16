import React from "react";
import { emptyFunction } from "./index";

function ExceptionHandler(
  Component,
  FallbackComponent = <span>Something went wrong!!!</span>,
  errorCallback = emptyFunction
) {
  return class extends React.Component {
    constructor() {
      super();

      this.state = {
        hasError: false,
      };
    }

    // Error boundary life cycle
    componentDidCatch(error, info) {
      this.setState({ hasError: true });

      errorCallback(error, info);
    }

    render() {
      const { hasError } = this.state;
      if (hasError) {
        return FallbackComponent;
      }

      return <Component {...this.props} />;
    }
  };
}

export default ExceptionHandler;
