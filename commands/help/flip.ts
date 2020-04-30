import { Message } from "discord.js";

export default {
  desc: 'Flip a coin',
  name: 'flip',
  args: '',
  type: 'general',
  run: (message: Message) => {

    const side = Math.floor(Math.random() * 2) === 0 ? 'heads' : 'tails';
    
    message.channel.send(`The side is ${side}.`);

    return;
  }
}