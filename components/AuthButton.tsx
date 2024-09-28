"use client";
import { Button, Box } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const pfp = session?.user?.image;
  return (
    <Box>
      {pfp && <img src={pfp} alt="profile" width={32} height={32} />}
      <Button onClick={() => (isAuthenticated ? signOut() : signIn("google"))}>
        {isAuthenticated ? "Sign out" : "Sign in"}
      </Button>
    </Box>
  );
}
