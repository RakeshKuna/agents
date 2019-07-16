import React from "react";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";
import _ from "lodash";
import styles from "./styles/style";
import { css } from "../utils";
import WithTheme from "../utils/HOC/WithTheme";
import withLifeCycle from "./ChartHOC";
import theme from "../utils/theme";

class BarChart extends React.Component {
  generateRGB = string => string.match(/\w\w/g).map(b => parseInt(b, 16));

  // function to create a random color between two ranges
  randomColor = () => {
    const rgb1 = this.generateRGB(theme.palette.primary.main);
    const rgb2 = this.generateRGB(theme.palette.secondary.main);
    const rgb3 = [];
    for (let i = 0; i < 3; i += 1) rgb3[i] = (rgb1[i] + Math.random() * (rgb2[i] - rgb1[i])) | 0;
    const newColor = `#${rgb3
      .map(n => n.toString(16))
      .map(s => "00".slice(s.length) + s)
      .join("")}`;
    return newColor;
  };

  render() {
    const {
      classes,
      chartRef,
      chartLegendRef,
      labels,
      datasets,
      options,
      tooltipStyle,
      showLegend,
      showTooltip,
      showValue,
      umLegendClass,
      legendPosition,
      isInteractive,
      rtl,
      getElementAtEvent,
      onClick,
      onResize,
      ...rest
    } = this.props;
    let barDataset = _.cloneDeep(datasets);
    let barLabels = _.cloneDeep(labels);
    barDataset = barDataset.map(data => ({
      backgroundColor: data.backgroundColor || this.randomColor(),
      borderWidth: data.borderWidth || 1,
      ...data,
    }));

    let barOptions = options;
    barOptions = {
      onClick,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true, // so chart start at 0 in y-axis
            },
          },
        ],
      },
      animation: {
        duration: !isInteractive ? 0 : 1000,
      },
      ...barOptions,
      legend: {
        display: false, // using custom legend
      },
      tooltips: {
        display: !!showTooltip,
        titleFontSize: 14,
        bodyFontSize: 14,
        footerFontSize: 14,
        xPadding: 20,
        yPadding: 10,
        displayColors: false,
        position: "nearest",
        callbacks: {
          title() {},
        },
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
      barOptions.events = [];
    }
    if (rtl) {
      if (!barOptions.scales) {
        barOptions.scales = {};
        barOptions.scales.yAxes = [
          {
            position: "right",
          },
        ];
      } else if (!barOptions.scales.yAxes) {
        barOptions.scales.yAxes = [
          {
            position: "right",
          },
        ];
      } else if (!barOptions.scales.yAxes[0]) {
        barOptions.scales.yAxes = [
          {
            position: "right",
          },
        ];
      } else {
        barOptions.scales.yAxes[0].position = "right";
      }

      barLabels = barLabels.reverse();
      barDataset = barDataset.map(barData => ({
        data: barData.data.reverse(),
        ...barData,
      }));
    }

    const data = { labels: barLabels, datasets: barDataset };
    return (
      <div className={css(classes.chartWrapper)}>
        <Bar
          ref={chartRef}
          data={data}
          options={barOptions}
          getElementAtEvent={getElementAtEvent}
          {...rest}
        />
        <div ref={chartLegendRef} className={css(classes.legend, umLegendClass)} />
      </div>
    );
  }
}

BarChart.propTypes = {
  classes: PropTypes.object.isRequired,
  labels: PropTypes.array.isRequired,
  datasets: PropTypes.array.isRequired,
  options: PropTypes.object,
  legend: PropTypes.object,
  tooltipStyle: PropTypes.object,
  showLegend: PropTypes.bool,
  showValue: PropTypes.bool,
  legendPosition: PropTypes.oneOf(["top", "bottom"]),
  showTooltip: PropTypes.bool,
  isInteractive: PropTypes.bool,
  rtl: PropTypes.bool,
  onClick: PropTypes.func,
  getElementAtEvent: PropTypes.func,
  onResize: PropTypes.func,
  umLegendClass: PropTypes.string,
  chartRef: PropTypes.any,
  chartLegendRef: PropTypes.any,
};

BarChart.defaultProps = {
  rtl: false,
  showLegend: true,
  showValue: true,
  showTooltip: true,
  isInteractive: true,
  legendPosition: "bottom",
};

export default WithTheme(withLifeCycle(BarChart), styles)();
