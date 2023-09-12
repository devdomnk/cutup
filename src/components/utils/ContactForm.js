import {
  Button,
  TextInput,
  Modal,
  useMantineTheme,
  Stack,
  Textarea,
} from "@mantine/core";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useFirestore } from "../context/firebaseContext";
import {
  useIsContactFormOpened,
  useSetIsContactFormOpened,
} from "../context/modalContext";
import { v4 as uuidv4 } from "uuid";
import { IconCheck } from "@tabler/icons";

export default function ContactForm() {
  const theme = useMantineTheme();
  const opened = useIsContactFormOpened();
  const setOpened = useSetIsContactFormOpened();

  const [isUploaded, setIsUploaded] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const firestore = useFirestore();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();

  async function storeMessage() {
    const id = uuidv4();

    setIsButtonLoading(true);
    await setDoc(doc(firestore, `messages/${id}`), {
      name: name,
      message: message,
      email: email,
      time: Date.now(),
      id: id,
    });
    setName("");
    setEmail("");
    setMessage("");
    setIsButtonLoading(false);
    setIsUploaded(true);
    setTimeout(() => {
      setIsUploaded(false);
      setOpened(false);
    }, 2000);
  }

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={"Kontaktformular"}
      centered
      size={600}
      overlayColor={
        theme.colorScheme === "light"
          ? theme.colors.gray[2]
          : theme.colors.dark[9]
      }
      overlayBlur={3}
      overlayOpacity={0.55}
      overflow='inside'
      styles={{ title: { fontWeight: 700 }, root: { zIndex: 1000 } }}
      radius='md'
    >
      <Stack spacing={32} my='xs'>
        <Stack spacing={8}>
          <TextInput
            required
            label={"Vollständiger Name"}
            placeholder={"Dein Name"}
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <TextInput
            required
            label='E-Mail'
            placeholder={"Deine E-Mail"}
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <Textarea
            required
            label={"Nachricht"}
            placeholder={"Deine Nachricht"}
            value={message}
            onChange={(e) => setMessage(e.currentTarget.value)}
            autosize
            minRows={10}
            maxRows={20}
          />
        </Stack>
        <Button
          variant='gradient'
          onClick={storeMessage}
          loading={isButtonLoading}
          rightIcon={isUploaded ? <IconCheck color={theme.white} /> : null}
        >
          {isButtonLoading || isUploaded ? "" : "Nachricht senden"}
        </Button>
      </Stack>
    </Modal>
  );
}
