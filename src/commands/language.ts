import { CommandArgs, Bot, Command, CommandMessage } from "@eazyautodelete/core";
import { ApplicationCommandAutocompleteOption, ApplicationCommandOptionChoiceData } from "discord.js";

class LanguageCommand extends Command {
  constructor(client: Bot) {
    super(client);
    this.name = "language";
    this.description = "Changes your language settings";

    this.examples = ["language english"];

    this.usage = "language [new_lang]";

    this.permissionLevel = "user";

    this.cooldown = 5e3;

    this.aliases = ["sprache", "speaking", "langauge"];

    this.options = [
      {
        type: 3,
        name: "new_language",
        description: "The language to set your language settings to",
        required: false,
        autocomplete: true,
      },
    ];
  }

  async run(message: CommandMessage, args: CommandArgs) {
    const language = args.consume("new_language");

    if (language) {
      if (!language || typeof language != "string" || !this.bot.Translator.getLocales().find(x => x === language)) {
        await message.error(
          "error.invalidLanguage",
          "↣ " +
            this.bot.Translator.getLocales()
              .map(x => `**${this.bot.Translator.getLanguageName(x)}** *(${x})*`)
              .join(",\n↣ ")
        );
        return;
      }

      const data = await this.bot.db.updateUserSettings(message.author.id, {
        lang: language,
      });

      message.data.user.language = data.language;

      const languageEditEmbed = this.embed
        .setTitle("**Language:** " + message.author.tag)
        .setDescription(message.translate("languageEdit", this.bot.Translator.getLanguageName(language)!))
        .setFooter({ text: message.translate("languageEditFooter"), iconURL: this.client.user?.displayAvatarURL() });

      return void (await message.send(
        languageEditEmbed,
        true,
        this.urlButton("https://eazyautodelete.xyz/translate", "Become a translator")
      ));
    } else {
      const languageShowEmbed = this.embed
        .setDescription(
          message.translate("languageShow", this.bot.Translator.getLanguageName(message.data.user.language)!)
        )
        .setTitle("**Language:** " + message.author.tag);

      await message.send(languageShowEmbed, true, this.docsButton("languages"));
      return;
    }
  }

  async autocompleteHandler(query: string) {
    return this.bot.Translator.getLocales()
      .map(x => {
        return { name: this.bot.Translator.getLanguageName(x) || x, value: x };
      })
      .filter(
        x => x.name.toLowerCase().includes(query.toLowerCase()) || x.value.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 25);
  }
}

export default LanguageCommand;
