import { Bot, Command, CommandArgs, CommandMessage } from "@eazyautodelete/core";
import { MessageButton } from "discord.js";

class InviteCommand extends Command {
  constructor(bot: Bot) {
    super(bot);
    this.name = "invite";
    this.description = "Get the invite link for the bot";
    this.cooldown = 0;
    this.permissionLevel = "user";
    this.examples = ["invite"];
    this.usage = "invite";
  }

  async run(message: CommandMessage, args: CommandArgs) {
    message.send(
      this.embed
        .setTitle(":link: Invite")
        .setDescription(message.translate("invite", "https://eazyautodelete.xyz/invite")),
      true,
      this.urlButton("https://eazyautodelete.xyz/invite", "Invite").addComponents(
        new MessageButton({
          label: "Support",
          type: "BUTTON",
          style: "LINK",
          emoji: "❓",
          url: "https://eazyautodelete.xyz/discord",
        })
      )
    );
  }
}

export default InviteCommand;
