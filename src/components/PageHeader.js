import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'


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
                    <FormControl type="text"
                        placeholder="Search"
                        value={currentUser}
                        onChange={(event) => this.updateParentCurrentUserValue(event.target.value, updateParentCurrentUserCallback)}
                        className="mr-sm-2" />
                    <Button variant="outline-success"
                        onClick={() => retrieveCurrentUserMostRecentPurchaseOrderCallBack(currentUser)}>Retrieve Previous Order</Button>
                </Form>


            </Navbar>

        )

    }
}

export default PageHeader
