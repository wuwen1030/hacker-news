import * as React from 'react'
import { NewsEntity } from './NewsStore'
import * as utils from './utils'
import { Link } from "react-router-dom"


export interface NewsItemProps {
  entity: NewsEntity
}

export default class NewsItem extends React.Component<NewsItemProps> {
  render() {
    const { entity } = this.props

    const title = () => {
      if (entity.url) {
        return (
          <span className="title">
            <a href={entity.url} target="_blank">{entity.title}</a>
            <span className="host"> ({utils.host(entity.url)}) </span>
          </span>
        )
      } else {
        return (
          <Link to={`/item/${entity.id}`}>{entity.title}</Link>
        )
      }
    }

    return (
      <li className="news-item">
        <span className="score">{entity.score}</span>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {title()}
          <span className="meta">
            {
              entity.type !== 'job' && 
              <span className="by">
                {'by '}
                <Link to={'/user/'+entity.by}>{entity.by}</Link>
              </span>
            }
            <span>
              {entity.time && ' ' + utils.timeAgo(entity.time) + ' ago'}
            </span>
            {
              entity.type !== 'job' &&
              <span>
                {' | '}
                <Link to={'/item/' + entity.id}>{entity.descendants} comments</Link>
              </span>
            }
            
          </span>
        </div>
      </li>
    );
  }
}