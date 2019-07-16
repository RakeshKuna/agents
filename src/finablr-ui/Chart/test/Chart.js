import { expect } from "chai";
import { mount } from "enzyme";
import React from "react";
import { Line, Bar, Pie, Doughnut } from "../index";

const onResize = e => {
  console.log("on click e", e); // eslint-disable-line
};

const labels = ["Frontend", "BackEnd", "Devop", "Management", "Delverbles", "Database"];
const datasets = [
  {
    data: [120, 80, 15, 30, 20, 30],
    backgroundColor: ["#FFCE56", "#326598", "#158520", "#945825", "#002548", "#652585"],
    hoverBackgroundColor: ["#FFCE56", "#326598", "#158520", "#945825", "#002548", "#652585"],
  },
];
const datasets3 = [
  {
    data: [120, 80, 15, 30, 20, 30],
  },
];
const piedatasets = [
  {
    data: [80, 50, 60, 50, 20, 30],
    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#421585", "#548562", "#821569"],
    hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#421585", "#548562", "#821569"],
  },
];
const options = {
  scales: {
    yAxes: [
      {
        position: "right",
      },
    ],
  },
};
const options2 = {
  scales: {
    yAxes: [{}],
  },
};
const barlabels = ["January", "February", "March", "April", "May", "June", "July"];
const bardatasets = [
  {
    label: "Dataset A",
    backgroundColor: "rgba(255,99,132,0.2)",
    lineColor: "rgba(255,99,132,1)",
    hoverBackgroundColor: "rgba(255,99,132,0.4)",
    hoverBorderColor: "rgba(255,99,132,1)",
    data: [65, 59, 80, 81, 56, 55, 40],
  },
  {
    label: "Dataset B",
    backgroundColor: "rgba(255,44,6,0.2)",
    lineColor: "rgba(255,44,6,1)",
    hoverBackgroundColor: "rgba(255,44,6,0.4)",
    hoverBorderColor: "rgba(255,44,6,1)",
    data: [20, 56, 80, 12, 11, 90, 50],
  },
];
const bardatasetsWtColor = [
  {
    label: "Dataset A",
    data: [65, 59, 80, 81, 56, 55, 40],
  },
  {
    label: "Dataset B",
    data: [20, 56, 80, 12, 11, 90, 50],
  },
];
describe("<Chart />", () => {
  const Doughnutwrapper = mount(
    <Doughnut labels={labels} datasets={datasets} rtl onResize={onResize} />
  );
  const Piewrapper = mount(<Pie labels={labels} datasets={piedatasets} rtl onResize={onResize} />);
  const DoughnutwrapperWthoutColor = mount(
    <Doughnut labels={labels} datasets={datasets3} rtl onResize={onResize} isInteractive={false} />
  );
  const PiewrapperWthoutColor = mount(
    <Pie labels={labels} datasets={datasets3} rtl onResize={onResize} isInteractive={false} />
  );
  const Linewrapper = mount(<Line labels={barlabels} datasets={bardatasets} onResize={onResize} />);
  const Barwrapper = mount(<Bar labels={barlabels} datasets={bardatasets} onResize={onResize} />);
  const LinewrapperWtClr = mount(
    <Line labels={barlabels} datasets={bardatasetsWtColor} onResize={onResize} options={options2} />
  );
  const BarwrapperWtClr = mount(
    <Bar labels={barlabels} datasets={bardatasetsWtColor} onResize={onResize} options={options2} />
  );
  const LinewrapperRtl = mount(
    <Line
      labels={barlabels}
      datasets={bardatasets}
      rtl
      onResize={onResize}
      options={options}
      isInteractive={false}
    />
  );
  const BarwrapperRtl = mount(
    <Bar
      labels={barlabels}
      datasets={bardatasets}
      rtl
      umLegendClass="legend-motive"
      options={options}
      onResize={onResize}
      isInteractive={false}
    />
  );
  const BarwrapperNonInt = mount(
    <Bar labels={barlabels} datasets={bardatasets} isInteractive={false} />
  );

  it("Doughnutwrapper Length", () => {
    expect(Doughnutwrapper).to.have.length(1);
  });

  it("Piewrapper Length", () => {
    expect(Piewrapper).to.have.length(1);
  });

  it("Linewrapper Length", () => {
    expect(Linewrapper).to.have.length(1);
  });

  it("Barwrapper Length", () => {
    expect(Barwrapper).to.have.length(1);
  });

  it("Linewrapper Length with rtl", () => {
    expect(LinewrapperRtl).to.have.length(1);
  });

  it("Barwrapper Length with rtl", () => {
    expect(BarwrapperRtl).to.have.length(1);
  });

  it("DoughnutwrapperWthoutColor Length", () => {
    expect(DoughnutwrapperWthoutColor).to.have.length(1);
  });

  it("PiewrapperWthoutColor Length", () => {
    expect(PiewrapperWthoutColor).to.have.length(1);
  });
  it("LinewrapperWtClr Length", () => {
    expect(LinewrapperWtClr).to.have.length(1);
  });

  it("BarwrapperWtClr Length", () => {
    expect(BarwrapperWtClr).to.have.length(1);
  });

  it("BarwrapperNonInt Length", () => {
    expect(BarwrapperNonInt).to.have.length(1);
  });

  it("Addtional class Name check", () => {
    expect(
      BarwrapperRtl.find("div")
        .at(1)
        .hasClass("legend-motive")
    ).to.equal(true);
  });
});
