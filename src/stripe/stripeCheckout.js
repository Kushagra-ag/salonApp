import { STRIPE } from './stripeConfig';

/**
 * Create the Stripe Checkout redirect html code for a given user
 * @param {String} userID
 * @returns {String}
 */
export function stripeCheckoutRedirectHTML(userID) {
    if (!userID) {
        throw new Error('Invalid userID');
    }

    return `
  <html>
    <body>
      <!-- Load Stripe.js on your website. -->
      <script src="https://js.stripe.com/v3"></script>
      <h1>Loading...........</h1>

      <div id="error-message"></div>
      <script>
      
        (async function () {

          console.log('in start of script')
          var stripe = await Stripe('${STRIPE.PUBLIC_KEY}');
          window.onload = function () {

            // When the customer clicks on the button, redirect
            // them to Checkout.
            stripe.redirectToCheckout({
              lineItems: [{ price: '${STRIPE.PRODUCT_PRICE_ID}', quantity: 1 }],
              mode: 'payment',
              // Do not rely on the redirect to the successUrl for fulfilling
              // purchases, customers may not always reach the success_url after
              // a successful payment.
              // Instead use one of the strategies described in
              // https://stripe.com/docs/payments/checkout/fulfillment
              successUrl: '${STRIPE.SUCCESS_URL}',
              cancelUrl: '${STRIPE.CANCELED_URL}',
              // clientReferenceId: '${userID}',
            })
              .then(function (result) {
                if (result.error) {
                  // If redirectToCheckout fails due to a browser or network
                  // error, display the localized error message to your customer.
                  var displayError = document.getElementById('error-message');
                  displayError.innerHTML = result.error.message;
                  console.log(result.error.message);
                }
              });
          };
        })();
      </script>
    </body>
  </html>
  `;
}
