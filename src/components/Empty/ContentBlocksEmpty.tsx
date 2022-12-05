import React from "react";
import { Container, Group, Text, ThemeIcon } from "@mantine/core";
import { IconFocusCentered } from "@tabler/icons";

function ContentBlocksEmpty() {
  return (
    <Container fluid>
      <Group position="center">
        {/* <Image width={150} src={EmptyLogo} alt="empty" /> */}
        <ThemeIcon radius="xl" variant="light">
          <IconFocusCentered />
        </ThemeIcon>
      </Group>
      <Group position="center" mt={10}>
        <Text c="blue" size="xs">
          Drop content blocks here
        </Text>
      </Group>
    </Container>
  );
}

export default ContentBlocksEmpty;
