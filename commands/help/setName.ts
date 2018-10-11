import { Message } from "discord.js";
import PankyBot from "../../src/bot";

export default {
  desc: 'Sets the name of a user to make it easier to know who they are.',
  common: 'setname',
  args: '<user mention> <name>',
  alias: ['setname', 'set', 'sn'],
  run: async function (message: Message, args: string[], client: PankyBot) {
    let user;
    let name: string = "";
    if (!args) { return; }
    args.shift();
    args.forEach(i => {
      name += i + " ";
    });
    if (message.guild) {
      user = { id: `${message.guild.id}-${message.mentions.members.first().user.id}`,
               user: message.mentions.members.first().user.id,
               guild: message.guild.id,
               note: name
      };
      client.setUser.run(user);
    }
    const nick: string = message.mentions.members.first().nickname || message.mentions.members.first().user.username;
  }
};
