import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import BookHubContext from '../BookHubContext'

import './index.css'

const Header = props => (
  <BookHubContext.Consumer>
    {value => {
      const {activeMenu, activeChange, activeNav, activeNavChange} = value
      const activeChangeOf = val => {
        activeChange(val)
      }
      console.log('activeNav', activeNav)

      const activeNavBar = () => {
        activeNavChange()
      }

      const onClickLogout = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('/login')
      }
      return (
        <div>
          <div className="HeaderContainer">
            <div className="imgAndHomeContainer">
              <Link to="/">
                <div>
                  <img
                    onClick={() => activeChangeOf('Home')}
                    className="logoImage"
                    src="https://res.cloudinary.com/dnjp2exao/image/upload/v1700890271/Group_7731_avxjur.svg"
                    alt="website logo"
                  />
                </div>
              </Link>
              <div className="NavbarContainer">
                <img
                  onClick={activeNavBar}
                  src="https://res.cloudinary.com/dnjp2exao/image/upload/v1701060874/menu_h6bweq.svg"
                  alt="navImage"
                />
              </div>

              <div className="homeButtonContainer">
                <Link to="/" style={{textDecoration: 'none'}}>
                  <h1
                    className={`${
                      activeMenu === 'Home' ? 'home' : 'colorText'
                    }`}
                    onClick={() => activeChangeOf('Home')}
                  >
                    Home
                  </h1>
                </Link>
                <Link
                  to="/shelf"
                  style={{textDecoration: 'none'}}
                  onClick={() => activeChangeOf('Bookshelves')}
                >
                  <h1
                    className={`${
                      activeMenu === 'Bookshelves' ? 'home' : 'colorText'
                    }`}
                  >
                    Bookshelves
                  </h1>
                </Link>
                <button
                  type="button"
                  className="buttonText"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          <nav className={activeNav ? 'navContainerOf' : 'noNavContainerOf'}>
            <ul className="navDisplay">
              <Link to="/" style={{textDecoration: 'none'}}>
                <li
                  className={`${
                    activeMenu === 'Home' ? 'homeOf' : 'colorTextOf'
                  }`}
                  onClick={() => activeChangeOf('Home')}
                >
                  Home
                </li>
              </Link>
              <hr />
              <Link
                to="/shelf"
                style={{textDecoration: 'none'}}
                onClick={() => activeChangeOf('Bookshelves')}
              >
                <li
                  className={`${
                    activeMenu === 'Bookshelves' ? 'homeOf' : 'colorTextOf'
                  }`}
                >
                  Bookshelves
                </li>
              </Link>
              <hr />
              <button
                type="button"
                className="buttonTextOf"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </ul>
          </nav>
        </div>
      )
    }}
  </BookHubContext.Consumer>
)

export default withRouter(Header)
