import { Message } from 'discord.js';
import { SET_OPT, GET_OPT } from '../../src/setup_tables';

export default {
  desc: 'Get reports on how much you talk.',
  name: 'report',
  args: '',
  type: 'general',
  run: async function (message: Message, args: string[]) {
    message.channel.send(`This is sad`);
    const flags = ['from', 'opt-in', 'opt-out'];
    const user_id = message.author.id;
    // const user = message.mentions.users.last();
    let type = '';
    const OPTED = GET_OPT(user_id) === '1';

    while (args.length) {
      if (args.length && flags.includes(args[0])) {
        type = args.shift() as string;
        break;
      }
      args.shift();
    }

    if (type === 'opt-in' && !OPTED) {
      SET_OPT(user_id, 1);
      message.reply(
        `congrats you opted in. I'll start tracking how many messages you send from now on.`
      );
    }

    return;
  },
};
