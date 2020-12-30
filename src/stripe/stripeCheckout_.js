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
					background-color: #2f78e8;
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
			<div style="display:none;visibility:hidden;position:absolute;left:-10000px">
				<a id="success" href="https://payment/success"></a>
				<a id="cancel" href="https://payment/canceled"></a>
			</div>
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
				                    document.getElementById("success").click();
			                	}
			                	document.getElementById("cancel").click()
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
