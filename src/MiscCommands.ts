import { Bot, Module } from "@eazyautodelete/core";

class MiscCommands extends Module {
  constructor(bot: Bot) {
    super(bot);
    this.name = "misc-commands";
  }

  clientReady() {
    this.logger.info("[💬] MiscCommands module loaded!");
  }
}

export default MiscCommands;
