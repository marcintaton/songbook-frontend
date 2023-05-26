import {
  Box,
  Checkbox,
  CloseButton,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Input,
  Spacer,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from 'react-icons/bs';
import IPrintListItem from '@src/types/interfaces/iPrintListItem';

interface IProps {
  item: IPrintListItem;
  onChange: (payload: IPrintListItem) => void;
  onReorder: (up: boolean, position: number) => void;
}

export default function PrintListElement(props: IProps) {
  const { item, onChange, onReorder } = props;

  return (
    <Box
      boxShadow={'2xl'}
      border={'1px'}
      borderColor={'lightgrey'}
      rounded={'md'}
      overflow={'hidden'}
      maxW={'100%'}
      w={'full'}
    >
      <Grid
        templateAreas={`"nav header delete"
                  "nav controls controls"
                  "nav notes notes"
                  `}
        gridTemplateRows={[
          '0.25fr 1fr 0.25fr',
          '0.25fr 1fr 0.25fr',
          '0.5fr 1fr 0.5fr',
        ]}
        gridTemplateColumns={'1fr 18fr 1fr'}
        h="100%"
        gap="2"
        margin={'2'}
      >
        <GridItem p="2" backgroundColor={'white.300'} area={'header'}>
          <Text fontWeight={'bold'} fontSize={'1.5em'}>
            {item.song.title}
          </Text>
        </GridItem>
        <GridItem p="2" backgroundColor={'white.300'} area={'nav'}>
          <Flex flexDirection={'column'} height={'100%'}>
            <Spacer />
            <Tooltip label={'Przesuń w górę'}>
              <IconButton
                mt={'0.5em'}
                fontSize={'1.5em'}
                variant={'ghost'}
                onClick={() => onReorder(true, item.orderId)}
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
                onClick={() => onReorder(false, item.orderId)}
                color={'purple'}
                aria-label={''}
              >
                <Icon as={BsFillArrowDownCircleFill} />
              </IconButton>
            </Tooltip>
            <Spacer />
          </Flex>
        </GridItem>
        <GridItem backgroundColor={'white.300'} area={'controls'}>
          <Grid templateColumns={['1fr', '1fr', '1fr 1fr 2fr']}>
            <Checkbox
              m={'1em'}
              isChecked={item.areChordsVisible}
              onChange={() =>
                onChange({
                  ...item,
                  areChordsVisible: !item.areChordsVisible,
                })
              }
            >
              Pokaż chwyty
            </Checkbox>
            <Checkbox
              m={'1em'}
              isChecked={item.shouldPrintBnW}
              onChange={() =>
                onChange({
                  ...item,
                  shouldPrintBnW: !item.shouldPrintBnW,
                })
              }
            >
              Czarno biały
            </Checkbox>
            <HStack m={'1em'} maxW={'10em'}>
              <Text>Trans.</Text>
              <Input type={'number'} disabled></Input>
            </HStack>
          </Grid>
        </GridItem>
        <GridItem
          p="2"
          backgroundColor={'white.300'}
          area={'delete'}
          textAlign={'right'}
        >
          <Flex>
            <Spacer />
            <Tooltip label={'Usuń z listy'}>
              <CloseButton disabled />
            </Tooltip>
            <Spacer />
          </Flex>
        </GridItem>
        <GridItem
          p="2"
          backgroundColor={'white.300'}
          area={'notes'}
          textAlign={'right'}
        >
          <Flex width={'100%'}>
            <Input type={'text'} placeholder="Wprowadź notatki" disabled />
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
}