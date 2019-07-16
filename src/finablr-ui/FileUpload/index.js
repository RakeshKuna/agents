import React, { Component } from "react";
import PropTypes from "prop-types";

import { css, emptyFunction } from "../utils";
import WithTheme from "../utils/HOC/WithTheme";
import ServiceHandler from "../utils/Service";

import styles from "./styles/style";
import InputView from "./InputView";
import DropView from "./DropView";

const DEFAULT_LABELS = {
  placeholder: "File Upload",
  browseText: "Browse",
  uploadText: "Upload",
  cancelledText: "Cancelled",
  errorText: "Error",
};
const Service = new ServiceHandler();

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    };
    this.fileId = 0;
  }

  onDrop = list => {
    const { onDrop, dragDrop } = this.props;
    this.setState(
      prevState => {
        const { fileList } = prevState;
        let newFileList;
        // single fileList when dragDrop=false
        if (!dragDrop) {
          newFileList = [this.getFileObject(list)];
        } else {
          newFileList = [...fileList, ...list.map(file => this.getFileObject([file]))];
        }
        return {
          fileList: newFileList,
        };
      },
      () => {
        if (dragDrop) {
          this.uploadData();
        }
        if (onDrop) onDrop(list);
      }
    );
  };

  onUploadProgress = (progressEvent, fileId) => {
    this.setState(prevState => {
      const { fileList } = prevState;
      const index = fileList.findIndex(item => item.id === fileId);
      if (index === -1) {
        return {};
      }
      const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      return {
        fileList: [
          ...fileList.slice(0, index),
          {
            ...fileList[index],
            percentage,
            isInProgress: percentage !== 100,
            isCompleted: percentage === 100,
          },
          ...fileList.slice(index + 1),
        ],
      };
    });
  };

  getFileObject = (
    files,
    percentage = 0,
    isInProgress = false,
    isCompleted = false,
    isCancelled = false,
    isError = false,
    config = {},
    formData = new FormData()
  ) => {
    const { service } = this.props;
    this.fileId += 1;
    const cancelToken = service.getCancelToken();
    return {
      config,
      files,
      formData,
      cancelToken,
      id: this.fileId,
      isCompleted,
      isCancelled,
      isError,
      isInProgress,
      percentage,
    };
  };

  processUploadComplete = (err, res, { id: fileId }, next) => {
    const { service } = this.props;
    this.setState(
      prevState => {
        const { fileList } = prevState;
        const index = fileList.findIndex(item => item.id === fileId);
        if (index === -1) {
          return {};
        }
        const isCancelled = err && service.isCancelled(res);
        const isError = !!err && !isCancelled;
        const isCompleted = !isCancelled && !isError;
        return {
          fileList: [
            ...fileList.slice(0, index),
            {
              ...fileList[index],
              isError,
              isCancelled,
              isCompleted,
            },
            ...fileList.slice(index + 1),
          ],
        };
      },
      () => {
        const { onUploadComplete } = this.props;
        onUploadComplete(err, res);
        next(); // need to call next to proceed the operation
      }
    );
  };

  processCancel = fileId => {
    this.setState(prevState => {
      const { fileList } = prevState;
      const index = fileList.findIndex(item => item.id === fileId);
      if (index === -1) {
        return {};
      }
      fileList[index].cancelToken.cancel("Operation cancelled");
      return {
        fileList: [
          ...fileList.slice(0, index),
          {
            ...fileList[index],
            isCancelled: true,
          },
          ...fileList.slice(index + 1),
        ],
      };
    });
  };

  uploadData = () => {
    const { url, isQueue, service } = this.props;

    this.setState(
      prevState => {
        const { fileList } = prevState;
        const newFileList = fileList.map(({ files, id, formData, ...list }) => {
          files.forEach(file => {
            formData.append(file.name, file);
          });
          return {
            ...list,
            files,
            id,
            formData,
            config: {
              onUploadProgress: progressEvent => this.onUploadProgress(progressEvent, id),
              cancelToken: list.cancelToken.getToken(),
            },
          };
        });
        return { fileList: newFileList };
      },
      () => {
        const { fileList } = this.state;
        const filesToUpload = fileList
          .filter(
            ({ isInProgress, isCompleted, isCancelled, isError }) =>
              !isInProgress && !isCompleted && !isCancelled && !isError
          )
          .map(({ formData: data, config, ...rest }) => ({
            config: {
              // config key needed in service handler
              method: "POST",
              url,
              data,
              config,
            },
            ...rest,
          }));
        const processFunction = isQueue ? service.requestQueue : service.requestAsync;
        processFunction(filesToUpload, this.processUploadComplete);
      }
    );
  };

  render() {
    const {
      classes,
      dragDrop,
      children,
      rtl,
      umClass,
      onDrop,
      onClick,
      onUploadComplete,
      style: {
        inputViewRoot,
        inputViewInput,
        inputViewLabel,
        inputViewDisabled,
        dropRoot,
        dropContainer,
        dropDisabled,
        fileListContainer,
        fileListRoot,
        fileListFileName,
        fileListCancelButton,
      },
      isQueue,
      labels,
      ...others
    } = this.props;
    const { fileList } = this.state;
    const { placeholder, browseText, uploadText, cancelledText, errorText } = {
      ...DEFAULT_LABELS,
      ...labels,
    };
    return (
      <div className={css(classes.root, classes.rootExtended, umClass)}>
        {dragDrop ? (
          <DropView
            fileList={fileList}
            onDrop={this.onDrop}
            onCancelRequest={this.processCancel}
            cancelledText={cancelledText}
            errorText={errorText}
            style={{
              dropRoot,
              dropContainer,
              dropDisabled,
              fileListContainer,
              fileListRoot,
              fileListFileName,
              fileListCancelButton,
            }}
            {...others}
          >
            {children}
          </DropView>
        ) : (
          <InputView
            fileList={fileList.length > 0 ? fileList[0] : {}}
            placeholder={placeholder}
            browseText={browseText}
            uploadText={uploadText}
            onDrop={this.onDrop}
            onUploadClick={this.uploadData}
            rtl={rtl}
            style={{
              inputViewRoot,
              inputViewInput,
              inputViewLabel,
              inputViewDisabled,
            }}
            {...others}
          />
        )}
      </div>
    );
  }
}

FileUpload.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
  url: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  labels: PropTypes.shape({
    browseText: PropTypes.string,
    uploadText: PropTypes.string,
    cancelledText: PropTypes.string,
    errorText: PropTypes.string,
  }),
  isEnabled: PropTypes.bool,
  accept: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  multiple: PropTypes.bool,
  dragDrop: PropTypes.bool,
  service: PropTypes.instanceOf(ServiceHandler),
  loader: PropTypes.oneOf(["bar", "circle"]),
  progressBarProps: PropTypes.object,
  isQueue: PropTypes.bool,
  minSize: PropTypes.number,
  maxSize: PropTypes.number,
  rtl: PropTypes.bool,
  onClick: PropTypes.func,
  onDrop: PropTypes.func,
  onDropAccepted: PropTypes.func,
  onDropRejected: PropTypes.func,
  onUploadComplete: PropTypes.func,
  onFileDialogCancel: PropTypes.func,
  style: PropTypes.object,
  umClass: PropTypes.string,
};

FileUpload.defaultProps = {
  placeholder: "File Upload",
  labels: DEFAULT_LABELS,
  isEnabled: true,
  multiple: false,
  dragDrop: false,
  service: Service,
  loader: "bar",
  isQueue: false,
  rtl: false,
  onClick: emptyFunction,
  onDrop: emptyFunction,
  onDropAccepted: emptyFunction,
  onDropRejected: emptyFunction,
  onUploadComplete: emptyFunction,
  onFileDialogCancel: emptyFunction,
  style: {},
};
export default WithTheme(FileUpload, styles)({});
