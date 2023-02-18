import { Client, ChannelType, Guild, VoiceChannel, GuildMember } from "discord.js";
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
            await playAudio(this.client, channel, __dirname + `/audio/${analogHour}.opus`);
        }
        for (let channel of channels) {
            if ((await getMembers(channel)).length == 0)
                continue;
            if (hour == 12)
                await playAudio(this.client, channel, __dirname + `/audio/Bal.opus`);
            else if (hour == 0 || hour == 24)
                await playAudio(this.client, channel, __dirname + `/audio/Pies.opus`);
            await leaveChannel(this.client, channel);
        }
    }


    private async playPopeHour(channels: VoiceChannel[]) {
        for (let channel of channels) {
            if ((await getMembers(channel)).length == 0)
                continue;
            await playAudio(this.client, channel, __dirname + `/audio/Barka.opus`);
            await leaveChannel(this.client, channel);
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

    public async popeHour() {
        for (let guild of await getGuilds(this.client)) {
            let channels = await getAudioChannels(guild);
            this.playPopeHour(channels);
        }
    }
}

export { Actions };