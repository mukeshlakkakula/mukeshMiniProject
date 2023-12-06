import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import Bookshelves from './components/Bookshelves'
import BookHubContext from './components/BookHubContext'
import ProtectedRoute from './components/ProtectedRoute'
import BookDetails from './components/BookDetails'
import NotFound from './components/NotFound'

import './App.css'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

class App extends Component {
  state = {activeMenu: 'Home', activeNav: false}

  activeChange = active => {
    this.setState({activeMenu: active})
  }

  activeNavChange = () => {
    this.setState(prevState => ({activeNav: !prevState.activeNav}))
  }

  render() {
    const {activeMenu, activeNav} = this.state
    return (
      <BookHubContext.Provider
        value={{
          activeMenu,
          activeChange: this.activeChange,
          activeNav,
          activeNavChange: this.activeNavChange,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/shelf" component={Bookshelves} />
          <ProtectedRoute exact path="/books/:id" component={BookDetails} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </BookHubContext.Provider>
    )
  }
}

export default App
