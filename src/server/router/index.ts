// src/server/router/index.ts
import superjson from "superjson";
import { createRouter } from "./context";

import { authRouter } from "./auth";
import { eventRouter } from "./event";
import { exampleRouter } from "./example";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("auth.", authRouter)
  .merge("event.", eventRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
