import React from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";

import WithTheme from "../utils/HOC/WithTheme";
import { css, emptyFunction } from "../utils";
import UploadedFilesContainer from "./UploadedFilesContainer";
import styles from "./styles/DropView";

const DropView = ({
  classes,
  placeholder,
  buttonText,
  isEnabled,
  multiple,
  children,
  onDrop,
  onDropRejected,
  onInputClick,
  onButtonClick,
  fileList,
  loader,
  onCancelRequest,
  cancelledText,
  errorText,
  style,
  umStyle,
  ...others
}) => (
  <div className={css(classes.root, classes.rootExtended)}>
    <Dropzone
      onDrop={onDrop}
      multiple={multiple}
      onDropRejected={onDropRejected}
      className={css(classes.dropZone, classes.dropZoneExtended, {
        [classes.disabled]: !isEnabled,
        [classes.disabledExtended]: !isEnabled,
      })}
      disabled={!isEnabled}
      {...others}
    >
      {children}
    </Dropzone>
    {fileList.length > 0 && (
      <UploadedFilesContainer
        loader={loader}
        fileList={fileList}
        onCancelRequest={onCancelRequest}
        cancelledText={cancelledText}
        errorText={errorText}
        style={style}
      />
    )}
  </div>
);

DropView.propTypes = {
  classes: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  buttonText: PropTypes.string,
  isEnabled: PropTypes.bool,
  fileList: PropTypes.array,
  multiple: PropTypes.bool,
  cancelledText: PropTypes.string,
  errorText: PropTypes.string,
  loader: PropTypes.oneOf(["bar", "circle"]),
  onDrop: PropTypes.func,
  onDropRejected: PropTypes.func,
  onInputClick: PropTypes.func,
  onButtonClick: PropTypes.func,
  onCancelRequest: PropTypes.func,
  style: PropTypes.object,
  umStyle: PropTypes.string,
};

DropView.defaultProps = {
  placeholder: "File Upload",
  buttonText: "Browse",
  loader: "bar",
  isEnabled: true,
  fileList: [],
  multiple: false,
  cancelledText: "Cancelled",
  errorText: "Error",
  onDrop: emptyFunction,
  onDropRejected: emptyFunction,
  onInputClick: emptyFunction,
  onButtonClick: emptyFunction,
  onCancelRequest: emptyFunction,
};

export default WithTheme(DropView, styles)({});
