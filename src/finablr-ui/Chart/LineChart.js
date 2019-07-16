import React from "react";
import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";
import _ from "lodash";
import styles from "./styles/style";
import { css } from "../utils";
import WithTheme from "../utils/HOC/WithTheme";
import theme from "../utils/theme";
import withLifeCycle from "./ChartHOC";

class LineChart extends React.Component {
  generateRGB = string => string.match(/\w\w/g).map(b => parseInt(b, 16));

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
      rtl,
      showLegend,
      showValue,
      isInteractive,
      showTooltip,
      legendPosition,
      tooltipStyle,
      onClick,
      getElementAtEvent,
      umLegendClass,
      onResize,
      ...rest
    } = this.props;
    let lineDataset = _.cloneDeep(datasets);
    let lineLabels = _.cloneDeep(labels);
    lineDataset = lineDataset.map(data => {
      let randomColor = "";
      if (!data.lineColor) {
        randomColor = this.randomColor();
      }
      return {
        borderColor: data.lineColor || randomColor,
        backgroundColor: !data.fill
          ? data.lineColor || randomColor
          : data.backgroundColor || randomColor,
        borderWidth: data.lineWidth || 2,
        borderCapStyle: "butt",
        borderJoinStyle: "miter",
        borderDashOffset: 0.0,
        fill: false,
        lineTension: 0,
        pointBorderWidth: 1,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointHoverBorderWidth: 1,
        pointHitRadius: 25,
        ...data,
      };
    });

    let lineOptions = options;
    lineOptions = {
      onClick,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      animation: {
        duration: !isInteractive ? 0 : 1000,
      },
      ...lineOptions,
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
        position: "nearest",
        callbacks: {
          title() {},
        },
        ...tooltipStyle,
      },
      plugins: {
        datalabels: {
          color: "#000000",
          align: "end",
          textAlign: "center",
          display: !!showValue,
        },
      },
    };
    if (!isInteractive) {
      lineOptions.events = [];
    }
    if (rtl) {
      if (!lineOptions.scales) {
        lineOptions.scales = {};
        lineOptions.scales.yAxes = [
          {
            position: "right",
          },
        ];
      } else if (!lineOptions.scales.yAxes) {
        lineOptions.scales.yAxes = [
          {
            position: "right",
          },
        ];
      } else if (!lineOptions.scales.yAxes[0]) {
        lineOptions.scales.yAxes = [
          {
            position: "right",
          },
        ];
      } else {
        lineOptions.scales.yAxes[0].position = "right";
      }

      lineLabels = lineLabels.reverse();
      lineDataset = lineDataset.map(lineData => ({
        data: lineData.data.reverse(),
        ...lineData,
      }));
    }
    const data = { labels: lineLabels, datasets: lineDataset };

    return (
      <div className={css(classes.chartWrapper)}>
        <Line
          ref={chartRef}
          data={data}
          options={lineOptions}
          getElementAtEvent={getElementAtEvent}
          {...rest}
        />

        <div ref={chartLegendRef} className={css(classes.legend, umLegendClass)} />
      </div>
    );
  }
}
LineChart.propTypes = {
  classes: PropTypes.object.isRequired,
  labels: PropTypes.array.isRequired,
  datasets: PropTypes.array.isRequired,
  options: PropTypes.object,
  legend: PropTypes.object,
  rtl: PropTypes.bool,
  isInteractive: PropTypes.bool,
  showValue: PropTypes.bool,
  tooltipStyle: PropTypes.object,
  showLegend: PropTypes.bool,
  legendPosition: PropTypes.oneOf(["top", "bottom"]),
  showTooltip: PropTypes.bool,
  onClick: PropTypes.func,
  getElementAtEvent: PropTypes.func,
  onResize: PropTypes.func,
  umLegendClass: PropTypes.string,
  chartRef: PropTypes.any,
  chartLegendRef: PropTypes.any,
};

LineChart.defaultProps = {
  rtl: false,
  showLegend: true,
  showValue: true,
  isInteractive: true,
  showTooltip: true,
  legendPosition: "bottom",
};

export default WithTheme(withLifeCycle(LineChart), styles)();
