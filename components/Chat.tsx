import { Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";

type Message = {
  role: "user" | "system";
  content: string;
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
  const messages = dummyMessages;
  const { data: session } = useSession();
  const pfp = session?.user?.image ?? "";
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
      </Box>
    </Box>
  );
}
