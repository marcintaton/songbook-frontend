import { SimpleGrid, GridItem, Box } from '@chakra-ui/react';

interface IProps extends React.PropsWithChildren {
  maxWidth?: string;
}

export default function ViewRoot(props: IProps) {
  const { maxWidth } = props;

  return (
    <SimpleGrid
      columns={[1, 1, 3]}
      templateColumns={['1fr', '1fr', 'repeat(5, 1fr)']}
    >
      <GridItem colSpan={[0, 0, 1]}></GridItem>
      <GridItem colSpan={[0, 0, 3]}>
        <Box margin={'auto'} maxWidth={maxWidth || 'auto'}>
          {props.children}
        </Box>
      </GridItem>
      <GridItem colSpan={[0, 0, 1]}></GridItem>
    </SimpleGrid>
  );
}
