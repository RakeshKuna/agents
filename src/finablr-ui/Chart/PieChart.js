import React from "react";
import { Pie } from "react-chartjs-2";
import PropTypes from "prop-types";
import _ from "lodash";
import styles from "./styles/style";
import { css } from "../utils";
import WithTheme from "../utils/HOC/WithTheme";
import theme from "../utils/theme";

class PieChart extends React.Component {
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
      legendPosition,
      tooltipStyle,
      rtl,
      onClick,
      getElementAtEvent,
      onResize,
      umLegendClass,
      ...rest
    } = this.props;
    let pieDataset = _.cloneDeep(datasets);
    const pieLabels = _.cloneDeep(labels);
    pieDataset = pieDataset.map(data => ({
      backgroundColor: data.backgroundColor || this.randomColor(data.data, data.backgroundColor),
      ...data,
    }));
    let pieOptions = options;
    pieOptions = {
      animation: {
        duration: !isInteractive ? 0 : 1000,
      },
      onClick,
      ...pieOptions,
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
      pieOptions.events = [];
    }
    const data = { labels: pieLabels, datasets: pieDataset };

    return (
      <div className={css(classes.chartWrapper)}>
        <Pie
          ref={chartRef}
          data={data}
          options={pieOptions}
          getElementAtEvent={getElementAtEvent}
          {...rest}
        />
        <div ref={chartLegendRef} className={css(classes.legend, umLegendClass)} />
      </div>
    );
  }
}
PieChart.propTypes = {
  classes: PropTypes.object.isRequired,
  labels: PropTypes.array.isRequired,
  datasets: PropTypes.array.isRequired,
  options: PropTypes.object,
  legend: PropTypes.object,
  tooltipStyle: PropTypes.object,
  showLegend: PropTypes.bool,
  showTooltip: PropTypes.bool,
  showValue: PropTypes.bool,
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

PieChart.defaultProps = {
  showLegend: true,
  showTooltip: true,
  showValue: true,
  rtl: false,
  isInteractive: true,
  legendPosition: "bottom",
};

export default WithTheme(PieChart, styles)();
