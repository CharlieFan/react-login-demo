import React, { Component } from 'react'
import { Pagination } from 'react-bootstrap'

export default class PageCombo extends Component {
    state = {
        currentPage: this.props.page
    }

    handlePage(value) {
        this.props.handlePage(value)
        this.setState({
            ...this.state,
            currentPage: value
        })
    }

    handleNext() {
        let { currentPage } = this.state
        if (currentPage >= this.props.total) {
            return false
        }  
        let nextPage = currentPage + 1
        this.handlePage(nextPage)
    }

    handlePrev() {
        let { currentPage } = this.state
        if (currentPage <= 1) {
            return false
        }  
        let prevPage = currentPage - 1
        this.handlePage(prevPage)
    }

    handleFirst() {
        this.handlePage(1)
        this.setState({
            ...this.state,
            currentPage: 1
        })
    }

    handleLast() {
        this.handlePage(this.props.total)
        this.setState({
            ...this.state,
            currentPage: this.props.total
        })
    }

    initItems = (page, total) => {
        let pageItems = []

        if (total <= 10) {
            for(let i = 1; i <= total; i++) {
                pageItems.push(
                    <Pagination.Item key={i}
                        active={i === page}
                        onClick={(e) => {
                            this.handlePage(i)
                        }}>
                        {i}
                    </Pagination.Item>
                )
            }
        } else {
            if (page - 2 - 1 > 2 && total - page - 2 > 2) {
                pageItems.push(
                    <Pagination.Item key={1}
                        active={1 === page}
                        onClick={(e) => {
                            this.handlePage(1)
                        }}>
                        {1}
                    </Pagination.Item>
                )
        
                pageItems.push(
                    <Pagination.Ellipsis key={-1}/>
                )

                for (let i = page - 2; i <= page + 2; i++) {
                    pageItems.push(
                        <Pagination.Item key={i}
                            active={i === page}
                            onClick={(e) => {
                                this.handlePage(i)
                            }}>
                            {i}
                        </Pagination.Item>
                    )
                }

                pageItems.push(
                    <Pagination.Ellipsis key={-2}/>
                )

                pageItems.push(
                    <Pagination.Item key={total}
                        active={total === page}
                        onClick={(e) => {
                            this.handlePage(total)
                        }}>
                        {total}
                    </Pagination.Item>
                )
            } else if (page <= 5) {
                for (let i = 1; i <= 5 + 2; i++) {
                    pageItems.push(
                        <Pagination.Item key={i}
                            active={i === page}
                            onClick={(e) => {
                                this.handlePage(i)
                            }}>
                            {i}
                        </Pagination.Item>
                    )
                }

                pageItems.push(
                    <Pagination.Ellipsis key={-2}/>
                )

                pageItems.push(
                    <Pagination.Item key={total}
                        active={total === page}
                        onClick={(e) => {
                            this.handlePage(total)
                        }}>
                        {total}
                    </Pagination.Item>
                )
            } else if (page > total - 5) {
                pageItems.push(
                    <Pagination.Item key={1}
                            active={1 === page}
                            onClick={(e) => {
                                this.handlePage(1)
                            }}>
                            {1}
                        </Pagination.Item>
                )

                pageItems.push(
                    <Pagination.Ellipsis key={-1}/>
                )

                for (let i = total - 6; i <= total; i++) {
                    pageItems.push(
                        <Pagination.Item key={i}
                            active={i === page}
                            onClick={(e) => {
                                this.handlePage(i)
                            }}>
                            {i}
                        </Pagination.Item>
                    )
                }
            }
        }

        return pageItems
    }
    
    render() {
        return (
            <div>
                <Pagination>
                    <Pagination.First onClick={(e) => {
                        this.handleFirst()
                    }}/>
                    <Pagination.Prev onClick={(e) => {
                        this.handlePrev()
                    }}/>
                        {this.initItems(this.props.page, this.props.total)}
                    <Pagination.Next onClick={(e) => {
                        this.handleNext()
                    }}/>
                    <Pagination.Last onClick={(e) => {
                        this.handleLast()
                    }}/>
                </Pagination>
            </div>
        )
    }
}