import {
  Box,
  Button,
  Checkbox,
  CloseButton,
  color,
  Flex,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Spacer,
  Text,
  Textarea,
  Tooltip,
} from '@chakra-ui/react';
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
  BsPrinter,
} from 'react-icons/bs';
import HeadingMain from './headingMain';

interface IProps {
  title: string;
}

export default function PrintListElement(props: IProps) {
  const { title } = props;

  return (
    <>
      <Box
        boxShadow={'2xl'}
        border={'1px'}
        borderColor={'lightgrey'}
        rounded={'md'}
        overflow={'hidden'}
        maxW={'100%'}
        w={'full'}
        height={'12rem'}
        mb={'2em'}
      >
        <Grid
          templateAreas={`"nav header delete"
                  "nav controls controls"
                  "nav notes notes"
                  `}
          gridTemplateRows={'3fr 6fr 3fr'}
          gridTemplateColumns={'1fr 18fr 1fr'}
          h="100%"
          gap="2"
          margin={'2'}
        >
          <GridItem p="2" area={'header'}>
            <Text fontWeight={'bold'} fontSize={'1.5em'}>
              {title}
            </Text>
          </GridItem>
          <GridItem p="2" area={'nav'}>
            <Flex flexDirection={'column'} height={'100%'}>
              <Spacer />
              <Tooltip label={'Przesuń w górę'}>
                <IconButton
                  mt={'0.5em'}
                  fontSize={'1.5em'}
                  variant={'ghost'}
                  onClick={() => console.log('XD')}
                  color={'purple'}
                  aria-label={''}
                >
                  <Icon as={BsFillArrowUpCircleFill} />
                </IconButton>
              </Tooltip>
              <Spacer />
              <Tooltip label={'Przesuń w dół'}>
                <IconButton
                  mb={'0.5em'}
                  fontSize={'1.5em'}
                  variant={'ghost'}
                  onClick={() => console.log('XD')}
                  color={'purple'}
                  aria-label={''}
                >
                  <Icon as={BsFillArrowDownCircleFill} />
                </IconButton>
              </Tooltip>
              <Spacer />
            </Flex>
          </GridItem>
          <GridItem area={'controls'}>
            <Box>
              <Checkbox p={'1em'} defaultChecked>
                Pokaż chwyty
              </Checkbox>
              <Checkbox p={'1em'}>Czarno biały</Checkbox>
            </Box>
          </GridItem>
          <GridItem p="2" area={'delete'} textAlign={'right'}>
            <Flex>
              <Spacer />
              <Tooltip label={'Usuń z listy'}>
                <CloseButton />
              </Tooltip>
              <Spacer />
            </Flex>
          </GridItem>
          <GridItem p="2" area={'notes'} textAlign={'right'}>
            <Flex width={'100%'} mb={'1em'}>
              <Input type={'text'} placeholder="Wprowadź notatki" />
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}
