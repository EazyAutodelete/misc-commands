import { Bot, Command, CommandArgs, CommandMessage } from "@eazyautodelete/core";

class InviteCommand extends Command {
  constructor(bot: Bot) {
    super(bot);
    this.name = "status";
    this.description = "Get the status of the bot";
    this.cooldown = 1e4;
    this.permissionLevel = "user";
    this.examples = ["status"];
    this.usage = "status";
  }

  async run(message: CommandMessage, args: CommandArgs) {
    message.send(
      this.embed
        .setTitle(":rotating_light: Status")
        .setDescription(
          message.translate("status", "https://status.eazyautodelete.xyz/", "https://eazyautodelete.xyz/discord")
        ),
      true,
      this.urlButton("https://status.eazyautodelete.xyz/", "Status Page", "🚨").addComponents(
        this.urlButton("https://eazyautodelete.xyz/discord", "Discord Server").components[0],
        this.urlButton("https://eazyautodelete.xyz/invite", "Invite").components[0]
      )
    );
  }
}

export default InviteCommand;
