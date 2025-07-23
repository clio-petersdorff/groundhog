import { Center, Loader } from "@mantine/core";
import React from "react";

export default function Loading() {
  return (
    <Center h="50vh">
      <Loader color="cyan" type="dots" size="xl" />
    </Center>
  );
}
