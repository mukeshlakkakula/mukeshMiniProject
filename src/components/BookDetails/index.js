import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class BookDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,

    booksList: {},
  }

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
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
        booksList: data.book_details,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  render() {
    const {booksList, apiStatus} = this.state
    console.log('result', booksList, apiStatus)

    const successView = (
      <div className="finalSuccessBookDetails">
        <div className="imgAndBookDetailsContainer">
          <img
            src={booksList.cover_pic}
            alt={booksList.title}
            className="imageBook"
          />
          <div>
            <h1 className="heading">{booksList.title}</h1>
            <p>{booksList.author_name}</p>
            <p className="successParaText">
              Avg Rating <BsFillStarFill style={{color: '#FBBF24'}} />{' '}
              {booksList.rating}
            </p>
            <p className="successParaText">
              Status:{' '}
              <span style={{color: 'blue', fontWeight: '500'}}>
                {booksList.read_status}
              </span>
            </p>
          </div>
        </div>

        <div className="textContainer">
          <hr />
          <h1 className="heading">About Author</h1>
          <p className="para">{booksList.about_author}</p>
          <h1 className="heading">About Book</h1>
          <p className="para">{booksList.about_book}</p>
        </div>
      </div>
    )

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
        <button
          type="button"
          className="tryButton"
          onClick={this.getBookDetails}
        >
          Try Again
        </button>
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

        <div className="fullContainer">
          {finalView}
          {socialMediaFooter}
        </div>
      </div>
    )
  }
}

export default BookDetails
