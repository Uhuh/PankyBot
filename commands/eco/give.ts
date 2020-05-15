import { Message } from "discord.js";
import { SET_SCORE } from "../../src/setup_tables";
import PankyBot from "../../src/bot";

export default {
  desc: 'Give counting points to someone',
  name: 'give',
  args: '<amount> <user>',
  type: 'economy',
  run: (message: Message, args: string[], client: PankyBot) => {
    if(!message.mentions.members || !message.guild) return;
    if(!args || args.length !== 2 || message.mentions.members.size !== 2) {
      return;
    }
    const G_ID = message.guild.id;

    const user_score = client.getUserScore(message.author.id, G_ID);
    const userToGive = message.mentions.members.last(); // Should be last one.
    if(!userToGive) return;
    if(userToGive.id === message.author.id) {
      return message.reply(`you can't give points to yourself.`);
    }
    const userToGiveScore = client.getUserScore(userToGive.id, G_ID);
    const amount = Math.floor(Number(args.shift()));

    if(Number.isNaN(amount) || amount === 0) {
      return;
    }

    if(amount < 0) {
      return message.reply(`you can't give debt to people.`);
    }

    if(message.author.id === '125492204234997761') {
      userToGiveScore.points += amount;
      message.reply(`you gave ${amount} clownbucks to ${userToGive}`);
      SET_SCORE.run(userToGiveScore);
    } else if(user_score.points < amount) {
      message.reply(`you're too poor to give ${amount} clownbucks away.`);
    } else {
      user_score.points -= amount;
      userToGiveScore.points += amount;
      message.reply(`you gave ${amount} clownbucks to ${userToGive}`);
      SET_SCORE.run(user_score);
      SET_SCORE.run(userToGiveScore);
    }

    return;
  }
}