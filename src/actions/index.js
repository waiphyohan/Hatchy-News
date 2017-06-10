export const REQUEST_NEWS = 'REQUEST_NEWS'
export const RECEIVE_NEWS = 'RECEIVE_NEWS'
export const GET_NEWS_FAIL = 'GET_NEWS_FAIL'
export const REQUEST_MORE_NEWS = 'REQUEST_MORE_NEWS'
export const RECEIVE_MORE_NEWS = 'RECEIVE_MORE_NEWS'

const API = 'https://hacker-news.firebaseio.com/v0'

export const requestNews = url => ({
  type: REQUEST_NEWS,
  url
})

export const requestMoreNews = url => ({
  type: REQUEST_MORE_NEWS,
  url
})

export const receiveNews = json => ({
  type: RECEIVE_NEWS,
  json
})

export const receiveMoreNews = json => ({
  type: RECEIVE_MORE_NEWS,
  json
})

export const getNewsFail = error => ({
  type: GET_NEWS_FAIL,
  error
})

export const FETCH_NEWS = (url, start, limit) => dispatch => {

  dispatch(requestNews(url))
  return fetch(`${API}${url}stories.json`)
  .then(res=>res.json())
  .then(res=>Promise.all(res.slice(start, start+limit).map(item => fetch(`${API}/item/${item}.json`))))
  .then(res=>Promise.all(res.map(item =>item.json())))
  .then(json=>dispatch(receiveNews(json)))
  .catch(error=>dispatch(getNewsFail(error)))

}

export const FETCH_MORE_NEWS = (url, start, limit) => dispatch => {

  dispatch(requestMoreNews(url))
  return fetch(`${API}${url}stories.json`)
  .then(res=>res.json())
  .then(res=>Promise.all(res.slice(start, start+limit).map(item => fetch(`${API}/item/${item}.json`))))
  .then(res=>Promise.all(res.map(item =>item.json())))
  .then(json=>dispatch(receiveMoreNews(json)))
  .catch(error=>dispatch(getNewsFail(error)))

}
