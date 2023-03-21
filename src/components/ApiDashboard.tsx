import React from 'react';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { formatDistance } from 'date-fns';
import LargeHeading from './ui/LargeHeading';
import Paragraph from './ui/Paragraph';
import { Input } from './ui/Input';
import Table from './Table';
import ApiKeyOptions from './ApiKeyOptions';

const ApiDashboard = async () => {
  const user = await getServerSession(authOptions);

  if (!user) return notFound();

  const apiKeys = await db.apiKey.findMany({
    where: { userId: user.user.id },
  });

  const activeApiKey = apiKeys.find((key) => key.enabled);

  if (!activeApiKey) return notFound();

  const userRequests = await db.apiRequest.findMany({
    where: { apiKeyId: { in: apiKeys.map((key) => key.id) } },
  });

  const serializableUserRequests = userRequests.map((request) => ({
    ...request,
    timestamp: formatDistance(new Date(request.timestamp), new Date()),
  }));

  return (
    <div className='container flex flex-col gap-6'>
      <LargeHeading>Welcome back, {user.user.name}</LargeHeading>
      <div className='flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center'>
        <Paragraph>Your API Key:</Paragraph>
        <Input className='w-fit trunace' readOnly value={activeApiKey.key} />
      </div>
      <Paragraph className='text-center md:text-left mt-4 -mb-4'>
        Your API History:
      </Paragraph>
      <ApiKeyOptions apiKeyId={activeApiKey.id} apiKey={activeApiKey.key} />
      <Table userRequest={serializableUserRequests} />
    </div>
  );
};

export default ApiDashboard;
