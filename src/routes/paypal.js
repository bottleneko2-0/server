const express = require('express')
const router = express.Router()
require('dotenv').config()

const clientId = process.env.PAYPAL_CLIENT_ID;
const sellerPayerId = process.env.PAYPAL_SELLER_PAYER_ID;
console.log(clientId, sellerPayerId);

const jwt = getAuthAssertionValue(clientId, sellerPayerId);
console.log(jwt);

function getAuthAssertionValue(clientId, sellerPayerId) {
    const header = {
        "alg": "none"
    };
    const encodedHeader = base64url(header);
    const payload = {
        "iss": clientId,
        "payer_id": sellerPayerId
    };
    const encodedPayload = base64url(payload);
    return `${encodedHeader}.${encodedPayload}.`;
}

function base64url(json) {
    return btoa(JSON.stringify(json))
        .replace(/=+$/, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

