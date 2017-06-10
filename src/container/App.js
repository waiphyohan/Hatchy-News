import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import {FETCH_NEWS, FETCH_MORE_NEWS} from './../actions'
import News from './../components/news'
import './../assets/css/bootstrap.min.css'
import './App.css'


class App extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    limit: PropTypes.number.isRequired,
    match: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
      scrollBottom: false
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount () {
    const { items, limit, match } = this.props;
    const url = match.path === '/' ? '/new' : match.path
    const start = items.length ? items.length : 0;
    this.props.fetchNews(url, start, limit)
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleRefresh() {
    const { limit, match } = this.props;
    const url = match.path === '/' ? '/new' : match.path
    const start = 0;
    this.props.fetchNews(url, start, limit)
  }
  handleScroll() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    let bool = windowBottom  >= docHeight ? true : false;
    this.setState({ scrollBottom: bool })
  }

  render() {
    const { isError, isFetching, items, limit, match, isMoreFetching } = this.props;

    if (this.state.scrollBottom) {
      const url = match.path === '/' ? '/new' : match.path
      const start = items.length ? items.length : 0;
      this.props.fetchMoreNews(url, start, limit)
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-md-offset-1">


            <div className="well clearfix">
              <h1 className="text-center">Hatchy News</h1>
              <hr />
              <ul className="nav nav-pills">
                <li ><NavLink exact activeClassName="active" to="/">New</NavLink></li>
                <li ><NavLink exact activeClassName="active" to="/best">Best</NavLink></li>
                <li ><NavLink exact activeClassName="active" to="/top">Top</NavLink></li>
              </ul>
              <button className="btn btn-info btn-refresh" onClick={this.handleRefresh}>
                <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span>
              </button>
            </div>


            {
              isFetching ?
              (<div className="load-more-wrapper">
                <button className="btn btn-primary btn-load-more">
                  <span className="glyphicon glyphicon-refresh fast-right-spinner"></span>
                </button>
              </div>):
              <div>
                {
                  isError ?
                  (<div className="alert alert-danger text-center">
                    <h4> <span className="glyphicon glyphicon-exclamation-sign" ></span> Something went wrong !</h4>
                  </div>):
                  (<News {...this.props} />)
                }
              </div>
            }

            {isMoreFetching &&
              <div className="load-more-wrapper">
                <button className="btn btn-primary btn-load-more">
                  <span className="glyphicon glyphicon-refresh fast-right-spinner"></span>
                </button>
              </div>
            }



            <div className="footer"></div>

          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {

  return {
    items: state.news.items,
    limit: state.news.limit,
    isError: state.news.isError,
    isFetching: state.news.isFetching,
    isMoreFetching: state.news.isMoreFetching
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchNews: async (url, start, limit) => {
      await dispatch(FETCH_NEWS(url, start, limit))
    },
    fetchMoreNews: async (url, start, limit) => {
      await dispatch(FETCH_MORE_NEWS(url, start, limit))
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
