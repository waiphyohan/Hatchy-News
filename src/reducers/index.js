import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { REQUEST_NEWS, RECEIVE_NEWS, GET_NEWS_FAIL, REQUEST_MORE_NEWS, RECEIVE_MORE_NEWS } from './../actions'

const initialState = {
  isFetching: false,
  isMoreFetching: false,
  isError: false,
  items: [],
  limit: 10,
  url: 'new'
}

const news = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_NEWS:
      return {
        ...state,
        isFetching: true,
        url: action.url
      }
    case RECEIVE_NEWS:
      return {
        ...state,
        isFetching: false,
        items: action.json
      }
    case GET_NEWS_FAIL:
      return {
        ...state,
        isError: true,
        isFetching: false
      }
    case REQUEST_MORE_NEWS:
      return {
        ...state,
        isMoreFetching: true
      }
      case RECEIVE_MORE_NEWS:
        return {
          ...state,
          isMoreFetching: false,
          items: state.items.concat(action.json)
        }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  routing: routerReducer,
  news
})

export default rootReducer
