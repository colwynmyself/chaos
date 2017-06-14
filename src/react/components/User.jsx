import React from 'react'
import PropTypes from 'prop-types'

import { ListItem } from 'material-ui/List'

function User(props) {
    return <ListItem style={{ borderBottom: '1px solid rgb(224, 224, 224)' }} primaryText={props.user.name} />
}

User.propTypes = {
    user: PropTypes.objectOf(PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.object,
    ])).isRequired,
}

export default User
