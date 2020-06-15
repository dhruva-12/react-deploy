import React, { Component } from 'react'
import Axios from 'axios'
import './History.css'

export default class TransactionHistory extends Component {

    constructor (props) {
        super(props)
        this.state = {
            loading: true,
            data: []
        }
    }


    componentDidMount = async () => {
        let data = await Axios.post( "history/transactionHistory", {
            token: localStorage.usertoken
        })

        console.log(data)
        this.setState({ 
            loading: false,
            data: data.data
        })
    }


    render = () => {

        let tableData

        if (this.state.data.length === 0) {
            tableData = <div style={{margin: "3rem", fontSize:"2rem"}}> No Transactions Found </div>
        } else {
            tableData = (
                <table>
                    <tr>
                        <th>Reference Number</th>
                        <th>Amount</th>
                        <th>Status</th>

                    </tr>

                    {(this.state.data).map( item => {
                        return(
                            <tr>
                                <td>{ item.refNo }</td>
                                <td>{ item.amount+ " "+ item.currency }</td>
                                <td>{item.status}</td>
                            </tr>
                        )
                    })}
                    
                </table>
            )
        }


        if (this.state.loading) {

            return (
                <div style={{display: "flex", margin:"auto"}} >
                    Loading...
                </div>
            )
            
            
        } else {
            return (
                <div className="historyContainer" >
                    {tableData}
                </div>
            )

        }


    }
}