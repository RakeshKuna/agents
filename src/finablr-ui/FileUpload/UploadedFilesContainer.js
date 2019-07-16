import React from "react";
import PropTypes from "prop-types";

import WithTheme from "../utils/HOC/WithTheme";
import { css, emptyFunction } from "../utils";
import UploadedFileView from "./UploadedFileView";
import styles from "./styles/UploadedFilesContainer";

const UploadedFilesContainer = ({ classes, fileList, ...others }) => (
  <div className={css(classes.root, classes.rootExtended)}>
    {fileList.map(file => {
      const fileInfo = file.files.length > 0 ? file.files[0] : {};
      return <UploadedFileView uploadInfo={file} fileInfo={fileInfo} key={file.id} {...others} />;
    })}
  </div>
);

UploadedFilesContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  fileList: PropTypes.array,
  onCancelRequest: PropTypes.func,
};

UploadedFilesContainer.defaultProps = {
  fileList: [],
  onCancelRequest: emptyFunction,
};

export default WithTheme(UploadedFilesContainer, styles)({});
