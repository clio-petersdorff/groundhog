import React from "react";
import { Stack, Title, Space, Flex, Text } from "@mantine/core";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Flex gap="xl" justify="center" align="center" direction="column">
      <Stack
        w="25em"
        gap="xl"
        style={{ position: "relative" }}
        p="sm"
        py="3em"
        mih="100vh"
      >
        <Title order={2} ta="center">
          TubeFair
        </Title>

        {children}

        <Space h="md" />
        <Text
          fw="bold"
          size="xs"
          c="teal"
          style={{ position: "absolute", bottom: 0, left: 0, padding: "1em" }}
        >
          An app by Clio
        </Text>
      </Stack>
    </Flex>
  );
}
