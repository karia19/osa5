import React from 'react'
// import { Router, Route, Link } from 'react-router-dom'
import blogService from '../services/blogs'
import Blog from '../components/Blog'
import { Table } from 'semantic-ui-react'
import loginService from '../services/login'
import Notification from '../components/Notification'
import SucsessNot from '../components/NotifiSucsee'
import NewBlog from '../components/MakeBlog'
import LoginForm from '../components/LoginForm'
import Togglable from '../components/Toggable';



class Users extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            users: [],
            blogsByUser: [],
            blogs: []
        }
    }
    componentDidMount() {
        blogService.getUsers().then(users =>
            this.setState({ users })
            
        )
        blogService.getAll().then(blogs =>
            this.setState({ blogs })
            
          )
    }
    
    //<a href={`/users/${note.id}`}>{note.name} {note.blogs.length}</a>

    render() {
        const showMakeBlog = () => (
            <div>
              <Togglable buttonLabel="Make new blog">
                 <NewBlog user={this.state.user}/>
              </Togglable>
            </div>
        )
        const blogsTekiät = () => (
             <div>  
         <h3>Users</h3>
         
           <Table basic="very">  
           <Table.HeaderCell>Tekijät</Table.HeaderCell>
           <Table.HeaderCell>Blogs added</Table.HeaderCell>
             <Table.Body>
                {this.state.users.map(note=>
                <Table.Row key={note.id}>
                <Table.Cell>
                   <a href={`/Users/${note.id}`}>{note.name}</a>
                   
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

        console.log('Kokoee', this.state.users)


        return (
         <div>  
          <br></br>   
         {showMakeBlog()}
         <br></br>

         {blogsTekiät()}
         </div>
              
              
        )
    }
}

export default Users