import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dnjp2exao/image/upload/v1701752207/Group_7484_barlfg.svg"
      alt="not found"
      className="not-found-img"
    />
    <h1>Page Not Found</h1>
    <p>we are sorry, the page you requested could not be found</p>
    <Link to="/">
      <button type="button" className="btnOfNotFound">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
