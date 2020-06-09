import { CACHE_PRODUCTS } from '../actions/Actions'

const ProductsReducer = (state = [], action) => {
    switch (action.type) {
    
        case CACHE_PRODUCTS:

                return {...state, products: action.products} 

       
        default:
            return state
    }
}

export default ProductsReducer;