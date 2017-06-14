import React from 'react'
import { render } from 'react-dom'

import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'

import UserDrawer from './components/UserDrawer.jsx'
import { request, createSocket } from './utils/network.js'

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

        createSocket(window.location.pathname, sock => {
            this.setState({ socket: sock })
        }, () => {
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
