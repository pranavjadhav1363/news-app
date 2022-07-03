import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  apikey = process.env.REACT_APP_NEWS_API;
  constructor(props) {
    super(props);
    console.log("Hello I am a constructor from News component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = ` ${
      this.props.category.charAt(0).toUpperCase() +
      this.props.category.slice(1, this.props.category.length)
    } - Top Headlines`;
  }

  async componentDidMount() {
    try {
      this.props.setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({
        loading: true,
      });
      const res = await fetch(url);
      this.props.setProgress(30);
      const data = await res.json();
      this.props.setProgress(50);
      this.setState({
        articles: data.articles,
        totalResults: data.totalResults,
        loading: false,
      });
      this.props.setProgress(100);
    } catch (e) {
      console.log(e);
    }
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      <>
        <div className="container my-5">
          <h2 className="text-center my-3">
            NewsMonkey -{" "}
            {this.props.category.charAt(0).toUpperCase() +
              this.props.category.slice(1, this.props.category.length)}{" "}
            - Top Headlines
          </h2>
          {this.state.loading && <Spinner />}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}
          >
            <div className="container">
              <div className="row">
                {this.state.articles.map((element) => {
                  return (
                    <div className="col-md-4" key={element.url}>
                      <NewsItem
                        title={element.title ? element.title : ""}
                        description={
                          element.description ? element.description : ""
                        }
                        imageUrl={element.urlToImage}
                        newsUrl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </InfiniteScroll>
        </div>
      </>
    );
  }
}

export default News;
