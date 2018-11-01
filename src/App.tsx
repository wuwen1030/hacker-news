import * as React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect, NavLink } from "react-router-dom";
import NewsList from './NewsList';
import { ALL_NEWS_CATEGORIES } from './NewsCategory';
import * as logo from './icon-news.png';

class App extends React.Component {
  public render() {
    const navItems = ALL_NEWS_CATEGORIES.map(category => {
      return (
        <NavLink key={category} to={`/${category}`}>{category.toUpperCase()}</NavLink>
      )
    });
    
    return (
      <Router>
        <div id="app">
          <header className="header">
            <nav className="nav">
              <NavLink to="/" exact>
                <img className="logo" src={logo}/>
              </NavLink>
              {navItems}
            </nav>
          </header>
          <Route
            exact
            path="/"
            render={() => <Redirect to="/top" />} />
          {
            ALL_NEWS_CATEGORIES.map(category => {
             return (
              <Route 
                key={category} 
                path={`/${category}/:page(\\d+)?`} 
                render={(props) => {
                  return <NewsList category={category} {...props}/>
                }}
              />
             );
            })
          }
        </div>    
      </Router>
    );
  }
}

export default App;
