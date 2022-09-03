import { getSession } from 'next-auth/react'
import { NextApiRequest, NextApiResponse } from 'next'

/**
 * Grab the authenticated user and return if it doesn't exist.
 *
 * @param req - Request coming from API
 * @param res - API response if user is not authenticated
 * @returns {NextApiResponse | User }
 */
export async function getUserSession(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (!session?.user) return res.status(401).json({ error: true, message: 'Unauthenticated' })

  return session.user
}
