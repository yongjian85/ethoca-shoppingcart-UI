import React, { Component } from 'react'
import Products from './Products'
import axios from 'axios';
import PageHeader from './PageHeader';
import CurrentCart from './CurrentCart';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import StatusBanner from './StatusBanner';
import { PURCHASE_ORDER_STATUS_IN_PROGRESS, PURCHASE_ORDER_STATUS_SUBMITTED } from '../constants';


class ShoppingCartMain extends Component {

  constructor(props) {
    super(props);

    this.state = {
      products: [],
      currentUserName: undefined,
      currentPurchaseOrder: undefined,
      isNewPurchaseOrder: true,
      isDataInValid: false,
      isResponse404: false,
      isResponse500s: false,
      isResponse200: false
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

    this.setState({...this.state, isDataInValid: false, isResponse404: false, isResponse500s: false, isResponse200: false})

    if (currentUsername !== undefined && currentUsername.trim() !== "") {
      axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_ENDPOINT}/purchaseOrder/${currentUsername}`,
        headers: { accept: "application/json" },
        validateStatus: () => true
      }).then(res => {

        if (res.status === 200) { //there was an 'In Progress' purchase Order
          this.setState({ ...this.state, currentPurchaseOrder: res.data.purchaseOrder, isNewPurchaseOrder: false, isResponse200: true })
          return
        } else if (res.status === 404) { //there was no 'In Progress' purchase Order
          this.setState({ ...this.state, currentPurchaseOrder: undefined, isNewPurchaseOrder: true })
          return
        } else { //there something with the backend
          this.setState({ ...this.state, currentPurchaseOrder: undefined, isNewPurchaseOrder: true, isResponse500s: true })
          return

        }
      });
    }
  }

  deletePurchaseOrder (purchaseId) {

    this.setState({...this.state, isDataInValid: false, isResponse404: false, isResponse500s: false, isResponse200: false})


    axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_API_ENDPOINT}/purchaseOrder/${purchaseId}`,
      headers: { accept: "application/json" },
      validateStatus: () => true
    }).then(res => {

      if (res.status === 200) { //there was an 'In Progress' purchase Order
        this.setState({ ...this.state, currentPurchaseOrder: undefined, isNewPurchaseOrder: true, isResponse200: true })
        return
      } else if (res.status === 404) { //there was no 'In Progress' purchase Order
        this.setState({ ...this.state, currentPurchaseOrder: undefined, isNewPurchaseOrder: true })
        return
      } else { //there something with the backend
        this.setState({ ...this.state, currentPurchaseOrder: undefined, isNewPurchaseOrder: true, isResponse500s: true })
        return

      }
    });
  }


  savePurchaseOrder (purchaseOrder) {

    purchaseOrder.status = PURCHASE_ORDER_STATUS_IN_PROGRESS;
    this.updatePurchaseOrder(purchaseOrder);

  }

  submitPurchaseOrder (purchaseOrder) {
    purchaseOrder.status = PURCHASE_ORDER_STATUS_SUBMITTED;
    this.updatePurchaseOrder (purchaseOrder);
  }

  updatePurchaseOrder (purchaseOrder) {

    this.setState({...this.state, isDataInValid: false, isResponse404: false, isResponse500s: false, isResponse200: false})


    for (var index = 0; index < purchaseOrder.lineItems.length; index++) {

      if (purchaseOrder.lineItems[index].isInvalid !== undefined
        && purchaseOrder.lineItems[index].isInvalid) { //there was errors in the payload that should be fixed
        this.setState({...this.state, isDataInValid: true});
        return
      }
    }

      axios({
        method: 'PUT',
        url: `${process.env.REACT_APP_API_ENDPOINT}/purchaseOrder`,
        headers: { accept: "application/json" },
        data: purchaseOrder,
        validateStatus: () => true
      }).then(res => {

        if (res.status === 200) { //there was an 'In Progress' purchase Order
          this.setState({ ...this.state, isDataInValid: false, isResponse200: true})
          return
        } else if (res.status === 404) { //there was no 'In Progress' purchase Order
          this.setState({ ...this.state, isDataInValid: true, isResponse404: true })
          return
        } else { //there something with the backend
          this.setState({ ...this.state, isDataInValid: true, isResponse500s: true })
          return

        }
      });
    }

  

  updateCurrentUserName(newUserName) {
    this.setState({ ...this.state, currentUserName: newUserName });
  }

  updateCurrentPurchaseOrder(newPurchaseOrder) {
    this.setState({ ...this.state, currentPurchaseOrder: newPurchaseOrder });
  }

  addProductIdToCart(productId, productName, currentPurchaseOrder) {

    let isProductIdFound = false;
    /*if we find the productId already in the shopping cart, we will increase it by 1
    else add it to the cart
    */
    for (var index = 0; index <currentPurchaseOrder.lineItems.length; index++) {
      if(currentPurchaseOrder.lineItems[index].productId === productId) {
        currentPurchaseOrder.lineItems[index].quantity++;
        isProductIdFound = true;
        break;
      }
    }

    if (!isProductIdFound) {
      let newLineItem = {
        productId: productId,
        productName: productName,
        quantity: 1
      }
      currentPurchaseOrder.lineItems.push(newLineItem);
    }

    this.updateCurrentPurchaseOrder(currentPurchaseOrder);

  }

  render() {
    const { products } = this.state;
    return (
      <div>
        <PageHeader currentUser={this.state.currentUserName}
          updateParentCurrentUserCallback={(newUserName) => { this.updateCurrentUserName(newUserName) }}
          retrieveCurrentUserMostRecentPurchaseOrderCallBack={(currentUsername) => { this.retrieveCurrentUserPurchaseOrder(currentUsername) }}></PageHeader>

        {this.state.isDataInValid || this.state.isResponse404 || this.state.isResponse500s || this.state.isResponse200 ?
        <StatusBanner isDataInValid={this.state.isDataInValid} 
        isResponse404={this.state.isResponse404}  
        isResponse500s={this.state.isResponse500s} isResponse200={this.state.isResponse200}></StatusBanner>: ""}

        <Products products={products}
        addProductIdToCartParentCallback={(productId, productName) => {this.addProductIdToCart(productId, productName, this.state.currentPurchaseOrder)}}></Products>

        <CurrentCart currentPurchaseOrder={this.state.currentPurchaseOrder}
          updateParentCurrentPurchaseOrderCallBack={(newPurchaseOrder) => { this.updateCurrentPurchaseOrder(newPurchaseOrder) }}></CurrentCart>

        {this.state.currentPurchaseOrder !== undefined && this.state.currentPurchaseOrder.lineItems.length !== 0 ?
          <Row>
            <Col><Button onClick={() => {this.savePurchaseOrder(this.state.currentPurchaseOrder)}}
            variant="outline-primary">Save</Button></Col>
            
            <Col>
              <Button onClick={() => {this.deletePurchaseOrder(this.state.currentPurchaseOrder.purchaseId)}} 
                    variant="outline-danger">Delete</Button></Col>
            
            <Col><Button onClick={() => {this.submitPurchaseOrder(this.state.currentPurchaseOrder)}} 
            variant="success">Purchase!</Button></Col>
          </Row> : ""}
          {this.state.currentPurchaseOrder !== undefined && this.state.currentPurchaseOrder.lineItems.length === 0 ?
          <Row>
            <Col>
              <Button onClick={() => {this.deletePurchaseOrder(this.state.currentPurchaseOrder.purchaseId)}} 
                    variant="outline-danger">Delete</Button></Col>
          </Row> : ""}
      </div>
    )

  }
}

export default ShoppingCartMain
