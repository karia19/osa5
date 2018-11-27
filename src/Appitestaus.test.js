import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
jest.mock('./services/blogs')


describe('<App />', () => {
    let app
    beforeAll(() => {
        app = mount(<App />)
    })

    it('renders all', () => {
        app.update()
        const blogComponents = app.find('main')
        console.log(blogComponents.debug())
        expect(blogComponents.length).toBe(0)
    })
})