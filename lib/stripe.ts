import Stripe from "stripe"

import { env } from "@/env.mjs"

export const stripe = new Stripe('abc', {
  apiVersion: "2022-11-15",
  typescript: true,
})
