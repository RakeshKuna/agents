import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import { createRender } from "@material-ui/core/test-utils";
import moment from "moment";
import sinon from "sinon";
import DatePicker from "../index";

const datePickerChange = sinon.spy();
const onOpen = sinon.spy();
const onError = sinon.spy();

class OnChangeComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: "" };
  }

  render() {
    const { date } = this.state;
    return (
      <DatePicker
        value={date}
        locale="en"
        onChange={() => {
          this.setState({ date: moment().format("ll") });
        }}
        onOpen={onOpen}
        onError={onError}
      />
    );
  }
}

describe("<DatePicker>", () => {
  let mounting;
  before(() => {
    mounting = createRender();
  });

  const BasicPicker = shallow(
    <DatePicker
      classes={{}}
      date={moment().format("ll")}
      id="basicDatePicker"
      placeholder="DD/MM/YYYY"
      label="Enter Date"
      format="DD/MM/YYYY"
    />
  );
  const Required = shallow(
    <DatePicker
      classes={{}}
      date={moment().format("ll")}
      placeholder="DD/MM/YYYY"
      label="Enter Date"
      format="DD/MM/YYYY"
      isRequired
    />
  );
  const Disabled = shallow(
    <DatePicker
      classes={{}}
      date={moment().format("ll")}
      placeholder="DD/MM/YYYY"
      label="Enter Date"
      format="DD/MM/YYYY"
      isEnabled={false}
    />
  );
  const LabelCheck = shallow(
    <DatePicker
      classes={{}}
      date={moment().format("ll")}
      placeholder="DD/MM/YYYY"
      label="Enter Date"
      format="DD/MM/YYYY"
      okLabel="OK"
      cancelLabel="Cancel"
    />
  );
  const props = {
    keyboard: true,
    format: "YYYY",
    onChange: datePickerChange,
    value: moment().format("ll"),
  };
  const ChangeCheck = shallow(<OnChangeComp {...props} />);

  it("Required Check", () => {
    const datePickerDOM = Required;
    const datePicker = datePickerDOM.props().isRequired;
    expect(datePicker).to.be.equal(true);
  });
  it("Disabled Check", () => {
    const datePickerDOM = Disabled;
    const datePicker = datePickerDOM.props().isEnabled;
    expect(datePicker).to.be.equal(false);
  });
  it("OK Label Check", () => {
    const datePickerDOM = LabelCheck;
    const datePicker = datePickerDOM.props().okLabel;
    expect(datePicker).to.be.equal("OK");
  });
  it("Cancel Label Check", () => {
    const datePickerDOM = LabelCheck;
    const datePicker = datePickerDOM.props().cancelLabel;
    expect(datePicker).to.be.equal("Cancel");
  });
  it("On Change", () => {
    const datePickerDOM = ChangeCheck;
    datePickerDOM.simulate("change");
    expect(datePickerDOM.state().date).to.be.equal(moment().format("ll"));
  });
  it("On Open", () => {
    const datePickerDOM = ChangeCheck;
    datePickerDOM.simulate("open");
    expect(onOpen.called).to.be.equal(true);
  });
  it("On Error", () => {
    const datePickerDOM = ChangeCheck;
    datePickerDOM.setState({ date: "bar" });
    datePickerDOM.simulate("error");
    expect(onError.called).to.be.equal(true);
  });
  it("DOM Length", () => {
    const MountPicker = mounting(
      <DatePicker
        classes={{}}
        date={moment().format("ll")}
        id="basicDatePicker"
        placeholder="DD/MM/YYYY"
        label="Enter Date"
        format="DD/MM/YYYY"
      />
    );
    expect(MountPicker).to.have.length(1);
  });
  it("ID Check", () => {
    const MountPicker = mounting(
      <DatePicker
        classes={{}}
        date={moment().format("ll")}
        id="basicDatePicker"
        placeholder="DD/MM/YYYY"
        label="Enter Date"
        format="DD/MM/YYYY"
      />
    );
    const datePickerDOM = MountPicker;
    const input = datePickerDOM.find("input");
    const IDMount = input["0"].attribs.id;
    expect(IDMount).to.be.equal("basicDatePicker");
  });
  it("Placeholder Check", () => {
    const MountPicker = mounting(
      <DatePicker
        classes={{}}
        date={moment().format("ll")}
        id="basicDatePicker"
        placeholder="DD/MM/YYYY"
        label="Enter Date"
        format="DD/MM/YYYY"
      />
    );
    const datePickerDOM = MountPicker;
    const input = datePickerDOM.find("input");
    const IDMount = input["0"].attribs.placeholder;
    expect(IDMount).to.be.equal("DD/MM/YYYY");
  });
  it("Label Check", () => {
    const MountPicker = mounting(
      <DatePicker
        classes={{}}
        date={moment().format("ll")}
        id="basicDatePicker"
        placeholder="DD/MM/YYYY"
        label="Enter Date"
        format="DD/MM/YYYY"
      />
    );
    const datePickerDOM = MountPicker;
    const label = datePickerDOM.find("label");
    const LabelMount = label.text();
    expect(LabelMount).to.be.equal("Enter Date");
  });
  it("Date Check", () => {
    const datePickerDOM = BasicPicker;
    const datePicker = datePickerDOM.props().date;
    expect(datePicker).to.be.equal(moment().format("ll"));
  });
  it("Format Check", () => {
    const datePickerDOM = BasicPicker;
    const datePicker = datePickerDOM.props().format;
    expect(datePicker).to.be.equal("DD/MM/YYYY");
  });
});
