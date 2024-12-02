import Head from "next/head";
import { useSession } from "next-auth/react";
import Nav from "@/components/Nav";
import Chat from "@/components/Chat";
import CourseList from "@/components/CourseList";
import { Box, Container } from "@mui/material";
import { NotificationsProvider } from "@toolpad/core/useNotifications";
import { useState } from "react";
import { CourseListItemInterface } from "@/schemas/chatPoll";

export default function Home() {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  const [courses, setCourses] = useState<CourseListItemInterface[]>([]);

  return (
    <>
      <Head>
        <title>CourseGPT</title>
        <meta
          name="description"
          content="AI-powered course selection assistant"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NotificationsProvider>
        <Nav />

        <Container>
          {isAuthenticated && (
            // TODO: mobile layout: use tabs
            <Box display="flex" flexDirection="row" gap="2rem" alignItems="flex-start">
              <Box flex={1}>
                <Chat setCourses={setCourses} />
              </Box>
              <Box flex={1}>
                <CourseList courses={courses} />
              </Box>
            </Box>
          )}
        </Container>
      </NotificationsProvider>
    </>
  );
}
