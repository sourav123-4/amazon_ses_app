import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='form'>
      <h2>Page Not Found !!</h2>
      <Link to='/'>Go to Home Page</Link>
    </div>
  )
}

export default NotFound
