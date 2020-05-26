'use strict'

const { v4: uuidv4 } = require('uuid')

const UuidHook = exports = module.exports = {}

UuidHook.id = async (modelInstance) => {
  modelInstance.id = await uuidv4()
}