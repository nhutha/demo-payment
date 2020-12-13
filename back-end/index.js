const express = require('express');
const stripe = require('stripe')("sk_test_51HX2HiEdP78onUKJPm5oI5GQXAmSUizRca6KihA5IOjmzwyuj7oF4Yi2hbK3YnKIE53ocNQn8sOtAlieuDX1FBVV003XRoR9Om");

const app = express();
const cors = require("cors");

app.use(express.static('.'));
app.use(cors())

app.post("/payment", async (req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Stubborn Attachments',
                            images: ['https://i.imgur.com/EHyR2nP.png'],
                        },
                        unit_amount: 2000,
                    },
                    quantity: 1,
                },
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Stubborn Attachments',
                            images: ['https://i.imgur.com/EHyR2nP.png'],
                        },
                        unit_amount: 2000,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:5000?success=true`,
            cancel_url: `http://localhost:5000?canceled=true`,
        });
        res.json({ id: session.id });

    } catch (e) {
        console.log("eror ", e)
    }

})


app.listen(5000, () => {
    console.log("SERVER START AT PORT 5000")
})