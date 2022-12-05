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

const useStyles = createStyles((theme) => ({
  root: {
    minHeight: "100vh",
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colors.dark[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

export default function NotFounPage() {
  const { classes } = useStyles();
  const url404 =
    "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg?w=740&t=st=1670212868~exp=1670213468~hmac=accfa9b72ffbe55c8b43f5ea33742581bb62702ea8c8e023fccee5845146b8f7";
  return (
    <Flex justify="space-around" align="center" className={classes.root}>
      <div>
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
      </div>
      <Image src={url404} alt="404" width={500} />
    </Flex>
  );
}
