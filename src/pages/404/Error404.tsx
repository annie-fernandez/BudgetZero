import {
  Button,
  Container,
  Flex,
  ScrollArea,
  Text,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";
import useError404Styles from "./useError404Styles";

const Error404 = (): JSX.Element => {
  const { classes } = useError404Styles();

  return (
    <ScrollArea className={classes.root} h="100%">
      <Container>
        <div className={classes.label}>404</div>
        <Title className={classes.title}>Listen here, partner.</Title>
        <Text size="lg" align="center" className={classes.description}>
          It seems somethings broken...
        </Text>

        <Flex justify="center" align="center" direction="column">
          <Link to="/">
            <Button variant="white" size="md">
              Go back
            </Button>
          </Link>

          <Text color="white" mt={10}>
            There&apos;s no more to see here for now
          </Text>
        </Flex>
      </Container>
    </ScrollArea>
  );
};

export default Error404;
