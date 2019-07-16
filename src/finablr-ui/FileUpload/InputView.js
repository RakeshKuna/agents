import React from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";

import WithTheme from "../utils/HOC/WithTheme";
import { Button } from "../Button";
import { css, emptyFunction } from "../utils";
import styles from "./styles/InputView";
import Progress from "./Progress";

const InputView = ({
  classes,
  placeholder,
  browseText,
  uploadText,
  isEnabled,
  onUploadClick,
  fileList: { files = [], percentage, isCanceled, isError },
  loader,
  rtl,
  progressProps,
  umStyle,
  ...others
}) => {
  let dropZoneDom;
  const dropZoneRef = node => {
    dropZoneDom = node;
  };

  const openDropBox = () => {
    dropZoneDom.open();
  };
  let buttonText = browseText;
  let buttonClick = openDropBox;
  let placeholderText = placeholder;
  const filesToUpload = files.length > 0;
  if (filesToUpload) {
    buttonText = uploadText;
    buttonClick = onUploadClick;
    placeholderText = files.map(file => file.name.toLowerCase()).join(",");
  }

  return (
    <React.Fragment>
      <div className={css(classes.root, classes.rootExtended)}>
        <div
          className={css(classes.inputBox, classes.inputBoxExtended, {
            [classes.disabled]: !isEnabled,
            [classes.disabledExtended]: !isEnabled,
          })}
        >
          <div role="presentation" onClick={openDropBox}>
            <span
              className={css(classes.label, classes.labelExtended, {
                [classes.labelHover]: isEnabled,
              })}
            >
              {placeholderText}
            </span>
          </div>
          <Dropzone className={classes.hide} disabled={!isEnabled} ref={dropZoneRef} {...others} />
        </div>
        <div className={classes.browseBox}>
          <Button onClick={buttonClick} disabled={!isEnabled}>
            {buttonText}
          </Button>
        </div>
        {filesToUpload &&
          loader === "circle" && (
            <Progress
              value={percentage}
              showPercentage={!isError}
              styles={{
                path: {
                  stroke: isCanceled || isError ? "red" : undefined,
                },
              }}
              rtl={rtl}
              type={loader}
              {...progressProps}
            />
          )}
      </div>
      {filesToUpload &&
        loader === "bar" && (
          <Progress
            value={percentage}
            showPercentage={!isError}
            styles={{
              path: {
                stroke: isCanceled || isError ? "red" : undefined,
              },
            }}
            rtl={rtl}
            type={loader}
            {...progressProps}
          />
        )}
    </React.Fragment>
  );
};
InputView.propTypes = {
  classes: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  browseText: PropTypes.string,
  uploadText: PropTypes.string,
  isEnabled: PropTypes.bool,
  fileList: PropTypes.object,
  loader: PropTypes.oneOf(["bar", "circle"]),
  progressProps: PropTypes.object,
  rtl: PropTypes.bool,
  onUploadClick: PropTypes.func,
  umStyle: PropTypes.string,
};

InputView.defaultProps = {
  placeholder: "File Upload",
  browseText: "Browse",
  uploadText: "Upload",
  isEnabled: true,
  fileList: {},
  loader: "bar",
  progressProps: {},
  rtl: false,
  onUploadClick: emptyFunction,
};

export default WithTheme(InputView, styles)({});
