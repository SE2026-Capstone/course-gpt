import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useEffect, useId } from "react";
import { FormEvent, useRef, useState } from "react";
import styles from "./Chat.module.css";
import SendIcon from "@mui/icons-material/Send";
import { useNotifications } from "@toolpad/core/useNotifications";

type Message = {
  role: "user" | "system";
  content: string;
  date?: number; // Date.now()
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: `Hi, I'm CourseGPT, course selection assistant. How can I help you today?`,
      date: Date.now(),
    },
  ]);
  const { data: session } = useSession();
  const pfp = session?.user?.image ?? "";

  const addMessage = (msg: Message) => {
    setMessages((msgs) => [
      ...msgs,
      {
        date: Date.now(),
        ...msg,
      },
    ]);
  };

  const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(false);

  const notifications = useNotifications();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery("");

    addMessage({
      role: "user",
      content: query.trim(),
    });

    setLoading(true);

    try {
      // TODO: 401 unauthorized
      // console.log((session as any).token)
      const res = await fetch("/api/chat/startjob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${(session as any).token}`
        },
        body: JSON.stringify({ chat: query, email: session?.user?.email }),
      });

      if (!res.ok) {
        throw new Error(`sending message: HTTP ${res.status}`);
      }

      const { id } = await res.json();

      const interval = window.setInterval(async () => {
        const pollRes = await fetch(`/api/chat/poll?job_id=${id}`, {
          method: "GET",
        });
        if (!res.ok) {
          window.clearInterval(interval);
          throw new Error(`receiving reply: HTTP ${res.status}`);
        }

        const { data, completed } = await pollRes.json();
        if (completed) {
          addMessage({
            role: "system",
            content: data,
          });
          window.clearInterval(interval);
          return;
        }
      }, 1000);
    } catch (error) {
      const message = (error as any)?.message || "Unknown error";
      notifications.show(`Something went wrong, please try again. Error: ${message}`)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box width="100%" textAlign="center">
      <Typography my="1rem" variant="h4">
        Chat
      </Typography>
      <Box
        border="2px solid #D6D6D6"
        borderRadius="16px"
        height="80vh"
        display="flex"
        flexDirection="column"
      >
        <Box
          overflow="scroll"
          height="100%"
          display="flex"
          flexDirection="column"
          gap="2rem"
          padding="2rem"
          textAlign="start"
        >
          {messages.map((message) => (
            <React.Fragment key={message.date}>
              <ChatBubble message={message} userPFP={pfp} />
            </React.Fragment>
          ))}
          {isLoading && <ChatSystemLoadingBubble />}
        </Box>
        <ChatInput
          handleSubmit={handleSubmit}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
}

interface ChatInputProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
}

function ChatInput({
  handleSubmit,
  value,
  onChange,
  isLoading,
}: ChatInputProps) {
  const formId = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  }, [value]);
  return (
    <form
      onSubmit={handleSubmit}
      id={formId}
      style={{ margin: "auto", marginBottom: "1rem" }}
    >
      <Box display="flex" alignItems="center" gap="0.5rem">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={onChange}
          placeholder="Ask CourseGPT..."
          className={styles.chatInput}
          form={formId}
        />

        <IconButton
          type="submit"
          disabled={isLoading || !value}
          color="primary"
        >
          <SendIcon />
        </IconButton>
      </Box>
    </form>
  );
}

function ChatBubble({
  message,
  userPFP,
}: {
  message: Message;
  userPFP: string;
}) {
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
          src={userPFP}
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
        {message.content}
      </Box>
    </Box>
  );
}

function ChatSystemLoadingBubble() {
  return (
    <Box display="flex" flexDirection="row" gap="1rem" alignItems="flex-end">
      <Box
        padding="1rem"
        bgcolor="grey.200"
        color="#383838"
        borderRadius="1rem 1rem 1rem 0"
        maxWidth="60%"
      >
        <CircularProgress size="1.5rem" />
      </Box>
    </Box>
  );
}
