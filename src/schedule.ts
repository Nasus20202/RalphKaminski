import { Client } from "discord.js";
import { Actions } from './actions';

const schedule = require('node-schedule');

class Schedule {
    client: Client;
    actions: Actions;
    constructor(client: Client) {
        this.client = client;
        this.actions = new Actions(client);
        schedule.scheduleJob('0 * * * *', async () => {
            await this.actions.clock();
        });
    }
}

export { Schedule };