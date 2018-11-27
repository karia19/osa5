import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux'
import counterReducer from './reducer'

const Statistiikka = () => {
  console.log("store", store.getState())
 

  if (store.getState().good + store.getState().bad + store.getState().ok === 0 ) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  } else {
    return(
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{store.getState().good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{store.getState().ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{store.getState().bad}</td>
          </tr>
          <tr>
            <td>hyviä</td>
            <td>{((store.getState().good)/ (store.getState().ok + store.getState().good+store.getState().bad)).toFixed(3)}%</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{store.getState().ok + store.getState().good}</td>
          </tr>
        </tbody>
      </table>

      <button  onClick={e => store.dispatch({type:'ZERO'})}>nollaa tilasto</button>
      
    </div >
    )
  }
}


const store = createStore(counterReducer)



 

class App extends React.Component {

 
  render() {
    
    
   // console.log(store.getState().map(x => x))

    return (
      <div>
          
        <h2>anna palautetta</h2>
        <button onClick={e => store.dispatch({type:'GOOD' })}>hyvä</button>
        <button onClick={e => store.dispatch({type:'OK'})}>neutraali</button>
        <button onClick={e => store.dispatch({type:'BAD'})}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}


const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
}
renderApp()
store.subscribe(renderApp)

