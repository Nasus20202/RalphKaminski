import { Client, Events, GatewayIntentBits, ActivityType } from "discord.js";
import { Schedule } from "./schedule";

const token = process.env.TOKEN;

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

client.once(Events.ClientReady, (c: any) => {
  console.log(`Logged in as ${c.user.tag}`);
  const schedule = new Schedule(c);
  let update = 1;
  setInterval(async () => {
    if (update > 3) update = 1;
    let activity = "";
    for (let i = 0; i < update; i++) {
      activity += "Hau";
      if (i < update - 1) activity += " ";
    }
    c.user.setActivity(activity, { type: ActivityType.Listening });
    update++;
  }, 4000);
});

client.login(token);
