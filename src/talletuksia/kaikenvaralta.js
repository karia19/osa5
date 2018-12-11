<Container>
       
       <Notification message={this.state.error} />
       <SucsessNot message={this.state.message} />

       {this.state.user === null ?
       
         loginForm() :

         <div>
         <h2>blogs</h2>
            <p>{this.state.user.name} logged in  <button onClick={this.nolla}>log Out</button> </p>
           {showBlogs()}
           <h2>Welcome to blogs</h2>
           {showMakeBlog()}
           <Users />
           
         </div>
       }       
</Container>

const showBlogs = () => (    
    <div>    
     <Togglable buttonLabel="show blogs">
        {this.state.blogs.map(blog => 
          <Blog 

          key={blog.id}
          blog={blog}
          nappiaPainettu={this.nappiaPainettu(blog.id, blog.likes)}
          poista={this.poista(blog.id, blog.title, blog.author)}
          /> 
           
         )
         }
     </Togglable>
     <div>
     <Togglable buttonLabel="Make new blog">
        <NewBlog user={this.state.user}/>
     </Togglable>
   </div>
   </div>
 )