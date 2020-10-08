import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  _id: '5a422a851b54a676234d17f7',
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  user: {
    id: 'xxx',
    username: "test"
  }
}

test('renders content', () => {
  const mockHandler = jest.fn()

  let component = render(
    <Blog blog={blog} incLike={mockHandler} onDelete={mockHandler} showDelete={false} />
  )

  expect(component.container).toHaveTextContent(
    'React patterns Michael Chan'
  )

  expect(component.container).not.toHaveTextContent('https://reactpatterns.com/')
  expect(component.container).not.toHaveTextContent('likes 7')
})

test('renders content click btn show detail', () => {
  const mockHandler = jest.fn()
  let component = render(
    <Blog blog={blog} incLike={mockHandler} onDelete={mockHandler} showDelete={false} />
  )

  const showBtn = component.container.querySelector('#trigger')

  fireEvent.click(showBtn)

  const urlDiv = component.container.querySelector('#url')
  const likesDiv = component.container.querySelector('#likes')

  expect(urlDiv).toHaveTextContent('https://reactpatterns.com/')
  expect(likesDiv).toHaveTextContent('likes 7')
})

test('increase like handler should create twice', () => {
  const mockHandler = jest.fn()
  let component = render(
    <Blog blog={blog} incLike={mockHandler} onDelete={e => console.log(e)} showDelete={false} />
  )

  const showBtn = component.container.querySelector('#trigger')

  fireEvent.click(showBtn)

  const likesBtn = component.container.querySelector('.likes')

  fireEvent.click(likesBtn)
  fireEvent.click(likesBtn)

  expect(mockHandler.mock.calls).toHaveLength(2)
})



