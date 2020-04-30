import { Message, MessageEmbed } from "discord.js";
import PankyBot from "../../src/bot";

function numberWithCommas(num: string) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default {
  desc: 'Look at all the items.',
  name: 'shop',
  args: '',
  type: 'economy',
  run: (message: Message, _args: string[], client: PankyBot) => {
    
    const embed = new MessageEmbed();

    const { user } = client;

    if (!user) return;

    embed.setTitle('**Welcome to the clown shop**')
      .setDescription(`Redeem with \`@Solid redeem #\``)
      .setColor(16775168)
      .setAuthor(user.username, user.avatarURL() || "")
      .setThumbnail(user.avatarURL() || "")
      .setFooter(':)))))))')
      .setTimestamp(new Date());

    for(const [k, item] of client.shopItems) {
      embed.addField(`**[${k}] ${item.name} : ${numberWithCommas(item.price)} clownbucks**`, `${item.desc}`);
    }
   
    message.channel.send({ embed });

    return;
  }
}