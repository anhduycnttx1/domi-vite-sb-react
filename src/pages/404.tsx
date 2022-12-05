import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Group,
  Image,
  Flex,
} from "@mantine/core";
import { Link } from "react-router-dom";
import Logo404 from "../assets/404.svg";
const useStyles = createStyles((theme) => ({
  root: {
    minHeight: "100vh",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,
    color: "#fcafea",
    marginTop: theme.spacing.lg,
    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: "auto",
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg * 1.5,
  },
}));

export default function NotFounPage() {
  const { classes } = useStyles();
  return (
    <Flex align="center" justify="center" className={classes.root}>
      <Container>
        <Group position="center">
          <Image src={Logo404} alt="404" width={404} />
        </Group>
        <Title className={classes.title}>OOPS!</Title>
        <Text
          color="dimmed"
          size="lg"
          align="center"
          className={classes.description}
        >
          Unfortunately, this is only a 404 page. You may have mistyped the
          address, or the page has been moved to another URL.
        </Text>
        <Group position="center">
          <Link to="/">
            <Button variant="subtle" size="md">
              Go to Home
            </Button>
          </Link>
        </Group>
      </Container>
    </Flex>
  );
}
