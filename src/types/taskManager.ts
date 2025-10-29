export interface Note {
  id: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export type Priority = 'Baja' | 'Media' | 'Alta';
export type TaskStatus = 'Pending' | 'Completed';

export interface TaskItem {
  id: string;
  text: string;
  priority: Priority;
  status: TaskStatus;
  createdAt: number;
}
