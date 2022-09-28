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
          backgroundColor={'blue.500'}
          m={'0.1em'}
          key={tag}
          variant={'solid'}
        >
          {tag}
        </Tag>
      ))}
    </Box>
  );
}
