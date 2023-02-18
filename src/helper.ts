import { joinVoiceChannel, createAudioPlayer, createAudioResource } from "@discordjs/voice";
import { Client, ChannelType, Guild, VoiceChannel, GuildMember } from "discord.js";

async function getGuilds(client: Client): Promise<Guild[]> {
    let guilds = [];
    for (let OAuth2Guild of await client.guilds.fetch()) {
        if (OAuth2Guild == null || OAuth2Guild[1] == null)
            continue;
        let guild = await OAuth2Guild[1].fetch();
        if (guild == null)
            continue;
        guilds.push(guild);
    }
    return guilds;
}

async function getAudioChannels(guild: Guild): Promise<VoiceChannel[]> {
    let channels = [];
    for (let channel of await guild.channels.fetch()) {
        if (channel == null || channel[1] == null)
            continue;
        if (channel[1].type == ChannelType.GuildVoice) {
            channels.push(channel[1]);
        }
    }
    return channels;
}

async function getMembers(channel: VoiceChannel): Promise<GuildMember[]> {
    let members = [];
    for (let member of channel.members) {
        if (member == null || member[1] == null)
            continue;
        if (member[1].user.bot)
            continue;
        members.push(member[1]);
    }
    return members;
}

async function playAudio(client: Client, channel: VoiceChannel, audio: string) {
    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });
    const player = createAudioPlayer();
    connection.subscribe(player);
    const resource = await createAudioResource(audio);
    while (player.state.status != "idle") {
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    player.play(resource);
    while (player.state.status != "idle") {
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

async function leaveChannel(client: Client, channel: VoiceChannel) {
    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });
    connection.destroy();
}

export { getGuilds, getAudioChannels, getMembers, playAudio, leaveChannel };
