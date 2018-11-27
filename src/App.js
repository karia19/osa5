import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import SucsessNot from './components/NotifiSucsee'
import NewBlog from './components/MakeBlog'
import LoginForm from './components/LoginForm'
import Togglable from './components/Toggable';



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      username:'',
      password:'',
      error: null,
      message: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
      
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  }
  login = async (event) => {
    event.preventDefault()
    
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      this.setState({ username: '', password: '', user})
      //console.log(user)
      



    }catch (expection) {
      this.setState({ error: 'käyttäjätunnus tai salasana virheellinen'})
    }
    setTimeout(() => {
      this.setState({ error: null })
    }, 5000)

  }
  
  handleLogin = (event) => {
    if (event.target.name === 'password'){
      this.setState({ [event.target.name]: event.target.value })
    } else if (event.target.name === 'userName' ) {
      this.setState({ username: event.target.value })
    }
  }
 /*
 handleLogin = (event) => {
  this.setState({ [event.target.name]: event.target.value })
 } 
 */

  nolla = () => {  
    window.localStorage.clear()
    window.location.reload()
    
  }
  nappiaPainettu =  (id, likes) => {
    return  ()  => {
      const likes1 = likes +  1
      const likeUpdate = {
        likes: likes1
      }
    
      blogService.update(id, likeUpdate)

      blogService.getAll().then(blogs =>
        this.setState({ blogs })
      )
    }
  }
  poista =  (id, title, author) => {
    return ()=> {
       console.log(id)
      
      if (window.confirm(`delete '${title}' by ${author}?`)){
        const res = blogService.dell(id)
        console.log(res)
  
        this.setState({ message: "Delete Complete" })

        setTimeout(() => {
          this.setState({ message: null })
        },2000)
      }
      blogService.getAll().then(blogs =>
        this.setState({ blogs })
      )
    }
   
  }
    
  render() {
    this.state.blogs.sort((x, y) => x.likes < y.likes)

    

    const loginForm = () => (
      
      <Togglable buttonLabel="login">
        <LoginForm
          visible={this.state.visible}
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleLogin}
          handleSubmit={this.login}
        />
      </Togglable>
    )
   
    const showBlogs = () => (
    
     
       <div>
        <h2>blogs</h2>
        <p>{this.state.user.name} logged in  <button onClick={this.nolla}>log Out</button> </p>
       
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
     
   
        
        
      </div>
    )
    
   
    return (
      <div className="main">
        <Notification message={this.state.error} />
        <SucsessNot message={this.state.message} />

        {this.state.user === null ?
          loginForm() :
          <div>
           
            {showBlogs()}
          </div>
        }

        {this.state.user !== null && < NewBlog user={this.state.user}/>}

    
      </div>
     
    )
  }
}

export default App;
