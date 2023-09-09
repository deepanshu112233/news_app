import { getByTitle } from '@testing-library/react'
import React, { Component } from 'react'

import { Badge } from "react-simple-badges"
// import Badge from 'react-bootstrap/Badge';
export class NewsItem extends Component {



  render() {
    let {title,description, imgUrl,newsUrl,author,date,source}=this.props;//this.props object me se title,desc get by destructuring javasript
    return (
      <div className='my-3'>
            <div className="card" style={{width:"18rem"}}>
          <span className="position-absolute start-50 translate-middle badge badge-pill badge-dark" style={{fontFamily:'monospace', opacity:'0.9'}}  >{source?source:"Unknown"} </span>
          <img src={!imgUrl ?"https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png":imgUrl} className="card-img-top" alt=""/>
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>

                        <p className="card-text">{description}...</p>
                        <p className="card-text"> <small className="text-muted" > By {author?author:"Unknown"} on {date?new Date(date).toUTCString():"few days ago"}  </small> </p>
                        <a rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-sm btn-danger">Read More</a>
                    </div>
            </div>
      </div>
    )
  }
}

export default NewsItem