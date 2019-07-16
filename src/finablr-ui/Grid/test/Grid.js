import React from "react";
import moment from "moment";
import { expect } from "chai";
import { shallow, mount } from "enzyme";

import Grid from "../index";

let counter = 0;
const createData = (name, calories, fat, carbs, protein, date) => {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein, date };
};

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + min));

const getRandomDate = () => {
  const date = moment();
  date.add(getRandomInt(1, 100), "days");
  return date.toDate().getTime();
};

const gridProps = {
  columnData: [
    {
      dataMapKey: "name",
      label: "Dessert",
      filterable: true,
      isEditable: true,
    },
    {
      dataMapKey: "calories",
      label: "Calories",
      type: "numeric",
      isNumeric: true,
      isEditable: true,
    },
    {
      dataMapKey: "fat",
      label: "Fat",
      isEditable: true,
      type: "select",
      isNumeric: true,
      options: [25, 6, 3.7],
    },
    { dataMapKey: "carbs", label: "Carbs (g)", isNumeric: true, isEditable: true, type: "decimal" },
    {
      dataMapKey: "protein",
      label: "Protein (g)",
      isNumeric: true,
      type: "checkbox",
      isEditable: true,
    },
    {
      dataMapKey: "date",
      label: "Expiry date",
      isEditable: true,
      type: "date",
      editProps: {
        locale: "en",
        label: "Enter Date",
      },
      cellRender: row =>
        row.date &&
        moment(Number(row.date))
          .toDate()
          .toLocaleDateString(),
    },
  ],
  data: [
    createData("Donut", 452, 25.0, 51, 4.9, getRandomDate()),
    createData("Cupcake", 305, 3.7, 67, 4.3, getRandomDate()),
    createData("Eclair", 262, 16.0, 24, 6.0, getRandomDate()),
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0, getRandomDate()),
    createData("Cupcake", 300, 3.7, 68, 4.3, getRandomDate()),
    createData("Cupcake", 300, 3.7, 76, 4.3, getRandomDate()),
    createData("Gingerbread", 356, 16.0, 49, 3.9, getRandomDate()),
    createData("Honeycomb", 408, 3.2, 87, 6.5, getRandomDate()),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3, getRandomDate()),
    createData("Jelly Bean", 375, 0.0, 94, 0.0, getRandomDate()),
    createData("KitKat", 518, 26.0, 65, 7.0, getRandomDate()),
    createData("Gingerbread", 376, 18.0, 49, 3.9, getRandomDate()),
    createData("Lollipop", 392, 0.2, 98, 0.0, getRandomDate()),
    createData("Marshmallow", 318, 0, 81, 2.0, getRandomDate()),
    createData("Nougat", 360, 19.0, 9, 37.0, getRandomDate()),
    createData("Oreo", 437, 18.0, 63, 4.0, getRandomDate()),
  ],
  //   toolbarRightComponent: ToolbarRight,
  //   toolbarRightComponentProps: {},
  rowsPerPage: 10,
  idMapKey: "id",
  // hasMultiSelect: true, // isSelectable
  // isEditable: true,
  // isMultiSort: true,
  // isSortable: true,
  // expanderComponent: () => (
  //   // row => will be passes as props
  //   <div style={{ padding: "20px" }}>
  //     <em>You can put any component you want here!</em>
  //   </div>
  // ),

  // labels: {
  //   entries: "per page",
  //   noResults: "No records",
  //   searchPlaceholderText: "Enter text to search ..",
  // },
  // showToolbar: false,
  // showPagination: false,
  // showRowsPerPage: false,
  // isDataSetLevel: true,
  rowsPerPageOptions: [10, 50, 100, 500],
  // scrollHeight: 300,
  rtl: true,
};
describe("<Grid />", () => {
  it("Should render 3 children", () => {
    const wrapper = shallow(<Grid {...gridProps} />);
    expect(
      wrapper
        .shallow()
        .childAt(0)
        .shallow()
        .children()
    ).to.have.lengthOf(3);
  });
  it("Should render 2 children (hide toolbar)", () => {
    const wrapper = shallow(<Grid {...gridProps} showToolbar={false} />);
    expect(
      wrapper
        .shallow()
        .childAt(0)
        .shallow()
        .children()
    ).to.have.lengthOf(2);
  });
  it("Should render 1 children (hide toolbar and pagination)", () => {
    const wrapper = shallow(<Grid {...gridProps} showToolbar={false} showPagination={false} />);
    expect(
      wrapper
        .shallow()
        .childAt(0)
        .shallow()
        .children()
    ).to.have.lengthOf(1);
  });
  it("Should render 1 children inside toolbar", () => {
    const wrapper = mount(<Grid {...gridProps} showRowsPerPage={false} />);
    expect(
      wrapper
        .find("Toolbar")
        .at(0)
        .children()
    ).to.have.lengthOf(1);
  });
  it("should change labels", () => {
    const wrapper = mount(
      <Grid
        {...gridProps}
        labels={{
          entries: "per page",
          noResults: "No records",
          searchPlaceholderText: "Enter text to search ..",
        }}
      />
    );
    expect(
      wrapper
        .find("NumOfEntries")
        .find("Typography")
        .text()
    ).to.equal("per page");
  });
  it("Should equal to paginated rows", () => {
    const wrapper = mount(<Grid {...gridProps} rowsPerPage={5} />);
    expect(wrapper.find("tbody").children()).to.have.lengthOf(5);
  });
  it("Should simulate sort event", () => {
    const wrapper = mount(<Grid {...gridProps} rowsPerPage={5} />);
    const firstCell = wrapper
      .find("thead")
      .find("tr")
      .find("th")
      .at(0)
      .find("span[role='button']");
    firstCell.simulate("click");
    const firstContentCell = wrapper
      .find("tbody")
      .find("tr")
      .find("td")
      .at(0);
    expect(firstContentCell.text()).to.be.equal("Cupcake");
  });
  it("Should simulate input edit event", () => {
    const wrapper = mount(<Grid {...gridProps} rowsPerPage={5} />);
    const firstContentCell = wrapper
      .find("tbody")
      .find("tr")
      .find("td")
      .at(0);
    firstContentCell.simulate("doubleclick");
    expect(
      wrapper
        .find("tbody")
        .find("tr")
        .find("td")
        .at(0)
        .find("input")
    ).to.have.length(1);
  });
  it("Should simulate decimal edit event", () => {
    const wrapper = mount(<Grid {...gridProps} rowsPerPage={5} />);
    const firstContentCell = wrapper
      .find("tbody")
      .find("tr")
      .find("td")
      .at(3);
    firstContentCell.simulate("doubleclick");
    expect(
      wrapper
        .find("tbody")
        .find("tr")
        .find("td")
        .at(3)
        .find("input")
    ).to.have.length(1);
  });
  it("Should simulate selectbox edit event", () => {
    const wrapper = mount(<Grid {...gridProps} rowsPerPage={5} />);
    const firstContentCell = wrapper
      .find("tbody")
      .find("tr")
      .find("td")
      .at(2);
    firstContentCell.simulate("doubleclick");
    expect(
      wrapper
        .find("tbody")
        .find("tr")
        .find("td")
        .at(2)
        .find("input")
    ).to.have.length(1);
  });
  it("Should simulate checkbox edit event", () => {
    const wrapper = mount(<Grid {...gridProps} rowsPerPage={5} />);
    const firstContentCell = wrapper
      .find("tbody")
      .find("tr")
      .find("td")
      .at(4);
    firstContentCell.simulate("doubleclick");
    expect(
      wrapper
        .find("tbody")
        .find("tr")
        .find("td")
        .at(4)
        .find("input")
    ).to.have.length(1);
  });
  it("Should simulate filter event", () => {
    const wrapper = mount(<Grid {...gridProps} rowsPerPage={5} />);
    const input = wrapper.find("input").at(1);
    input.simulate("change", { target: { value: "cu" } });
    input.simulate("blur");
    expect(wrapper.find("tbody").find("tr")).to.have.length(3);
  });
  it("Should simulate filter", () => {
    const wrapper = mount(<Grid {...gridProps} rowsPerPage={3} isDataSetLevel={false} />);
    const input = wrapper.find("input").at(1);
    input.simulate("change", { target: { value: "cu" } });
    input.simulate("blur");
    expect(wrapper.find("tbody").find("tr")).to.have.length(1);
  });
  it("Should have multiselect", () => {
    const wrapper = mount(<Grid {...gridProps} rowsPerPage={3} hasMultiSelect />);
    expect(wrapper.find("thead").find("th")).to.have.length(7);
    const checkboxCell = wrapper
      .find("thead")
      .find("th")
      .at(0)
      .find("input");
    checkboxCell.simulate("change", { target: { checked: true } });
    wrapper
      .find("tbody")
      .find("tr")
      .forEach(tr => {
        expect(
          tr
            .find("td")
            .at(0)
            .find("input")
            .getElement().props.checked
        ).to.equal(true);
      });
  });
  it("Should trigger single select", () => {
    const wrapper = mount(<Grid {...gridProps} rowsPerPage={3} hasMultiSelect />);
    expect(wrapper.find("thead").find("th")).to.have.length(7);
    const checkboxCell = wrapper
      .find("tbody")
      .find("tr")
      .at(0)
      .find("td")
      .at(0)
      .find("input");
    checkboxCell.simulate("change", { target: { checked: true } });
    expect(
      wrapper
        .find("tbody")
        .find("tr")
        .at(0)
        .find("td")
        .at(0)
        .find("input")
        .getElement().props.checked
    ).to.equal(true);
  });
  it("Should render expander component", () => {
    const expanderComponent = () => (
      // row => will be passes as props
      <div style={{ padding: "20px" }}>
        <em>You can put any component you want here!</em>
      </div>
    );
    const wrapper = mount(
      <Grid {...gridProps} rowsPerPage={3} expanderComponent={expanderComponent} />
    );
    expect(wrapper.find("thead").find("th")).to.have.length(7);
    const expanderCell = wrapper
      .find("tbody")
      .find("tr")
      .at(0)
      .find("td")
      .at(0)
      .find("button");
    expanderCell.simulate("mousedown");
    expect(wrapper.find("tbody").find("tr")).to.have.lengthOf(4);
  });
  it("Should hide given columns", () => {
    const wrapper = mount(<Grid {...gridProps} rowsPerPage={3} hideColumns={["name"]} />);
    expect(wrapper.find("thead").find("th")).to.have.length(5);
  });
  it("Should group the given columns", () => {
    const wrapper = mount(<Grid {...gridProps} rowsPerPage={5} groupBy={["name"]} />);

    expect(
      wrapper
        .find("tbody")
        .find("tr")
        .at(1)
        .find("TableCell")
        .at(2)
        .text()
    ).to.equal("Cupcake (3)");
  });
  it("Should not hide column when its under grouping", () => {
    const wrapper = mount(<Grid {...gridProps} rowsPerPage={5} groupBy={["name"]} />);
    expect(wrapper.find("thead").find("th")).to.have.length(6);
    expect(
      wrapper
        .find("tbody")
        .find("tr")
        .at(1)
        .find("TableCell")
        .at(2)
        .text()
    ).to.equal("Cupcake (3)");
  });
});
