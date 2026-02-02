import schedule from "node-schedule";

interface IScheduleActions {
  clock(): Promise<void>;
}

class Schedule {
  actions: IScheduleActions;
  cron: string;

  constructor(actions: IScheduleActions, cron: string) {
    this.actions = actions;
    this.cron = cron;
  }

  start() {
    schedule.scheduleJob(this.cron, async () => {
      await this.actions.clock();
    });
  }
}

export { Schedule, IScheduleActions };
