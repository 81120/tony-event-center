const EventCenter = require('./index')

const myEventCenter = new EventCenter()
myEventCenter.on('start', params => {
  console.log('start', params)
}, 10)
myEventCenter.on('start', () => {
  console.log('second')
})
const testHandlerForOff = () => {console.log('for off')}
myEventCenter.on('start', testHandlerForOff)
myEventCenter.emit('start', {name: 'leo'})
myEventCenter.off('start', testHandlerForOff)
myEventCenter.emit('start', {name: 'leo'})
myEventCenter.off('start')
myEventCenter.emit('start')