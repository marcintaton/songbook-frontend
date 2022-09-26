import { SimpleGrid, GridItem, Center } from '@chakra-ui/react';

export default function ViewRoot(props: React.PropsWithChildren) {
  return (
    <SimpleGrid
      columns={[1, 1, 3]}
      templateColumns={['1fr', '1fr', 'repeat(5, 1fr)']}
    >
      <GridItem colSpan={[0, 0, 1]}></GridItem>
      <GridItem colSpan={[0, 0, 3]}>
        <Center margin={'auto'} maxWidth={'41.8em'}>
          {props.children}
        </Center>
      </GridItem>
      <GridItem colSpan={[0, 0, 1]}></GridItem>
    </SimpleGrid>
  );
}
