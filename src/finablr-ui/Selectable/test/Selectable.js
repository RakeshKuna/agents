import React from "react";
import { expect } from "chai";
import { mount } from "enzyme";
import sinon from "sinon";
import Selectable from "../index";

const suggestions = [
  { label: "Afghanistan" },
  { label: "Aland Islands" },
  { label: "Albania" },
  { label: "Algeria" },
  { label: "American Samoa" },
];

const singleSelectChange = sinon.spy();
// const onChange = sinon.spy();

describe("<Selectable>", () => {
  const SingleSelect = mount(
    <Selectable
      placeholder="Search a country (start with a)"
      id="react-select-single"
      options={suggestions}
      onKeyDown={singleSelectChange}
    />
  );
  const MultiSelect = mount(
    <Selectable
      placeholder="Search a country (start with a)"
      id="react-select-single"
      options={suggestions}
      isMultiple
      onKeyDown={singleSelectChange}
    />
  );
  const DisabledSelect = mount(
    <Selectable
      isEnabled={false}
      placeholder="Search a country (start with a)"
      id="react-select-single"
      options={suggestions}
      onKeyDown={singleSelectChange}
    />
  );
  const WithoutClearable = mount(
    <Selectable
      placeholder="Search a country (start with a)"
      id="react-select-single"
      options={suggestions}
      isMultiple
      isClearable={false}
      onKeyDown={singleSelectChange}
    />
  );

  const WithoutSearchable = mount(
    <Selectable
      placeholder="Search a country (start with a)"
      id="react-select-single"
      options={suggestions}
      isMultiple
      searchable={false}
    />
  );
  it("DOM Length", () => {
    expect(SingleSelect).to.have.length(1);
  });
  it("Single Selection", () => {
    const selectWrapper = SingleSelect.find(".Select-control");
    selectWrapper.find(".Select-control").simulate("keyDown", { keyCode: 40 });
    selectWrapper.find(".Select-control").simulate("keyDown", { keyCode: 13 });
    const txt = selectWrapper.text();
    expect(txt).to.be.equal("Afghanistan");
  });
  it("Multi Selection", () => {
    const selectWrapper = MultiSelect.find(".Select-control");
    selectWrapper.find(".Select-control").simulate("keyDown", { keyCode: 40 });
    selectWrapper.find(".Select-control").simulate("keyDown", { keyCode: 13 });
    selectWrapper.find(".Select-control").simulate("keyDown", { keyCode: 40 });
    selectWrapper.find(".Select-control").simulate("keyDown", { keyCode: 13 });
    const txt = selectWrapper.text();
    expect(txt).to.be.equal("Afghanistan Aland Islands ");
  });
  it("Disabled Selectable", () => {
    const selectWrapper = DisabledSelect.find(".Select");
    expect(selectWrapper.find(".is-disabled")).to.have.length(1);
  });
  it("Clearable Selection", () => {
    const selectWrapper = SingleSelect.find(".Select-control");
    selectWrapper.find(".Select-control").simulate("keyDown", { keyCode: 40 });
    selectWrapper.find(".Select-control").simulate("keyDown", { keyCode: 13 });
    expect(selectWrapper.find(".Select-clear-zone")).to.have.length(1);
  });
  it("Without Clearable Selection", () => {
    const selectWrapper = WithoutClearable.find(".Select-control");
    selectWrapper.find(".Select-control").simulate("keyDown", { keyCode: 40 });
    selectWrapper.find(".Select-control").simulate("keyDown", { keyCode: 13 });
    expect(selectWrapper.find(".Select-clear-zone")).to.have.length(0);
  });
  it("Searchable", () => {
    const selectWrapper = SingleSelect.find(".Select");
    expect(selectWrapper.find(".is-searchable")).to.have.length(1);
  });
  it("Without Searchable", () => {
    const selectWrapper = WithoutSearchable.find(".Select");
    expect(selectWrapper.find(".is-searchable")).to.have.length(0);
  });
});
