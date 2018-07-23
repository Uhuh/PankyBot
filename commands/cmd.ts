import ping from './ping'
import dog from './dog'

export default new Map<string, any>(
  [
    ['ping', ping],
    ['dog', dog],
  ]
)