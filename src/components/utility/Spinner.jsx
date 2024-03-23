
import React from 'react'

const Spinner = () => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="loader">Loading...</div> {/* Style this loader */}
  </div>
  )
}

export default Spinner