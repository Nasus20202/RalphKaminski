import { Client } from "discord.js";
import { Actions } from './actions';

const schedule = require('node-schedule');

class Schedule {
    client: Client;
    actions: Actions;
    constructor(client: Client){
        this.client = client;
        this.actions = new Actions(client);
        schedule.scheduleJob('* * * * * *', () => {
            this.actions.clock();
        });
        let rule = new schedule.RecurrenceRule();
        rule.hour = 21;
        rule.minute = 37;
        rule.tz = 'Europe/Warsaw';
        schedule.scheduleJob(rule, () => {
            this.actions.popeHour();
        });
    }
}

export { Schedule };