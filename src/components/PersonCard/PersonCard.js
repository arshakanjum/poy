import React, { Component } from 'react'
import './PersonCard.css'

import { Icon } from 'react-fa'

class PersonCard extends Component {
  render() {
    return (
      <div className={this.props.selected ? 'PersonCard PC-selected' : 'PersonCard'}>
        <div className="PersonCard-image-container">
          <img
            className="PersonCard-image"
            src={this.props.person.image}
            alt={this.props.person.name}
          />
        </div>
        <div className="PersonCard-data">
          <div className="PersonCard-name">{this.props.person.name}</div>
          <div className="PersonCard-desc">{this.props.person.desc}</div>
        </div>
      </div>
    )
  }
}

export default PersonCard
