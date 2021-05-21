import React from 'react'

const Filter = () => {
  const handleChange = (event) => {
    console.log('here will be implemented filtering in the last exercise' + event.target.value);
    // input-field value is in variable event.target.value

    // TODO: action dispach to change state.filter
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter