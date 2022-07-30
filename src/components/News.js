import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spiner from './Spiner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';



export class News extends Component {

    static defaultProps = {
        contry: "in",
        pageSize: 10,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - News Monkey`
    }

    async updateNews() {
         this.props.setProgress(0)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.contry}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: false });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: true
        })
         this.props.setProgress(100)
    }

    async componentDidMount() {
        this.updateNews()
    }

    // handelPreClick = async () => {
    //     this.setState({
    //         page: this.state.page - 1
    //     })
    //     this.updateNews()
    // }

    // handelNextClick = async () => {
    //     this.setState({
    //         page: this.state.page + 1
    //     })
    //     this.updateNews()
    // }

    fetchMoreData = async() => {
        this.setState({
            page: this.state.page + 1
        })

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.contry}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: false });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: true
        })

       

    };




    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-10 col-12 mx-auto my-3">
                        <h2 className='mb-3'>NewsMonkey - Today's Top <span className='text-danger'> {this.capitalizeFirstLetter(this.props.category)}</span> HeadLines</h2>
                        {!this.state.loading && <Spiner />}
                        <InfiniteScroll
                            dataLength={this.state.articles.length}
                            next={this.fetchMoreData}
                            hasMore={this.state.articles.length !== this.state.totalResults}
                            loader={<Spiner />}
                        >
                            <div className="row m-0 p-0">
                                {
                                    this.state.articles.map((element) => {
                                        return <div className="col-md-4 col-12 p-1 mb-3" key={element.url}>
                                            <NewsItem title={element.title ? element.title.slice(0, 54) : ""} description={element.description ? element.description.slice(0, 90) : ""} imgUrl={element.urlToImage ? element.urlToImage : "https://images.pexels.com/photos/3944385/pexels-photo-3944385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                        </div>
                                    })
                                }

                            </div>
                        </InfiniteScroll>

                    </div>
                </div>

                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} className='btn btn-dark ms-1' onClick={this.handelPreClick}>&larr; Pre</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className='btn btn-dark' onClick={this.handelNextClick} >Next &rarr;</button>
                </div> */}

            </div>
        )
    }
}



export default News