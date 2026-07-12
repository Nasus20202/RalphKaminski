import { describe, it, expect, vi } from "vitest";

vi.mock("@discordjs/voice", () => ({
  joinVoiceChannel: vi.fn(),
  createAudioPlayer: vi.fn(() => ({
    state: { status: "Idle" },
    play: vi.fn(),
    subscribe: vi.fn(),
  })),
  createAudioResource: vi.fn(),
  AudioPlayerStatus: { Idle: "Idle", Playing: "Playing" },
}));

vi.mock("discord.js", () => ({
  ChannelType: { GuildVoice: 2 },
  Client: vi.fn(),
  VoiceChannel: vi.fn(),
  Guild: vi.fn(),
  GuildMember: vi.fn(),
}));

const { getGuilds, getAudioChannels, getMembers, playAudio, leaveChannel } =
  await import("../helper");

describe("helper", () => {
  it("should export all expected functions", () => {
    expect(getGuilds).toBeDefined();
    expect(getAudioChannels).toBeDefined();
    expect(getMembers).toBeDefined();
    expect(playAudio).toBeDefined();
    expect(leaveChannel).toBeDefined();
  });

  it("should have getGuilds that returns a promise", async () => {
    await expect(getGuilds({} as never)).rejects.toThrow();
  });
});
