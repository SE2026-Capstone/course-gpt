import { Box, Button, Input, TextField, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { FormEvent, useRef, useState } from "react";

type Message = {
  role: "user" | "system";
  content: string;
  date?: Date;
};

const dummyMessages: Message[] = [
  {
    role: "system",
    content: `Hi, I'm CourseGPT, course selection assistant. How can I help you today?`,
  },
  {
    role: "user",
    content: `I’m a 3rd year student studying Software Engineering. I’d like to learn more about AI. What courses can I take in 3B that are related to this topic?`,
  },
  {
    role: "system",
    content: `Sure, I’ve come up with a list of courses that are related to AI for 3rd/4th year students and I’ve listed them on the right. I’ve taken prerequisites into account as well.`,
  },
];


export default function Chat() {
  const [messages, setMessages] = useState(dummyMessages);
  const { data: session } = useSession();
  const pfp = session?.user?.image ?? "";

  const addMessage = (msg: Message) => {
    setMessages((msgs) => [...msgs, msg])
  }

  const [query, setQuery] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addMessage({
      role: "user",
      content: query,
    })

    setLoading(true);

    try {
      // TODO: 401 unauthorized
      console.log((session as any).token)
      const res = await fetch('/api/chat/startjob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${(session as any).token}`
        },
        body: JSON.stringify({ chat: query, email: session?.user?.email }),
      });

      if (!res.ok) {
        setLoading(false);
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const { id } = await res.json()

      const interval = window.setInterval(async () => {
        const pollRes = await fetch(`/api/chat/poll?job_id=${id}`, {
          method: 'GET',
        })
        if (!res.ok) {
          setLoading(false);
          console.error("Stopped polling")
          window.clearInterval(interval)
          return
        }

        const { data, completed } = await pollRes.json()
        if (completed) {
          addMessage({
            role: "system",
            content: data,
          })
          setLoading(false);
          // clear interval and return
          window.clearInterval(interval)
          return
        }
      }, 1000)

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box width="100%" textAlign="center">
      <Typography my="1rem" variant="h4">
        Chat
      </Typography>
      <Box
        overflow="scroll"
        border="2px solid #D6D6D6"
        borderRadius="16px"
        display="flex"
        flexDirection="column"
        gap="2rem"
        padding="2rem"
        textAlign="start"
      >
        {messages.map((message) => {
          const isUser = message.role === "user";
          return (
            <Box
              display="flex"
              flexDirection={isUser ? "row-reverse" : "row"}
              gap="1rem"
              alignItems="flex-end"
            >
              {isUser && (
                <img
                  src={pfp}
                  alt="profile"
                  width={40}
                  height={40}
                  style={{ borderRadius: "50%" }}
                />
              )}
              <Box
                padding="1rem"
                bgcolor={isUser ? "#1E87F0" : "grey.200"}
                color={isUser ? "white" : "#383838"}
                borderRadius={isUser ? "1rem 1rem 0 1rem" : "1rem 1rem 1rem 0"}
                maxWidth="60%"
              >
                {message.content.trim()}
              </Box>
            </Box>
          );
        })}
        {/* TODO: make it look good */}
        <form onSubmit={handleSubmit}>
          <Input value={query} onChange={(e) => setQuery(e.target.value)} />
          <Button type="submit" disabled={isLoading}>Send</Button>
        </form>

      </Box>
    </Box>
  );
}
