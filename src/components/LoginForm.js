import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'semantic-ui-react'

const loginForm = ({ handleSubmit, handleChange, username, password }) => {
    return(
    <div>
    <h2>Log in to application</h2>
    <Form onSubmit={handleSubmit}>
        <Form.Field>
        <label>username:</label> 
          <input
            name="userName"
            value={username}
            onChange={handleChange}
          />

        </Form.Field>
        <Form.Field>
        <label>password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </Form.Field>
        <Button type="submit">log</Button>
      </Form>
      </div>
    )
}
loginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}


export default loginForm