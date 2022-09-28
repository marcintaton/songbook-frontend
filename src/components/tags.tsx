import { Box, Tag } from '@chakra-ui/react';

interface IProps {
  tags: string[];
}

export default function Tags(props: IProps) {
  const { tags } = props;
  return (
    <Box pt={'1em'}>
      {tags.map((tag) => (
        <Tag
          backgroundColor={'blue'}
          m={'0.1em'}
          key={tag}
          colorScheme={'blue'}
          variant={'solid'}
        >
          {tag}
        </Tag>
      ))}
    </Box>
  );
}
