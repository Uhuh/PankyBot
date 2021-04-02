import { Message } from 'discord.js';
import { SET_SCORE } from '../../src/setup_tables';

export default {
  desc: 'yessiry',
  name: 'override',
  args: ':)',
  type: 'owner',
  run: (message: Message, args: string[]) => {
    if (!message.guild || message.author.id !== '289151449412141076') return;
    const score = {
      id: `${message.mentions.members?.last()?.id}-${message.guild.id}`,
      user: message.mentions.members?.last()?.id || '',
      guild: message.guild.id,
      points: Number(args[0]),
    };
    SET_SCORE(score, 'scores');
    return;
  },
};
