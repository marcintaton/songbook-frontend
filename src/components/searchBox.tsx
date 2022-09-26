import { SearchIcon } from '@chakra-ui/icons';
import { InputGroup, Input, InputRightElement, Tag } from '@chakra-ui/react';

interface IProps {
  onInputChange: (v: string) => void;
  value: string;
  placeholder: string;
  foundItemsCount: number;
}

export default function SearchBox(props: IProps) {
  const { onInputChange, value, placeholder, foundItemsCount } = props;

  return (
    <InputGroup pt={'5em'}>
      <Input
        value={value}
        onChange={(event) => onInputChange(event.target.value)}
        placeholder={placeholder}
        size="lg"
      />
      <InputRightElement pt={'5em'} pr={'0.5em'}>
        {value !== '' && (
          <Tag color={'grey'} mt={'3.3em'}>
            {foundItemsCount}
          </Tag>
        )}
        {value === '' && <SearchIcon mt={'3em'} color={'grey'} />}
      </InputRightElement>
    </InputGroup>
  );
}
