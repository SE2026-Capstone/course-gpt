
import { z, ZodError } from "zod"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { chatJobQueue } from "@/bullmq/bullmq"
import { ChatJobRequest } from "@/schemas/chatStartJob"


const handler = (async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	try {
		//const session = await getServerSession(req, res, authOptions)

		// if (!session) {
		// 	return res.status(401).json({ error: "Unauthorized" })
		// }

		if (req.method !== "POST") {
			return res.status(405).json({ error: "Method not allowed" })
		}
		if ("content-type" in req.headers && req.headers["content-type"] !== "application/json") {
			return res.status(400).json({ error: "Invalid content type" })
		}


		const parsedBody = ChatJobRequest.parse(req.body)
		const chatJob = await chatJobQueue.add("chat", {
			user_email: parsedBody.email,
			chat: parsedBody.chat
		})
		return res.status(200).json({id: chatJob.id})
		
	} catch (error: unknown) {
		if (error instanceof ZodError) {
			return res.status(400).json({ error: "Invalid request body format" })
		}
		
		return res.status(500).json({ error: "Internal server error" })
		
	}
})

export default handler
