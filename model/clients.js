const express = require("express");
const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    }
}, {
    collection: "Clients"
});

const ClientsCli = new mongoose.model("ClientCli", clientSchema);

module.exports = ClientsCli;