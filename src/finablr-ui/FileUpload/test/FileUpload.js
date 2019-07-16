import React from "react";
import { expect } from "chai";
import { mount } from "enzyme";
import sinon from "sinon";
import FileUpload from "../index";

const DummyChildComponent = () => null;

let files;
let images;
describe("<FileUpload />", () => {
  beforeEach(() => {// eslint-disable-line
    files = [
      {
        name: "file1.pdf",
        size: 1111,
        type: "application/pdf",
      },
    ];

    images = [
      {
        name: "cats.gif",
        size: 1234,
        type: "image/gif",
      },
      {
        name: "dogs.jpg",
        size: 2345,
        type: "image/jpeg",
      },
    ];
  });
  it("Mount without error", () => {
    const wrapper = mount(<FileUpload />);
    expect(wrapper).to.have.length(1);
  });
  it("Mount input with type file", () => {
    const wrapper = mount(<FileUpload />);
    expect(wrapper.find("input[type='file']")).to.have.length(1);
  });
  it("Should render custom placeholder", () => {
    const wrapper = mount(<FileUpload placeholder="custom placeholder" />);

    expect(
      wrapper.find("span").findWhere(elm => {
        if (elm.html() !== null && elm.text() === "custom placeholder") {
          return true;
        }
        return false;
      })
    ).to.have.length(1);
  });
  it("Should render custom placeholder", () => {
    const wrapper = mount(<FileUpload placeholder="custom placeholder" />);

    expect(
      wrapper.find("span").findWhere(elm => {
        if (elm.html() !== null && elm.text() === "custom placeholder") {
          return true;
        }
        return false;
      })
    ).to.have.length(1);
  });
  it("Should render custom browse text", () => {
    const wrapper = mount(
      <FileUpload labels={{ browseText: "custom browse", uploadText: "Upload" }} />
    );

    expect(
      wrapper
        .find("button")
        .find("span")
        .at(0)
        .text()
    ).to.equal("custom browse");
  });
  it("Should render custom component", () => {
    const wrapper = mount(
      <FileUpload loader="circle" dragDrop>
        <DummyChildComponent />
      </FileUpload>
    );
    expect(wrapper.find("DummyChildComponent")).to.have.length(1);
  });
  it("Should update browse button", async () => {
    const wrapper = mount(
      <FileUpload
        loader="circle"
        accept="image/*"
        multiple
        labels={{ uploadText: "custom upload" }}
      />
    );
    await wrapper.find("t").simulate("drop", { dataTransfer: { files: images } });
    wrapper.update();
    expect(
      wrapper
        .find("Button")
        .find("span")
        .at(0)
        .text()
    ).to.equal("custom upload");
  });
  it("Should accept the dropped files", async () => {
    const onDrop = sinon.spy();
    const onDropAccepted = sinon.spy();
    const onDropRejected = sinon.spy();
    const wrapper = mount(
      <FileUpload
        multiple
        onDrop={onDrop}
        onDropAccepted={onDropAccepted}
        onDropRejected={onDropRejected}
        accept="image/*"
      />
    );
    await wrapper.find("t").simulate("drop", { dataTransfer: { files: images } });
    expect(onDrop.called).to.equals(true);
    expect(onDropAccepted.called).to.equals(true);
    expect(onDropRejected.called).to.equals(false);
  });
  it("Should reject the dropped files", async () => {
    const onDrop = sinon.spy();
    const onDropAccepted = sinon.spy();
    const onDropRejected = sinon.spy();
    const wrapper = mount(
      <FileUpload
        dragDrop
        multiple
        onDrop={onDrop}
        onDropAccepted={onDropAccepted}
        onDropRejected={onDropRejected}
        accept="image/*"
      />
    );
    await wrapper.find("t").simulate("drop", { dataTransfer: { files } });
    expect(onDrop.called).to.equals(true);
    expect(onDropAccepted.called).to.equals(false);
    expect(onDropRejected.called).to.equals(true);
  });
  it("Should trigger the upload", async () => {
    const onDrop = sinon.spy();
    const onDropAccepted = sinon.spy();
    const onDropRejected = sinon.spy();
    const wrapper = mount(
      <FileUpload
        multiple
        onDrop={onDrop}
        onDropAccepted={onDropAccepted}
        onDropRejected={onDropRejected}
        accept="image/*"
      />
    );
    await wrapper.find("t").simulate("drop", { dataTransfer: { files: images } });
    wrapper.update();
    expect(onDrop.called).to.equals(true);
    expect(onDropAccepted.called).to.equals(true);
    expect(onDropRejected.called).to.equals(false);
    wrapper.find("button").simulate("click");
  });
  it("Should trigger the upload in sequence", async () => {
    const onDrop = sinon.spy();
    const onDropAccepted = sinon.spy();
    const onDropRejected = sinon.spy();
    const wrapper = mount(
      <FileUpload
        multiple
        onDrop={onDrop}
        onDropAccepted={onDropAccepted}
        onDropRejected={onDropRejected}
        isQueue
        accept="image/*"
      />
    );
    await wrapper.find("t").simulate("drop", { dataTransfer: { files: images } });
    wrapper.update();
    expect(onDrop.called).to.equals(true);
    expect(onDropAccepted.called).to.equals(true);
    expect(onDropRejected.called).to.equals(false);
    wrapper.find("button").simulate("click");
  });
  it("Should trigger the upload on drag and drop", async () => {
    const onDrop = sinon.spy();
    const onDropAccepted = sinon.spy();
    const onDropRejected = sinon.spy();
    const wrapper = mount(
      <FileUpload
        multiple
        dragDrop
        onDrop={onDrop}
        onDropAccepted={onDropAccepted}
        onDropRejected={onDropRejected}
        accept="image/*"
      />
    );
    await wrapper.find("t").simulate("drop", { dataTransfer: { files: images } });
    wrapper.update();
    expect(onDrop.called).to.equals(true);
    expect(onDropAccepted.called).to.equals(true);
    expect(onDropRejected.called).to.equals(false);
  });
  it("isEnabled", () => {
    const wrapper = mount(<FileUpload isEnabled={false} dragDrop />);
    expect(
      wrapper
        .find("input")
        .parent()
        .props()
        .className.indexOf("DropView-disabled") > -1
    ).to.be.equal(true);
  });
});
