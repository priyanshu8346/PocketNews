// import reactDom from "react-dom";
import React from "react";
const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, sourceName } = props;
    return (
        <div>
            <div
                className="card"
                style={{
                    border: "1px solid black",
                    boxShadow: " 2px 4px rgb(248 76 76)",
                }}
            >
                <img src={imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <span
                        className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
                        style={{ zIndex: 2, left: "85%" }}
                    >
                        {sourceName}
                        <span className="visually-hidden">unread messages</span>
                    </span>
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <a href={newsUrl} className="btn btn-sm btn-primary">
                        Read more
                    </a>
                    <p className="card-text">
                        <small className="text-muted">
                            by {author ? author : "Unknown"} on {new Date(date).toGMTString()}
                        </small>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default NewsItem;
