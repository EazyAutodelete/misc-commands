import { Bot, Command, CommandMessageArgs, CommandMessage } from "@eazyautodelete/core";

class InviteCommand extends Command {
  constructor(bot: Bot) {
    super(bot);
    this.name = "support";
    this.description = "Get support for the bot";
    this.cooldown = 0;
    this.permissionLevel = "user";
    this.examples = ["support"];
    this.usage = "invite";
    this.aliases = [
      "supportserver",
      "support-server",
      "support_server",
      "duscord",
      "discord",
      "discordserver",
      "discord-server",
      "discord_server",
      "dcserver",
      "dc-server",
      "dc_server",
      "dclink",
      "dc-link",
      "dc_link",
      "dcinvite",
      "dc-invite",
      "dc_invite",
      "discordlink",
      "discord-link",
      "discord_link",
      "discordinvite",
      "discord-invite",
      "discord_invite",
      "discord.gg",
      "discordgg",
      "discord-gg",
      "discord_gg",
    ];
  }

  async run(message: CommandMessage, args: CommandMessageArgs) {
    message.send(
      {
        ...this.embed,
        title: message.translate("supportTitle"),
        description: message.translate(
          "support",
          "https://eazyautodelete.xyz/invite",
          "https://docs.eazyautodelete.xyz"
        ),
      },
      true,
      [
        {
          type: 1,
          components: [
            this.urlButton("https://eazyautodelete.xyz/discord", "Support", "❓")[0].components[0],
            this.urlButton("https://docs.eazyautodelete.xyz/", "Documentation", "📖")[0].components[0],
          ],
        },
      ]
    );
  }
}

export default InviteCommand;
