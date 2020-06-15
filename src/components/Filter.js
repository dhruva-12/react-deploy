import React, { Component } from 'react'
import { Button, Select } from 'antd'
const { Option } = Select;
//styles from RoomFinal.css

export default class Filter extends Component {

    constructor(props){
        super(props)
        this.state={
            selected:"sh",
            selectedpl:false,
            selectedph:false,
            selectedsh:false,
        }
    }

    componentDidMount(){
        let loc = localStorage.getItem('filter')
        if(loc){
            if(loc === 'pl'){
                this.handlepl()
            } else if(loc === 'ph'){
                this.handleph()
            } else if(loc === 'sh'){
                this.handlesh()
            } 

        } else {
            console.log('last else')
            this.handleph()
        }
    }

    handlepl = event => {
        this.props.handleFilter("pl")
        localStorage.setItem('filter', 'pl')
        this.setState({
            selected:"pl",
            selectedpl:true,
            selectedph:false,
            selectedsh:false,
        })
    }
    handleph = event => {
        this.props.handleFilter("ph")
        localStorage.setItem('filter', 'ph')
        this.setState({
            selected:"ph",
            selectedpl:false,
            selectedph:true,
            selectedsh:false,
        })
    }
    handlesh = event => {
        this.props.handleFilter("sh")
        localStorage.setItem('filter', 'sh')
        this.setState({
            selected:"sh",
            selectedpl:false,
            selectedph:false,
            selectedsh:true,
        })
    }
    handleChange = value => {
        localStorage.setItem('filter', value)
        this.setState({
            selected: value
        })
        this.props.handleFilter(value)
    }
    render(){

        

        return(
            <div className="fliterContainer">
                <div className="filterTop" />
                
                <div className="filterSelect">
                    <Select
                        defaultValue={this.state.selected}
                        onChange={this.handleChange}
                        value={this.state.selected}
                    >
                        <Option value="sh">Filter: Stars (Highest First)</Option> 
                        <Option value="ph">Filter: Price (Highest First)</Option>    
                        <Option value="pl">Filter: Price (Lowest First)</Option>    
                           
                    </Select>    
                </div>
                <div className="filter">
                <Button 
                        style={this.state.selectedsh? {backgroundColor:"#eb2147", color:"white"}: {color:"#eb2147", backgroundColor:"white"}}
                        onClick={this.handlesh}
                        className="filterButton" 
                        type="primary"
                    >
                        Stars (highest first)
                    </Button>
                    <Button 
                        style={this.state.selectedph? {backgroundColor:"#eb2147", color:"white"}: {color:"#eb2147", backgroundColor:"white"}}
                        onClick={this.handleph}
                        className="filterButton" 
                        type="primary"
                    >
                        Prices (highest first)
                    </Button>
                    <Button 
                        style={this.state.selectedpl? {backgroundColor:"#eb2147", color:"white"}: {color:"#eb2147", backgroundColor:"white"}}
                        onClick={this.handlepl}
                        className="filterButton" 
                        type="primary"
                        
                    >
                        Prices (lowest first)
                    </Button>
                    

                </div>
            </div>
        )
    }
}