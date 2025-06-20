import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface UseApiOptions {
  immediate?: boolean;
}

export function useApi<T>(
  apiCall: () => Promise<{ data: T }>,
  options: UseApiOptions = { immediate: true }
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall();
      setData(response.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao carregar dados';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (options.immediate) {
      execute();
    }
  }, []);

  return { data, loading, error, refetch: execute };
}

export function useApiMutation<T, P = any>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (
    apiCall: (params: P) => Promise<{ data: T }>,
    params: P,
    options?: {
      onSuccess?: (data: T) => void;
      onError?: (error: string) => void;
      successMessage?: string;
    }
  ) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall(params);
      
      if (options?.successMessage) {
        toast.success(options.successMessage);
      }
      
      if (options?.onSuccess) {
        options.onSuccess(response.data);
      }
      
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro na operação';
      setError(errorMessage);
      toast.error(errorMessage);
      
      if (options?.onError) {
        options.onError(errorMessage);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
}