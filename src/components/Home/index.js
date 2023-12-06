import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import BookHubContext from '../BookHubContext'

// import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,

    booksList: [],
  }

  componentDidMount = () => {
    this.getBooks()
  }

  getBooks = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/top-rated-books`
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
        booksList: data.books,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  render() {
    const {apiStatus, booksList} = this.state

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    }

    const settings01 = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
    }

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

    const booksView = booksList.map(each => (
      <li className="bookViewContainer" key={each.id}>
        <BookHubContext.Consumer>
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
                <img
                  src={each.cover_pic}
                  alt={each.title}
                  className="coverImage"
                />
                <h1 className="topHeadText">{each.title}</h1>
                <h1 className="paraText">{each.author_name}</h1>
              </Link>
            )
          }}
        </BookHubContext.Consumer>
      </li>
    ))

    const loadingView = (
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
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
    const successView = (
      <div>
        <div className="sliderForLargeScreens">
          <Slider {...settings}>{booksView}</Slider>
        </div>
        <div className="sliderForSmallScreens">
          <Slider {...settings01}>{booksView}</Slider>
        </div>
      </div>
    )

    let finalView = ''

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
        <div className="homeFullContainer">
          <div className="headingAndParaContainer">
            <h1 className="findText">Find Your Next Favorite Books?</h1>
            <p className="paraTextOf">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
          </div>{' '}
          <Link to="/shelf" style={{textDecoration: 'none'}}>
            <button type="button" className="findBooksBtnSmScreen">
              Find Books
            </button>
          </Link>
          <div className="sliderAndBtnContainer">
            <div className="topBooksAndButtonContainer">
              <h1 className="topHeadText">Top Rated Books</h1>
              <Link to="/shelf" style={{textDecoration: 'none'}}>
                <button type="button" className="findBooksBtn">
                  Find Books
                </button>
              </Link>
            </div>

            {finalView}
          </div>{' '}
          {socialMediaFooter}
        </div>
      </div>
    )
  }
}

export default Home
