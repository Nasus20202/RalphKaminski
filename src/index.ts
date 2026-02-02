import { Client, Events, GatewayIntentBits } from "discord.js";
import { Schedule } from "./schedule";
import { BarkActions, StatusActions } from "./actions";

const token = process.env.TOKEN;

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

client.once(Events.ClientReady, (c: any) => {
  console.log(`Logged in as ${c.user.tag}`);
  const barkActions = new BarkActions(c);
  const statusActions = new StatusActions(c);

  new Schedule(barkActions, "0 * * * *").start();
  new Schedule(statusActions, "* * * * *").start();

  statusActions.clock();
});

client.login(token);
