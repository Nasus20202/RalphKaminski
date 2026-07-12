import { describe, it, expect, vi } from "vitest";

vi.mock("discord.js", () => ({
  ActivityType: { Watching: 4 },
  Client: vi.fn(),
  VoiceChannel: vi.fn(),
}));

vi.mock("../helper", () => ({
  getGuilds: vi.fn(),
  getAudioChannels: vi.fn(),
  getMembers: vi.fn(),
  playAudio: vi.fn(),
  leaveChannel: vi.fn(),
}));

const { BarkActions, StatusActions } = await import("../actions");

describe("actions", () => {
  it("should export BarkActions", () => {
    expect(BarkActions).toBeDefined();
  });

  it("should export StatusActions", () => {
    expect(StatusActions).toBeDefined();
  });

  it("should create BarkActions instance", () => {
    const client = {};
    const instance = new BarkActions(client);
    expect(instance.client).toBe(client);
  });

  it("should create StatusActions instance", () => {
    const client = {};
    const instance = new StatusActions(client);
    expect(instance.client).toBe(client);
  });
});
