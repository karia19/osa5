
const getId = () => (100000*Math.random()).toFixed(0)

export default {
    addAnecdote(content) {
        return {
            type: 'NEW_ANECDOTE',
            data: {
                content,
                id: getId(),
                votes: 0
            }
        }
    }
}