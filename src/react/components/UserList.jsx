import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'material-ui/List'

import User from './User.jsx'

function UserList(props) {
    if (!props.users || !props.users.length) return <div />

    return (<div>
        <h4>Users</h4>
        <List>
            {props.users.map(user => <User key={user.id} user={user} />)}
        </List>
    </div>)
}

UserList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default UserList
