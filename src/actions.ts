import { Client, VoiceChannel } from "discord.js";
import { getGuilds, getAudioChannels, getMembers, playAudio, leaveChannel } from './helper';

class Actions {
    client: Client;
    constructor(client: Client) {
        this.client = client;
    }
    private async playClock(channels: VoiceChannel[], hour: number, analogHour: number) {
        for (let channel of channels) {
            if ((await getMembers(channel)).length == 0)
                continue;
            await playAudio(channel, __dirname + `/audio/${analogHour}.opus`);
            await leaveChannel(channel);
        }
    }

    public async clock() {
        let hour = new Date().getHours();
        let analogHour = hour % 12;
        if (analogHour == 0)
            analogHour = 12;
        for (let guild of await getGuilds(this.client)) {
            let channels = await getAudioChannels(guild);
            this.playClock(channels, hour, analogHour);
        }
    }
}

export { Actions };