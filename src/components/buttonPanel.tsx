import {
  Tooltip,
  Button,
  Box,
  ButtonGroup,
  SimpleGrid,
} from '@chakra-ui/react';

interface IProps {
  buttons: {
    action: () => void;
    icon: string | JSX.Element;
    tooltip: string;
    key: string;
    disabled?: boolean;
  }[];
  color: string;
  variant: 'outline' | 'solid' | 'subtle' | 'ghost';
  size: string;
  isAttached: boolean;
}

export default function ButtonPanel(props: IProps) {
  const { buttons, color, variant, size, isAttached } = props;

  return (
    <Box>
      <ButtonGroup isAttached={isAttached} variant={variant} size={size}>
        <SimpleGrid columns={[4, 8]}>
          {buttons.map((button) => (
            <Tooltip key={button.key} label={button.tooltip}>
              <Button
                onClick={button.action}
                disabled={button.disabled}
                colorScheme={color}
                size={'lg'}
              >
                {button.icon}
              </Button>
            </Tooltip>
          ))}
        </SimpleGrid>
      </ButtonGroup>
    </Box>
  );
}
