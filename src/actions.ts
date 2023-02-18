import { Client } from "discord.js";

class Actions {
    client: Client;
    constructor(client: Client){
        this.client = client;
    }

    private getGuilds(){
        return this.client.guilds.cache;
    }

    public async clock(){
        let hour = new Date().getHours();
        let analogHour = hour % 12;
        if(analogHour == 0)
            analogHour = 12;
        console.log(analogHour);
    }

    public async popeHour(){
        console.log("It's Pope Hour!");
    }
}

export { Actions };