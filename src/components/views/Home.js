import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import PageCombo from '../tags/PageCombo'

export default class Home extends Component {
    state = {
        pageInfo: {
            page: 7,
            total: 15
        }
    }

    handlePage = (value) => {
        this.setState({
            pageInfo: {
                ...this.state.pageInfo,
                page: value
            }
        }, function(){
            let query = this.state.pageInfo
            console.log("call api use query:", query)
        })
    }

    componentDidMount() {
        console.log('init data from api here')
    }
    
    render() {
        return (
            <div>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>column1</th>
                            <th>column2</th>
                            <th>column3</th>
                            <th>column4</th>
                            <th>column5</th>
                            <th>column6</th>
                            <th>column7</th>
                            <th>column8</th>
                            <th>column9</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <img src="https://dx5vpyka4lqst.cloudfront.net/products/438457/images/thumb.png" alt=""/>
                            </td>
                            <td>Craig</td>
                            <td>Mcmorris</td>
                            <td>Mcmorris</td>
                            <td>Mcmorris</td>
                            <td>Mcmorris</td>
                            <td>Mcmorris</td>
                            <td>Mcmorris</td>
                            <td>Mcmorris</td>
                        </tr>
                    </tbody>
                </Table>

                <PageCombo
                    total={this.state.pageInfo.total}
                    page={this.state.pageInfo.page}
                    handlePage={this.handlePage}/>
            </div>
        )
    }
}