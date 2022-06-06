import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async () => {
    if (page === 0) props.setProgress(0);
    let url = `https://api.newscatcherapi.com/v2/search?q=${props.category}&page=${page+1}&page_size=${props.pageSize}`
    setLoading(true);
    let data = await fetch(url, {
      method: 'GET', 
      headers: {
        'x-api-key': props.api
      }
    });
    if (page === 0) props.setProgress(30);
    let parsedData = await data.json();
    if (page === 0) props.setProgress(50);

    setLoading(false);
    console.log(parsedData);
    if (parsedData.articles)
      setArticles(articles => [...articles , ...parsedData.articles]);
    setTotalResults(parsedData.total_hits);
    if (page === 0) props.setProgress(100);
    setPage(prevPage => prevPage + 1)
  };

  useEffect(() => {
    updateNews();
    document.title = `${props.category}-NewsPost`;
  }, []);

  return (
    <>
      <h1
        style={{
          margin: "9vh 0 2vh 0",
          textAlign: "center",
          textShadow: "3px 3px 5px #622828",
        }}
      >
        {`PocketNews-Top Headlines ${props.category[0].toUpperCase() + props.category.slice(1)}`}
      </h1>

      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles?.length}
        next={updateNews}
        hasMore={articles?.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles?.map((element,index) => {
              return (
                <div className="col-md-4 my-3" key={index}>
                  <NewsItem
                    title={element.title}
                    description={
                      element.summary
                        ? element.summary.slice(0, 45) + "..."
                        : "description not available"
                    }
                    imageUrl={
                      element.media
                        ? element.media
                        : "https://www.91-cdn.com/hub/wp-content/uploads/2022/01/iphone-13-mini-image-feat.jpg"
                    }
                    newsUrl={element.link}
                    author={element.author}
                    date={element.published_date}
                    sourceName={element.clean_url}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProptypes = {
  country: "in",
  pageSize: 5,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
