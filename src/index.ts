import { Client, Events, GatewayIntentBits, ActivityType } from "discord.js";
import { Schedule } from "./schedule";
import { Actions } from "./actions";

const token = process.env.TOKEN;

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

client.once(Events.ClientReady, (c: any) => {
  console.log(`Logged in as ${c.user.tag}`);
  new Schedule(new Actions(c)).start();

  const activities = ["Hau", "Hau Hau", "Hau Hau Hau"];
  let currentIndex = 0;

  setInterval(() => {
    const activity = activities[currentIndex];
    c.user.setActivity(activity, { type: ActivityType.Listening });
    currentIndex = (currentIndex + 1) % activities.length;
  }, 4000);
});

client.login(token);
