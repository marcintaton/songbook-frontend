import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Tag,
  AccordionIcon,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import ITag from '@src/types/models/iTag';

interface IProps {
  tags: ITag[];
  selectedTags: ITag[];
  setSelected: (tags: ITag[]) => void;
}

export default function TagSelector(props: IProps) {
  const { tags, selectedTags, setSelected } = props;
  const areAllSelected = tags.length === selectedTags.length;

  return (
    <Accordion allowToggle width={'100%'} maxWidth={'41em'}>
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" color={'grey'}>
                  Filtruj...
                </Box>
                <Tag
                  display={!areAllSelected && !isExpanded ? 'inherit' : 'none'}
                  color={'grey'}
                >
                  Filtry Aktywne!
                </Tag>
                <AccordionIcon color={'grey'} />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Tag
                colorScheme={!areAllSelected ? 'purple' : 'blue'}
                variant={!areAllSelected ? 'subtle' : 'solid'}
                m={'0.1em'}
                onClick={() => {
                  if (tags.length === selectedTags.length) setSelected([]);
                  else setSelected([...tags]);
                }}
              >
                Wszystkie
              </Tag>
              {[...tags, ...tags, ...tags, ...tags].map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <Tag
                    colorScheme={isSelected ? 'blue' : 'purple'}
                    variant={isSelected ? 'solid' : 'subtle'}
                    key={tag._id}
                    m={'0.1em'}
                    as={'button'}
                    onClick={() => {
                      if (isSelected)
                        setSelected([
                          ...selectedTags.filter((x) => x._id !== tag._id),
                        ]);
                      else setSelected([...selectedTags, tag]);
                    }}
                  >
                    {tag.name}
                  </Tag>
                );
              })}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
}
