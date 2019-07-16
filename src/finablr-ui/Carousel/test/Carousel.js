import React from "react";
import { expect } from "chai";
import { mount } from "enzyme";
import Carousel from "../index";

let mouseCnt = 0;
function eventClick() {
  mouseCnt += 1;
}

const carousalConfig = {
  showDots: true,
  isLoop: true,
  speed: 0,
  slidesToShow: 3,
  slidesToScroll: 1,
  umClass: "customClass",
  prevArrowIconStyle: {
    color: "red",
  },
  nextArrowIconStyle: {
    color: "red",
  },
  nextArrowIcon: "arrow-right",
  prevArrowIcon: "arrow-left",
  rtl: true,
};
const carousalConfig2 = {
  showDots: true,
  isLoop: true,
  speed: 0,
  slidesToShow: 3,
  slidesToScroll: 1,
  umClass: "customClass",
  rtl: true,
};

describe("<Carousel />", () => {
  const wrapper = mount(
    <Carousel {...carousalConfig} afterChange={eventClick} beforeChange={eventClick}>
      <div className="carousal-image">
        <img
          src="https://www.uaeexchangeindia.com/wp-content/uploads/2018/03/Homepage-Banner-SBL-March.jpg"
          alt="ids"
        />
      </div>
      <div className="carousal-image">
        <img
          src="https://www.uaeexchangeindia.com/wp-content/uploads/2018/07/WC5A3863.jpg"
          alt="ids"
        />
      </div>
      <div className="carousal-image">
        <img src="https://www.uaeexchangeindia.com/wp-content/uploads/2018/05/1.png" alt="ids" />
      </div>
      <div className="carousal-image">
        <img
          src="https://www.uaeexchangeindia.com/wp-content/uploads/2018/03/640x249.jpg"
          alt="ids"
        />
      </div>
      <div className="carousal-image">
        <img
          src="https://www.uaeexchangeindia.com/wp-content/uploads/2018/03/MG_951_3.jpg"
          alt="ids"
        />
      </div>
      <div className="carousal-image">
        <img
          src="https://www.uaeexchangeindia.com/wp-content/uploads/2018/03/HBS_2.jpg"
          alt="ids"
        />
      </div>
      <div className="carousal-image">
        <img
          src="https://www.uaeexchangeindia.com/wp-content/uploads/2018/03/640x250.jpg"
          alt="ids"
        />
      </div>
      <div className="carousal-image">
        <img src="https://www.uaeexchangeindia.com/wp-content/uploads/2018/03/1.jpg" alt="ids" />
      </div>
    </Carousel>
  );
  const wrapper2 = mount(
    <Carousel {...carousalConfig2} afterChange={eventClick} beforeChange={eventClick}>
      <div className="carousal-image">
        <img
          src="https://www.uaeexchangeindia.com/wp-content/uploads/2018/03/Homepage-Banner-SBL-March.jpg"
          alt="ids"
        />
      </div>
      <div className="carousal-image">
        <img
          src="https://www.uaeexchangeindia.com/wp-content/uploads/2018/07/WC5A3863.jpg"
          alt="ids"
        />
      </div>
      <div className="carousal-image">
        <img src="https://www.uaeexchangeindia.com/wp-content/uploads/2018/05/1.png" alt="ids" />
      </div>
      <div className="carousal-image">
        <img
          src="https://www.uaeexchangeindia.com/wp-content/uploads/2018/03/640x249.jpg"
          alt="ids"
        />
      </div>
      <div className="carousal-image">
        <img
          src="https://www.uaeexchangeindia.com/wp-content/uploads/2018/03/MG_951_3.jpg"
          alt="ids"
        />
      </div>
      <div className="carousal-image">
        <img
          src="https://www.uaeexchangeindia.com/wp-content/uploads/2018/03/HBS_2.jpg"
          alt="ids"
        />
      </div>
      <div className="carousal-image">
        <img
          src="https://www.uaeexchangeindia.com/wp-content/uploads/2018/03/640x250.jpg"
          alt="ids"
        />
      </div>
      <div className="carousal-image">
        <img src="https://www.uaeexchangeindia.com/wp-content/uploads/2018/03/1.jpg" alt="ids" />
      </div>
    </Carousel>
  );

  it("DOM Length", () => {
    expect(wrapper).to.have.length(1);
    expect(wrapper2).to.have.length(1);
  });

  it("initial render check", () => {
    expect(wrapper.find("div.slick-active")).to.have.length(3);
  });
  it("Previous arrow render check", () => {
    expect(wrapper.find("div.slick-prev")).to.have.length(1);
  });
  it("Next arrow render check", () => {
    expect(wrapper.find("div.slick-next")).to.have.length(1);
  });
  it("Arrow icon render check", () => {
    expect(wrapper.find("div.slick-next").find("i")).to.have.length(1);
  });
  it("Next arrow icon render check", () => {
    expect(wrapper.find(".mdi-arrow-right")).to.have.length(1);
  });
  it("Dot render check", () => {
    expect(wrapper.find(".slick-dots")).to.have.length(1);
  });

  it("Addtional class Name check", () => {
    expect(
      wrapper
        .find("div")
        .at(1)
        .hasClass(carousalConfig.umClass)
    ).to.equal(true);
  });

  it("Previous arrow click event Handler", () => {
    expect(mouseCnt).to.be.equal(0);
    wrapper.find("div.slick-prev").simulate("click");
    expect(mouseCnt).to.be.equal(1);
  });

  it("Next arrow click event Handler", () => {
    wrapper.find("div.slick-next").simulate("click");
    expect(mouseCnt).to.be.equal(2);
  });
});
