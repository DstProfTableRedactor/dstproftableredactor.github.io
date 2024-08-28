export const useLoading = async (action: () => Promise<any>, isLoading: Ref<boolean>) => {
    isLoading.value = true;
    const actionResult = await action();
    isLoading.value = false;
  
    return actionResult;
}
  