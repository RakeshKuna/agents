import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.state = {
           hasError : false,
           error    : null,
           info     : null
        };
    }

    componentDidCatch(error, info) {
        
            this.setState({ 
              hasError : true, 
              error    : error,
              info     : info
            });
        }


    render() {
        console.log(this.state.hasError)
        if (this.state.hasError) {
            return (
                <div>
                    <h1>Oops!!! Something went wrong</h1>
                    <p>The error: {this.state.error.toString()}</p>
                    <p>Where it occured: {this.state.info.componentStack}</p>
                </div> 
               );       
         } else {
            return this.props.children;
            }
        }
    } 

    export default ErrorBoundary;