import * as fs from 'fs'
import PankyBot from '../src/bot';

export default function (client: PankyBot) {
  const helpCmds: string[] = []
  const modCmds: string[] = []
  const ecoCmds: string[] = []
  fs.readdirSync('commands/help').forEach(file => helpCmds.push(file.slice(0, -3)));
  fs.readdirSync('commands/mod').forEach(file => modCmds.push(file.slice(0, -3)));
  fs.readdirSync('commands/eco').forEach(file => ecoCmds.push(file.slice(0, -3)));

  for (const file of helpCmds) {
    const command = require(`./help/${file}`)
    client.commands.set(command.default.name, command.default)
  }
  for (const file of modCmds) {
    const command = require(`./mod/${file}`)
    client.commands.set(command.default.name, command.default)
  }
  for (const file of ecoCmds) {
    const command = require(`./eco/${file}`)
    client.commands.set(command.default.name, command.default)
  }
}
