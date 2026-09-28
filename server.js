const express = require("express");

const app = express();
const PORT = 3000;

// Allow the server to receive form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Show the website
app.use(express.static(__dirname));

// Store submitted payments temporarily
const payments = [];

// Receive membership payment details
app.post("/submit-payment", (req, res) => {
    const { name, phone, transactionCode } = req.body;

    if (!name || !phone || !transactionCode) {
        return res.status(400).send("Please fill in all the required fields.");
    }

    const payment = {
        name,
        phone,
        transactionCode,
        amount: 500,
        date: new Date().toLocaleString(),
        status: "Pending verification"
    };

    payments.push(payment);

    console.log("NEW MEMBERSHIP PAYMENT:");
    console.log(payment);

    res.send(`
        <h1>Payment Details Received</h1>
        <p>Thank you, ${name}.</p>
        <p>Your payment details have been submitted successfully.</p>
        <p>Amount: KSh 500</p>
        <p>Transaction Code: ${transactionCode}</p>
        <p>Your payment will be verified before your membership is confirmed.</p>
    `);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});