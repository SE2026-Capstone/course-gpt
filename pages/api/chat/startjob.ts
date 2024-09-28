
import type { NextApiRequest, NextApiResponse } from "next"
import {z, ZodError} from "zod"

type ChatJobResponse = {
  job_id: string
}

type ChatJobErrorResponse = {
  error: string
}

const ChatJobRequest = z.object({
  chat: z.string()
})

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatJobResponse | ChatJobErrorResponse>,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  if ("content-type" in req.headers && req.headers["content-type"] !== "application/json") {
    return res.status(400).json({error: "Content-Type must be application/json"})
  }

  try {
    const body = req.body
    ChatJobRequest.parse(body)
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return res.status(400).json({error: "Invalid request body format"})
    }
  }
}
