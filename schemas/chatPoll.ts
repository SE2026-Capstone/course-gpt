import { z } from "zod";

export const BullMQChatJobReturnValue = z.object({
    chat: z.string(),
    courseList: z.array(z.any()), // TODO: type this when we declare the interface
  })
  
  export const PollJobResponse = z.object({
    completed: z.boolean(),
    error: z.string().optional(),
    result: BullMQChatJobReturnValue.optional()
  })
  
export type PollJobResponseInterface = z.infer<typeof PollJobResponse>;