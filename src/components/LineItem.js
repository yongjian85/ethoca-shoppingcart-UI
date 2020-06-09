import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'

class LineItem extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        const{ lineItem } = this.props;
        return (
            <Row>
            <Col xs={6}>{lineItem.productName}</Col>
            <Col><Button variant="outline-danger">-</Button></Col>
            <Col> <FormControl type="text"
                        placeholder="Search"
                        value={lineItem.quantity}
                        className="mr-sm-2" /></Col>
            <Col><Button variant="outline-success">+</Button></Col>
          </Row>
           
        )

    }
}

export default LineItem
