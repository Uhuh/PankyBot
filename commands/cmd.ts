import ping from './ping'
import dog from './dog'
import source from './source'
import getName from './getName'
import setName from './setName'
import getActivity from './getActivity'
import kick from './kick'
import purge from './purge'
import commands from './commands'
import ban from './ban'
import status from './status'
import botStatus from './botstatus';

let commandsMap = new Map()
const list = [ping, dog, source, getName, setName, getActivity, kick, purge, commands, ban, status, botStatus]

// Each command might have an alias to make it less tedious to type the command out.
for (const i of list) {
  for (const j of i.alias) {
    commandsMap.set(j, i)
  }
}

export default commandsMap