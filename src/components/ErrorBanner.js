import React, { Component } from 'react'
import Alert from 'react-bootstrap/Alert'

class ErrorBanner extends Component {

    constructor(props) {
        super(props);
    }
 
    render() {
        const{ isDataInValid, isResponse404, isResponse500s } = this.props;
        
        let errorMsg = "";
        if (isDataInValid) {
            errorMsg = "Please fix on screen errors before proceeding";
        } else if (isResponse404) {
            errorMsg = "This purchaseOrder is not longer In Progress";
        } else {
            errorMsg = "Backend Error, Please call help!";
        }

        return (
          
            <Alert variant="danger">{errorMsg}</Alert>
           
        )

    }
}

export default ErrorBanner
