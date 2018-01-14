import React, { Component } from 'react'
import api from '../../../api/modules'
import { Button, FormGroup, FormControl } from 'react-bootstrap'

import Products from './Products'
import PageCombo from '../../tags/PageCombo'

export default class Home extends Component {
    state = {
        pageInfo: {
            page: 7,
            total: 15
        },
        data: [
            {
                image_thumb_url: 'https://dx5vpyka4lqst.cloudfront.net/products/438457/images/thumb.png',
                name: 'hahha',
                price: '4456',
                package: 'hahahahh',
                producer_name: 'lmao'
            },
            {
                image_thumb_url: 'https://dx5vpyka4lqst.cloudfront.net/products/438457/images/thumb.png',
                name: 'hahha',
                price: '4456',
                package: 'hahahahh',
                producer_name: 'lmao'
            },
            {
                image_thumb_url: 'https://dx5vpyka4lqst.cloudfront.net/products/438457/images/thumb.png',
                name: 'hahha',
                price: '4456',
                package: 'hahahahh',
                producer_name: 'lmao'
            }
        ],
        searchText: ''
    }

    handlePage = (value) => {
        this.setState({
            pageInfo: {
                ...this.state.pageInfo,
                page: value
            }
        }, function(){
            let query = this.state.pageInfo
            // TODO: Call API Here:
            console.log("call api use query:", query)
        })
    }

    handleSearch() {
        console.log('search:', this.state.searchText)
    }

    handleChange(value) {
        this.setState({
            ...this.state,
            searchText: value
        })
    }

    handleLogout() {
        // console.log('log me out!')
        api.user.logout().then(res => {
            localStorage.removeItem('token')
            // window.location.href = '/'
        })
    }

    componentDidMount() {
        // api.home.fetchAlcohol()
    }
    
    render() {
        return (
            <div>
                <h1 className="home-header">
                    Hello! 
                    <span> { 'User somebody' }</span>
                    <Button bsStyle="danger"
                        onClick={(e) => {
                            this.handleLogout()
                        }}>
                        Logout
                    </Button>
                </h1>
                <form className="searchbox"
                    onSubmit={(e) => {
                        e.preventDefault()
                        this.handleSearch()
                    }}>
                    <FormGroup validationState={this.state.emailHasError}>
                        <FormControl type="text"
                            placeholder="Search Your Alcohol!"
                            name="search-text"
                            onChange={(e) => {
                                this.handleChange(e.target.value)
                            }}/>
                            <Button type="submit"
                                bsStyle="primary">
                                Search
                            </Button>
                    </FormGroup>
                </form>
                
                {
                    this.state.data.length > 0 ? 
                    
                    <div>
                        <Products data={this.state.data}/>
                        <PageCombo
                            total={this.state.pageInfo.total}
                            page={this.state.pageInfo.page}
                            handlePage={this.handlePage}/>
                    </div>
                    : null
                }

            </div>
        )
    }
}