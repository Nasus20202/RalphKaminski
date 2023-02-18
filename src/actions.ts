import { Client, ChannelType, Guild, VoiceChannel, GuildMember } from "discord.js";
import { getGuilds, getAudioChannels, getMembers, playAudio, leaveChannel } from './helper';

class Actions {
    client: Client;
    constructor(client: Client){
        this.client = client;
    }
    private async playClock(channel: VoiceChannel, hour: number, analogHour: number){
        let files = [__dirname  + `/audio/${analogHour}.opus`];
        if(hour == 12)
            files.push(__dirname  + `/audio/Bal.opus`);
        if(hour == 0 || hour == 24)
            files.push(__dirname  + `/audio/Pies.opus`);
        await playAudio(this.client, channel, files);
        await leaveChannel(this.client, channel);
    }

    private async playPopeHour(channel: VoiceChannel){
        let files = [__dirname  + `/audio/Barka.opus`];
        await playAudio(this.client, channel, files);
        await leaveChannel(this.client, channel);
    }

    public async clock(){
        let hour = new Date().getHours();
        let analogHour = hour % 12;
        if(analogHour == 0)
            analogHour = 12;
        for(let guild of await getGuilds(this.client)){
            for(let channel of await getAudioChannels(this.client, guild)){
                if(channel.members.size == 0)
                    continue;
                this.playClock(channel, hour, analogHour);
            }
        }
    }

    public async popeHour(){
        for(let guild of await getGuilds(this.client)){
            for(let channel of await getAudioChannels(this.client, guild)){
                if(channel.members.size == 0)
                    continue;
                this.playPopeHour(channel);
            }
        }
    }
}

export { Actions };