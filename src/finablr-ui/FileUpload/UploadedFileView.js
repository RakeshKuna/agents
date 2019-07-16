import React from "react";
import PropTypes from "prop-types";

import { IconButton } from "../Button";
import Progress from "./Progress";
import { css, emptyFunction } from "../utils";

import WithTheme from "../utils/HOC/WithTheme";
import styles from "./styles/UploadedFileView";

const UploadedFileView = ({
  classes,
  uploadInfo: { id: fileId, percentage, isInProgress, isCompleted, isCancelled, isError } = {},
  fileInfo,
  loader,
  progressProps,
  rtl,
  onCancelRequest,
  cancelledText,
  errorText,
}) => (
  <React.Fragment>
    <div className={css(classes.root, classes.rootExtended)}>
      <span className={css(classes.fileName, classes.fileNameExtended)}>{fileInfo.name}</span>
      {loader === "circle" && (
        <Progress
          value={percentage}
          showPercentage
          className={classes.circleProgress}
          styles={{
            path: {
              stroke: isCancelled || isError ? "red" : undefined,
            },
          }}
          rtl={rtl}
          type={loader}
          {...progressProps}
        />
      )}
      {!isCancelled && !isError ? (
        <span>
          <IconButton
            umStyle={!isCompleted ? "default" : "primary"}
            onClick={() => onCancelRequest(fileId)}
            icon={!isCompleted ? "close-circle-outline" : "check-circle"}
          />
        </span>
      ) : (
        <span className={css(classes.cancelButton, classes.cancelButtonExtended)}>
          {isCancelled ? cancelledText : errorText}
        </span>
      )}
    </div>
    {loader === "bar" && (
      <Progress
        value={percentage || 0}
        rtl={rtl}
        stripes={!isInProgress}
        pathColor={isCancelled || isError ? "red" : undefined}
        showPercentage
        style={{ borderRadius: 2.5 }}
        type="bar"
        {...progressProps}
      />
    )}
  </React.Fragment>
);

UploadedFileView.propTypes = {
  classes: PropTypes.object.isRequired,
  uploadInfo: PropTypes.object.isRequired,
  fileInfo: PropTypes.object.isRequired,
  loader: PropTypes.oneOf(["bar", "circle"]),
  progressProps: PropTypes.object,
  rtl: PropTypes.bool,
  cancelledText: PropTypes.string,
  errorText: PropTypes.string,
  onCancelRequest: PropTypes.func,
};

UploadedFileView.defaultProps = {
  loader: "bar",
  progressProps: {},
  rtl: false,
  cancelledText: "Cancelled",
  errorText: "Error",
  onCancelRequest: emptyFunction,
};

export default WithTheme(UploadedFileView, styles)({});
