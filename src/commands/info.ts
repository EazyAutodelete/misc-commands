import { Command, Bot, CommandMessage, CommandArgs } from "@eazyautodelete/core";
import { getReadyShards, shardsEval, msToDate, msToDuration } from "@eazyautodelete/bot-utils";
import { MessageActionRow, MessageButton } from "discord.js";

class InfoCommand extends Command {
  constructor(bot: Bot) {
    super(bot);
    this.name = "info";
    this.aliases = ["botinfo", "stats"];
    this.description = "Shows information about the bot";
    this.cooldown = 3e4;
    this.permissionLevel = "user";
    this.examples = ["info"];
    this.usage = "info";
  }

  async run(message: CommandMessage, args: CommandArgs): Promise<void> {
    const shardCount = parseInt(process.argv.find(a => a.startsWith("--shardcount"))?.split("_")[1] || "1");

    const readyShards = await getReadyShards(this.bot, shardCount);

    const guildCount = (
      await shardsEval(this.bot, readyShards, c => {
        return c.guilds.cache.size;
      })
    ).reduce((a: number, b: number) => a + b, 0);

    const memberCount = (
      await shardsEval(this.bot, readyShards, c => {
        return c.guilds.cache.reduce((a: any, b: any) => a + b.memberCount, 0);
      })
    ).reduce((a: number, b: number) => a + b, 0);

    const channelCount = (
      await shardsEval(this.bot, readyShards, c => {
        return c.channels.cache.size;
      })
    ).reduce((a: number, b: number) => a + b, 0);

    const infoEmbed = this.embed
      .setTitle(this.bot.client.user?.username + " Information")
      .setDescription(message.translate("botinfo"))
      .addFields(
        {
          name: ":alarm_clock: Online since",
          value: "```" + msToDate(new Date(Date.now() - this.bot.client.uptime!).getTime()).toString() + "```",
          inline: true,
        },
        {
          name: "<:memory:1026072466088542208> Memory Usage",
          value: "```" + (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + " MB```",
          inline: true,
        },
        {
          name: ":hourglass: Uptime",
          value: "```" + msToDuration(this.bot.client.uptime!).toString() + "```",
          inline: false,
        },
        {
          name: ":tools: Servers",
          value: "```" + guildCount + "```",
          inline: true,
        },
        {
          name: ":busts_in_silhouette: Members",
          value: "```" + memberCount + "```",
          inline: true,
        },
        {
          name: "<:channel:1026072967794413580> Channels",
          value: "```" + channelCount + "```",
          inline: true,
        },
        {
          name: ":computer: Shards",
          value: `\`\`\`\nTotal: ${shardCount}   Online: ${readyShards.length}   Offline: ${
            shardCount - readyShards.length
          }\`\`\``,
          inline: false,
        },
        {
          name: ":page_facing_up: Bot Version",
          value: `\`\`\`v${process.argv.find(x => x.startsWith("--botversion"))?.split("_")?.[1]}\`\`\``,
          inline: true,
        },
        {
          name: "<:nodejs:1026099632390017154> Node Version",
          value: "```" + process.version + "```",
          inline: true,
        },
        {
          name: ":ping_pong: Websocket Ping",
          value: "```" + this.bot.client.ws.ping + " ms```",
          inline: true,
        },
        {
          name: ":book: Documentation",
          value: "https://docs.eazyautodelete.xyz",
          inline: true,
        },
        {
          name: "<:invite:1026099994333298719> Invite",
          value: "https://eazyautodelete.xyz/invite",
          inline: true,
        },
        {
          name: "<:discord:1026099813898539059> Discord Server",
          value: "https://eazyautodelete.xyz/discord",
          inline: true,
        },
        {
          name: "Image Credits & Special Thanks",
          value:
            "[Icons Server](https://discord.gg/aPvvhefmt3) | [Google Fonts](https://fonts.google.com/icons) | [Discord](https://discord.com/) | [Weblate](https://weblate.org/) | [Gitbook](https://gitbook.com/) | [Directus](https://directus.io/) | [Discord.JS](https://discord.js.org/)",
          inline: false,
        }
      )
      .setFooter({
        text:
          this.bot.client.user?.username +
          " | Shard #" +
          process.argv.find(x => x.startsWith("--hostId"))?.split("_")?.[1] +
          "-" +
          this.bot.client.shard?.ids.toString(),
        iconURL: this.bot.client.user?.avatarURL() || undefined,
      });

    const infoButtons = new MessageActionRow().addComponents([
      new MessageButton()
        .setURL("https://eazyautodelete.xyz")
        .setLabel("Invite")
        .setEmoji("🔗")
        .setDisabled(false)
        .setStyle("LINK"),

      new MessageButton()
        .setURL("https://eazyautodelete.xyz")
        .setLabel("Website")
        .setEmoji("🌐")
        .setDisabled(false)
        .setStyle("LINK"),

      new MessageButton()
        .setURL("https://eazyautodelete.xyz")
        .setLabel("Status Page")
        .setEmoji("📣")
        .setDisabled(false)
        .setStyle("LINK"),

      new MessageButton()
        .setURL("https://eazyautodelete.xyz")
        .setLabel("Documentation")
        .setEmoji("📖")
        .setDisabled(false)
        .setStyle("LINK"),
    ]);

    await message.send(infoEmbed, true, infoButtons);

    return;
  }
}

export default InfoCommand;
