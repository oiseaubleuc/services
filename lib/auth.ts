import bcrypt from 'bcryptjs'
import db from './db'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function createAdminUser(username: string, password: string) {
  const passwordHash = await hashPassword(password)
  try {
    db.prepare(`
      INSERT INTO dashboard_users (username, password_hash)
      VALUES (?, ?)
    `).run(username, passwordHash)
    return true
  } catch (error) {
    console.error('Error creating admin user:', error)
    return false
  }
}

export async function verifyUser(username: string, password: string): Promise<boolean> {
  const user = db.prepare(`
    SELECT password_hash FROM dashboard_users WHERE username = ?
  `).get(username) as { password_hash: string } | undefined

  if (!user) {
    return false
  }

  return verifyPassword(password, user.password_hash)
}
