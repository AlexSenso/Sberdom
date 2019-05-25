import React from 'react';
import _ from 'lodash';

import './News.scss';

const newsItems = [
  {
    title: 'Голосование: судьба дерева',
    description: '',
  },
]

export default class News extends React.Component {
  render() {
    return (
      <div className="news-page">
        <div className="news">
          {/*<ul className="news-list">*/}
            {/*{_.map(newsItems, (item, key) => (*/}
              {/*<li*/}
                {/*key={key}*/}
                {/*className="news-list"*/}
                {/*data-key={key}*/}
              {/*>*/}
                {/*{item}*/}
              {/*</li>*/}
            {/*))}*/}
          {/*</ul>*/}

        </div>
        <div className="">
          <div className="thermometer-item">
            <div>Градусник за окном</div>
            <div>
              <div className="thermometer-icon" />
              <div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
