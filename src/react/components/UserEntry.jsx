import React from 'react'
import PropTypes from 'prop-types'

import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'

const textStyle = {
    paddingLeft: '20px',
}

function UserEntry(props) {
    return (<Paper style={{ marginTop: '20px' }}>
        <TextField fullWidth style={textStyle} underlineShow={false} name="name" type="string" onChange={e => props.handleChange('name', e.target.value)} hintText="Enter your name" />
        <Divider />
        <FlatButton primary fullWidth onTouchTap={props.joinSession} label="Join Session" />
    </Paper>)
}

UserEntry.propTypes = {
    handleChange: PropTypes.func.isRequired,
    joinSession: PropTypes.func.isRequired,
}

export default UserEntry
