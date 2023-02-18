// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, ActivityType } = require('discord.js');
const { token } = require('./config.json');
const { Schedule } = require('./schedule');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c: any) => {
	console.log(`Logged in as ${c.user.tag}`);
	const schedule = new Schedule(c);
	let update = 1;
	setInterval(async () => {
		if(update > 3)
			update = 1;
		let activity = "";
		for(let i = 0; i < update; i++){
			activity += "Hau";
			if(i < update - 1)
				activity += " ";
		}
		c.user.setActivity(activity, { type: ActivityType.Listening });
		update++;
	}, 4000);
});

// Log in to Discord with your client's token
client.login(token);
