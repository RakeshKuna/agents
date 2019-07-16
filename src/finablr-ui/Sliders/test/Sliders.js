import React from "react";
import { expect } from "chai";
import { render, mount } from "enzyme";
import sinon from "sinon";
import Sliders from "../index";
import Handle from "../Handle";

// const mouseMove = sinon.spy();
// const onChange = sinon.spy();

// class OnChangeComp extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { time: "", isOpen: false, isError: false };
//   }

//   render() {
//     const { time, isError } = this.state;
//     // console.log(isError);
//     return (
//       <TimePicker
//         value={time}
//         locale="en"
//         onChange={e => {
//           this.setState({ time: moment().format("h hh") });
//         }}
//         onOpen={e => this.setState({ isOpen: true })}
//         onError={e => this.setState({ isError: true })}
//       />
//     );
//   }
// }

describe("<Sliders>", () => {
  it("should render Slider with correct DOM structure", () => {
    const wrapper = render(<Sliders />);
    expect(wrapper).to.have.length(1);
  });
  it("should render Slider with Mark", () => {
    const wrapper = render(<Sliders marks={5} />);
    const nomark = mount(<Sliders marks={0} />);
    expect(nomark.find(".slider-ticks")).to.have.length(0);

    const withmark = mount(<Sliders marks={5} />);
    expect(withmark.find(".slider-ticks")).to.have.length(1);

    expect(wrapper).to.have.length(1);
  });
  it("should render Slider with Tooltip", () => {
    const callback = sinon.spy();
    const wrapper = mount(<Sliders hasTooltip values={[10]} onChange={callback} />);
    const handler = wrapper.find(".slider-handles");
    const handle = handler.find(Handle);
    handle.simulate("mousedown");
    wrapper.update();
    expect(wrapper.getElement().props.hasTooltip).to.equal(true);
  });
  it("should render Slider with pushable", () => {
    const wrapper = mount(<Sliders values={[10, 30, 50, 80]} mode="pushable" />);
    expect(wrapper.getElement().props.mode).to.equal("pushable");
  });
  it("should render Slider with no crossing between handles", () => {
    const wrapper = mount(<Sliders values={[10, 30, 50, 80]} mode="noAllowCross" />);
    expect(wrapper.getElement().props.mode).to.equal("noAllowCross");
  });
  it("should render Slider with crossing between handles", () => {
    const wrapper = mount(<Sliders values={[10, 30, 50, 80]} mode="allowCross" />);
    expect(wrapper.getElement().props.mode).to.equal("allowCross");
  });
  it("should render Slider and show tooltip always", () => {
    const wrapper = mount(<Sliders showAlwaysTooltip />);
    expect(wrapper.getElement().props.showAlwaysTooltip).to.equal(true);
  });
  it("should render Slider with disabled", () => {
    const wrapper = mount(<Sliders isEnabled={false} values={[30]} />);
    expect(wrapper.getElement().props.isEnabled).to.equal(false);
  });
  it("should render Slider with vertical", () => {
    const wrapper = mount(<Sliders min={0} max={50} rootStyle={{ height: 400 }} isVertical />);
    expect(wrapper.getElement().props.isVertical).to.equal(true);
  });
  it("should render Slider with rtl", () => {
    const wrapper = mount(<Sliders rtl />);
    expect(wrapper.getElement().props.rtl).to.equal(true);
  });
  it("should render Slider with step", () => {
    const wrapper = mount(<Sliders min={0} max={100} marks={5} step={20} />);
    expect(wrapper.getElement().props.step).to.equal(20);
  });
  it("should render Slider ID Check", () => {
    const wrapper = mount(<Sliders sliderId="CompoundSlider" />);
    expect(wrapper.getElement().props.sliderId).to.equal("CompoundSlider");
  });
});
