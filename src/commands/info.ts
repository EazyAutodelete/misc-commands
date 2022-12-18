import { Command, Bot, CommandMessage, CommandMessageArgs } from "@eazyautodelete/core";
import { msToDate, msToDuration } from "@eazyautodelete/bot-utils";
import { ActionRow, Embed } from "eris";

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

  async run(message: CommandMessage, args: CommandMessageArgs): Promise<void> {
    const infoEmbed: Embed = {
      ...this.embed,
      title: this.bot.client.user?.username + " Information",
      description: message.translate("botinfo"),
      footer: {
        text: this.bot.client.user?.username + " | Cluster #" + this.bot.cluster.id + " Shard #" + this.bot.shardId,
        icon_url: this.bot.client.user?.avatarURL,
      },
    };

    infoEmbed.fields = [
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
        value: "```" + this.client.guilds.size + "```",
        inline: true,
      },
      {
        name: ":busts_in_silhouette: Members",
        value: "```" + this.client.guilds.map(g => g.memberCount).reduce((a: number, b: number) => a + b, 0) + "```",
        inline: true,
      },
      {
        name: "<:channel:1026072967794413580> Channels",
        value: "```" + Object.keys(this.client.channelGuildMap).length + "```",
        inline: true,
      },
      {
        name: ":computer: Shards",
        value: `\`\`\`\nOn this cluster: ${this.client.shards.size}   Online: ${
          this.client.shards.filter(x => x.status === "ready" || x.status === "resuming").length
        }   Offline: ${
          this.client.shards.size -
          this.client.shards.filter(x => x.status === "ready" || x.status === "resuming").length
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
        value: "```" + this.bot.shard?.latency + " ms```",
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
          "[Icons Server](https://discord.gg/aPvvhefmt3) | [Google Fonts](https://fonts.google.com/icons) | [Discord](https://discord.com/) | [Weblate](https://weblate.org/) | [Gitbook](https://gitbook.com/) | [Directus](https://directus.io/) | [Eris](https://abal.moe/Eris)",
        inline: false,
      },
    ];

    const infoButtons: ActionRow[] = [
      {
        type: 1,
        components: [
          this.urlButton("Invite", "https://eazyautodelete.xyz/invite", "🔗")[0].components[0],
          this.urlButton("Website", "https://eazyautodelete.xyz", "🌐")[0].components[0],
          this.urlButton("Status Page", "https://status.eazyautodelete.xyz", "📣")[0].components[0],
          this.urlButton("Documentation", "https://docs.eazyautodelete.xyz", "📖")[0].components[0],
        ],
      },
    ];

    await message.send(infoEmbed, true, infoButtons);

    return;
  }
}

export default InfoCommand;
