

let initialState = {
    good: 0,
    ok: 0,
    bad: 0
}

  
  const counterReducer = (state = initialState,  action) => {
    console.log(action)
    console.log(state)
    
    switch (action.type) {
      case 'GOOD':
        return ({...state, state: state.good += 1 })  
      case 'OK':
        return ({...state, state: state.ok += 1})
      case 'BAD':
        return ({...state,  state: state.bad += 1})
      case 'ZERO':
      return  ({...state, state: state.good = 0} ,{...state, state: state.bad = 0}, {...state, state: state.ok = 0})
      

    
      default: return state;
    }
    
    
  }
  
  export default counterReducer