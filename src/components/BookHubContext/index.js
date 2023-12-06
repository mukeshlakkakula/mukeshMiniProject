import React from 'react'

const BookHubContext = React.createContext({
  activeMenu: 'Home',
  activeChange: () => {},
  activeNav: false,
  activeNavChange: () => {},
})

export default BookHubContext
