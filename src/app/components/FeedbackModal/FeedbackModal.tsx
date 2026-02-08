import React, { useState } from "react";

import { useForm } from "@mantine/form";
import {
  Button,
  Center,
  Checkbox,
  Modal,
  Stack,
  Text,
  TextInput,
  Image,
  Flex,
} from "@mantine/core";

interface FeedbackModalProps {
  opened: boolean;
  close: () => void;
}

export default function FeedbackModal({ opened, close }: FeedbackModalProps) {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      suggestions: {
        busses: false,
        trains: false,
        address_search: false,
        live_data: false,
      },
      openSuggestions: "",
    },
  });

  function handleSubmit() {
    setHasSubmitted(true);
    console.log(form.getValues());
  }

  return (
    <Modal opened={opened} onClose={close} radius="lg">
      {hasSubmitted ? (
        <Center>
          <Stack>
            <Text ta="center">Thank you!</Text>
            <Image
              src="/happy_robot.png"
              alt="TubeFair mascot jumping with joy"
              w="8em"
            />
          </Stack>
        </Center>
      ) : (
        <form onSubmit={handleSubmit}>
          <Stack px="sm" gap="3em">
            {/* Standard feedback */}
            <Stack>
              <Text>What new features would you like to see?</Text>
              <Stack>
                <Checkbox
                  key={form.key("suggestions.busses")}
                  {...form.getInputProps("suggestions.busses", {
                    type: "checkbox",
                  })}
                  label="Add busses"
                  color="teal"
                />
                <Checkbox
                  key={form.key("suggestions.trains")}
                  {...form.getInputProps("suggestions.trains", {
                    type: "checkbox",
                  })}
                  label="Add trains"
                  color="teal"
                />
                <Checkbox
                  key={form.key("suggestions.address_search")}
                  {...form.getInputProps("suggestions.address_search", {
                    type: "checkbox",
                  })}
                  label="Search by address or postcode"
                  color="teal"
                />
                <Checkbox
                  key={form.key("suggestions.live_data")}
                  {...form.getInputProps("suggestions.live_data", {
                    type: "checkbox",
                  })}
                  label="Provide live TfL status"
                  color="teal"
                />
              </Stack>
            </Stack>

            {/* Open question */}
            <Stack>
              <Text>
                Do you have any other suggestions that would make TubeFair more
                useful?
              </Text>
              <TextInput
                key={form.key("openSuggestions")}
                {...form.getInputProps("openSuggestions")}
                styles={{
                  input: { fontSize: 16 }, // Prevent iOS triggering an automatic zoom when focused
                }}
              />
            </Stack>

            <Flex justify="flex-end">
              <Button type="submit" radius="md" color="teal">
                Submit
              </Button>
            </Flex>
          </Stack>
        </form>
      )}
    </Modal>
  );
}
