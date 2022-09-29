import { Box, Text } from '@chakra-ui/react';

interface IProps {
  title: string;
  value: string;
  newLineTitle?: boolean;
}

export default function OptionalTextSection(props: IProps) {
  const { title, value, newLineTitle } = props;
  return (
    <>
      {value && (
        <Box
          style={{
            whiteSpace: 'pre-wrap',
            display: newLineTitle ? 'inherit' : 'flex',
          }}
        >
          <Text fontWeight={'bold'}>{`${title} `}</Text>
          <Text>{value}</Text>
        </Box>
      )}
    </>
  );
}
