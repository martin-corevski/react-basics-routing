import React, { Component } from 'react'
import axios from '../../axios'
import { Route, Link } from 'react-router-dom'

import classes from './Posts.css'
import Post from '../../components/Post/Post'
import FullPost from '../FullPost/FullPost'

export default class Posts extends Component {
  state = {
    posts: []
  }

  componentDidMount () {
    axios.get('/posts')
      .then(response => {
        // console.log(response)
        const posts = response.data.slice(0, 4)
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: 'Max'
          }
        })
        this.setState({
          posts: updatedPosts
        })
      })
      .catch(error => {
        console.log('Get all posts error! ', error)
      })
  }

  getPostDetailsHandler = id => {
    // If we are not using the Link component we could send the parameter
    // programmatically by pushing new route into history, Link needs to be
    // removed in order for this to be tested
    this.props.history.push({ pathname: '/' + id })
    // Alternatively we can do it this way
    // this.props.history.push('/' + id)
  }

  render () {
    // let posts = <p style={{textAlign: 'center'}}>Ups, something went wrong!</p>
    // if (!this.state.hasError) {
    const posts = this.state.posts.map(post => {
      return (
        // Uncomment if not using NESTED routes and comment next Link component
        // <Link key={post.id} to={'/' + post.id} >
        <Link key={post.id} to={'/posts/' + post.id} >
          <Post
            id={post.id}
            title={post.title}
            author={post.author}
            click={this.getPostDetailsHandler}
          />
        </Link>
      )
    })
    // }

    return (
      <div>
        <section className={classes.Posts}>
          {posts}
        </section>
        {/* Comment out the Route if not using NESTED routes */}
        <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
      </div>
    )
  }
}
