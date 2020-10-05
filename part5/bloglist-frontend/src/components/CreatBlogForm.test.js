import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {
  render,
  fireEvent
} from '@testing-library/react'
import CreatBlogForm from './CreatBlogForm'

function setIptVal(el, val) {
  fireEvent.change(el, {
    target: {
      value: val
    }
  })
}

test('create blog test', () => {
  const createBlog = jest.fn()

  let component = render(<CreatBlogForm addBlogFn={createBlog} />)

  const form = component.container.querySelector('form')
  // const author = component.container.querySelector('#author')
  // const title = component.container.querySelector('#title')
  // const url = component.container.querySelector('#url')

  // setIptVal( author, 'test author' )
  // setIptVal( title, 'test title' )
  // setIptVal( url, 'test url' )
  const testInfo = ['test author', 'test title', 'test url'];
  ['#author', '#title', '#url'].map((e, idx) => {
    setIptVal(component.container.querySelector(e), testInfo[idx])
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].author).toBe('test author')
  expect(createBlog.mock.calls[0][0].title).toBe('test title')
  expect(createBlog.mock.calls[0][0].url).toBe('test url')
})