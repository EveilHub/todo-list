# todo-list

### Fullstack todo

- Task list specifically for graphic design and project design


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

---

## Testing (removed)

`pnpm test`

`pnpm test:ui`

`pnpm test:coverage`

---

## Lib

- Front

---

- Server

`pnpm add -D vitest ts-node @types/node`

`pnpm add express`

`pnpm add -D @types/express`


## Testing

------------------------------|---------|----------|---------|---------|-------------------
File                          | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------------------|---------|----------|---------|---------|-------------------
All files                     |     100 |      100 |     100 |     100 |                   
 server/src                   |     100 |      100 |     100 |     100 |                   
  server.ts                   |     100 |      100 |     100 |     100 |                   
 src                          |     100 |      100 |     100 |     100 |                   
  App.tsx                     |     100 |      100 |     100 |     100 |                   
 src/components               |     100 |      100 |     100 |     100 |                   
  CreateInputCheckbox.tsx     |     100 |      100 |     100 |     100 |                   
  FetchFromCSV.tsx            |     100 |      100 |     100 |     100 |                   
  TableCalendar.tsx           |     100 |      100 |     100 |     100 |                   
  TableOfTodos.tsx            |     100 |      100 |     100 |     100 |                   
  TodoPerDay.tsx              |     100 |      100 |     100 |     100 |                   
  TodosList.tsx               |     100 |      100 |     100 |     100 |                   
 src/components/subcomponents |     100 |      100 |     100 |     100 |                   
  CheckDay.tsx                |     100 |      100 |     100 |     100 |                   
  CheckboxComp.tsx            |     100 |      100 |     100 |     100 |                   
  DateCalendar.tsx            |     100 |      100 |     100 |     100 |                   
  EditableFields.tsx          |     100 |      100 |     100 |     100 |                   
  InputComp.tsx               |     100 |      100 |     100 |     100 |                   
  PriorityTodo.tsx            |     100 |      100 |     100 |     100 |                   
 src/hooks                    |     100 |      100 |     100 |     100 |                   
  useFetchDate.ts             |     100 |      100 |     100 |     100 |                   
 src/utils                    |     100 |      100 |     100 |     100 |                   
  apiFunctions.ts             |     100 |      100 |     100 |     100 |                   
  dateUtils.ts                |     100 |      100 |     100 |     100 |                   
  fonctions.ts                |     100 |      100 |     100 |     100 |                   
  todoFunctions.ts            |     100 |      100 |     100 |     100 |                   
------------------------------|---------|----------|---------|---------|-------------------

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

- OR

/// <reference types="vitest" />
import { defineConfig } from 'vite'
//import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    coverage: {
      exclude: [
        '**/*.css',
        '**/*.scss',
        '**/*.sass',
        '**/*.less',
        'src/lib/definitions.ts',
      ]
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
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

    "types": ["node", "vitest/globals"],

- package.json

```
"scripts": {
  "test:server": "vitest"
}
```

`pnpm run test:server`

**! Enjoy !**

:koala: