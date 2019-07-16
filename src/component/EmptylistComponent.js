import React from 'react';
import { Button } from 'finablr-ui';

class EmptylistComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  handleReload = () =>{
    window.location.reload();
  }

  render() {
    return (
      <div className="empty-result-text">
        {
          (this.props.fromPage == 'Banks') ?
            <div className="align-center"><p>{this.props.text} list is Empty.</p><p>Please click on the <span className="empty-list-action">Import</span> button to upload list of {this.props.text}</p></div>
            :
            [
              (this.props.fromPage == 'AgentBranches') ? <div className="align-center"><p>{this.props.text} list is Empty.</p><p>Please click on the <span className="empty-list-action">Create</span> Button to create list of {this.props.text}</p></div>
                :
                [
                  (this.props.fromPage == 'AgentProfile') ?
                    <div className="align-center">
                      <p>{this.props.text} list is empty.</p>
                      <p>Please click on <span className="empty-list-action">Plus</span> button to create the {this.props.text}</p>
                    </div>
                    :
                    [
                      (this.props.fromPage == 'BranchTableProfileView') ? <div className="align-center"><p>{this.props.text} List is Empty.</p><p>Branch Identification codes are not found.</p></div>
                        :
                        [
                          (this.props.fromPage == 'TokenExpiry') ? <div className="align-center"><p>{this.props.text} List is Empty.</p><p>Please click on the <span className="empty-list-action">Plus</span> Button to create list of {this.props.text}</p></div>
                          :
                          [
                            (this.props.fromPage == 'AllowedProducts') ? <div className="align-center"><p>{this.props.text} List is Empty.</p><p>Please click on the <span className="empty-list-action">Plus</span> Button to create list of {this.props.text}</p></div>
                            :[
                              (this.props.fromPage == 'ChargeRules') ? <div className="align-center"><p>{this.props.text} List is Empty.</p><p>Please click on the <span className="empty-list-action">Plus</span> Button to create list of {this.props.text}</p></div>
                            :
                           [
                            (this.props.fromPage == 'CharegePreferences') ? <div className="align-center"><p> List is Empty.</p><p>Please click on the <span className="empty-list-action">Plus</span> Button to create.</p></div>
                            :
                            <div className="align-center">
                              <h4>{this.props.text}</h4>
                            </div>
                           ]
                             ]
                          ] 
                        ]
                    ]
                ]
            ]
        }
        {
          ((this.props.text) && (this.props.text.toLowerCase().includes("something went wrong") || (this.props.text.toLowerCase().includes("internal server error")))) ? 
          <div className="align-center" style={{marginTop:40}}>
            <Button onClick={this.handleReload}>Reload</Button> 
          </div>
          :null
        }
      </div>
    )
  }
}

export default EmptylistComponent;