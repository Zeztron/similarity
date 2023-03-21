'use client';

import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Button from '@/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/DropdownMenu';
import { toast } from '@/ui/Toast';
import { useRouter } from 'next/navigation';
import { revokeApiKey } from '@/helpers/revokeApiKey';
import { createApiKey } from '@/helpers/createApiKey';

interface ApiKeyOptionsProps {
  apiKeyId: string;
  apiKey: string;
}

const ApiKeyOptions: React.FC<ApiKeyOptionsProps> = ({ apiKey, apiKeyId }) => {
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [isRevoking, setIsRevoking] = useState<boolean>(false);
  const router = useRouter();

  const createNewApiKey = async () => {
    setIsCreatingNew(true);

    try {
      // Revoke
      await revokeApiKey({ apiKeyId });
      await createApiKey();
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error creating API key',
        message: 'Please try again later',
        type: 'error',
      });
    } finally {
      setIsCreatingNew(false);
    }
  };

  const revokeCurrentApiKey = async () => {
    setIsRevoking(true);

    try {
      await revokeApiKey({ apiKeyId });
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error revoking API key',
        message: 'Please try again later',
        type: 'error',
      });
    } finally {
      setIsRevoking(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isCreatingNew || isRevoking} asChild>
        <Button variant='ghost' className='flex gap-2 items-center'>
          <p>
            {isCreatingNew
              ? 'Creating new key'
              : isRevoking
              ? 'Revoking key'
              : 'Options'}
          </p>
          {isCreatingNew ||
            (isRevoking && <Loader2 className='animate-spin h-4 w-4' />)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(apiKey);

            toast({
              title: 'Copied',
              message: 'API key copied to clipboard',
              type: 'success',
            });
          }}
        >
          Copy
        </DropdownMenuItem>
        <DropdownMenuItem onClick={createNewApiKey}>
          Create new key
        </DropdownMenuItem>
        <DropdownMenuItem onClick={revokeCurrentApiKey}>
          Revoke Key
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ApiKeyOptions;
