import React from 'react'
import blogService from '../services/blogs'
import Notification from '../components/Notification'
import SucseeNote from '../components/NotifiSucsee'
import { Button , Form } from 'semantic-ui-react'

class NewBlog extends React.Component { 
    constructor(props){
        super(props)
            this.state = {
                title:'',
                author:'',
                url:'',
                likes: null,
                message: null,
                error: null,
                user: ''


            }
        
    }
getBlog = (event) => {
  this.setState({ [event.target.name ]: event.target.value })

} 
send = async (event) => {
  event.preventDefault()
  console.log(this.state.user)
  try{
  const blogObject = {
    title: this.state.title,
    author: this.state.author,
    url: this.state.url,
    likes: this.state.likes,
    userId: this.state.user._id



  }
  blogService.create(blogObject)
  
  
}catch(expection){
  if(!expection){
     this.setState({ message: `a new blog ${this.state.title} by ${this.state.author} added`})
  } else if (expection){
    this.setState({ error: "something went wrong"})

  }
  setTimeout(() => {
    this.setState({ message: null})
  }, 2000)
}
}
    
render() {
  
  

    return (
      <div>
      <h3>create new blog</h3>
      <SucseeNote message={this.state.message} />
      <Notification message={this.state.error} />
      
      <Form onSubmit={this.send}>
        <Form.Field>
          <label>Title</label>
          <input 
            type="text" 
            name="title" 
            value={this.state.title}
            onChange={this.getBlog} />
        </Form.Field>
        <Form.Field>
          <label>Author</label>
          <input
            type="text"
            name="author"
            value={this.state.author}
            onChange={this.getBlog}
          />
        </Form.Field>
        <Form.Field>
          <label>Url:</label>
          <input
            type="text"
            name="url"
            value={this.state.url}
            onChange={this.getBlog}
          />
        </Form.Field>
        <Button size='small' basic color='black' type="submit">Add Blog</Button>

      </Form>

      
     
    </div>
    )
       
    
}
}

export default NewBlog