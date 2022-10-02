import { Bot, Command, CommandArgs, CommandMessage } from "@eazyautodelete/core";
import { Cipher } from "crypto";
import { ApplicationCommandOptionChoiceData, MessageActionRow } from "discord.js";

class HelpCommand extends Command {
  constructor(bot: Bot) {
    super(bot);
    this.name = "help";
    this.description = "Shows the help menu";
    this.usage = "help [command]";
    this.examples = ["help", "help /ping", "help /help", "help /setup"];
    this.aliases = ["h", "halp", "commands", "hilfe", "frage", "question"];
    this.cooldown = 0;
    this.permissionLevel = "user";
    this.options = [
      {
        name: "command",
        type: 3,
        description: "The command you want to get help for",
        required: false,
      },
    ];
  }

  async run(message: CommandMessage, args: CommandArgs): Promise<void> {
    const commandName = args.consume("command");

    if (!commandName) {
      const helpEmbed = this.embed
        .setDescription(
          message.translate("overview") +
            "\n\n" +
            this.bot.commands
              .filter((c: Command) => c.permissionLevel != "botMod" && c.permissionLevel != "botAdmin")
              .map((x: Command) => `**/${x.name}**:\n\\↪ ${x.description}`)
              .join("\n\n")
        )
        .setTitle("**EazyAutodelete:** Help");

      const helpButtons = new MessageActionRow().addComponents([
        this.urlButton("https://eazyautodelete.xyz/discord", "Support Server", "<:discord:985860686963937320>")
          .components[0],
        this.urlButton("https://eazyautodelete.xyz", "Website", "🌐").components[0],
        this.urlButton("https://status.eazyautodelete.xyz", "Status Page", "📣").components[0],
        this.urlButton("https://docs.eazyautodelete.xyz", "Documentation", "📖").components[0],
      ]);

      await message.send(helpEmbed, true, helpButtons);
      return;
    } else if (commandName) {
      const command = this.bot.commands.get(commandName);
      if (!command) {
        message.error("error.commandNotFound");
        return;
      }

      const cmdHelpEmbed = this.embed
        .setTitle("Command: **/" + command.name + "**")
        .setDescription(command.description)
        .addFields([
          {
            name: "**" + message.translate("usage") + "**",
            value: "```\n/" + command.usage + "```",
            inline: false,
          },
          {
            name: "**" + message.translate("example") + "**",
            value: "```\n" + command.examples.map((x: string) => `/${x}`).join("\n") + "```",
            inline: false,
          },
        ]);

      await message.send(cmdHelpEmbed, true);
      return;
    }
  }

  async autocompleteHandler(query: string) {
    const queries: ApplicationCommandOptionChoiceData[] = [];
    const commands = this.bot.commands;

    commands
      .filter((c: Command) => c.permissionLevel != "botMod" && c.permissionLevel != "botAdmin")
      .forEach((command: Command) => {
        if (command.name.includes(query))
          queries.push({
            name: ("/" + command.name + " - " + command.description).substring(0, 100),
            value: command.name,
          });
        else {
          command.aliases.forEach(alias => {
            if (alias.includes(query)) {
              queries.find(q => q.name.startsWith("/" + command.name)) ||
                queries.push({
                  name: ("/" + command.name + " - " + command.description).substring(0, 100),
                  value: command.name,
                });
            }
          });
        }
      });
    return queries;
  }
}

export default HelpCommand;
