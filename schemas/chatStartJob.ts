import { z } from "zod";

export const ChatJobRequest = z.object({
	email: z.string(),
	chat: z.string()
})