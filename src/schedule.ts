import { Actions } from "./actions";
import schedule from "node-schedule";

class Schedule {
  actions: Actions;
  cron: string;

  constructor(actions: Actions, cron: string = "0 * * * *") {
    this.actions = actions;
    this.cron = cron;
  }

  start() {
    schedule.scheduleJob(this.cron, async () => {
      await this.actions.clock();
    });
  }
}

export { Schedule };
