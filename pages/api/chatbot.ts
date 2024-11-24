// TEMP
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const { query } = req.body;
  
      if (!query) {
        return res.status(400).json({ error: 'Query is required' });
      }
  
      // Simulate chatbot logic (replace with actual AI processing)
      const response = `You said: "${query}". How can I help?`;
  
      return res.status(200).json({ response });
    } else {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }