import { NextApiRequest, NextApiResponse } from "next";
import { chatJobQueue } from "@/bullmq/bullmq";
import { z, ZodError } from "zod";
import { BullMQChatJobReturnValue, PollJobResponseInterface } from "@/schemas/chatPoll";



const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // const session = await getServerSession(req, res, authOptions)
    // if (!session) {
    //   return res.status(401).json({ error: "Unauthorized" })
    // }
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" })
    }
    const params = req.query
    if (!("job_id" in params)) {
      return res.status(400).json({ error: "Missing job_id" })
    }
    const jobId: string = String(params.job_id)
    const job = await chatJobQueue.getJob(jobId)
    if (!job) {
      return res.status(400).json({ error: "Invalid job_id" })
    }
  
    // if (job.data.user_email !== session.user?.email) {
    //   return res.status(403).json({ error: "Job does not belong to the requester" })
    // }
    
    // if the job is completed, return the data
    let returnData: PollJobResponseInterface = {
      completed: false
    }

    if (await job.isCompleted()) {
      returnData.completed = true
      try {
        const parsedReturnValue = BullMQChatJobReturnValue.parse(job.returnvalue)
        returnData.result = parsedReturnValue
      } catch (error: unknown) {
        if (error instanceof ZodError) {
          returnData.error = error?.message ?? "Invalid job response"
        } else {
          returnData.error = "Invalid job response"
        }
      }
    }
    return res.status(200).json(returnData)

  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}

export default handler