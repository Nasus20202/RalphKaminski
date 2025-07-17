# Ralph Kaminski

A Discord bot that plays hourly clock chimes in voice channels. Named after the Polish singer Ralph Kaminski, this bot joins voice channels and plays audio files every hour to announce the time.

## Features

- Automatically joins voice channels with active members
- Plays hourly clock chimes (12-hour format)
- Updates its activity status with "Hau" messages
- Runs on a scheduled basis using cron-like scheduling

## Prerequisites

- Node.js (v16 or higher)
- Discord Bot Token
- A Discord server where the bot has permissions to join voice channels

## Setup

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with your Discord bot token:

   ```
   TOKEN=your_discord_bot_token_here
   ```

4. Make sure the bot has the necessary permissions in your Discord server:
   - Connect to voice channels
   - Speak in voice channels
   - View channels

## Running the Bot

### Development

```bash
npm start
```

### Production (Docker)

```bash
docker-compose up -d
```

The bot will automatically connect to Discord and start its hourly schedule. It will play clock chimes in voice channels that have active members every hour.
