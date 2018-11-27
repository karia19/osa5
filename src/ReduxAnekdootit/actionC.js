
const getId = () => (100000*Math.random()).toFixed(0)

export default {
    addAnecdot(conten) {
        return {
          type: 'ADD_NEW',
          data: {
          content: conten,
          id: Number(getId()),
          votes: 0
          }  
        }
    },
    addVote(id) {
        return {
            type: 'VOTE',
            id:  id 
        }
    }


}