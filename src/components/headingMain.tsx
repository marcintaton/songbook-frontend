import { Heading } from '@chakra-ui/react';

interface IProps {
  size: 'sm' | 'md' | 'lg';
  title: string;
  subTitle?: string;
}

export default function HeadingMain(props: IProps) {
  const { size, title, subTitle } = props;

  let titleSize = 'lg';
  if (size === 'md') titleSize = '2xl';
  if (size === 'lg') titleSize = '4xl';

  return (
    <>
      <Heading
        pt={'0.4em'}
        as="h1"
        size={titleSize}
        bgGradient={'linear(to-r, blue.500, purple.500)'}
        bgClip={'text'}
        textAlign={'center'}
      >
        {title}
      </Heading>
      {subTitle && (
        <Heading as="h1" size={size} textAlign={'center'}>
          {subTitle}
        </Heading>
      )}
    </>
  );
}