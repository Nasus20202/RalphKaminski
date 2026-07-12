import { describe, it, expect } from "vitest";
import { existsSync, readdirSync } from "fs";
import { join } from "path";

describe("audio files", () => {
  const audioDir = join(__dirname, "..", "audio");

  it("should have all 12 clock audio files", () => {
    const files = readdirSync(audioDir);
    for (let i = 1; i <= 12; i++) {
      expect(files).toContain(`${i}.opus`);
    }
  });

  it("should not have extra audio files", () => {
    const files = readdirSync(audioDir);
    expect(files).toHaveLength(12);
  });

  it("should have readable opus files", () => {
    const files = readdirSync(audioDir);
    for (const file of files) {
      const filePath = join(audioDir, file);
      expect(existsSync(filePath)).toBe(true);
    }
  });
});
