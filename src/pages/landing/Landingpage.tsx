"use client";
import React from "react";
import { Box } from "@chakra-ui/react";
import LoginCard from "./components/LoginCard";
import LandingHero from "./components/LandingHero";

function LandingPage() {
  return (
    <Box>
      <LoginCard></LoginCard>
      <LandingHero></LandingHero>
    </Box>
  );
}

export default LandingPage;

