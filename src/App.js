import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import SucsessNot from './components/NotifiSucsee'
import NewBlog from './components/MakeBlog'
import LoginForm from './components/LoginForm'
import Togglable from './components/Toggable';
import { Table, Menu } from 'semantic-ui-react'
//import Users from './components/Users'
import { Container } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'




class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: [],
      tiedot: [],
      users: [],
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
    blogService.getUsers().then(users =>
      this.setState({ users })
      
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
      this.setState({ user: user})
      
      



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
    console.log("blogit", this.state.blogs.map(x => x['commets']))

    const blogsTekiät = () => (
      <div>  
        <br></br>
         {showMakeBlog()}  
         <h3>Users</h3>
  
          <Table basic="very">  
          <Table.HeaderCell>Tekijät</Table.HeaderCell>
          <Table.HeaderCell>Blogs added</Table.HeaderCell>
          <Table.Body>
               {this.state.users.map(note=>
          <Table.Row key={note.id}>
          <Table.Cell>
              <Link to={`/Users/${note.id}`}>{note.name}</Link>
          </Table.Cell>
          <Table.Cell>
               {note.blogs.length}
          </Table.Cell>
          </Table.Row>
          )}
          </Table.Body> 
       </Table>
     </div>
    )
    
    const loginForm = () => (
      <div> 
      
      <Notification message={this.state.error} />
       <SucsessNot message={this.state.message} />
     
        <LoginForm
          visible={this.state.visible}
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleLogin}
          handleSubmit={this.login}
        />
     
      </div>
    )
   
    const showBlogs = () => (    
       <div>    
       <br></br>
       <h2>Bolgs</h2>
       <Table basic="very">  
             <Table.Body>
                {this.state.blogs.map(x =>
                <Table.Row key={x.id}>
                <Table.Cell>
                  <Link to={`/Blogs/${x.id}`}>{x.title}</Link>
                </Table.Cell>
                </Table.Row>
                )}
             </Table.Body>  
         </Table>
      </div>
    )
    const showMakeBlog = () => (
      <div>
        <Togglable buttonLabel="Make new blog">
           <NewBlog user={this.state.user}/>
        </Togglable>
      </div>
    )
    
    /// Filter users Blogs ///

    const Note = ({ note }) => {
      console.log('mikä on tämä', this.state.blogs)
      return (
        <div>
        <br></br>
        <h2>{this.state.user.name}</h2>
        <h3>Added blogs</h3>
        <Table basic="very">  
             <Table.Body>
                {note.map(x=>
                <Table.Row key={x.id}>
                <Table.Cell>
                   {x.title}
                </Table.Cell>

                </Table.Row>
                )}
             </Table.Body>  
         </Table>
        </div>
      )
    }
    const BlogsById = (id) =>  
        this.state.blogs.filter(x => x['user']._id === id)
      
    /// Filter one Blog from Blogs page ///

    const OneBlog = ({ blos }) => {
     
      return (
        <div>
        <br></br>
        {blos.map(x => 
         <Blog
          key={x.id}
          blog={x}
          nappiaPainettu={this.nappiaPainettu(x.id, x.likes)}
          poista={this.poista(x.id, x.title, x.author)}
          />
        )
        }
        {showBlogs()}
        </div>
      )
      

    }      
    const FindOneBlog = (id) => 
        this.state.blogs.filter(x => x.id === id)
     
     
    
    // {this.state.user !== null && < NewBlog user={this.state.user}/>}
    return (
  
      <Container>
         <Router>
         <div>
             <div>
             <Menu inverted>
            
             <Menu.Item link>
             <h3>Blog App</h3>   
             </Menu.Item>

             <Menu.Item>
             {this.state.user.name
                 ? <Link to="/Blogs">Blogs <Link to="/Users"> Users </Link>  <p>{this.state.user.name} logged in  <button onClick={this.nolla}>log Out</button> </p></Link>
                 : <Link to="/login">login</Link> 
                 
                 }

             </Menu.Item>
            
               
        
              </Menu>
             </div>
             
             <Route path="/" render={() => 
               this.state.user.name
                ? <Redirect to="/" />
                : <Redirect to="/login" />
             } />
             <Route exact={true} path="/" render={showBlogs} />
             <Route exact={true} path="/login" render={loginForm}  />

             <Route exact path="/Blogs/:id" render={({ match }) =>
                <OneBlog blos={FindOneBlog(match.params.id)} /> }
                />
             <Route exact={true} path="/Blogs" render={showBlogs} />


             <Route exact path="/Users/:id" render={({ match }) =>
              <Note note={BlogsById(match.params.id)} />}
            />
             <Route path="/Users" render={blogsTekiät} />
            
           
             </div> 

         </Router>
      </Container>
     
    )
  }
}

export default App;
