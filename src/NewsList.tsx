import * as React from 'react';
import { RouteComponentProps, Link } from "react-router-dom";
import { NewsCategory } from './NewsCategory';
import * as NewsStore from './NewsStore'
import NewsItem from './NewsItem'

const PAGE_SIZE = 20

export interface NewsListProps extends RouteComponentProps<{ page: string }> {
  category: NewsCategory
};

interface NewsListState {
  maxPage: number,
  newsList: any[]
}

export default class NewsList extends React.Component<NewsListProps, NewsListState> {
  constructor(props: NewsListProps) {
    super(props);
    this.state = {
      maxPage: 0,
      newsList: []
    }
  }

  async getItems(page: number) {
    try {
      const allIds = await NewsStore.fetchStoryIds(this.props.category)
      const showedIds = allIds.slice((page-1)*PAGE_SIZE, Math.min(allIds.length-1, page*PAGE_SIZE))
      const items = await NewsStore.fetchItems(showedIds)
      this.setState({
        maxPage: Math.ceil(allIds.length/PAGE_SIZE),
        newsList: items
      })
    } catch (error) {
      console.error(error)
    }
  }

  async componentDidMount() {
    const page = Number(this.props.match.params.page) || 1
    this.getItems(page)
  }

  async componentWillReceiveProps(nextProps: NewsListProps) {
    const prePage = Number(this.props.match.params.page) || 1
    const nextPage = Number(nextProps.match.params.page) || 1
    if (prePage === nextPage) {
      return
    }
    this.getItems(nextPage)
  }

  render() {
    const { match, category } = this.props;
    const { maxPage, newsList } = this.state;
    const page = Number(match.params.page) || 1;
    const preEnable = page > 1;
    const moreEnable = page < maxPage;
    let preLink, moreLink
    if (preEnable) {
      preLink = <Link to={'/'+category+'/' + (page - 1)}>{'< prev'}</Link>
    } else {
      preLink = <a className="disabled">{'< prev'}</a>
    }
    if (moreEnable) {
      moreLink = <Link to={'/'+category+'/' + (page + 1)}>{'more >'}</Link>
    } else {
      moreLink = <a className="disabled">{'more >'}</a>
    }
    return (
      <div className="news-view">
        <div className="news-list-nav">
          {preLink}
          <span>{`${page}/${this.state.maxPage}`}</span>
          {moreLink}
        </div>
        <div className="news-list">
          <ul>
            {
              newsList.map( item => <NewsItem key={item.id} entity={item}/>)
            }
          </ul>
        </div>
      </div>
    );
  }
}