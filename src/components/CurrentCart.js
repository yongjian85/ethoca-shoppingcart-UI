import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import LineItem from './LineItem'
import Image from 'react-bootstrap/Image'
import Jumbotron from 'react-bootstrap/Jumbotron'

class CurrentCart extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        const { currentPurchaseOrder } = this.props;
        return (
            <div>
                <h3>Current Cart <Image style={{ height: "3%", width: "3%" }} src="https://image.flaticon.com/icons/svg/263/263142.svg" rounded /></h3>
                {currentPurchaseOrder !== undefined ?
                    <Container>

                        {currentPurchaseOrder.lineItems.map((lineItem, index) => (

                            <LineItem lineItem={lineItem}></LineItem>

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
