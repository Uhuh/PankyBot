import { Message } from "discord.js";

export default {
  desc: 'Flip a coin',
  name: 'flip',
  args: '',
  run: (message: Message) => {

    const side = Math.floor(Math.random() * 2) === 0 ? 'head' : 'tail';
    
    message.channel.send(`The side is ${side}.`);

    return;
  }
}