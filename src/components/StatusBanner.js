import React, { Component } from 'react'
import Alert from 'react-bootstrap/Alert'

class StatusBanner extends Component {

    constructor(props) {
        super(props);
    }
 
    render() {
        const{ isResponse200, isDataInValid, isResponse404 } = this.props;
        
        let errorMsg = "";
        if (isDataInValid) {
            errorMsg = "Please correct on screen errors before proceeding";
        } else if (isResponse404) {
            errorMsg = "This purchaseOrder is not longer In Progress";
        } else if (isResponse200) {
            errorMsg = "Successfully completed!";
        } else {
            errorMsg = "Unknown Error, please call for help!";
        }

        return (
            <div>
            {isResponse200?  <Alert variant="success">{errorMsg}</Alert>:
            <Alert variant="danger">{errorMsg}</Alert>}
            </div>
        )

    }
}

export default StatusBanner
