import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'

class PageHeader extends Component {

    constructor(props) {
        super(props);

    }

    updateParentCurrentUserValue(newUsername, updateParentCurrentUserCallback) {
        updateParentCurrentUserCallback(newUsername);
    }

    render() {
        const { currentUser, updateParentCurrentUserCallback, retrieveCurrentUserMostRecentPurchaseOrderCallBack} = this.props;
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Ethoca Grocery Shop</Navbar.Brand>
                <Form inline>
                    <InputGroup>
                    <FormControl type="text"
                        placeholder="Search"
                        value={currentUser}
                        onChange={(event) => this.updateParentCurrentUserValue(event.target.value, updateParentCurrentUserCallback)}
                        isInvalid={false}
                        className="mr-sm-2" />
                         <Form.Control.Feedback type="invalid">
                  "user name is invalid"
                </Form.Control.Feedback>
                </InputGroup>
                    <Button variant="outline-success"
                        onClick={() => retrieveCurrentUserMostRecentPurchaseOrderCallBack(currentUser)}>Retrieve Saved Order</Button>
                </Form>


            </Navbar>

        )

    }
}

export default PageHeader
