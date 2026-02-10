// server/server.ts
import express from 'express'

export function createServer() {
  const app = express()
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' })
  })
  return app
}