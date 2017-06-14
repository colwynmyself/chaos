import React from 'react'
import PropTypes from 'prop-types'

import Drawer from 'material-ui/Drawer'

import UserList from './UserList.jsx'

function UserDrawer(props) {
    return (<Drawer open openSecondary style={{ padding: '0 10px' }}>
        <UserList users={props.users} />
    </Drawer>)
}

UserDrawer.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default UserDrawer
