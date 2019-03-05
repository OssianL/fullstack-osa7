import React from 'react'
import { useField } from '../hooks'
import { Form, Button } from 'semantic-ui-react'

const BlogForm = ({ onSubmit }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleNewBlog = async event => {
    event.preventDefault()
    onSubmit({ title: title.value, author: author.value, url: url.value })
  }

  return (
    <Form onSubmit={handleNewBlog}>
      <Form.Field>
        <lable>title: </lable>
        <input {...title} reset='' />
      </Form.Field>
      <Form.Field>
        <lable>author: </lable>
        <input {...author} reset='' />
      </Form.Field>
      <Form.Field>
        <label>url: </label>
        <input {...url} reset='' />
      </Form.Field>
      <Button basic color='green' type='submit'>create</Button>
    </Form>
  )
}

export default BlogForm