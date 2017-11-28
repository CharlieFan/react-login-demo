import React, { Component } from 'react'
import validator from 'validator'
import md5 from 'crypto-js/md5'

// Components:
import { Link } from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

export default class Signup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            nickname: '',
            password: '',
            confirm: '',
            emailHasError: null,
            nicknameHasError: null,
            passwordHasError: null,
            confirmHasError: null
        }
    }

    handleSubmit() {
        if (!this.validateEmail() || !this.validateNickName() || !this.validatePassword() || !this.validateConfirm()) return

        let {username, password, nickname} = this.state
        password = md5(password).toString()

        // TODO: Call API
        console.log(username, password, nickname)
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

    validateNickName() {
        let { nickname } = this.state
        if (!nickname) {
            this.setState({
                nicknameHasError: 'error'
            })
            return false
        } else {
            this.setState({
                nicknameHasError: null
            })
            return true
        }
    }

    

    validatePassword() {
        let password = this.state.password

        if (!password || password.length < 8) {
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

    validateConfirm() {
        let confirm = this.state.confirm
        if (confirm !== this.state.password) {
            this.setState({
                confirmHasError: 'error'
            })
            return false
        } else {
            this.setState({
                confirmHasError: null
            })
            return true
        }
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

    render() {
        return (
            <div>
                <h1>Signup</h1>
                <form className="App-form"
                    onSubmit={(e) => {
                        e.preventDefault()
                        this.handleSubmit()
                    }}>
                    <FormGroup validationState={this.state.emailHasError}>
                        <FormControl type="text"
                            name="username"
                            onChange={(e) => {
                                this.handleChange(e)
                            }}
                            placeholder="Input Your Username or Email" />

                        { this.state.emailHasError === 'error' ?
                            <ControlLabel>Invalid email</ControlLabel> : 
                            ''
                        }
                    </FormGroup>

                    <FormGroup validationState={this.state.nicknameHasError}>
                        <FormControl type="text"
                            name="nickname"
                            maxLength={24}
                            onChange={(e) => {
                                this.handleChange(e)
                            }}
                            placeholder="Create a Nickname" />

                        {   this.state.nicknameHasError === 'error' ?
                            <ControlLabel>Please create your nickname</ControlLabel> : 
                            ''
                        }
                    </FormGroup>

                    <FormGroup validationState={this.state.passwordHasError}>
                        <FormControl type="password"
                            name="password"
                            onChange={(e) => {
                                this.handleChange(e)
                            }}
                            placeholder="New password"/>
                        { this.state.passwordHasError === 'error' ?
                            <ControlLabel>Please input a password with at least 8 characters</ControlLabel> : 
                            ''
                        }
                    </FormGroup>

                    <FormGroup validationState={this.state.confirmHasError}>
                        <FormControl type="password"
                            name="confirm"
                            onChange={(e) => {
                                this.handleChange(e)
                            }}
                            placeholder="Confirm password"/>
                        { this.state.confirmHasError === 'error' ?
                            <ControlLabel>confirm password does not match</ControlLabel> : 
                            ''
                        }
                    </FormGroup>
                    <Button bsStyle="primary"
                        type="submit"
                        className="length-100-percent">Sign Up</Button>
                </form>
                <Link to="/">Back to sign in</Link>
            </div>
        )
    }
}