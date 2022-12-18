import { Bot, Command, CommandMessageArgs, CommandMessage } from "@eazyautodelete/core";

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

  async run(message: CommandMessage, args: CommandMessageArgs) {
    message.send(
      {
        ...this.embed,
        title: ":rotating_light: Status",
        description: message.translate(
          "status",
          "https://status.eazyautodelete.xyz/",
          "https://eazyautodelete.xyz/discord"
        ),
      },
      true,
      [
        {
          type: 1,
          components: [
            this.urlButton("https://status.eazyautodelete.xyz/", "Status Page", "🚨")[0].components[0],
            this.urlButton("https://eazyautodelete.xyz/discord", "Discord Server")[0].components[0],
            this.urlButton("https://eazyautodelete.xyz/invite", "Invite")[0].components[0],
          ],
        },
      ]
    );
  }
}

export default InviteCommand;
