import React from 'react';
import action from './actionC'




class App extends React.Component {
  AddAnecdote = (event) => {
    
    event.preventDefault()
   
    this.props.store.dispatch(
      action.addAnecdot(event.target.anecdote.value)
    )
    event.target.anecdote.value = ''
   
  }
  
  
  Vote = (id) => () => {
    this.props.store.dispatch(
      action.addVote(id)
    )
    
    
  }

  
  render() {
    const anecdotes = this.props.store.getState().sort((a, b) => b.votes - a.votes)
   
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.Vote(anecdote.id)} >   vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.AddAnecdote}>
          <input name="anecdote"/>
          <button type="submit">create</button> 
        </form>
      </div>
    )
  }
}

export default App