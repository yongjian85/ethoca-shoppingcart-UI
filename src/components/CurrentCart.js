import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import LineItem from './LineItem'
import Image from 'react-bootstrap/Image'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
class CurrentCart extends Component {

    removeLineItem (productId, currentPurchaseOrder, updateParentCurrentPurchaseOrderCallBack) {
        let productIdIndex = 0;

        //trying to figure out the array index where the productId to be removed is located
        for (var index = 0; index < currentPurchaseOrder.lineItems.length; index ++) {
            if (currentPurchaseOrder.lineItems[index].productId === productId) {
                productIdIndex = index;
                break;
            }
        }

        currentPurchaseOrder.lineItems.splice(productIdIndex, 1);

        updateParentCurrentPurchaseOrderCallBack (currentPurchaseOrder);



    }

    render() {
        const { currentPurchaseOrder, updateParentCurrentPurchaseOrderCallBack } = this.props;
        return (
            <div>
                <h3>Current Cart <Image style={{ height: "3%", width: "3%" }} src="https://image.flaticon.com/icons/svg/263/263142.svg" rounded /></h3>
                {currentPurchaseOrder !== undefined ?
                    <Container>

                        {currentPurchaseOrder.lineItems.map((lineItem, index) => (

                            <LineItem lineItem={lineItem}
                            removeLineItemParentCallBack={(productId) => {this.removeLineItem (productId, currentPurchaseOrder, updateParentCurrentPurchaseOrderCallBack)}}></LineItem>

                        ))}
                       
                    </Container>

                    :
                    <Jumbotron>
                        <h1>Shopping Cart currently empty!</h1>

                    </Jumbotron>
                }
            </div>
        )

    }
}

export default CurrentCart
