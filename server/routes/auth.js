const router = require('koa-router')()
const Article = require('../model/article')

router.get('/get/:id',async (ctx) => {
    const id = ctx.params.id
    const result = await Article.getUserById(id)
    ctx.response.body = result
})

module.exports = router