"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";

export default function UserControls() {
  const { user, error, isLoading } = useUser();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {user && (
          <div>
            <Image
              src={user.picture}
              alt={user.name}
              width={64}
              height={64}
              className="rounded-full"
            />
            {/* <h2>{user.name}</h2>
            <p>{user.email}</p> */}
          </div>
        )}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link href={"/profile"}>Profile</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <a href={"/api/auth/logout"}>Logout</a>
        </MenuItem>
      </Menu>
    </div>
  );
}
