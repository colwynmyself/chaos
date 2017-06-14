import React from 'react'
import { render } from 'react-dom'
import io from 'socket.io-client'

import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'

import UserDrawer from './components/UserDrawer.jsx'
import { request } from './utils/network.js'

injectTapEventPlugin()

class App extends React.Component {
    constructor() {
        super()

        this.state = {
            users: [],
        }

        this.handleChange = (field, value) => {
            if (!field) return

            this.setState({
                [field]: value,
            })
        }

        const socket = io(window.location.pathname)

        socket.on('connect', () => {
            this.setState({ socket })
        })
        socket.on('disconnect', () => {
            this.setState({ socket: null })
        })

        request('/users')
            .then(users => {
                this.setState({
                    users,
                })
            })
    }
    render() {
        return (<MuiThemeProvider>
            <div>
                <AppBar title="Continuous Integration and Delivery" />
                <UserDrawer users={this.state.users} />
            </div>
        </MuiThemeProvider>)
    }
}

render(<App />, document.getElementById('app'))
