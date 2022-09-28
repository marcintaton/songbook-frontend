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
  title: string;
  tags: ITag[];
  selectedTags: ITag[];
  setSelected: (tags: ITag[]) => void;
  shouldWarn?: boolean;
  warnText?: string;
}

export default function TagSelector(props: IProps) {
  const { title, tags, selectedTags, setSelected, shouldWarn, warnText } =
    props;
  const areAllSelected = tags.length === selectedTags.length;

  return (
    <Accordion allowToggle width={'100%'} maxWidth={'41em'}>
      <AccordionItem>
        <>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" color={'grey'}>
                {title}
              </Box>
              {shouldWarn && <Tag color={'grey'}>{warnText}</Tag>}
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
            {tags.map((tag) => {
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
      </AccordionItem>
    </Accordion>
  );
}
