export interface Task {
    id?: number;
    title: string;
    description: string;
    completed: boolean; // Must exactly match the JSON property Spring Boot expects
    dueDate?: string;
}
