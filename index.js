const Client = require("./model/clients");
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/ClientCli');


const addClient = async (client) => {
    try {
        const newClient = await Client.create(client);
        console.info('New Client Added', newClient);
        process.exit(0);
    } catch (error) {
        console.error('Error adding client:', error);
        process.exit(1);
    }
};


const findClient = async (name) => {
    try {
        const search = new RegExp(name, 'i');
        const client = await Client.find({
            $or: [{ firstname: search }, { lastname: search }]
        });
        console.info(client);
        console.info(`${client.length} match`);
        process.exit(0);
    } catch (error) {
        console.error('Error finding clients:', error);
        process.exit(1);
    }
};


const updateClient = async (_id, client) => {
    try {
        const updatedClient = await Client.findByIdAndUpdate(_id, client, {
            new: true,
        });
        if (!updatedClient) {
            console.error('Client not found');
        } else {
            console.info('Client Updated:', updatedClient);
        }
        process.exit(0);
    } catch (error) {
        console.error('Error updating client:', error);
        process.exit(1);
    }
};

// Remove client
const removeClient = async (_id) => {
    try {
        const removedClient = await Client.findByIdAndRemove(_id);
        if (!removedClient) {
            console.error('Client not found');
        } else {
            console.info('Client Removed:', removedClient);
        }
        process.exit(0);
    } catch (error) {
        console.error('Error removing client:', error);
        process.exit(1);
    }
};

const listClients = async () => {
    try {
        const clients = await Client.find();
        console.info(clients);
        console.info(`${clients.length} clients`);
        process.exit(0);
    } catch (error) {
        console.error('Error listing clients:', error);
        process.exit(1);
    }
};

module.exports = { addClient, findClient, updateClient, removeClient, listClients }