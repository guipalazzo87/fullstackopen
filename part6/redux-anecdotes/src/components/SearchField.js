import React from 'react'
import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const SearchField = () => {

  const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()
    const search = event.target.value
    dispatch(filterChange(search))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div>
      <form >
        <div style={style}>
          filter: <input onChange={(e) => handleChange(e)} />
        </div>
      </form>
    </div>
  )
}

export default SearchField