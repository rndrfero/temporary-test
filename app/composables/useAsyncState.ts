export function useAsyncState() {
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function withLoadingAndError<T>(action: () => Promise<T>): Promise<T> {
    loading.value = true;
    error.value = null;
    try {
      return await action();
    } catch (err: any) {
      error.value = err.message || "An error occurred";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    loading: readonly(loading),
    error, // Keep error writable so stores can manually clear it
    withLoadingAndError,
  };
}
