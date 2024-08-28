export const useSleep = async (time: number) => {
    await timeout(time);
};

const timeout = (time: number): Promise<unknown> => {
    return new Promise(resolve => setTimeout(resolve, time));
}