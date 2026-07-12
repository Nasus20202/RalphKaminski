import { describe, it, expect, vi } from "vitest";
import schedule from "node-schedule";
import { Schedule } from "../schedule";

vi.mock("node-schedule", () => ({
  default: {
    scheduleJob: vi.fn((_cron: string, callback: () => void) => {
      callback();
      return { cancel: vi.fn() };
    }),
  },
}));

describe("Schedule", () => {
  it("should create a Schedule with actions and cron", () => {
    const actions = { clock: vi.fn() };
    const schedule = new Schedule(actions, "0 * * * *");
    expect(schedule).toBeInstanceOf(Schedule);
    expect(schedule.cron).toBe("0 * * * *");
    expect(schedule.actions).toBe(actions);
  });

  it("should call actions.clock when start() is called", () => {
    const clock = vi.fn();
    const actions = { clock };
    const s = new Schedule(actions, "* * * * *");
    s.start();
    expect(clock).toHaveBeenCalledOnce();
  });

  it("should use the provided cron expression", () => {
    const actions = { clock: vi.fn() };
    const s = new Schedule(actions, "0 */2 * * *");
    s.start();
    expect(schedule.scheduleJob).toHaveBeenCalledWith(
      "0 */2 * * *",
      expect.any(Function),
    );
  });
});
