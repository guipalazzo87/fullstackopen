import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SearchField = () => {
    
  const dispatch = useDispatch()
  
  return (
    <div>
    <form >
      <div>
        filter:
        <input
          // onChange={(e) => dispatch(notificationChange(e.target.value))}
        />
      </div>
    </form>
  </div>
  )
}

export default SearchField