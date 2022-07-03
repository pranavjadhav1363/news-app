import logo from '../logo.svg';
import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, publishedAt, author, source } = this.props
    return (
      <div className='container my-3'>

        <div className="card" style={{ width: "18rem" }}>
          <img src={!imageUrl ? logo : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}... <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {source}

            </span></h5>
            <p className="card-text">{description}...</p>
            <p class="card-text"><small class="text-muted">by {!author ? "unknown" : author} on {new Date(publishedAt).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>

    )
  }
}
