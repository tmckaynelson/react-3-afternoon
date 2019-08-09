import React, { Component } from 'react';
import axios from 'axios'

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.baseUrl = 'https://practiceapi.devmountain.com/api'

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {

    let promise = axios.get(`${this.baseUrl}/posts`)

    promise.then((response) => {

      this.setState({
        posts: response.data
      })
    })
    .catch((error) => {
      console.log('upload posts error')
    })

  }

  updatePost(key, body) {
    let promise = axios.put(`${this.baseUrl}/posts?id=${key}`, { "text": body })
    console.log(`${this.baseUrl}/posts?id=${key}`, { "text": body })

    promise.then((response) => {
      this.setState({
        posts: response.data
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  deletePost(id) {
    let promise = axios.delete(`${this.baseUrl}/posts?id=${id}`)

    promise.then((response) => {
      console.log(response)
      this.setState({
        posts: response.data
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  createPost(text) {
    let promise = axios.post(`${this.baseUrl}/posts`, {"text": text})

    console.log(promise)

    promise.then((response) => {
      this.setState({
        posts: response.data
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    const { posts } = this.state;

    let mappedPosts = posts.map((element, index) => {
      return <Post key={ element.id } date={ element.date } text={ element.text } updatePostFn={ this.updatePost } id={ element.id } 
                    deletePostFn={this.deletePost}>
                { element }
              </Post>
    })

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={ this.createPost }/>
          { mappedPosts }
          
        </section>
      </div>
    );
  }
}

export default App;
