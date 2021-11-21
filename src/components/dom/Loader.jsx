import React from 'react'

function Loader(props) {
  return (
    <div className={props.loading ? 'body_loading' : 'none'}>
      <div className='lds_ellipsis'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loader
