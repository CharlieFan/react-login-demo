import React from 'react'
import { Table } from 'react-bootstrap'

const Products = (props) => {
    let { data } = props

    let Items = data.map((item, k) => {
        return (
            <tr key={k}>
                <td>
                    <img width="50px" src={item.image_thumb_url} alt={`pic-${k}`}/>
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.package}</td>
                <td>{item.producer_name}</td>
            </tr>
        )
    })


    return (
        <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th></th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Size</th>
                    <th>Producer</th>
                </tr>
            </thead>
            <tbody>
                { Items }
            </tbody>
        </Table>
    )
}

export default Products
