import { Bot, Command, CommandArgs, CommandMessage } from "@eazyautodelete/core";
import { MessageButton } from "discord.js";

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

  async run(message: CommandMessage, args: CommandArgs) {
    message.send(
      this.embed
        .setTitle(message.translate("supportTitle"))
        .setDescription(
          message.translate("support", "https://eazyautodelete.xyz/invite", "https://docs.eazyautodelete.xyz")
        ),
      true,
      this.urlButton("https://eazyautodelete.xyz/discord", "Support", "❓").addComponents(
        this.urlButton("https://docs.eazyautodelete.xyz/", "Documentation", "📖").components[0]
      )
    );
  }
}

export default InviteCommand;
