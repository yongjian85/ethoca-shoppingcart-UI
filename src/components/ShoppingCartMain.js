import React, { Component } from 'react'
import Products from './Products'
import axios from 'axios';
import PageHeader from './PageHeader';
import CurrentCart from './CurrentCart';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class ShoppingCartMain extends Component {

  constructor(props) {
    super(props);

    this.state = {
      products: [],
      currentUserName: undefined,
      currentPurchaseOrder: undefined,
      isNewPurchaseOrder: true,
      isPurchaseOrderRetrievalError: false
    };


  }

  componentDidMount() {
    if (this.state.products.length === 0) {
      axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_ENDPOINT}/products`,
        headers: { accept: "application/json" },
        validateStatus: () => true
      }).then(res => {
        this.setState({ ...this.state, products: res.data.products })
      });

    }
  }

  retrieveCurrentUserPurchaseOrder(currentUsername) {
    if (currentUsername !== undefined && currentUsername.trim() !== "") {
      axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_ENDPOINT}/purchaseOrder/${currentUsername}`,
        headers: { accept: "application/json" },
        validateStatus: () => true
      }).then(res => {

        if (res.status === 200) { //there was an 'In Progress' purchase Order
          this.setState({ ...this.state, currentPurchaseOrder: res.data.purchaseOrder, isNewPurchaseOrder: false })
          return
        } else if (res.status === 404) { //there was no 'In Progress' purchase Order
          this.setState({ ...this.state, currentPurchaseOrder: undefined, isNewPurchaseOrder: true })
          return
        } else { //there something with the backend
          this.setState({ ...this.state, currentPurchaseOrder: undefined, isNewPurchaseOrder: true, isPurchaseOrderRetrievalError: true })
          return

        }
      });
    }
  }

  updateCurrentUserName(newUserName) {
    this.setState({ ...this.state, currentUserName: newUserName });
  }

  updateCurrentPurchaseOrder(newPurchaseOrder) {
    this.setState({ ...this.state, currentPurchaseOrder: newPurchaseOrder });
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        <PageHeader currentUser={this.state.currentUserName}
          updateParentCurrentUserCallback={(newUserName) => { this.updateCurrentUserName(newUserName) }}
          retrieveCurrentUserMostRecentPurchaseOrderCallBack={(currentUsername) => { this.retrieveCurrentUserPurchaseOrder(currentUsername) }}></PageHeader>

        <Products products={products}></Products>

        <CurrentCart currentPurchaseOrder={this.state.currentPurchaseOrder}
          updateParentCurrentPurchaseOrderCallBack={(newPurchaseOrder) => { this.updateCurrentPurchaseOrder(newPurchaseOrder) }}></CurrentCart>

        {this.state.currentPurchaseOrder !== undefined && this.state.currentPurchaseOrder.lineItems.length !== 0 ?
          <Row>
            <Col><Button variant="outline-primary">Save</Button></Col>
            <Col><Button variant="success">Purchase!</Button></Col>
          </Row> : ""}
      </div>
    )

  }
}

export default ShoppingCartMain
