import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import LineItem from './LineItem'
import Image from 'react-bootstrap/Image'
import Jumbotron from 'react-bootstrap/Jumbotron'

class CurrentCart extends Component {

    constructor(props) {
        super(props);
        this.errorList = [];
    }

    removeLineItem (productId, currentPurchaseOrder, updateParentCurrentPurchaseOrderCallBack) {
        let productIdIndex = this.getCurrentPurchaseOrderIndex(productId, currentPurchaseOrder);

        currentPurchaseOrder.lineItems.splice(productIdIndex, 1);

        updateParentCurrentPurchaseOrderCallBack (currentPurchaseOrder);



    }

    subtractOneQuantityFromLineItem(productId, currentPurchaseOrder, updateParentCurrentPurchaseOrderCallBack) {
        let productIdIndex = this.getCurrentPurchaseOrderIndex(productId, currentPurchaseOrder);
        
        // if user is setting the quantity of this item to zero, might as well just remove it as api does not allow
        // a zero quantity update for a lineitem
        if ( currentPurchaseOrder.lineItems[productIdIndex].quantity === 1) {
            this.removeLineItem (productId, currentPurchaseOrder, updateParentCurrentPurchaseOrderCallBack);
        } else {
            currentPurchaseOrder.lineItems[productIdIndex].quantity --;
            updateParentCurrentPurchaseOrderCallBack(currentPurchaseOrder);
        }
     
    }

    addOneQuantityToLineItem(productId, currentPurchaseOrder, updateParentCurrentPurchaseOrderCallBack) {
        let productIdIndex = this.getCurrentPurchaseOrderIndex(productId, currentPurchaseOrder);
    
        currentPurchaseOrder.lineItems[productIdIndex].quantity ++;
        updateParentCurrentPurchaseOrderCallBack(currentPurchaseOrder);

    }

    updateLineItemQuantityDirectly (isInvalid, quantity, productId, currentPurchaseOrder, updateParentCurrentPurchaseOrderCallBack) {
        let productIdIndex = this.getCurrentPurchaseOrderIndex(productId, currentPurchaseOrder);
        
        //assuming that UI validations have been completed prior to this method call
        currentPurchaseOrder.lineItems[productIdIndex].quantity = quantity;

        currentPurchaseOrder.lineItems[productIdIndex].isInvalid = isInvalid;
        updateParentCurrentPurchaseOrderCallBack(currentPurchaseOrder);
    }
    
    getCurrentPurchaseOrderIndex (productId, currentPurchaseOrder) {

        let productIdIndex = 0;

        //trying to figure out the array index where the productId to be removed is located
        for (var index = 0; index < currentPurchaseOrder.lineItems.length; index ++) {
            if (currentPurchaseOrder.lineItems[index].productId === productId) {
                productIdIndex = index;
                break;
            }
        }

        //In theory productIdIndex will always be found
        return productIdIndex;

    }



    render() {
        const { currentPurchaseOrder, updateParentCurrentPurchaseOrderCallBack } = this.props;
        return (
            <div>
                <h3>Current Cart <Image style={{ height: "3%", width: "3%" }} src="https://image.flaticon.com/icons/svg/263/263142.svg" rounded /></h3>
                {currentPurchaseOrder !== undefined &&  currentPurchaseOrder.lineItems.length > 0?
                    <Container>

                        {currentPurchaseOrder.lineItems.map((lineItem, index) => (

                            <LineItem lineItem={lineItem}
                            removeLineItemParentCallBack={(productId) => {this.removeLineItem (productId, currentPurchaseOrder, updateParentCurrentPurchaseOrderCallBack)}}
                            subtractOneQuantityParentCallBack={(productId) => {this.subtractOneQuantityFromLineItem(productId, currentPurchaseOrder, updateParentCurrentPurchaseOrderCallBack)}}
                            addOneQuantityParentCallBack={(productId) => {this.addOneQuantityToLineItem(productId, currentPurchaseOrder, updateParentCurrentPurchaseOrderCallBack)}}
                            updateLineItemQuantityDirectlyParentCallBack={(isInvalid, quantity, productId) => {this.updateLineItemQuantityDirectly(isInvalid, quantity, productId, currentPurchaseOrder, updateParentCurrentPurchaseOrderCallBack)}}
                            isInvalid={lineItem.isInvalid}>

                            </LineItem>

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
