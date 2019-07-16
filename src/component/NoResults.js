import React from 'react';
class Noresults extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
      return(
        <div className="empty-result-text global-font">
          <div className="align-center"><p><strong> No search results available for your search criteria!</strong></p></div>
        </div>
      )
    }
  }
  export default Noresults;