// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { Schedule } = require('./schedule');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c: any) => {
	console.log(`Logged in as ${c.user.tag}`);
	const schedule = new Schedule(c);
});

// Log in to Discord with your client's token
client.login(token);
