import {
  HttpApp,
  HttpMiddleware,
  HttpRouter,
  HttpServer,
  HttpServerResponse,
} from "@effect/platform";
import { NodeHttpServer, NodeRuntime } from "@effect/platform-node";
import { HttpRpcRouter } from "@effect/rpc-http";
import { Effect, Layer, Stream } from "effect";
import { createServer } from "node:http";
import { appRouter } from "./router.ts";

const HttpLive = HttpRouter.empty.pipe(
  HttpRouter.post("/rpc", HttpRpcRouter.toHttpApp(appRouter)),
  HttpMiddleware.make((httpApp) =>
    Effect.zipRight(
      HttpApp.appendPreResponseHandler((request, response) => {
        console.log("request (note headers)", request);

        if (request.headers["Authorization"] !== "Bearer abc123") {
          return Effect.succeed(HttpServerResponse.setStatus(response, 401));
        }

        return Effect.succeed(response);
      }),
      httpApp
    )
  ),
  HttpServer.serve(),
  HttpServer.withLogAddress,
  Layer.provide(NodeHttpServer.layer(createServer, { port: 3000 }))
);

NodeRuntime.runMain(Layer.launch(HttpLive));
