import React from 'react'


const Blog = ({blog , nappiaPainettu, poista}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    
  <div style={blogStyle}>
    {blog.title} {blog.author}  <br></br>  <a href="url">{blog.url}</a> 
    <br></br> {blog.likes} 
    likes  <button onClick={nappiaPainettu}> vote </button>
    <br></br>
    added by {blog.user.username}
    <br></br>
    <button onClick={poista}> delete </button>
   
  </div>  
  )
}

export default Blog