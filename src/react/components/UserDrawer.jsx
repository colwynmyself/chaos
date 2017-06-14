import React from 'react'
import PropTypes from 'prop-types'

import Drawer from 'material-ui/Drawer'

import UserList from './UserList.jsx'
import UserEntry from './UserEntry.jsx'


function UserDrawer(props) {
    return (<Drawer open openSecondary style={{ padding: '0 10px' }}>
        <UserEntry handleChange={props.handleChange} joinSession={props.joinSession} />
        <UserList users={props.users} />
    </Drawer>)
}

UserDrawer.propTypes = {
    handleChange: PropTypes.func.isRequired,
    joinSession: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default UserDrawer
