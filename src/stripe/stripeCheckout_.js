/**
 * Create the Stripe Checkout redirect html code for a given user
 * @param {String} userID
 * @returns {String}
 */
export function stripeCheckoutRedirectHTML(key, price) {
	// border: 1px solid transparent;
	//  border-radius: 4px;
	//  background-color: white;

	//  box-shadow: 0 1px 3px 0 #e6ebf1;

	// const [status, setStatus] = useState(true);

	return `
  <!DOCTYPE html>
	<html>
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
			<style>
				.StripeElement {
					box-sizing: border-box;

					height: 40px;

					padding: 10px 12px;

					-webkit-transition: box-shadow 150ms ease;
					transition: box-shadow 150ms ease;
				}

				.StripeElement--focus {
					box-shadow: 0 1px 3px 0 #cfd7df;
				}

				.StripeElement--invalid {
					border-color: #fa755a;
				}

				.StripeElement--webkit-autofill {
					background-color: #fefde5 !important;
				}
				.price {
					margin: -15px 0 60px;
				}
				.label {
					font-weight: bold;
					color: #888;
					font-size: 90%;
					margin-bottom: 10px;
				}
				.cardContainer {
					border: 1px solid #ccc;
					border-radius: 4px;
					box-shadow: 0 1px 3px 0 #e6ebf1;
				}
				.cardDetails {
					display: flex;
					flexdirection: row;
				}
				.textInput {
					border-radius: 4px;
					margin-bottom: 30px;
					width: 100%;
					border: 1px solid #ccc;
				}
				.textInput:focus,
				.textInput:active {
					outline: none;
				}
				input#submit {
					background-color: #f85f6a;
					margin-top: 20px;
					font-weight: bold;
					font-size: 110%;
					height: 50px;
					border: none;
					border-radius: 4px;
					-webkit-appearance: none;
					-moz-appearance: none;
					appearance: none;
				}
				.err {
					margin: 10px 0;
					color: red;
					font-size: 90%;
				}
			</style>

			<!-- Load Stripe.js on your website. -->
			<script src="https://js.stripe.com/v3"></script>
		</head>
		<body>
			<center>
				<h5 style="color: #888; margin-top: 20px;">E-Beauty services</h5>
				<h1 class="price">\$${price}</h1>
			</center>

			<form id="payment-form">
				<div class="label">Name on card</div>
				<input type="text" class="StripeElement textInput" id="name" required/>
				<div class="label">Card information</div>
				<div class="cardContainer">
					<div
						id="card-number"
						style="border-bottom: 1px solid #ccc; margiin-bottom: 10px;"
					>
						<!-- Elements will create input elements here -->
					</div>
					<div class="cardDetails">
						<div
							id="card-expiry"
							style="width: 50%; border-right: 1px solid #ccc;"
						></div>
						<div id="card-cvc" style="width: 50%;"></div>
					</div>
				</div>

				

				<!-- We'll put the error messages in this element -->
				<div id="card-errors" class="err" role="alert"></div>

				<div class="label" style="margin-top: 30px;">ZIP / Postal Code</div>
				<div id="postal-code" class="textInput"></div>

				<input
					class="StripeElement"
					style="color: #fff; width: 100%;"
					id="submit"
					
					value="Pay \$${price}"
					type="submit"
				/>
			</form>
		<script>
			console.log('in start of script')
			var stripe = Stripe('${key}');
			// var displayErrr = document.getElementById('card-errors');
			// displayErrr.innerHTML = 'aaaaaaa'
			var elements = stripe.elements();

			var style = {
			    base: {
			        color: "#32325d",
			    }
			};

			// var card = elements.create("card", { style: style });

			var cardNumber = elements.create("cardNumber", { style: style, showIcon: true, iconStyle: 'solid' });
			var cardExpiry = elements.create("cardExpiry", { style: style });
			var cardCvc = elements.create("cardCvc", { style: style });
			var postalCode = elements.create("postalCode", { style: style });
			cardNumber.mount("#card-number");
			cardExpiry.mount("#card-expiry");
			cardCvc.mount("#card-cvc");
			postalCode.mount("#postal-code");
			// card.mount("#card");

			[cardNumber, cardExpiry, cardCvc, postalCode].forEach(item => {
				item.on('change', function(event) {
					let displayError = document.getElementById('card-errors');
				    if (event.error) {
				        displayError.textContent = event.error.message;
				    } else {
				        displayError.textContent = '';
				    }
				})
			})


			var form = document.getElementById('payment-form');

			form.addEventListener('submit', function(event) {
			    event.preventDefault();
	            const name = document.getElementById('name').value;
			    const postalCode = document.getElementById('postal-code').value;

			    

			            let displayErrr = document.getElementById('card-errors');
			            // displayErrr.innerHTML = JSON.stringify(cardNumber)
			            

			            var additionalData = {
			                name: name,
			                address_line1: undefined,
			                address_city: undefined,
			                address_state: undefined,
			                address_zip: undefined,
			            };

			            stripe.createToken(cardNumber, additionalData)
			            	.then(function(result) {

				                // let displayErrr = document.getElementById('card-errors');
				            	// displayErrr.innerHTML = "aaaaa "+JSON.stringify(result)


				                if (result.token) {
				                	
				                	document.getElementById('submit').disabled = true;
				    				document.getElementById('submit').value="Processing...";
				                    
				                    window.ReactNativeWebView.postMessage(JSON.stringify(result));
			                	}

				            }).catch(e => {
				            	let displayErrr = document.getElementById('card-errors');
				            	// displayErrr.innerHTML = "errrrrrrr "+JSON.stringify(e)
				            });
			        })
		</script>
		</body>
	</html>
  `;
}

export function success() {
	return `
		<!DOCTYPE html>
		<html>
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
				<style>
					.success-animation { margin:150px auto;}

					.checkmark {
					    width: 100px;
					    height: 100px;
					    border-radius: 50%;
					    display: block;
					    stroke-width: 2;
					    stroke: #4bb71b;
					    stroke-miterlimit: 10;
					    box-shadow: inset 0px 0px 0px #4bb71b;
					    animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
					    position:relative;
					    top: 5px;
					    right: 5px;
					   margin: 0 auto;
					}
					.checkmark__circle {
					    stroke-dasharray: 166;
					    stroke-dashoffset: 166;
					    stroke-width: 2;
					    stroke-miterlimit: 10;
					    stroke: #4bb71b;
					    fill: #fff;
					    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
					 
					}

					.checkmark__check {
					    transform-origin: 50% 50%;
					    stroke-dasharray: 48;
					    stroke-dashoffset: 48;
					    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
					}

					@keyframes stroke {
					    100% {
					        stroke-dashoffset: 0;
					    }
					}

					@keyframes scale {
					    0%, 100% {
					        transform: none;
					    }

					    50% {
					        transform: scale3d(1.1, 1.1, 1);
					    }
					}

					@keyframes fill {
					    100% {
					        box-shadow: inset 0px 0px 0px 30px #4bb71b;
					    }
					}
					.text {
						margin-top: -40px;
						color: #4bb71b;
						font-size: 150%;
						font-weight: bold
					}
				</style>
			</head>
			<body>
				<div class="success-animation">
					<svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
				</div>
				<center>
					<div class="text">
						Payment Successful
					</div>
				</center>
			</body>
		</html>
	`;
}

export function failure() {
	return `
		<!DOCTYPE html>
		<html>
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
				<style>
					.ui-error {
						transform: scale(.5);
					}
					.text {
						margin-top: -40px;
						color: #f97474;
						font-size: 150%;
						font-weight: bold
					}
				</style>	
			</head>
			<body>
				<div class="ui-error">
					<svg  viewBox="0 0 87 87" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
								<g id="Group-2" transform="translate(2.000000, 2.000000)">
									<circle id="Oval-2" stroke="rgba(252, 191, 191, .5)" stroke-width="4" cx="41.5" cy="41.5" r="41.5"></circle>
									<circle  class="ui-error-circle" stroke="#f97474" stroke-width="4" cx="41.5" cy="41.5" r="41.5"></circle>
										<path class="ui-error-line1" d="M22.244224,22 L60.4279902,60.1837662" id="Line" stroke="#f97474" stroke-width="3" stroke-linecap="square"></path>
										<path class="ui-error-line2" d="M60.755776,21 L23.244224,59.8443492" id="Line" stroke="#f97474" stroke-width="3" stroke-linecap="square"></path>
								</g>
						</g>
					</svg>
				</div>
				<center>
					<div class="text">
						Payment failed
					</div>
				</center>
			</body>
		</html>
	`;
}
