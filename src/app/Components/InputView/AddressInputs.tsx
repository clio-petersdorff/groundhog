import { TextInput } from "@mantine/core";
import React from "react";

export default function AddressInputs() {
  return (
    <TextInput
      label={`Person 1`}
      description="Input an address or postcode"
      placeholder="e.g. 10 Downing Street, London or WC2H 9AJ"
    />
  );
}
