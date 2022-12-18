import { Bot, Command, CommandMessageArgs, CommandMessage } from "@eazyautodelete/core";

class InviteCommand extends Command {
  constructor(bot: Bot) {
    super(bot);
    this.name = "ping";
    this.description = "Get the bot's ping";
    this.cooldown = 1e4;
    this.permissionLevel = "user";
    this.examples = ["ping"];
    this.usage = "ping";
  }

  async run(message: CommandMessage, args: CommandMessageArgs) {
    const ping = await message.send({ ...this.embed, description: "Pinging..." }, true);
    await ping.edit({
      embeds: [
        {
          ...this.embed,
          footer: {
            text: `Shard #${this.bot.shardId} • Cluster #${this.bot.cluster.id}`,
          },
          title: ":ping_pong: Pong!",
          fields: [
            { name: ":satellite: API Latency", value: `${this.bot.shard?.latency}ms`, inline: true },
            {
              name: ":stopwatch: Bot Latency",
              value: `${Date.now() - message.interaction.createdAt}ms`,
              inline: true,
            },
            {
              name: ":hourglass_flowing_sand: Uptime",
              value: `<t:${Math.floor(this.bot.client.startTime / 1000)}:f> | <t:${Math.floor(
                this.bot.client.startTime / 1000
              )}:R>`,
              inline: false,
            },
          ],
        },
      ],
    });
  }
}

export default InviteCommand;
