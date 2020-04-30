import { Message } from "discord.js";
import { GET_SCORE, SET_SCORE } from "../../src/setup_tables";

export default {
  desc: 'Take points :)',
  name: 'take',
  args: '<amount> <user>',
  type: 'owner',
  run: (message: Message, args: string[]) => {
    if(!message.mentions.members || !message.guild) return;
    if(!args || args.length !== 2 || message.mentions.members.size !== 2) {
      return;
    }
    const G_ID = message.guild.id;

    const userToGive = message.mentions.members.last(); // Should be last one.
    if(!userToGive) return;
    const userToGiveScore = GET_SCORE.get(userToGive.id, G_ID);
    const amount = Number(args.shift());

    if(Number.isNaN(amount)) {
      return;
    }

    if(message.author.id === '125492204234997761') {
      userToGiveScore.points -= amount;
      message.reply(`you took ${amount} clownbucks from ${userToGive}`);
      SET_SCORE.run(userToGiveScore);
    }

    return;
  }
}