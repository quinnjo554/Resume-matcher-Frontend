"use client"
import React, { ReactNode } from 'react'
import { Box, VStack, HStack, Link, Image, Text, Flex, Avatar } from "@chakra-ui/react";
import { useDisclosure } from '@chakra-ui/react'
import {
  BiHome,
  BiBarChartAlt2,
  BiCode,
  BiDetail,
  BiAperture,
  BiArrowFromRight
} from "react-icons/bi";
import KompletionLogo from "../../../public/kompletionLogo.jpg"
import { IconButton, Input } from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import { signOut } from 'next-auth/react';
import User from '../../models/user/User';
import EditUserModal from '../Modal/EditUserModal';
//have this take a user. Display a users avatar and jobs

function Navbar({ children, user, hasSearch }: { children: ReactNode, user: User, hasSearch: boolean }) {
  return (
    <Box className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <NavbarVert></NavbarVert>
      <NavbarHori hasSearch={hasSearch} user={user}>{children}</NavbarHori>
    </Box>
  )
}

function NavbarHori({ user, children, hasSearch = true }: { user: User, children: ReactNode, hasSearch?: boolean }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <div className="flex flex-col">
      <header className="flex h-26 lg:h-[80px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-200/40">
        <Link className="lg:hidden" href="/home">
          <BiCode className="h-6 w-6" />
        </Link>
        <div className="w-full flex-1">
          <Box
            sx={{
              p: "8px 4px",
              display: "flex",
              alignItems: "center",
              width: 500,
            }}
          >
            {hasSearch && (
              <>
                <Input
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search Jobs..."
                />
                <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                  <BiSearch />
                </IconButton>
              </>
            )}
          </Box>
        </div>
        <Avatar onClick={onOpen} size="lg" src={user?.pfp ?? ""}></Avatar>
        <EditUserModal user={user} isOpen={isOpen} onClose={onClose}></EditUserModal>
      </header>
      {children}
    </div>
  )
}

function NavbarVert() {

  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-200/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[80px] items-center border-b px-6">
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-black"
            href="/home"
          >
            <BiDetail></BiDetail>
            <span>Resume Matcher</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              className="flex text-lg items-center gap-3 rounded-lg px-3 py-2 text-black transition-all hover:text-gray-400 dark:text-black dark:hover:text-gray-400"
              href="/home"
            >
              <BiHome />
              Home
            </Link>
            <Link
              className="flex text-lg items-center gap-3 rounded-lg px-3 py-2 text-black transition-all hover:text-gray-400 dark:text-black dark:hover:text-gray-400"
              href="/createjob"
            >
              <BiBarChartAlt2 className="h-4 w-4" />
              Create Job
            </Link>
            <Link
              className="flex text-lg items-center gap-3 rounded-lg px-3 py-2 text-black transition-all hover:text-gray-400 dark:text-black dark:hover:text-gray-400"
            >
              <BiAperture className="h-4 w-4" />
              Settings
            </Link>
            <Link
              className="flex text-lg items-center gap-3 rounded-lg px-3 py-2 text-black transition-all hover:text-gray-400 dark:text-black dark:hover:text-gray-400"
              onClick={async () => await signOut()}
              href='/'
            >
              <BiArrowFromRight className="h-4 w-4" />
              Sign Out
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}
export default Navbar
