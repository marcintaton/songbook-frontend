import {
  Alert,
  AlertIcon,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getTags } from '@src/services/tagsService';
import ITag from '@src/types/models/iTag';
import apiFetchDelegate from '@src/utilities/apiFetchDelegate';
import HeadingMain from './headingMain';
import TagSelector from './tagSelector';
import { addNewSong } from '@src/services/songsService';

interface IProps {
  variant: 'new' | 'edit';
  initialData?: {
    title: string;
    lyrics: string;
    notes: string;
    credits: string;
    tags: ITag[];
  };
  submitCallback: (payload: unknown) => void;
}

export default function SongForm(props: IProps) {
  const { variant, initialData } = props;

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
    if (!initialData) return;

    setTitle(initialData.title);
    setLyrics(initialData.lyrics);
    setNotes(initialData.notes);
    setCredits(initialData.credits);
    setSelectedTags(initialData.tags);
  }, [initialData]);

  useEffect(() => {
    apiFetchDelegate<ITag[]>(getTags, [setTags], []);
  }, []);

  async function onSubmit() {
    setSubmitting(true);
    setAuthError(false);
    setGeneralError(false);
    setDataError(false);

    const response = await addNewSong({
      title,
      lyrics,
      tags: selectedTags.map((x) => x._id),
      password,
      notes,
      credits,
    });
    setSubmitting(false);

    if (response.status === 400) {
      setDataError(true);
    } else if (response.status === 401) {
      setAuthError(true);
    } else if (response.status === 500) {
      setGeneralError(true);
    } else if (response.status === 200) {
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

  return (
    <>
      <VStack p={'2em'}>
        <HeadingMain size="md" title={'Dodaj piosenkę'} />
        <Divider
          orientation="horizontal"
          pt={'2em'}
          borderColor={'lightgrey'}
        />
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
              {'Piosenka została przesłana. Kliknij '}
              <Flex
                as={'button'}
                textDecoration={'underline'}
                onClick={() => clearState()}
              >
                {'tutaj'}
              </Flex>
              {' aby dodać kolejną.'}
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
