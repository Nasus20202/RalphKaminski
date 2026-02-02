import { ActivityType, Client, VoiceChannel } from "discord.js";
import {
  getGuilds,
  getAudioChannels,
  getMembers,
  playAudio,
  leaveChannel,
} from "./helper";
import { IScheduleActions } from "./schedule";

class BarkActions implements IScheduleActions {
  client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  private async playClock(
    channels: VoiceChannel[],
    hour: number,
    analogHour: number,
  ) {
    for (let channel of channels) {
      if ((await getMembers(channel)).length == 0) continue;
      console.log(`Playing clock for hour ${hour} in #${channel.name}`);
      await playAudio(channel, __dirname + `/audio/${analogHour}.opus`);
      await leaveChannel(channel);
    }
  }

  public async clock() {
    let hour = new Date().getHours();
    let analogHour = hour % 12;
    if (analogHour == 0) analogHour = 12;
    for (let guild of await getGuilds(this.client)) {
      let channels = await getAudioChannels(guild);
      this.playClock(channels, hour, analogHour);
    }
  }
}

class StatusActions implements IScheduleActions {
  client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  public async clock() {
    const time = new Date().toLocaleTimeString("pl-PL", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const timeLeft = 60 - new Date().getMinutes();

    const message = `${time} | ${timeLeft === 0 ? "Hau hau hau" : `Hau za ${timeLeft} min`}`;
    this.client.user?.setActivity(message, {
      type: ActivityType.Watching,
    });
  }
}

export { BarkActions, StatusActions };
