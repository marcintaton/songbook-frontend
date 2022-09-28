import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getTags } from '@src/services/tagsService';
import ITag from '@src/types/models/iTag';
import apiFetchDelegate from '@src/utilities/apiFetchDelegate';
import HeadingMain from './headingMain';
import ViewRoot from './viewRoot';
import TagSelector from './tagSelector';
import { addNewSong } from '@src/services/songsService';

export default function NewSongView() {
  const [title, setTitle] = useState<string>('');
  const [lyrics, setLyrics] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);

  const [tags, setTags] = useState<ITag[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [dataError, setDataError] = useState<boolean>(false);
  const [authError, setAuthError] = useState<boolean>(false);
  const [generalError, setGeneralError] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

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
    });
    setSubmitting(false);

    if (response.status === 400) {
      setDataError(true);
    } else if (response.status === 401) {
      setAuthError(true);
    } else if (response.status === 500) {
      setGeneralError(true);
    } else if (response.status === 200) {
      // success
      setSubmitSuccess(true);
    }
  }

  function clearState() {
    setTitle('');
    setLyrics('');
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
      <ViewRoot maxWidth="40em">
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
            <Flex>
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
              <FormLabel>Tytuł</FormLabel>
              <FormErrorMessage>Sprawdź czy dodałeś tytuł!</FormErrorMessage>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl isInvalid={dataError}>
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
              <FormLabel>Tekst piosenki</FormLabel>
              <FormErrorMessage>Sprawdź czy dodałeś tekst!</FormErrorMessage>
              <Textarea
                value={lyrics}
                height={'10em'}
                placeholder={'Nie z[A]pomnij o [c]hwytach :)'}
                onChange={(e) => setLyrics(e.target.value)}
              />
            </FormControl>
            <FormControl isInvalid={authError}>
              <FormLabel>Hasło</FormLabel>
              <FormErrorMessage>Hasło niepoprawne</FormErrorMessage>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Flex width={'100%'} pt={'1em'}>
              <Button
                alignSelf={'left'}
                isLoading={submitting}
                loadingText="Submitting"
                colorScheme="blue"
                variant="solid"
                onClick={onSubmit}
              >
                Prześlij
              </Button>
            </Flex>
          </VStack>
        </VStack>
      </ViewRoot>
    </>
  );
}
