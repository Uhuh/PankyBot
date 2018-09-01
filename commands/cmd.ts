import dog from './help/dog'
import source from './help/source'
import getName from './help/getName'
import setName from './help/setName'
import getActivity from './help/getActivity'
import kick from './mod/kick'
import purge from './mod/purge'
import commands from './help/commands'
import ban from './mod/ban'
import status from './help/status'
import botStatus from './help/botstatus'
import lock from './mod/lock'
import prefix from './mod/prefix'

let commandsMap = new Map()
const list = [dog, source, getName, setName, getActivity, kick, purge, commands, ban, status, botStatus, lock, prefix]

// Each command might have an alias to make it less tedious to type the command out.
for (const i of list) {
  for (const j of i.alias) {
    commandsMap.set(j, i)
  }
}

export default commandsMap