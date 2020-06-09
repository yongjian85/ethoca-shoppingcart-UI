import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ShoppingCartMain from './ShoppingCartMain.js'


class App extends Component {
  
  render() {

    return (
      <Router>
        <Switch>
       
            <Route exact path="/" component={ShoppingCartMain} />
        
        </Switch>
      </Router>
    
   ) 
  }
}


export default App;
