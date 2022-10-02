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
    console.log(Date.now(), message.message.createdTimestamp);
    console.log(Date.now() > message.message.createdTimestamp);
    await ping.edit({
      embeds: [
        this.embed
          .setFooter({
            text: `Shard ${message.guild.shardId} • Node ${
              process.argv.find(x => x.startsWith("--hostId"))?.split("_")?.[1]
            }`,
          })
          .setTitle(":ping_pong: Pong!")
          .setDescription(
            message.translate(
              "ping",
              (Date.now() - message.message.createdTimestamp).toString(),
              this.bot.client.ws.ping.toString()
            )
          ),
      ],
    });
  }
}

export default InviteCommand;
