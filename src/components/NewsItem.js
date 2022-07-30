import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let {title, description, imgUrl, url, author, date, source} = this.props;

        return (
            <>
                <div className="card" style={{width: "22rem"}}>
                    <img src={imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                    <span className="badge bg-danger">{source}</span>
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text mb-1">{description}...</p>
                        <p className="card-text mb-1"><small className='text-muted'>By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                        <a href={url} rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </>
        )
    }
}

export default NewsItem