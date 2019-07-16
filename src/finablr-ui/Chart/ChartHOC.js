import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

// This function takes a component...
function withLifeCycle(WrappedComponent) {
  // ...and returns another component...
  const WithLifeCycle = class extends React.Component {
    constructor(props) {
      super(props);
      // create a ref to chart DOM element

      this.chartRef = React.createRef();
      this.chartLegendRef = React.createRef();
    }

    componentDidMount() {
      const { showLegend, onResize } = this.props;
      if (showLegend) {
        const myLegendContainer = this.chartLegendRef.current;
        myLegendContainer.innerHTML = this.chartRef.current.chartInstance.generateLegend();
      }

      if (onResize) {
        global.window.addEventListener("resize", onResize);
      }
    }

    shouldComponentUpdate(nextProps) {
      return !_.isEqual(nextProps, this.props);
    }

    componentWillUnmount() {
      const { onResize } = this.props;
      if (onResize) {
        global.window.removeEventListener("resize", onResize);
      }
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return (
        <WrappedComponent
          chartRef={this.chartRef}
          chartLegendRef={this.chartLegendRef}
          {...this.props}
        />
      );
    }
  };

  WithLifeCycle.propTypes = {
    showLegend: PropTypes.bool,
    onResize: PropTypes.func,
  };

  WithLifeCycle.defaultProps = {
    showLegend: true,
  };
  return WithLifeCycle;
}

export default withLifeCycle;
