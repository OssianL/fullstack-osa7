import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const Users = props => {

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <Table.Body>
          <Table.Row>
            <Table.Cell><strong>user</strong></Table.Cell><Table.Cell><strong>blogs created</strong></Table.Cell>
          </Table.Row>
          {props.users.map(user =>
            <Table.Row key={user.id}>
              <Table.Cell>
                <Link to={'/users/'+user.id}>{user.name}</Link>
              </Table.Cell>
              <Table.Cell>
                {user.blogs.length}
              </Table.Cell>
            </Table.Row>)}
        </Table.Body>
      </Table>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(Users)