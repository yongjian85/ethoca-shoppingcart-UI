import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'

class LineItem extends Component {

    constructor(props) {
        super(props);
    }

    updateLineItemQuantity (quantity, productId, updateLineItemQuantityDirectlyParentCallBack) {

        quantity = parseInt(quantity);

        //Checking if quantity is a valid integer between 1 and 100 inclusive
        updateLineItemQuantityDirectlyParentCallBack ((!Number.isInteger(quantity)
        || quantity > process.env.REACT_APP_MAX_LINEITEM_QUANTITY 
        || quantity < 1),
        quantity, productId);

    }

    render() {
        const{ isInvalid, lineItem, removeLineItemParentCallBack, subtractOneQuantityParentCallBack, addOneQuantityParentCallBack, updateLineItemQuantityDirectlyParentCallBack, maxQuantity } = this.props;
       
        return (
            <Row>
            <Col><Button onClick={() => removeLineItemParentCallBack(lineItem.productId)} variant="danger">x</Button></Col>
            <Col xs={6}>{lineItem.productName}</Col>
            <Col>{lineItem.quantity > 1 ? 
                <Button 
                    onClick={() => subtractOneQuantityParentCallBack (lineItem.productId)}
                    variant="outline-danger">-</Button> : "" }
            </Col>
            <Col> <FormControl type="text"
                        placeholder="?"
                        value={lineItem.quantity}
                        isInvalid={isInvalid !== undefined && isInvalid}
                        onChange={(event) => {this.updateLineItemQuantity(event.target.value, lineItem.productId, updateLineItemQuantityDirectlyParentCallBack)}}
                        className="mr-sm-2" /></Col>
            <Col>{lineItem.quantity < parseInt(maxQuantity) ? //need to read this from property
                <Button 
                    onClick={() => addOneQuantityParentCallBack (lineItem.productId)}
                    variant="outline-success">+</Button>: ""}</Col>
          </Row>
           
        )

    }
}

export default LineItem
