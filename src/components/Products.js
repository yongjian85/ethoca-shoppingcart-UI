import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardDeck'

class Products extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        const{ products, addProductIdToCartParentCallback } = this.props;
        return (
          <CardDeck>
           
          { products.map((product, index) => (
       
            <Card style={{ width: '18rem', height: '24rem' }}>
            <Card.Img variant="top" style={{paddingLeft: "5px", height:"50%", width:"50%"}} src={product.productImg} />
            <Card.Body>
              <Card.Title>{product.productName}</Card.Title>
              <Card.Text>
                {product.productDescription}
              </Card.Text>
          
            </Card.Body>
            <Card.Footer>
              <Button onClick={() => {addProductIdToCartParentCallback(product.productId, product.productName)}}
              variant="primary">Add to Cart</Button>
              </Card.Footer>
          </Card>
   
          ))}
 
          </CardDeck>
           
        )

    }
}

export default Products
