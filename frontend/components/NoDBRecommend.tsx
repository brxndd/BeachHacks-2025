'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function NoDBRecommend() {
  const searchParams = useSearchParams();
  const [data, setData] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchParams) {
      const dataStr = searchParams.get('data');

      if (dataStr) {
        try {
          const data = JSON.parse(decodeURIComponent(dataStr));
          setFormData(data); // Set the form data from the parsed JSON string
        } catch (error) {
          setError('Failed to parse form data.');
        }
      }
    }
  }, [searchParams]);

  if (!data) {
    return <div className="mt-28 p-6 max-w-7xl mx-auto">Loading form data...</div>;
  }

  return (
    <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
      <h2 className="font-semibold">Form Data in NoDBRecommend Component:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
