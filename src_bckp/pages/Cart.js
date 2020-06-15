import React, { Component } from "react";
import Navbar2 from "../components/Navbar1/Navbar2/Navbar2";
import "./Cart.css";
import CartRoom from "../components/CartRoom";
import { Button } from 'antd'
import Axios from "axios";
import JwtDecode from "jwt-decode";


const timeout = ms => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

export default class Cart extends Component {

	constructor(props) {
		super(props);
		this.state = {
			total: 0.0,
			referenceNumber:"",
			amount: "",
			productDescription: "",
			hash:"",
			userName: "",
			userContact: "",
			userEmail: "",
		};
	}

	componentDidMount = async () => {
		let cart = localStorage.getItem("cartStorage");
		cart = JSON.parse(cart);
		let total = 0;
		for (let i in cart) {
			console.log(`${i}, iprice = ${i.price}`);
			total += parseFloat(cart[i].price);
		}

		this.setState({
			total: total
		});
	};

	removeFromCart = id => {
		let cart = localStorage.getItem("cartStorage");
		cart = JSON.parse(cart);
		delete cart[id];
		localStorage.setItem("cartStorage", JSON.stringify(cart));
		this.forceUpdate();
	};

	getReference = async (amount) => {
		let refNumber = await Axios.post("/payment/getReference", {
			token: localStorage.usertoken,
			amount: amount,
		})


		return refNumber.data

	}

	 getQueryString = (data = {}) => {
		return Object.entries(data)
		  .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
		  .join('&');
	  }

	completePayment = async () => {


		// let ref = await this.getReference(this.state.total)
		let ref = await this.getReference("1.00")

		let {refNo, amountRequest, hash} = ref

		let usertoken = JwtDecode(localStorage.usertoken)

		let cart = localStorage.getItem("cartStorage")
		cart = JSON.parse(cart)

		let ProdDesc = ""
		Object.keys(cart).map(x=>{
			ProdDesc+= cart[x].id + "-" + cart[x].name+" \n"
		})

		this.setState({ 
			amount: amountRequest,
			referenceNumber: refNo,
			hash: hash,
			userName: usertoken.name,
			userEmail: usertoken.email,
			userContact: "9999992222",
			productDescription: ProdDesc,

		})
	
		



		
		// let bodyFormData = new FormData();
		// bodyFormData.set('MerchantCode', 'M05252');
		// bodyFormData.set('PaymentID', '2')
		// bodyFormData.set('RefNo', refNo)
		// bodyFormData.set('Amount', amountRequest)
		// bodyFormData.set('Currency', 'MYR')
		// bodyFormData.set('ProdDesc', ProdDesc)
		// bodyFormData.set('UserName', usertoken.name)
		// bodyFormData.set('UserEmail', usertoken.email)
		// bodyFormData.set('UserContact', "9999992222")
		// bodyFormData.set('SignatureType', "SHA256")
		// bodyFormData.set('Signature', hash)
		// bodyFormData.set('ResponseURL', "/payment/response")
		// bodyFormData.set('BackendURL', "/payment/backendResponse")



		// let data = await Axios.post("https://payment.ipay88.com.my/ePayment/entry.asp", {
		// 	MerchantCode: "M05252",
		// 	PaymentID: "2",
		// 	RefNo: refNo,
		// 	Amount: amountRequest,
		// 	Currency: "MYR",
		// 	ProdDesc: ProdDesc,
		// 	UserName: usertoken.name,
		// 	UserEmail: usertoken.email,
		// 	UserContact: "9999992222",
		// 	SignatureType: "SHA256",
		// 	Signature: hash,
		// 	ResponseURL: "/payment/response",
		// 	BackendURL: "/payment/backendResponse"

		// })

		let data = {
			MerchantCode: "M05252",
			PaymentID: "2",
			RefNo: refNo,
			Amount: amountRequest,
			Currency: "MYR",
			ProdDesc: ProdDesc,
			UserName: usertoken.name,
			UserEmail: usertoken.email,
			UserContact: "9999992222",
			SignatureType: "SHA256",
			Signature: hash,
			ResponseURL: "/payment/response",
			BackendURL: "/payment/backendResponse",
			Submit: "Proceed with Payment"

		}

		let response = await Axios({
			method: 'post',
			url: 'https://payment.ipay88.com.my/ePayment/entry.asp',
			data: data,
			headers : {	'Content-Type': 'application/x-www-form-urlencoded', 
						'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
						'Accept-Encoding': 'gzip, deflate, br'},
						transformRequest: this.getQueryString
			})

		console.log("data ", data)

	}



	handleSubmit = async () => {


		// let ref = await this.getReference(this.state.total)
		let ref = await this.getReference("1.00")
		// await timeout(10000)

		let {refNo, amountRequest, hash} = ref

		let usertoken = JwtDecode(localStorage.usertoken)

		let cart = localStorage.getItem("cartStorage")
		cart = JSON.parse(cart)

		let ProdDesc = ""
		Object.keys(cart).map(x=>{
			ProdDesc+= cart[x].id + "-" + cart[x].name+" \n"
		})

		this.setState({ 
			amount: amountRequest,
			referenceNumber: refNo,
			hash: hash,
			userName: usertoken.name,
			userEmail: usertoken.email,
			userContact: "9999992222",
			productDescription: ProdDesc,

		})

		document.getElementById("ePaymentForm").submit(); 
	

		
	
	}

	render = () => {
		if (!localStorage.cartStorage || localStorage.cartStorage === "{}") {
			return (
				<React.Fragment>
					<Navbar2 source="cart" />
					<div className="CartSpacer" />

					<div className="addToCart">Your cart is empty</div>
				</React.Fragment>
			);
		} else {
			let cart = localStorage.getItem("cartStorage");

			cart = JSON.parse(cart);

			

			return (
				<React.Fragment>
					<Navbar2 source="cart" />
					<div className="CartSpacer" />
					{/* <div className="roomlist-center">
                        <div className="cartHeading">Shopping Cart</div> 
                    </div> */}

					<div className="roomslist-center">
						<div className="cartHeading">Shopping Cart</div>
					</div>

					{Object.keys(cart).map(x => {
						return (
							<div className="roomslist-center">
								<CartRoom
									key={x}
									room={cart[x]}
									removeFromCart={this.removeFromCart}
								/>
							</div>
						);
					})}

					<div className="roomslist-center">
						<div className="cartHeading">
							Cart Total: {this.state.total}
						</div>
					</div>
					

					<form method="post" id="ePaymentForm" action="https://payment.ipay88.com.my/ePayment/entry.asp" onClick={this.handleSubmit} >
						<input type="hidden" name="MerchantCode" value="M05252" />
						<input type="hidden" name="PaymentId" value="2" />
						<input type="hidden" name="RefNo" value= {this.state.referenceNumber} />
						<input type="hidden" name="Amount" value= {this.state.amount} />
						<input type="hidden" name="Currency" value="MYR" />
						<input type="hidden" name="ProdDesc" value= {this.state.productDescription} />
						<input type="hidden" name="UserName" value= {this.state.userName} />
						<input type="hidden" name="UserEmail" value= {this.state.userEmail} />
						<input type="hidden" name="UserContact" value= {this.state.userContact} />
						<input type="hidden" name="SignatureType" value="SHA256" />
						<input type="hidden" name="Signature" value= {this.state.hash}/>
						<input type="hidden" name="ResponseURL" value= "https://project10x.herokuapp.com/payment/response" />
						<input type="hidden" name="BackendURL" value= "https://project10x.herokuapp.com/payment/backendResponse" />
						{/* <input type="button" value="Proceed with Payment" name="Submit" /> */}
					</form>

					<div style={{display:"flex", justifyContent:"center", margin:"3rem"}}>
						<Button  onClick={this.handleSubmit}>Proceed to payment</Button>

					</div>
				</React.Fragment>
			);
		}
	};
}
