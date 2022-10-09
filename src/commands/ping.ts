import { Bot, Command, CommandArgs, CommandMessage } from "@eazyautodelete/core";

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

  async run(message: CommandMessage, args: CommandArgs) {
    const ping = await message.send(this.embed.setDescription("Pinging..."), true);
    await ping.edit({
      embeds: [
        this.embed
          .setFooter({
            text: `Shard ${message.guild.shardId} • Node ${
              process.argv.find(x => x.startsWith("--hostId"))?.split("_")?.[1]
            }`,
          })
          .setTitle(":ping_pong: Pong!")
          .addFields(
            { name: ":satellite: API Latency", value: `${this.bot.client.ws.ping}ms`, inline: true },
            {
              name: ":stopwatch: Bot Latency",
              value: `${Date.now() - message.message.createdTimestamp}ms`,
              inline: true,
            },
            {
              name: ":hourglass_flowing_sand: Uptime",
              value: `<t:${Math.floor(this.bot.client.readyTimestamp! / 1000)}:f> | <t:${Math.floor(
                this.bot.client.readyTimestamp! / 1000
              )}:R>`,
              inline: false,
            }
          ),
      ],
    });
  }
}

export default InviteCommand;
