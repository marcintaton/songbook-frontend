import { Box, Text } from '@chakra-ui/react';

interface IProps {
  title: string;
  value: string;
  newLineTitle?: boolean;
  textColor?: string;
  fontStyle?: string;
}

export default function OptionalTextSection(props: IProps) {
  const { title, value, newLineTitle, textColor, fontStyle } = props;
  return (
    <>
      {value && (
        <Box
          style={{
            color: textColor,
            fontStyle,
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
