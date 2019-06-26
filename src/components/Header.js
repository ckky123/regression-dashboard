import React from 'react'

const Header = ({title}) => (
  <header style={{marginBottom: 10}}>
    <div>
      <span className="header"> {title} </span>
    </div>
  </header>
)

export default Header