import { Client } from "discord.js";

class Actions {
    client: Client;
    constructor(client: Client){
        this.client = client;
    }

    clock(){
        console.log(new Date());
    }

    popeHour(){
        console.log("It's Pope Hour!");
    }
}

export { Actions };