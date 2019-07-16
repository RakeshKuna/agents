import React from "react";
import { expect } from "chai";
import { mount } from "enzyme";
import sinon from "sinon";
import ExceptionHandler from "../ExceptionHandler";

class ErrorTestComponent extends React.PureComponent {
  componentDidMount() {
    throw new Error("Throw Error");
  }

  render() {
    return null;
  }
}

const NoErrorTestComponent = () => <p className="success">Component mounted successfully!!</p>;

const FallbackComponent = <p className="error">Error in Selectable component!!</p>;

const errorCallback = sinon.spy();

const ErrorComponent = ExceptionHandler(ErrorTestComponent, FallbackComponent, errorCallback);

const NoErrorComponent = ExceptionHandler(NoErrorTestComponent, FallbackComponent, errorCallback);

describe("<ExceptionHandler>", () => {
  it("should render Exception handler with correct DOM structure", () => {
    const wrapper = mount(<ErrorComponent />);
    expect(wrapper).to.have.length(1);
  });
  it("should throw exception", () => {
    mount(<ErrorComponent />);
    expect(errorCallback.called).to.be.equal(true);
  });
  it("should render fallback component", () => {
    const wrapper = mount(<ErrorComponent />);
    expect(wrapper.find(".error")).to.have.length(1);
  });
  it("should render component with no exception and correct DOM structure", () => {
    const wrapper = mount(<NoErrorComponent />);
    expect(wrapper).to.have.length(1);
  });
  it("should render main component", () => {
    const wrapper = mount(<NoErrorComponent />);
    expect(wrapper.find(".error")).to.have.length(0);
    expect(wrapper.find(".success")).to.have.length(1);
  });
});
