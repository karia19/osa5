import React from 'react'
import { Button, Table, Form, Message } from 'semantic-ui-react'
import sendAxios from '../services/blogs'

const Blog = ({blog , nappiaPainettu, poista}) => {
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5
  }
  
  
  const writer = (event) => {
    const komme = event.target[0].value

    const k = {
      "comments": komme
    }
    try {
      sendAxios.makeComment(blog.id, k)
      console.log(komme)

    } catch (expectio) {
      console.log('Jotain', expectio)
    }
    setTimeout(() => {
      return(
          <Message success>
         {`comment ${komme} added to blog ${blog.title}` }
          </Message>
      )
    }, 5000)

  }
  
  return (
    
  <div style={blogStyle}>
    <h2>{blog.title}</h2> {blog.author}  <br></br>  <a href="url">{blog.url}</a> 
    <br></br> {blog.likes} 
    likes  <Button size="mini" onClick={nappiaPainettu}> vote </Button>
    <br></br>
    added by {blog.user.username}
    <br></br>
    <Button size="mini" onClick={poista}> delete </Button>

    <h2>Comments</h2>
    <Table basic="very">  
             <Table.Body>
                {blog['commets'].map(x =>
                <Table.Row key={x.comments}>
                <Table.Cell>
                   {x.comments}
                </Table.Cell>

                </Table.Row>
                )}
             </Table.Body>  
      </Table>
      <h3>Write a Comment</h3>
      <Form onSubmit={writer}>
        <Form.Field>
          <label>username</label>
          <input name='kommentti' type="text" />
        </Form.Field>
        <Button type='submit'>Send</Button>
      </Form>   
    
    
  </div>  
  )
}

export default Blog