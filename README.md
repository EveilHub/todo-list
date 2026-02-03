# todo-list

todo list especialy for graph & design

- Fullstack todo

## Install

`git clone <https...>`

`cd vite-project`

`pnpm install`

`cd server` (vite-project/server)

`pnpm install`

# Run frontend

- dev

`pnpm dev`

- prod

`pnpm build`

`pnpm preview`

## Run backend

`cd server` (vite-project/server)

- dev

`pnpm dev`

- prod

`pnpm build`

`pnpm start`

## Goals

1) indicator de la semaine actuelle [x]
2) appliquer les delay plutôt que les dates [x] 
3) changer les dates du calendrier []

4) Check day et priority à entrer dans la DB []

5) Volet pour client email phone [1/2]
6) En-têtes à mettre au-dessus des tâches [1/2]
7) Display which day for todo []
8) Use eslint [x]
9) Testing entire app []


## Lib

- Front

---

- Server

`pnpm add -D vitest ts-node @types/node`

`pnpm add express`

`pnpm add -D @types/express`


## Testing

### Frontend

`pnpm lint`

`pnpm add -D vitest @testing-library/react @testing-library/jest-dom jsdom typescript ts-node`

- vite.config.ts

```
/// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,          // permet d'utiliser describe, it, expect globalement
    environment: 'jsdom',   // simule un navigateur
    setupFiles: './src/setupTests.ts',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    include: ['src/**/*.{test,spec}.{ts,tsx}'], // inclure tous les tests TS/TSX
  },
});
```

- src/setupTests.ts

`import '@testing-library/jest-dom';`

- package.json

```
"scripts": {
  "test": "vitest",
  "test:ui": "vitest --ui"
}
```

`pnpm run test` (console)

`pnpm run test:ui` (graphic interface)

### Backend

`pnpm add -D vitest ts-node`

`pnpm add -D supertest @types/supertest`


- vite.config.ts

```
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,           // permet d'utiliser describe, it, expect globalement
    environment: "node",     // très important pour le backend
    include: ["server/**/*.test.ts"], // chemins vers les tests
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
});
```

- package.json

```
"scripts": {
  "test:server": "vitest"
}
```

`pnpm run test:server`

:koala: