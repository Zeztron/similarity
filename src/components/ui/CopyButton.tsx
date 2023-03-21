import { Copy } from 'lucide-react';
import React, { ButtonHTMLAttributes } from 'react';
import Button from './Button';
import { toast } from './Toast';

interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  valueToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({
  valueToCopy,
  className,
  ...props
}) => {
  return (
    <Button
      className={className}
      {...props}
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(valueToCopy);

        toast({
          title: 'Copied!',
          message: 'API key copied to clipboard',
          type: 'success',
        });
      }}
      variant='ghost'
    >
      <Copy className='h-5 w-5' />
    </Button>
  );
};

export default CopyButton;
