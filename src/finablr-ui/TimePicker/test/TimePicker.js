import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import { createRender } from "@material-ui/core/test-utils";
import moment from "moment";
import sinon from "sinon";
import TimePicker from "../index";

const timePickerChange = sinon.spy();
const onOpen = sinon.spy();
const onError = sinon.spy();

class OnChangeComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: "" };
  }

  render() {
    const { time } = this.state;
    return (
      <TimePicker
        value={time}
        locale="en"
        onChange={() => {
          this.setState({ time: moment().format("h hh") });
        }}
        onOpen={onOpen}
        onError={onError}
      />
    );
  }
}

describe("<TimePicker>", () => {
  let mounting;
  before(() => {
    mounting = createRender();
  });
  const BasicPicker = shallow(
    <TimePicker
      classes={{}}
      time={moment().format("h hh")}
      id="basicTimePicker"
      placeholder="hh:mm A"
      label="Enter Time"
      format="hh:mm A"
    />
  );
  const Required = shallow(
    <TimePicker
      classes={{}}
      time={moment().format("h hh")}
      placeholder="hh:mm A"
      label="Enter Time"
      format="hh:mm A"
      isRequired
    />
  );
  const Disabled = shallow(
    <TimePicker
      classes={{}}
      time={moment().format("h hh")}
      placeholder="hh:mm A"
      label="Enter Time"
      format="hh:mm A"
      isEnabled={false}
    />
  );
  const LabelCheck = shallow(
    <TimePicker
      classes={{}}
      time={moment().format("h hh")}
      placeholder="hh:mm A"
      label="Enter Time"
      format="hh:mm A"
      okLabel="OK"
      cancelLabel="Cancel"
    />
  );
  const props = {
    keyboard: true,
    format: "hh:mm A",
    onChange: timePickerChange,
    value: moment().format("h hh"),
  };
  const ChangeCheck = shallow(<OnChangeComp {...props} />);
  // const Checking = shallow(<TimePicker {...props} />);
  it("Time Check", () => {
    const timePickerDOM = BasicPicker;
    const timePicker = timePickerDOM.props().time;
    expect(timePicker).to.be.equal(moment().format("h hh"));
  });
  it("Format Check", () => {
    const timePickerDOM = BasicPicker;
    const timePicker = timePickerDOM.props().format;
    expect(timePicker).to.be.equal("hh:mm A");
  });
  it("Required Check", () => {
    const timePickerDOM = Required;
    const timePicker = timePickerDOM.props().isRequired;
    expect(timePicker).to.be.equal(true);
  });
  it("Disabled Check", () => {
    const timePickerDOM = Disabled;
    const timePicker = timePickerDOM.props().isEnabled;
    expect(timePicker).to.be.equal(false);
  });
  it("OK Label Check", () => {
    const timePickerDOM = LabelCheck;
    const timePicker = timePickerDOM.props().okLabel;
    expect(timePicker).to.be.equal("OK");
  });
  it("Cancel Label Check", () => {
    const timePickerDOM = LabelCheck;
    const timePicker = timePickerDOM.props().cancelLabel;
    expect(timePicker).to.be.equal("Cancel");
  });
  it("On Change", () => {
    const timePickerDOM = ChangeCheck;
    timePickerDOM.simulate("change");
    expect(timePickerDOM.state().time).to.be.equal(moment().format("h hh"));
  });
  it("On Open", () => {
    const timePickerDOM = ChangeCheck;
    timePickerDOM.simulate("open");
    expect(onOpen.called).to.be.equal(true);
  });
  it("On Error", () => {
    const timePickerDOM = ChangeCheck;
    timePickerDOM.setState({ time: "bar" });
    timePickerDOM.simulate("error");
    expect(onError.called).to.be.equal(true);
  });
  it("DOM Length", () => {
    const MountPicker = mounting(
      <TimePicker
        time={moment().format("h hh")}
        id="basicTimePicker"
        placeholder="hh:mm A"
        label="Enter Time"
        format="hh:mm A"
      />
    );
    expect(MountPicker).to.have.length(1);
  });
  it("ID Check", () => {
    const MountPicker = mounting(
      <TimePicker
        time={moment().format("h hh")}
        id="basicTimePicker"
        placeholder="hh:mm A"
        label="Enter Time"
        format="hh:mm A"
      />
    );
    const datePickerDOM = MountPicker;
    const input = datePickerDOM.find("input");
    const IDMount = input["0"].attribs.id;
    expect(IDMount).to.be.equal("basicTimePicker");
  });
  it("Placeholder Check", () => {
    const MountPicker = mounting(
      <TimePicker
        time={moment().format("h hh")}
        id="basicTimePicker"
        placeholder="hh:mm A"
        label="Enter Time"
        format="hh:mm A"
      />
    );
    const datePickerDOM = MountPicker;
    const input = datePickerDOM.find("input");
    const IDMount = input["0"].attribs.placeholder;
    expect(IDMount).to.be.equal("hh:mm A");
  });
  it("Label Check", () => {
    const MountPicker = mounting(
      <TimePicker
        time={moment().format("h hh")}
        id="basicTimePicker"
        placeholder="hh:mm A"
        label="Enter Time"
        format="hh:mm A"
      />
    );
    const datePickerDOM = MountPicker;
    const label = datePickerDOM.find("label");
    const LabelMount = label.text();
    expect(LabelMount).to.be.equal("Enter Time");
  });
});
