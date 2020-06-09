import { connect } from 'react-redux'
import App from '../components/App'

const mapStateToProps = state => {
    
    return {
        token: state.ProfileReducer.token,
        products: state.ProductsReducer.products
    }
}



const AppContainer = connect (
    mapStateToProps

) (App)

export default AppContainer