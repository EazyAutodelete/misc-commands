import { Bot, Command, CommandMessageArgs, CommandMessage } from "@eazyautodelete/core";

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

  async run(message: CommandMessage, args: CommandMessageArgs) {
    message.send(
      {
        ...this.embed,
        title: ":link: Invite",
        description:
          message.translate("invite", "https://eazyautodelete.xyz/invite") +
          `\n\n` +
          message.translate("vote") +
          `\n` +
          `[Top.GG](https://top.gg/bot/746453621821931634)` +
          ` • ` +
          `[DiscordBotList.com](https://discordbotlist.com/bots/eazyautodelete)` +
          ` • ` +
          `[DiscordList.gg](https://discordlist.gg/bot/746453621821931634)` +
          ` • ` +
          `[Discords.com](https://discords.com/bots/bot/746453621821931634)`,
      },
      true,
      [
        {
          type: 1,
          components: [
            this.urlButton("https://eazyautodelete.xyz/invite", "Invite")[0].components[0],
            this.urlButton("https://eazyautodelete.xyz/discord", "Support", "❓")[0].components[0],
          ],
        },
      ]
    );
  }
}

export default InviteCommand;
