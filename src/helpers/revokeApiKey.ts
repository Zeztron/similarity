export const revokeApiKey = async ({ apiKeyId }: { apiKeyId: string }) => {
  const response = await fetch('/api/api-key/revoke', {
    method: 'POST',
    headers: { contentType: 'application/json' },
    body: JSON.stringify({ apiKeyId }),
  });

  const data = (await response.json()) as { error?: string };

  if (data.error) {
    throw new Error(data.error);
  }
};
