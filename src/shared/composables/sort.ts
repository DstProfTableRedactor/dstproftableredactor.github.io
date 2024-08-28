export const useSortByIndex = (items: any[]) => {
    return items.sort((first, second) => 
        first.index - second.index
    )
}