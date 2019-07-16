# Props

| Props              | Type                      | Default       | Description                                                                                   |
| ------------------ | ------------------------- | ------------- | --------------------------------------------------------------------------------------------- |
| id                 | string                    |               | id attribute for the input tag                                                                |
| name               | string                    |               | name attribute for the input tag                                                              |
| placeholder        | string                    | File Upload   | placeholder attribute for the input tag                                                       |
| url                | string                    |               | url to send request on uploading files                                                        |
| accept             | string or string[]        |               | allow specific types of files, See https://github.com/okonet/attr-accept for more information |
| minSize            | number                    | 0             | minimum file size (in bytes)                                                                  |
| maxSize            | number                    | Infinity      | maximum file size (in bytes)                                                                  |
| multiple           | boolean                   | false         | allow dropping multiple files                                                                 |
| dragDrop           | boolean                   | false         | enable drag and drop                                                                          |
| service            | instanceOf: utils/Service | utils/Service | instance of service handler to be used inside the file upload                                 |
| isEnabled          | boolean                   | true          | enable/disable the fileupload entirely                                                        |
| isQueue            | boolean                   | false         | enable file upload in queue or async mode                                                     |
| loader             | oneOf: bar, circle        | bar           | enable bar loader or circle loader                                                            |
| progressBarProps   | object                    |               | props for progress bar                                                                        |
| labels             | object                    |               | see [see labels](#labels) for object keys                                                     |
| onDrop             | function                  |               | onDrop callback                                                                               |
| onDropAccepted     | function                  |               | onDropAccepted callback                                                                       |
| onDropRejected     | function                  |               | onDropRejected callback                                                                       |
| onUploadComplete   | function                  |               | callback after file uploaded to server                                                        |
| onFileDialogCancel | function                  |               | callback on clicking the cancel button of the file dialog                                     |
| umClass            | string                    |               | custom class name to override the fileupload                                                  |
| style              | object                    |               | CSS object to override the style [see styles](#styles) for object keys                        |
| rtl                | boolean                   | false         |                                                                                               |

# Labels
| Props        | Type   | Default     | Description                                          |
| ------------ | ------ | ----------- | ---------------------------------------------------- |
| placeholder  | string | File Upload | string to display in input placeholder               |
| browseText   | string | Browse      | string to display in browse                          |
| uploadText   | string | Upload      | string to display on upload, after choosing the file |
| canceledText | string | Cancelled   | string to be shown on cancel of the file upload      |
| errorText    | string | error       | string to be shown on error of the file upload       |

# Styles
| Props                | Type   | Description                                               |
| -------------------- | ------ | --------------------------------------------------------- |
| root                 | object | object to overide the root style                          |
| inputViewRoot        | object | object to override the rootstyle when dragDrop false      |
| inputViewInput       | object | object to override the input field                        |
| inputViewLabel       | object | object to override the input field label                  |
| inputViewDisabled    | object | object to override the input field when input is disabled |
| dropRoot             | object | object to override the rootstyle when dragDrop false      |
| dropContainer        | object | object to override the drop container style               |
| dropDisabled         | object | object to override the drop container when disabled       |
| fileListContainer    | object | object to override the rootstyle of file list container   |
| fileListRoot         | object | object to override the file list                          |
| fileListFileName     | object | object to be override the file list name                  |
| fileListCancelButton | object | object to override the file list cancel button            |


# Usage
```js
    import { FileUpload } from 'finablr-ui';

    <FileUpload
        url="http://localhost:3030/upload"
        accept={["image/*", "application/pdf"]}
        minSize={1}
        maxSize={1024000000}
        isEnabled={false}
        dragDrop
        multiple
        isQueue
        onUploadComplete={(error, file) => {
          console.log(error, file);
        }}
        style={{ marginBottom: "10px" }}
      />

 ```

# Event Handler

```js

import { FileUpload } from 'finablr-ui';

function onDrop(acceptedFiles) {}
function onDropAccepted(acceptedFiles, evt) {}
function onDropRejected(rejectedFiles, evt) {}
function onUploadComplete(error, file) {}

<FileUpload
    url="http://localhost:3030/upload"
    accept={["image/*", "application/pdf"]}
    minSize={1}
    maxSize={1024000000}
    isEnabled={false}
    dragDrop
    multiple
    isQueue
    onDrop={onDrop}
    onDropAccepted={onDropAccepted}
    onDropRejected={onDropRejected}
    onUploadComplete={onUploadComplete}
    style={{ marginBottom: "10px" }}
    />

```