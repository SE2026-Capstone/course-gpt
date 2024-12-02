import { z } from "zod";

export const CourseListItem = z.object({
  courseCode: z.string(),
  courseName: z.string(),
  courseDescription: z.string(),
  relevanceScore: z.number()
})

export type CourseListItemInterface = z.infer<typeof CourseListItem>

export const BullMQChatJobReturnValue = z.object({
  chat: z.string(),
  courseList: z.array(CourseListItem)
})

export const PollJobResponse = z.object({
  completed: z.boolean(),
  error: z.string().optional(),
  result: BullMQChatJobReturnValue.optional()
})
  
export type PollJobResponseInterface = z.infer<typeof PollJobResponse>;