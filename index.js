const {
  isValidEventName,
  isValidFunction,
  isValidHandlerList,
  isValidTimesToExecute
} = require('./util')

class EventHandler {
  constructor(handler, timesToExecute) {
    this.handler = handler
    this.timesToExecute = timesToExecute
    this.timesExecuted = 0
  }
}

class EventCenter {
  constructor() {
    this.events = {}
  }
  on(eventName, handler, timesToExecute) {
    if (!isValidEventName(eventName)) {
      return
    }
    if (!isValidFunction(handler)) {
      return
    }
    if (!isValidHandlerList(this.events[eventName])) {
      this.events[eventName] = []
    }
    if (!isValidTimesToExecute(timesToExecute)) {
      return
    }
    this.events[eventName].push(new EventHandler(handler, timesToExecute))
  }
  emit(eventName, params) {
    if (!isValidEventName(eventName)) {
      return
    }
    if (!isValidHandlerList(this.events[eventName])) {
      return
    }
    this.events[eventName].forEach(eventHandler => {
      const {handler, timesToExecute, timesExecuted} = eventHandler;
      if (!isValidFunction(handler)) {
        return;
      }
      if (isValidTimesToExecute(timesToExecute) && (typeof timesToExecute === 'number') && (timesToExecute <= timesExecuted)) {
        return;
      }
      eventHandler.timesExecuted = timesExecuted + 1
      handler(params)
    })
  }
  off(eventName, handler) {
    if (!isValidEventName(eventName)) {
      return
    }
    if (!isValidFunction(handler)) {
      this.events[eventName] = null;
      return;
    }
    this.events[eventName] = this.events[eventName].filter(eventHandler => eventHandler.handler !== handler)
  }
}

module.exports = EventCenter