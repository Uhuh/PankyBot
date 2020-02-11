import { Message } from "discord.js";

export default {
  desc: 'Make a colored role based on a hexcode.',
  name: 'color',
  args: '<hex code>',
  run: (message: Message, args: string[]) => {

    if (!args.length) return message.delete();
    
    const RegExp = /^#[0-9A-Fa-f]{6}$/i;
    const { guild, channel, member } = message;
    const color = args[0];

    if (!guild || !channel || !member) return console.log("color error");

    message.delete();

    const role = guild.roles.find(r => r.name.toLowerCase() === color.toLowerCase());

    if(!RegExp.test(color)) {
      return channel.send("You need to match this format: `#012345` with the # and 6 letters/numbers.").then(m => setTimeout(() => m.delete(), 5000));
    } else if(role) {
      return member.roles.add(role);
    }

    guild.roles.create({
      data: {
        name: color.toLowerCase(),
        color: color.toLowerCase()
      }
    }).then(r => member.roles.add(r))
      .catch(console.error)

    return;
  }
}
