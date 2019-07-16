import React from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import WithTheme from "../utils/HOC/WithTheme";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "./styles/style";
import { css } from "../utils";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";

const Carousel = props => {
  const {
    classes,
    children,
    id,
    showDots,
    showArrows,
    dotsPosition,
    umDotsClass,
    isSwippable,
    animation,
    isLoop,
    initialSlide,
    autoplay,
    autoplaySpeed,
    slidesToScroll,
    slidesPerRow,
    nextArrow: CustomNextArrow,
    prevArrow: CustomPrevArrow,
    afterChange,
    beforeChange,
    umClass,
    rtl,
    slidesToShow,
    centerMode,
    isLazyLoad,
    nextArrowIcon,
    prevArrowIcon,
    nextArrowIconStyle,
    prevArrowIconStyle,
    onInit,
    ...otherProps
  } = props;
  let dotPlacement = "";
  if (slidesToShow === 1) {
    dotPlacement = "inside";
  } else {
    dotPlacement = "outside";
  }
  const dotsPositionLoc = dotsPosition.replace(/-([a-z])/g, g => g[1].toUpperCase());
  let showArrow = showArrows;
  let initialSlideNo = initialSlide;
  if (
    (dotsPositionLoc === "leftCenter" || dotsPositionLoc === "rightCenter") &&
    dotPlacement === "inside"
  ) {
    showArrow = false;
  }
  let child = [];
  if (rtl) {
    child = React.Children.map(children, childA => childA).reverse();
    initialSlideNo = child.length - 1 - initialSlide;
    if (slidesToShow > 1 && !centerMode) {
      for (let i = 0; i <= child.length - slidesToShow; i += 1) {
        child.push(child.shift());
      }
    }
  } else {
    child = children;
  }

  const lazyLoadProp = {};
  lazyLoadProp.lazyLoad = isLazyLoad ? "progressive" : "ondemand";

  return (
    <div id={id} dir="ltr">
      <Slider
        dots={showDots}
        arrows={showArrow}
        dotsClass={css(umDotsClass, "slick-dots", classes[dotsPositionLoc], classes[dotPlacement])}
        swipe={isSwippable}
        fade={animation === "fade"}
        infinite={isLoop}
        centerMode={centerMode}
        initialSlide={initialSlideNo}
        autoplay={autoplay}
        speed={autoplaySpeed}
        slidesToScroll={slidesToScroll}
        slidesToShow={slidesToShow}
        slidesPerRow={slidesPerRow}
        nextArrow={
          <CustomNextArrow
            rtl={rtl}
            nextArrowIcon={nextArrowIcon}
            nextArrowIconStyle={nextArrowIconStyle}
            slidesToShow={slidesToShow}
          />
        }
        prevArrow={
          <CustomPrevArrow
            rtl={rtl}
            prevArrowIcon={prevArrowIcon}
            prevArrowIconStyle={prevArrowIconStyle}
            slidesToShow={slidesToShow}
          />
        }
        afterChange={afterChange}
        beforeChange={beforeChange}
        className={css(classes.slickWrapper, umClass)}
        init={onInit}
        {...lazyLoadProp}
        {...otherProps}
      >
        {child}
      </Slider>
    </div>
  );
};

Carousel.propTypes = {
  classes: PropTypes.object.isRequired,
  style: PropTypes.object,
  umClass: PropTypes.string,
  umDotsClass: PropTypes.string,
  id: PropTypes.string,
  animation: PropTypes.oneOf(["fade", "slide"]),
  dotsPosition: PropTypes.oneOf([
    "top-right",
    "top-center",
    "top-left",
    "bottom-right",
    "bottom-center",
    "bottom-left",
    "left-center",
    "right-center",
  ]),
  isSwippable: PropTypes.bool,
  showDots: PropTypes.bool,
  showArrows: PropTypes.bool,
  isLoop: PropTypes.bool,
  autoplay: PropTypes.bool,
  rtl: PropTypes.bool,
  centerMode: PropTypes.bool,
  isLazyLoad: PropTypes.bool,
  autoplaySpeed: PropTypes.number,
  initialSlide: PropTypes.number,
  slidesToScroll: PropTypes.number,
  slidesToShow: PropTypes.number,
  slidesPerRow: PropTypes.number,
  afterChange: PropTypes.func,
  beforeChange: PropTypes.func,
  pauseOnDotsHover: PropTypes.func,
  pauseOnFocus: PropTypes.func,
  onInit: PropTypes.func,
  nextArrow: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  prevArrow: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  nextArrowIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  prevArrowIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  nextArrowIconStyle: PropTypes.object,
  prevArrowIconStyle: PropTypes.object,
};

Carousel.defaultProps = {
  animation: "slide",
  dotsPosition: "bottom-center",
  umClass: "",
  id: "",
  isSwippable: true,
  showDots: false,
  autoplay: false,
  centerMode: false,
  isLazyLoad: false,
  showArrows: true,
  isLoop: true,
  rtl: false,
  autoplaySpeed: 300,
  slidesToScroll: 1,
  slidesToShow: 1,
  slidesPerRow: 1,
  initialSlide: 0,
  nextArrow: NextArrow,
  prevArrow: PrevArrow,
};

export default WithTheme(Carousel, styles)();
