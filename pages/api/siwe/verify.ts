import { NextApiRequest, NextApiResponse } from 'next'
import { SiweMessage } from 'siwe'

import { env } from '@/env.mjs'
import { prisma } from '@/lib/prisma'

import { withSessionRoute } from '../../../lib/server'
const DATABASE_URL = env.DATABASE_URL
const ADMINS = env.APP_ADMINS?.split(',') || []

export default withSessionRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { message, signature } = req.body
      const siweMessage = new SiweMessage(message)
      const fields = await siweMessage.validate(signature)
      if (fields.nonce !== req.session.nonce) return res.status(422).json({ message: 'Invalid nonce.' })
      req.session.siwe = fields

      if (ADMINS.includes(fields.address)) {
        req.session.isAdmin = true
      }
      await req.session.save()
      // Minimal feature flag.
      // TODO: Add a proper feature flagging system.
      if (DATABASE_URL) {
        await prisma.user.upsert({
          where: { id: fields.address },
          update: {
            address: fields.address,
          },
          create: {
            id: fields.address,
            address: fields.address,
          },
        })
      }
      return res.json({ ok: true })
    } catch (ex) {
      console.error(ex)
      return res.json({ ok: false })
    }
  }

  res.setHeader('Allow', ['POST'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
})
