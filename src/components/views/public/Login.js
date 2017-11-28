import React, { Component } from 'react'
import validator from 'validator'
import md5 from 'crypto-js/md5'

// Components:
import { Link } from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            emailHasError: null,
            passwordHasError: null
        }
    }

    handleSubmit() {
        if (!this.validateEmail() || !this.validatePassword()) return

        let {username, password} = this.state
        password = md5(password).toString()

        // TODO: Call API
        console.log(username, password)
    }

    handleChange(event) {
        let name = event.target.name
        let value = event.target.value
        let data = {}
        data[name] = value
        
        this.setState({
            ...data
        })
    }

    validateEmail() {
        let email = this.state.username

        if (!email || !validator.isEmail(email)) {
            this.setState({
                emailHasError: 'error'
            })
            return false
        } else {
            this.setState({
                emailHasError: null
            })
            return true
        }

    }

    validatePassword() {
        let password = this.state.password

        if (!password) {
            this.setState({
                passwordHasError: 'error'
            })
            return false
        } else {
            this.setState({
                passwordHasError: null
            })
            return true
        }
    }
    

    render() {
        return (
            <div>
                <h1>Sign in</h1>
                <form
                    className="App-form"
                    onSubmit={(e) => {
                        e.preventDefault()
                        this.handleSubmit()
                    }}>
                    <FormGroup validationState={this.state.emailHasError}>
                        <FormControl type="text"
                            placeholder="Username or Email"
                            name="username" 
                            value={this.state.username}
                            onChange={(e) => {
                                this.handleChange(e)
                            }}/>
                        { this.state.emailHasError === 'error' ?
                            <ControlLabel>Invalid email</ControlLabel> : 
                            ''
                        }
                    </FormGroup>

                    <FormGroup validationState={this.state.passwordHasError}>
                        <FormControl type="password"
                            placeholder="password" 
                            name="password"
                            value={this.state.password}
                            onChange={(e) => {
                                this.handleChange(e)
                            }}/>
                        { this.state.passwordHasError === 'error' ?
                            <ControlLabel>Please input your password</ControlLabel> : 
                            ''
                        }
                    </FormGroup>

                    <Button type="submit"
                        bsStyle="primary"
                        className="length-100-percent">
                        Sign In
                    </Button>
                </form>
                <Link to="/signup">No Account? Sign up now</Link>
            </div>
        )
    }
}
