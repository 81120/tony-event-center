exports.isValidEventName = eventName => eventName && (typeof eventName === 'string')
exports.isValidFunction = handler => handler && (typeof handler === 'function')
exports.isValidHandlerList = handlerList => handlerList && ([] instanceof Array)
exports.isValidTimesToExecute = times => (typeof times === 'number' && times > 0) || (typeof times !== 'number')