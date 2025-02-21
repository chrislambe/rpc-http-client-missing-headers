import { Rpc, RpcRouter } from "@effect/rpc";
import { Counts } from "./request.ts";
import { Effect, Stream } from "effect";

export const appRouter = RpcRouter.make(
  Rpc.stream(Counts, () =>
    Stream.make(1, 2, 3, 4, 5).pipe(Stream.tap(() => Effect.sleep("1 second")))
  )
);

export type AppRouter = typeof appRouter;
