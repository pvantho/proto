'use strict'

const createEatery = async (ctx) => {
  ctx.body =  {
    status: 'success',
    result: ctx.data
  }
}

module.exports = () => { return  createEatery ;}
