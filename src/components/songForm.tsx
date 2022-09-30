import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Text,
  Container,
  Box,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getTags } from '@src/services/tagsService';
import ITag from '@src/types/models/iTag';
import apiFetchDelegate from '@src/utilities/apiFetchDelegate';
import TagSelector from './tagSelector';
import IFormSongData from '@src/types/interfaces/iFormSongData';

interface IProps {
  variant: 'new' | 'edit';
  submitCallback: (payload: IFormSongData) => Promise<number>;
  dataForEdit?: {
    title: string;
    lyrics: string;
    notes: string;
    credits: string;
    tags: string[];
    customBackCallback: () => void;
  };
}

export default function SongForm(props: IProps) {
  const { variant, dataForEdit, submitCallback } = props;

  const [title, setTitle] = useState<string>('');
  const [lyrics, setLyrics] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [credits, setCredits] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);

  const [tags, setTags] = useState<ITag[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [dataError, setDataError] = useState<boolean>(false);
  const [authError, setAuthError] = useState<boolean>(false);
  const [generalError, setGeneralError] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (!dataForEdit || !dataForEdit.title) return;

    setTitle(dataForEdit.title);
    setLyrics(dataForEdit.lyrics);
    setNotes(dataForEdit.notes);
    setCredits(dataForEdit.credits);
    setSelectedTags(tags.filter((tag) => dataForEdit.tags.includes(tag.name)));
  }, [dataForEdit]);

  useEffect(() => {
    apiFetchDelegate<ITag[]>(getTags, [setTags], []);
  }, []);

  async function onSubmit() {
    setSubmitting(true);
    setAuthError(false);
    setGeneralError(false);
    setDataError(false);

    const responseStatus = await submitCallback({
      title,
      tags: selectedTags.map((x) => x._id),
      lyrics,
      notes,
      credits,
      password,
    });
    setSubmitting(false);

    if (responseStatus === 400) {
      setDataError(true);
    } else if (responseStatus === 401) {
      setAuthError(true);
    } else if (responseStatus === 500) {
      setGeneralError(true);
    } else if (responseStatus === 200) {
      setSubmitSuccess(true);
      setPassword('');
    }
  }

  function clearState() {
    setTitle('');
    setLyrics('');
    setNotes('');
    setCredits('');
    setSelectedTags([]);
    setPassword('');
    setSubmitting(false);
    setDataError(false);
    setAuthError(false);
    setGeneralError(false);
    setSubmitSuccess(false);
  }

  function getSuccessAlert(): JSX.Element {
    const initialText =
      variant === 'new'
        ? 'Piosenka została przesłana.'
        : 'Piosenka została zaktualizowana.';

    const finalText =
      variant === 'new' ? ' aby dodać kolejną.' : ' aby wrócić do piosenki.';

    const linkAction =
      variant === 'new'
        ? () => clearState()
        : () => {
            clearState();
            dataForEdit?.customBackCallback();
          };

    return (
      <>
        <Flex flexDirection={'row'}>
          <Text>
            {`${initialText} Kliknij `}
            <Text
              as={'button'}
              textDecoration={'underline'}
              onClick={linkAction}
            >
              {'tutaj'}
            </Text>
            {finalText}
          </Text>
        </Flex>
      </>
    );
  }

  return (
    <>
      <VStack p={'2em'}>
        {generalError && (
          <Flex>
            <Alert status="error">
              <AlertIcon />
              Nastąpił błąd serwera, odśwież lub spróbuj ponownie później.
            </Alert>
          </Flex>
        )}
        {submitSuccess && (
          <Flex width={'100%'}>
            <Alert status="success" whiteSpace={'pre-wrap'}>
              <AlertIcon />
              {getSuccessAlert()}
            </Alert>
          </Flex>
        )}
        <VStack pt={'2em'} width={'100%'}>
          <FormControl isInvalid={dataError}>
            <FormLabel>Tytuł *</FormLabel>
            <FormErrorMessage>Sprawdź czy dodałeś tytuł!</FormErrorMessage>
            <Input
              type="text"
              value={title}
              placeholder={'Dodaj Tytuł'}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl isInvalid={dataError}>
            <FormLabel>Tagi *</FormLabel>
            <FormErrorMessage>Sprawdź czy dodałeś tagi!</FormErrorMessage>
            <Flex
              width={'100%'}
              borderWidth={dataError ? '2px' : '0px'}
              borderRadius={'5px'}
              borderColor={'red'}
            >
              <TagSelector
                title={'Wybierz tagi'}
                tags={tags}
                selectedTags={selectedTags}
                setSelected={(_tags: ITag[]) => {
                  setSelectedTags(_tags);
                }}
                shouldWarn={true}
                warnText={`Wybrano ${selectedTags.length}`}
              />
            </Flex>
          </FormControl>
          <FormControl isInvalid={dataError}>
            <FormLabel>Tekst piosenki *</FormLabel>
            <FormErrorMessage>Sprawdź czy dodałeś tekst!</FormErrorMessage>
            <Textarea
              value={lyrics}
              height={'10em'}
              placeholder={'Nie z[A]pomnij o [c]hwytach :)'}
              onChange={(e) => setLyrics(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Notatki</FormLabel>
            <Textarea
              value={notes}
              height={'3em'}
              placeholder={'Dodaj notatki...'}
              onChange={(e) => setNotes(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Źródła</FormLabel>
            <Input
              type="text"
              value={credits}
              placeholder={'Dodaj źródło piosenki lub / i opracowania...'}
              onChange={(e) => setCredits(e.target.value)}
            />
          </FormControl>
          <FormControl isInvalid={authError}>
            <FormLabel>Hasło *</FormLabel>
            <FormErrorMessage>Hasło niepoprawne</FormErrorMessage>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Flex width={'100%'} pt={'1em'}>
            <Text>Pola ozanczone * są wymagane</Text>
          </Flex>
          <Flex width={'100%'} pt={'1em'}>
            <Button
              alignSelf={'left'}
              isLoading={submitting}
              loadingText="Przesyłanie"
              colorScheme="blue"
              variant="solid"
              onClick={onSubmit}
            >
              Prześlij
            </Button>
          </Flex>
        </VStack>
      </VStack>
    </>
  );
}
