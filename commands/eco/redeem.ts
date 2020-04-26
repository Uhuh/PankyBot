import { Message } from "discord.js";
import { SET_SCORE, GET_SCORE } from "../../src/setup_tables";
import PankyBot from "../../src/bot";

export default {
  desc: 'Redeem your points.',
  name: 'redeem',
  args: '<shop number>',
  run: (message: Message, args: string[], client: PankyBot) => {
    if(!message.guild) return;
    const G_ID = message.guild.id;
    if(!args) return;
    const itemNum = Number(args[0]);
    if(Number.isNaN(itemNum) || (itemNum < 0 || itemNum > client.shopItems.size)) {
      return;
    }
    let user_score = GET_SCORE.get(message.author.id, G_ID);

    if(!user_score) {
      return message.reply(`you have 0 clownbucks. :(`)
    }

    const item = client.shopItems.get(String(itemNum));
    
    if(user_score.points < item.price) {
      message.reply(`${item.CNA}`);
    } else {
      user_score.points -= item.price;
      message.reply(`${item.bought} <@125492204234997761>`);
      SET_SCORE.run(user_score);
    }

    return;
  }
}