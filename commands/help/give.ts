import { Message } from "discord.js";
import { GET_SCORE, SET_SCORE } from "../../src/setup_tables";

export default {
  desc: 'Give counting points to someone',
  name: 'give',
  args: '<amount> <user>',
  run: (message: Message, args: string[]) => {
    if(!message.mentions.members || !message.guild) return;
    if(!args || args.length !== 2 || message.mentions.members.size !== 2) {
      return;
    }
    const G_ID = message.guild.id;

    const user_score = GET_SCORE.get(message.author.id, G_ID);
    const userToGive = message.mentions.members.last(); // Should be last one.
    if(!userToGive) return;
    const userToGiveScore = GET_SCORE.get(userToGive.id, G_ID);
    const amount = Number(args.shift());

    if(Number.isNaN(amount)) {
      return;
    }

    if(amount < 0) {
      return message.reply(`you can't give debt to people.`);
    }

    if(message.author.id === '125492204234997761') {
      userToGiveScore.points += amount;
      message.reply(`you gave ${amount} counting points to ${userToGive}`);
      SET_SCORE.run(userToGiveScore);
    } else if(user_score.points < amount) {
      message.reply(`you're too poor to give ${amount} counting points away.`);
    } else {
      user_score.points -= amount;
      userToGiveScore.points += amount;
      message.reply(`you gave ${amount} counting points to ${userToGive}`);
      SET_SCORE.run(user_score);
      SET_SCORE.run(userToGiveScore);
    }

    return;
  }
}