import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer',  () => {
    const initialState = {
        good: 0,
        ok: 0,
        bad: 0
    }
    it('shoul return a proper intial state', () => {
        const state = []
        const action = {
            type: 'DO_NOTHING'
        }
        deepFreeze(state)
        const newState = counterReducer(undefined, action)
        expect(newState).toEqual(initialState)
    })
    it('good is incremented', () => {
        const action = {
          type: 'GOOD'
        }
        const state = initialState
        
    
        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
          good: 1,
          ok: 0,
          bad: 0
        })
      })

})