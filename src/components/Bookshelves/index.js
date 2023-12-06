import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import {BsSearch, BsFillStarFill} from 'react-icons/bs'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Header from '../Header'
import BookHubContext from '../BookHubContext'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Bookshelves extends Component {
  state = {
    initialShelves: [],
    apiStatus: apiStatusConstants.initial,
    bookshelfName: 'ALL',
    searchText: '',
  }

  componentDidMount = () => {
    this.getBooks()
  }

  bookshelfNameChange = val => {
    this.setState(
      {
        bookshelfName: val,
      },
      this.getBooks,
    )
  }

  getBooks = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {bookshelfName, searchText} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchText}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.setState({
        initialShelves: data.books,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  searchChange = event => {
    this.setState({searchText: event.target.value})
  }

  render() {
    const {initialShelves, apiStatus, bookshelfName, searchText} = this.state
    console.log('ini', initialShelves, apiStatus)

    const sideContainer = bookshelvesList.map(each => (
      <li
        key={each.id}
        value={each.value}
        onClick={() => this.bookshelfNameChange(each.value)}
      >
        <button
          value={each.value}
          type="button"
          className={`buttonElm ${
            bookshelfName === each.value ? 'activeSelf' : 'activeSelfOf'
          }`}
        >
          {each.label}
        </button>
      </li>
    ))

    const sideBar = (
      <ul className="bookshelvesSidebarContainer">
        <h1>Bookshelves</h1>
        <div className="typeOfBksContainer">{sideContainer} </div>
      </ul>
    )

    const searchAndHead = (
      <div className="searchAndHeadContainer">
        <h1 className="showTypeEl">
          {bookshelvesList.map(each => {
            if (each.value === bookshelfName) {
              return each.label
            }
            return ''
          })}{' '}
          Books
        </h1>
        <div className="inputSearchContainer">
          <input
            type="search"
            placeholder="search"
            className="inputContainer"
            onChange={this.searchChange}
          />
          <button
            className="bsIconBtn"
            type="button"
            onClick={this.getBooks}
            testid="searchButton"
          >
            <BsSearch />
          </button>
        </div>
      </div>
    )

    let successView = (
      <ul className="bookShelfSuccessContainer">
        {initialShelves.map(each => (
          <li key={each.id} className="successListContainer">
            <BookHubContext.Consumer key={each.id}>
              {value => {
                const {activeChange} = value
                const activeChangeOf = () => {
                  activeChange('None')
                }
                return (
                  <Link
                    to={`/books/${each.id}`}
                    style={{textDecoration: 'none'}}
                    onClick={activeChangeOf}
                  >
                    <div className="listInsideContainer">
                      <div>
                        <img
                          src={each.cover_pic}
                          alt={each.title}
                          className="successImage"
                        />
                      </div>

                      <div>
                        <h1 className="successHeadText">{each.title}</h1>
                        <p className="successParaText">{each.author_name}</p>
                        <p className="successParaText">
                          Avg Rating{' '}
                          <BsFillStarFill style={{color: '#FBBF24'}} />{' '}
                          {each.rating}
                        </p>
                        <p className="successParaText">
                          Status:{' '}
                          <span style={{color: 'blue', fontWeight: '500'}}>
                            {each.read_status}
                          </span>
                        </p>
                      </div>
                    </div>
                  </Link>
                )
              }}
            </BookHubContext.Consumer>
          </li>
        ))}
      </ul>
    )

    const noSearchView = (
      <div className="noSearchViewContainer">
        <img
          style={{width: '80%'}}
          src="https://res.cloudinary.com/dnjp2exao/image/upload/v1701665957/Asset_1_1_ylzxgb.svg"
          alt="no books"
        />
        <p>Your search for {searchText} did not find any matches.</p>
      </div>
    )
    const socialMediaFooter = (
      <div className="footerContainer">
        <div className="socialMediaFooterContainer">
          <FaGoogle />
          <FaTwitter />
          <FaInstagram />
          <FaYoutube />
        </div>
        <p style={{color: '#3D3C3C', fontWeight: '500'}}>Contact Us</p>
      </div>
    )

    const failureView = (
      <div className="failureView">
        <img
          src="https://res.cloudinary.com/dnjp2exao/image/upload/v1701415035/Group_7522_y36gsc.svg"
          alt="failure view"
        />
        <p>Something went wrong. Please try again</p>
        <button type="button" className="tryButton" onClick={this.getBooks}>
          Try Again
        </button>
      </div>
    )

    const loadingView = (
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
      </div>
    )
    let finalView = ''

    if (initialShelves.length === 0) {
      successView = noSearchView
    }

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        finalView = loadingView
        break
      case apiStatusConstants.success:
        finalView = successView
        break
      case apiStatusConstants.failure:
        finalView = failureView
        break

      default:
        finalView = ''
        break
    }

    return (
      <div>
        <Header />
        <div className="fullBookshelvesContainer">
          {sideBar}

          <div className="searchAndShelvesContainer">
            {searchAndHead}
            {finalView} {socialMediaFooter}
          </div>
        </div>
      </div>
    )
  }
}

export default Bookshelves
