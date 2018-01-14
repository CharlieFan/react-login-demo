import React, { Component } from 'react'
import validator from '../../../utils/validator'
import api from '../../../api/modules'

// Components:
import { Link } from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

export default class Signup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            formData: {
                username: {
                    value: '',
                    touched: false,
                    rules: {
                        required: true,
                        isEmail: true
                    },
                    isValid: false
                },
                nickname: {
                    value: '',
                    touched: false,
                    rules: {
                        required: true
                    },
                    isValid: false
                },
                password:{
                    value: '',
                    touched: false,
                    rules: {
                        required: true,
                        minLength: 8
                    },
                    isValid: false
                },
            },
            confirm: {
                value: '',
                touched: false,
                isValid: false
            },
            isShowError: false
        }
    }

    validateForm() {
        let isValid = true
        for(let prop in this.state.formData) {
            if (this.state.formData[prop]) {
                let { value, rules } = this.state.formData[prop]
                isValid = isValid && validator(value, rules)
            }
        }

        isValid = isValid && this.state.confirm.isValid

        this.setState({
            isShowError: true
        })
        return isValid
    }

    handleSubmit() {
        if (!this.validateForm()) {
            return false
        }

        let {username, password, nickname} = this.state.formData

        let postFormData = {
            email: username.value,
            password: password.value,
            nickname: nickname.value
        }
        // TODO: Call API
        // console.log(postFormData)
        api.user.signup(postFormData).then(res => {
            console.log(res)
            let { authToken } = res
            // let token  = localStorage.getItem('token')
            localStorage.setItem('token', authToken)
            window.location.href="/home"
        })
    }

    handleConfirm(event) {
        let value = event.target.value
        let isValid = value === this.state.formData.password.value
        // console.log(isValid)
        

        this.setState({
            ...this.state,
            confirm: {
                value,
                touched: true,
                isValid
            }
        })
    }

    handleChange(event) {
        let name = event.target.name
        let value = event.target.value
        let data = {}
        data[name] = {
            ...this.state.formData[name],
            value,
            touched: true,
            isValid: validator(value, this.state.formData[name].rules)
        }

        this.setState({
            formData: {
                ...this.state.formData,
                ...data
            }
        })
    }

    whetherShowError(data) {
        let {touched, isValid} = data

        if (this.state.isShowError && !isValid) {
            return 'error'
        }

        if (!touched || isValid ) return null

        return 'error'
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
                    <FormGroup validationState={
                        this.whetherShowError(this.state.formData.username)
                    }>
                        <FormControl type="text"
                            name="username"
                            onChange={(e) => {
                                this.handleChange(e)
                            }}
                            placeholder="Enter Your Email or Username" />

                        {
                            this.whetherShowError(this.state.formData.username) === 'error' ?
                            <ControlLabel>email is required and should be valid</ControlLabel> : 
                            null
                        }
                    </FormGroup>

                     <FormGroup validationState={
                        this.whetherShowError(this.state.formData.nickname)
                    }>
                        <FormControl type="text"
                            name="nickname"
                            maxLength={24}
                            onChange={(e) => {
                                this.handleChange(e)
                            }}
                            placeholder="Create a Nickname" />

                        {   this.whetherShowError(this.state.formData.nickname) === 'error' ?
                            <ControlLabel>Please create your nickname</ControlLabel> : 
                            ''
                        }
                    </FormGroup>

                    <FormGroup validationState={
                        this.whetherShowError(this.state.formData.password)
                    }>
                        <FormControl type="password"
                            name="password"
                            onChange={(e) => {
                                this.handleChange(e)
                            }}
                            placeholder="New password"/>
                        { this.whetherShowError(this.state.formData.password) === 'error' ?
                            <ControlLabel>Please input a password with at least 8 characters</ControlLabel> : 
                            ''
                        }
                    </FormGroup>

                    <FormGroup validationState={
                        this.whetherShowError(this.state.confirm)
                    }>
                        <FormControl type="password"
                            name="confirm"
                            onChange={(e) => {
                                this.handleConfirm(e)
                            }}
                            placeholder="Confirm password"/>
                        {
                            this.whetherShowError(this.state.confirm) === 'error' ?
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