import React, { Component } from 'react'
import { Button } from 'antd'
import RoomPrice from './RoomPrice'
export default class RoomPriceContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            loadMore : true
        }
    }

    loadMore = () => {
        this.setState({
            loadMore : !this.state.loadMore
        })
        
    }
    render(){
        let roomsArray
        if(this.state.loadMore){
            roomsArray = this.props.rooms
        } else {
            roomsArray = this.props.rooms.slice(0, 2)
        }

        return(
            <React.Fragment>
                <div className="roomsPrices">
                    {roomsArray.map((element, index) => (
                        <RoomPrice
                            hotelId={this.props.hotelId}
                            token={this.props.token}
                            config={this.props.config}
                            recommendationId={element.id}
                            handleSelection={this.props.handleSelection} 
                            selectedtoken={this.props.selectedtoken}
                        />
                    ))}
                </div>
                {/* {this.props.rooms.length > 2 && 
                    <Button type="primary" ghost onClick={this.loadMore} style={{margin:"1rem 0"}}>
                        {this.state.loadMore?"Show Less":"Load More Data"}
                    </Button>} */}
            </React.Fragment>
        )
    }
}