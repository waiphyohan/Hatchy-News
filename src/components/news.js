import React from 'react'
import PropTypes from 'prop-types'

const News = ({ items }) => (

  <ul className="list-unstyled">
    {items.map((item, i) =>
      <li key={i + 1}>
        <div className="well">
          <p className="index">{i+1}</p>
          <div className="content">
            <h4><a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a></h4>
            <div className="meta">
              <h6 className="label label-default label-meta">
                <span className="glyphicon glyphicon-star" aria-hidden="true"></span> {item.score}
              </h6>
              <h6 className="label label-default label-meta">
                <span className="glyphicon glyphicon-time" aria-hidden="true"></span> {item.time}
              </h6>
              <h6 className="label label-default label-meta">
                <span className="glyphicon glyphicon-user" aria-hidden="true"></span> {item.by}
              </h6>
            </div>
          </div>
        </div>
      </li>
    )}
  </ul>

)

News.propTypes = {
  items: PropTypes.array.isRequired
}

export default News
