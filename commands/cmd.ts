import avatar from './help/avatar';
import botStatus from './help/botstatus';
import commands from './help/commands';
import dog from './help/dog';
import getActivity from './help/getActivity';
import getName from './help/getName';
import setName from './help/setName';
import source from './help/source';
import status from './help/status';
import userInfo from './help/userinfo';
import ban from './mod/ban';
import kick from './mod/kick';
import lock from './mod/lock';
import prefix from './mod/prefix';
import purge from './mod/purge';

const commandsMap = new Map();
const list = [dog, source, getName, setName, getActivity, kick, purge, commands, ban, status, botStatus, lock, prefix, userInfo, avatar];

// Each command might have an alias to make it less tedious to type the command out.
for (const i of list) {
  for (const j of i.alias) {
    commandsMap.set(j, i);
  }
}

export default commandsMap;
