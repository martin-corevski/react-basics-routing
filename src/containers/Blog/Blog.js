import React, { Component } from 'react'
import { Route, NavLink, Switch, Redirect } from 'react-router-dom'
// import Loadable from 'react-loadable'

import classes from './Blog.css'
import Posts from '../Posts/Posts'
import asyncComponent from '../../hoc/asyncComponent'

const AsyncNewPost = asyncComponent(() => {
  return import('../NewPost/NewPost')
})

// const AsyncNewPost = Loadable({
//   loader: () => import('../NewPost/NewPost'),
//   loading() {return <div>Loading...</div>}
// })

class Blog extends Component {
  state = {
    // Only if the user is authenticated enable the new-post route
    isAuth: true,
    // Only if the user can post show the New Post link
    canPost: true
  }

  render () {
    let authLinks = null
    let authRoutes = null

    if (this.state.canPost) {
      authLinks = (
        <li>
          <NavLink
            to={{
              // relative vs absolute path
              // For relative localhost:8889/some-path/new-post use
              // pathname: this.props.match.url + '/new-post'
              // If the component doesn't have access to props.match we
              // can use the HOC withRouter which wraps the component and
              // adds those props.
              // For absolute localhost:8889/new-post use, absolute always
              // overwrites the url
              pathname: '/new-post'
            }}
            activeClassName={classes.active}
          >
            New post
          </NavLink>
        </li>
      )
    }

    // This is a guard clause example, it won't allow the user to go to new-post
    // if he is not authenticated. We can also do the check inside NewPost
    // component by using the componentDidMount method and redirecting the user
    // back to '/' if he is not authenticated.
    if (this.state.isAuth) {
      authRoutes = (
        // Async component is used for better performances, the NewPost
        // component is separated in another bundle and only downloaded when
        // the /new-post route is hit
        <Route path='/new-post' component={AsyncNewPost} />
      )
    }

    return (
      <div className={classes.Blog}>
        <header>
          <nav>
            <ul>
              {/*
                Using NavLink vs Link, the former enables active links, it adds active class to the selected link. But if you are using CSS
                modules you will have to add the class through the
                activeClassName property.
              */}
              <li>
                <NavLink
                  // Uncomment if not using NESTED routes and comment next 'to'
                  // to='/'
                  to='/posts'
                  exact
                  activeClassName={classes.active}
                  activeStyle={{
                    textDecoration: 'underline'
                  }}
                >
                  Posts
                </NavLink>
              </li>
              {authLinks}
            </ul>
          </nav>
        </header>

        {/* Without NESTED routes */}
        {/* Route order is important! */}
        {/* <Switch>
          Switch is used when we want to render only one route per page
          <Route path='/' exact component={Posts} />
          <Route path='/new-post' component={NewPost} />
          Without Switch
          Alternatively we could set the path='/posts/:id' and in that case
          we wouldn't get 2 components rendered when going to NewPost package.
          Remember to update the Link to={'/posts' + post.id} inside Posts.js
          <Route path='/:id' exact component={FullPost} />
        </Switch> */}
        {/* Also we don't have to put all of the routes inside Switch! */}

        {/* NESTED routes example */}
        <Switch>
          {authRoutes}
          <Route path='/posts' component={Posts} />
          <Redirect from='/' to='/posts' />
          {/* Instead of using Redirect from='/' to=... we can use this: */}
          {/* <Route render={() => <h1>Route not found!</h1>} /> */}
          {/*
            But we cannot use them both (Redirect and Route render). This
            is a good example for 404 page
          */}
          {/*
            Route render can be used for sending props to another component,
            example:
            <Route render={() => <Component someProps='sendprops' />} />
          */}
        </Switch>
      </div>
    )
  }
}

export default Blog
