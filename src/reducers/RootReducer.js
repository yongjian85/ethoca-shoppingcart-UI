import ProfileReducer from './ProfileReducer'
import ProductsReducer from './ProductsReducer'

export default function rootReducer(state = {}, action) {
  return {
    ProfileReducer: ProfileReducer(state.profileReducer, action),
    ProductsReducer: ProductsReducer(state.productsReducer, action)
    
  
  }
}
