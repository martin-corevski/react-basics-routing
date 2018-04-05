import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

import classes from './NewPost.css'

class NewPost extends Component {
    state = {
      title: '',
      body: '',
      author: 'Max',
      submitted: false
    }

    addPostHandler = () => {
      const data = {
        title: this.state.title,
        body: this.state.body,
        author: this.state.author
      }
      axios.post('/posts', data)
        .then(response => {
          console.log('post Post: ', response.data)
          // With push method the back button will work
          this.props.history.push('/posts')
          // Whereas with the replace method we clear the url history
          // this.props.history.replace('/posts')
          // this.setState({
          //   submitted: true
          // })
        })
    }

    render () {
      return (
        <div className={classes.NewPost}>
          { this.state.submitted ? <Redirect to='/posts' /> : null }
          <h1>Add a Post</h1>
          <label>Title</label>
          <input type='text' value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
          <label>Content</label>
          <textarea rows='4' value={this.state.body} onChange={(event) => this.setState({body: event.target.value})} />
          <label>Author</label>
          <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
            <option value='Max'>Max</option>
            <option value='Manu'>Manu</option>
          </select>
          <button onClick={this.addPostHandler}>Add Post</button>
        </div>
      )
    }
}

export default NewPost
