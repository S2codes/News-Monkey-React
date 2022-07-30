import React, { Component } from 'react'
import loading from './loading.gif';

export class Spiner extends Component {
  render() {
    return (
      <div className='text-center spiner'>
        <img src={loading} alt="loading" />
      </div>
    )
  }
}

export default Spiner