import React from 'react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '../../components/ui/tabs';
import { TasksTab } from '../../components/admin/tasks/TasksTab';
import { NotesTab } from '../../components/admin/tasks/NotesTab';
import { TaskManagerProvider } from '../../hooks/useTaskManager.tsx';

export const TasksPage: React.FC = () => {
  return (
    <TaskManagerProvider>
      <div className="min-h-screen p-4 lg:p-8 space-y-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-headline">
          Tareas y Notas
        </h1>

        <Tabs defaultValue="tasks">
          <TabsList>
            <TabsTrigger className="cursor-pointer" value="tasks">
              Lista de Tareas
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="notes">
              Notas Rápidas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tasks">
            <TasksTab />
          </TabsContent>

          <TabsContent value="notes">
            <NotesTab />
          </TabsContent>
        </Tabs>
      </div>
    </TaskManagerProvider>
  );
};
