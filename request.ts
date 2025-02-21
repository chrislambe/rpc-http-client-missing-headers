import { Rpc } from "@effect/rpc";
import { Schema } from "effect";

export class Counts extends Rpc.StreamRequest<Counts>()("Counts", {
  failure: Schema.Never,
  success: Schema.Number,
  payload: {},
}) {}
