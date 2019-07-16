import React from "react";
import { Doughnut } from "react-chartjs-2";
import PropTypes from "prop-types";
import "chartjs-plugin-datalabels";
import _ from "lodash";
import styles from "./styles/style";
import { css } from "../utils";
import WithTheme from "../utils/HOC/WithTheme";
import withLifeCycle from "./ChartHOC";
import theme from "../utils/theme";

class DoughnutChart extends React.Component {
  generateRGB = string => string.match(/\w\w/g).map(b => parseInt(b, 16));

  randomColor = (data, color) => {
    let newColorArr = [];
    if (!color) {
      newColorArr = [];
    } else {
      newColorArr = color;
    }
    data.map((d, i) => {
      if (!newColorArr[i]) {
        const rgb1 = this.generateRGB(theme.palette.primary.main);
        const rgb2 = this.generateRGB(theme.palette.secondary.main);
        const rgb3 = [];
        for (let j = 0; j < 3; j += 1)
          rgb3[j] = (rgb1[j] + Math.random() * (rgb2[j] - rgb1[j])) | 0;
        const newColor = `#${rgb3
          .map(n => n.toString(16))
          .map(s => "00".slice(s.length) + s)
          .join("")}`;
        newColorArr.push(newColor);
      }
      return d;
    });
    return newColorArr;
  };

  render() {
    const {
      classes,
      chartRef,
      chartLegendRef,
      labels,
      datasets,
      options,
      showLegend,
      showTooltip,
      showValue,
      isInteractive,
      umLegendClass,
      legendPosition,
      tooltipStyle,
      onClick,
      onResize,
      rtl,
      getElementAtEvent,
      ...rest
    } = this.props;
    let doughnutDataset = _.cloneDeep(datasets);
    const doughnutLabels = _.cloneDeep(labels);
    doughnutDataset = doughnutDataset.map(data => ({
      backgroundColor: data.backgroundColor || this.randomColor(data.data, data.backgroundColor),
      ...data,
    }));
    let doughnutOptions = options;

    doughnutOptions = {
      animation: {
        duration: !isInteractive ? 0 : 1000,
      },
      onClick,
      ...doughnutOptions,
      legend: {
        display: false,
      },
      tooltips: {
        display: !!showTooltip,
        titleFontSize: 14,
        bodyFontSize: 14,
        footerFontSize: 14,
        xPadding: 20,
        yPadding: 10,
        displayColors: false,
        ...tooltipStyle,
      },
      plugins: {
        datalabels: {
          color: "#ffffff",
          textAlign: "center",
          display: !!showValue,
        },
      },
    };
    if (!isInteractive) {
      doughnutOptions.events = [];
    }
    const data = { labels: doughnutLabels, datasets: doughnutDataset };

    return (
      <div className={css(classes.chartWrapper)}>
        <Doughnut
          ref={chartRef}
          data={data}
          options={doughnutOptions}
          getElementAtEvent={getElementAtEvent}
          {...rest}
        />
        <div ref={chartLegendRef} className={css(classes.legend, umLegendClass)} />
      </div>
    );
  }
}

DoughnutChart.propTypes = {
  classes: PropTypes.object.isRequired,
  labels: PropTypes.array.isRequired,
  datasets: PropTypes.array.isRequired,
  options: PropTypes.object,
  legend: PropTypes.object,
  tooltipStyle: PropTypes.object,
  showLegend: PropTypes.bool,
  showValue: PropTypes.bool,
  showTooltip: PropTypes.bool,
  isInteractive: PropTypes.bool,
  legendPosition: PropTypes.oneOf(["top", "bottom"]),
  rtl: PropTypes.bool,
  onClick: PropTypes.func,
  getElementAtEvent: PropTypes.func,
  onResize: PropTypes.func,
  umLegendClass: PropTypes.string,
  chartRef: PropTypes.any,
  chartLegendRef: PropTypes.any,
};

DoughnutChart.defaultProps = {
  showLegend: true,
  showTooltip: true,
  showValue: true,
  isInteractive: true,
  rtl: false,
  legendPosition: "bottom",
};

export default WithTheme(withLifeCycle(DoughnutChart), styles)();
