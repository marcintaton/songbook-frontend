import { Heading } from '@chakra-ui/react';

interface IProps {
  size: 'sm' | 'lg';
}

export default function HeadingMain(props: IProps) {
  const { size } = props;

  const titleSize = size === 'lg' ? '4xl' : 'lg';
  const subTitleSize = size === 'lg' ? 'lg' : 'sm';

  return (
    <>
      <Heading
        pt={'0.4em'}
        as="h1"
        size={titleSize}
        textAlign={'center'}
        bgGradient={'linear(to-r, blue.500, purple.500)'}
        bgClip={'text'}
      >
        Śpiewnik Oazowy
      </Heading>
      <Heading as="h6" size={subTitleSize} textAlign={'center'}>
        Oaza Dorosłych Knurów
      </Heading>
    </>
  );
}
