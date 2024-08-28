export type TemplateWithAlert<T> = {
    value: T;
    showAlert: boolean;
    alertText: string | undefined;
}
