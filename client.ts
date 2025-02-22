import {
  FetchHttpClient,
  HttpClient,
  HttpClientRequest,
} from "@effect/platform";
import { RpcResolver } from "@effect/rpc";
import { HttpRpcResolver } from "@effect/rpc-http";
import { Effect, Layer, Stream } from "effect";
import { Counts } from "./request.ts";
import type { AppRouter } from "./router.ts";

const makeClient = Effect.gen(function* () {
  const baseClient = yield* HttpClient.HttpClient;
  const client = baseClient.pipe(
    HttpClient.filterStatusOk,
    HttpClient.mapRequest(
      HttpClientRequest.prependUrl("http://localhost:3000/rpc")
    ),
    HttpClient.mapRequest(
      HttpClientRequest.setHeader("Authorization", "Bearer abc123")
    ),
  );
  return RpcResolver.toClient(HttpRpcResolver.make<AppRouter>(client));
});

const program = Effect.gen(function* () {
  const client = yield* makeClient;
  yield* Effect.log("Running the client");
  const stream = client(new Counts());
  return yield* stream.pipe(
    Stream.tap((element) => Effect.log(element)),
    Stream.runCollect
  );
});

program.pipe(
  Effect.provide(
    FetchHttpClient.layer
  ),
  Effect.runPromise
);
