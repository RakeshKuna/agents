import { JSDOM } from "jsdom";
import Enzyme from "enzyme";
import sinon from "sinon";
import Adapter from "enzyme-adapter-react-16";

function FormDataMock() {
  this.append = sinon.spy();
}

require("babel-register")();

const exposedProperties = ["window", "navigator", "document"];

const { document } = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost",
}).window;

global.document = document;
global.window = document.defaultView;
Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === "undefined") {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: "node.js",
};

const testMedia = () => ({
  matches: false,
  addListener() {},
  removeListener() {},
});
global.window.matchMedia = global.matchMedia || testMedia;
global.FormData = FormDataMock;

Enzyme.configure({ adapter: new Adapter() });
