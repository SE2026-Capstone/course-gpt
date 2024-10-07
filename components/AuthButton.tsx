"use client";
import { Button, Box, Typography, Menu, MenuItem } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

export default function AuthButton() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const pfp = session?.user?.image;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (isAuthenticated) {
    return (
      <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
        {pfp && (
          <img
            src={pfp}
            alt="profile"
            width={32}
            height={32}
            style={{ borderRadius: "50%" }}
          />
        )}
        <Button onClick={handleClick} color="inherit">
          {session?.user?.name}
        </Button>
        <Menu open={menuOpen} anchorEl={anchorEl} onClose={handleClose}>
          <MenuItem onClick={() => signOut()}>
            <Typography>Sign out</Typography>
          </MenuItem>
        </Menu>
      </Box>
    );
  }

  return (
    <Button onClick={() => signIn("google")} color="inherit">
      Sign in
    </Button>
  );
}
