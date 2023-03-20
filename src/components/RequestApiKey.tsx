'use client';

import React, { FormEvent, useState } from 'react';
import { createApiKey } from '@/helpers/createApiKey';
import { toast } from './ui/Toast';
import { Key } from 'lucide-react';
import LargeHeading from './ui/LargeHeading';
import Paragraph from './ui/Paragraph';
import CopyButton from './ui/CopyButton';
import { Input } from './ui/Input';
import Button from './ui/Button';
const RequestApiKey = () => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

  const createNewApiKey = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      const newApiKey = await createApiKey();
      setApiKey(newApiKey);
    } catch (error) {
      toast({
        title: 'Error',
        message:
          error instanceof Error ? error.message : 'Something went wrong',
        type: 'error',
      });

      return;
    } finally {
      setApiKey(apiKey);
      setIsCreating(false);
    }
  };

  return (
    <div className='container md:max-w-2xl'>
      <div className='flex flex-col gap-6 items-center'>
        <Key className='mx-auto h-12 w-12 text-gray-400' />
        <LargeHeading>Request Your API Key</LargeHeading>
        <Paragraph>You haven&apos;t requested an API key yet.</Paragraph>
      </div>

      <form
        onSubmit={createNewApiKey}
        className='mt-6 sm:flex sm:items-center'
        action='#'
      >
        <div className='relative sounrded-md shadow-sm sm:min-w-0 sm:flex-1'>
          {apiKey && (
            <>
              <CopyButton
                valueToCopy={apiKey}
                className='absolute inset-y-0 right-0 animate-in fade-in duration-300'
              />
            </>
          )}
          <Input
            readOnly
            value={apiKey ?? ''}
            placeholder='Request an API key to display it here.'
          />
        </div>
        <div className='mt-3 flex justify-center sm:mt-0 sm:ml-4 sm:flex-shrink-0'>
          <Button disabled={!!apiKey} isLoading={isCreating}>
            Request key
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RequestApiKey;
