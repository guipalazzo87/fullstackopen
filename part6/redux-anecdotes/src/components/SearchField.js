import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const SearchField = (props) => {

  const handleChange = (event) => {
    event.preventDefault()
    const search = event.target.value
    props.filterChange(search)
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

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = { 
  filterChange,
}

const ConnectedSearchField = connect(mapStateToProps,mapDispatchToProps)(SearchField)

export default ConnectedSearchField