import React, { Component } from 'react'
import api from '../../../api/modules'
import { Button, FormGroup, FormControl } from 'react-bootstrap'
import Products from './Products'
import PageCombo from '../../tags/PageCombo'

export default class Home extends Component {
    state = {
        pageInfo: {
            page: 1,
            total: 1
        },
        data: [
            // {
            //     image_thumb_url: 'https://dx5vpyka4lqst.cloudfront.net/products/438457/images/thumb.png',
            //     name: 'hahha',
            //     price: '4456',
            //     package: 'hahahahh',
            //     producer_name: 'lmao'
            // }
        ],
        searchText: '',
        nickname: ''
    }

    handlePage = (value) => {
        this.setState({
            pageInfo: {
                ...this.state.pageInfo,
                page: value
            }
        }, function(){
            let page = this.state.pageInfo.page
            // TODO: Call API Here:
            this.updateList(this.state.searchText, page)
        })
    }

    handleSearch() {
        let query = this.state.searchText

        this.updateList(query)
    }

    updateList(query = '', page = 1) {
        api.home.getAlcohol(query, page).then(res => {
            let list = res.result.map(product => {
                return {
                    image_thumb_url: product.image_thumb_url,
                    name: product.name,
                    price: ( product.price_in_cents / 100).toFixed(2),
                    'package': product.package,
                    producer_name: product.producer_name
                }
            })
            let pager = {
                page: res.pager.current_page,
                total: res.pager.total_pages
            }
            this.setState({
                ...this.state,
                data: [...list],
                pageInfo: {...pager}
            })
        })
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
            window.location.href = '/'
        }).catch(err => {
            localStorage.removeItem('token')
            window.location.href = '/'
        })
    }

    componentDidMount() {
        // CALL get user info API HERE:
        api.user.getUserInfo().then(res => {
            let { nickname } = res
            this.setState({
                ...this.state,
                nickname
            })
        })
    }
    
    render() {
        return (
            <div>
                <h1 className="home-header">
                    Hello, 
                    <span> { this.state.nickname }</span>!
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