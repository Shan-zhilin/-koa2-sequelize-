const auth = require('./auth')
const user = require('./user')
const router = require('koa-router')()

router.use(auth.routes())
router.use(user.routes())

module.exports = router