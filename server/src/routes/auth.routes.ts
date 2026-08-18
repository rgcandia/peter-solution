import { Router } from 'express'
import { login, me } from '../controllers/auth.controller.js'
import { verifyJwt } from '../middleware/auth.js'
import { authLimiter } from '../middleware/rateLimit.js'

const router = Router()

router.post('/login', authLimiter, login)
router.get('/me', verifyJwt, me)

export default router
