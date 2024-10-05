import { Queue } from "bullmq"
import { Redis } from "ioredis"
import { CHAT_JOB_QUEUE_NAME } from "@/globals"

export const redisConnection = new Redis(process.env.REDIS_URL!, {
	maxRetriesPerRequest: null,
})

export const chatJobQueue = new Queue(CHAT_JOB_QUEUE_NAME, { connection: redisConnection })