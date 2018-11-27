import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
    it ('renders content', () => {
        const blogs = {
            title: "Testaaminen",
            author: "Masa Mainio",
            likes: 22

        }

        const mockHandler = jest.fn()

        const blogComponent = shallow(<SimpleBlog blog={blogs} onClick={mockHandler} />)
        const titleA = blogComponent.find('.titleAuthor')
        console.log(titleA.text())
        console.log(blogComponent.debug())

       


        const button = blogComponent.find('button')
        button.simulate('click')
        button.simulate('click')

        expect(mockHandler.mock.calls.length).toBe(2)
        
        
       

        


    })

    
})