import React, { Component } from 'react'

import logo from './logo.png'
import './logo.less'

class Logo extends Component {

  render() {
    return (
      <div className="logoContainer" >
        <img src={logo} alt="logo" className='logo-img'></img>
      </div>
    )
  }

}

export default Logo