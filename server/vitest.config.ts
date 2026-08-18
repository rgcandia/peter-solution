import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    env: {
      NODE_ENV: 'test',
      DATABASE_URL: 'postgresql://test:test@localhost:5432/test',
      JWT_SECRET: 'test-secret-con-mas-de-16-caracteres',
      JWT_EXPIRES_IN: '1h',
      CORS_ORIGINS: 'http://localhost:5173',
      ADMIN_USER: 'admin',
      ADMIN_PASSWORD: 'admin123',
      LOG_LEVEL: 'silent',
    },
  },
})
