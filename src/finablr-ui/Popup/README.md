# Props
### Popup
| Name                 | Type                 | Default | Description                                                                               |
| :------------------- | :------------------- | :------ | :---------------------------------------------------------------------------------------- |
| children*            | node                 |         | the content of the component                                                              |
| show*                | boolean              |         | if true, the popup is open                                                                |
| id                   | string               |         | id for the notification                                                                   |
| title                | node &#124; string   |         | title of the popup                                                                        |
| footer               | node                 |         | footer content of the popup                                                               |
| scroll               | 'paper','body'       |         | determine the container for scrolling the dialog.                                         |
| showCloseButton      | boolean              |         | if true, show close button                                                                |
| disableBackdropClick | boolean              | false   | If true, clicking the backdrop will not fire the onClose callback                         |
| disableEscapeKeyDown | boolean              | false   | If true, hitting escape will not fire the onClose callback.                               |
| onShow               | function             |         | callback when the popup shown                                                             |
| onHide               | function             |         | callback when the popup closed                                                            |
| umSize               | 'sm','xs','md',false | 'sm'    | determine the maxwidth of the popup,if 'false' no maxwidth property assigned to component |
| umClass              | string               |         | add custom className                                                                      |
| style                | object               |         | CSS object to override the style                                                          |
| rtl                  | boolean              | false   |                                                                                           |

# Usage 
```sh 

import { Popup } from "finablr-ui";

const footer = (
  <div>
    <TextButton onClick={/** click handler **/}>
      DISAGREE
    </TextButton>
    <TextButton onClick={/** click handler **/}>
      AGREE
    </TextButton>
  </div>
);

<Popup show={open} title="Alert Popup" footer={footer} umSize='sm'>
  Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
  in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
  Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus
  vel augue laoreet rutrum faucibus dolor auctor.
</Popup>

 ```

