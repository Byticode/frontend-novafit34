import React, { useState } from 'react';
import { Card, CardContent } from '../../ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import { Button } from '../../ui/button';
import { CheckCircle, Clock } from 'lucide-react';
import type { Task, TaskStatus } from '../../../types/dashboard';
import { DUMMY_TASKS } from '../../../types/dashboard';
import { cn } from '../../../lib/utils';

export const TasksSummary: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(DUMMY_TASKS);

  // Función para cambiar el estado de la tarea
  const toggleTaskStatus = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === 'Pendiente' ? 'Completada' : 'Pendiente',
            }
          : task
      )
    );
  };

  // Componente auxiliar para el estado
  const StatusTag: React.FC<{ status: TaskStatus }> = ({ status }) => {
    const isCompleted = status === 'Completada';
    return (
      <span
        className={cn(
          'px-3 py-1 rounded-full text-xs font-semibold w-fit',
          isCompleted
            ? 'bg-green-900/30 text-green-300'
            : 'bg-orange-900/30 text-orange-300'
        )}
      >
        {isCompleted ? 'Completado' : 'Pendiente'}
      </span>
    );
  };

  return (
    <div className="space-y-4 mb-10">
      <h2 className="text-2xl font-bold text-headline">Resumen de Tareas</h2>
      <Card className="bg-card-background border-sm border-secondary/30 shadow-md p-6">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-secondary/30 bg-card-background hover:bg-card-background">
                <TableHead className="text-sm font-medium text-headline w-1/2">
                  Tarea
                </TableHead>
                <TableHead className="text-sm font-medium text-headline w-1/4">
                  Estado
                </TableHead>
                <TableHead className="text-sm font-medium text-headline w-1/4">
                  Fecha Límite
                </TableHead>
                <TableHead className="text-sm font-medium text-headline text-right">
                  Acción
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow
                  key={task.id}
                  className="border-secondary/20 hover:bg-background/20 transition-colors"
                >
                  <TableCell className="font-medium text-sub-headline">
                    {task.taskName}
                  </TableCell>
                  <TableCell>
                    <StatusTag status={task.status} />
                  </TableCell>
                  <TableCell className="text-sub-headline">
                    {task.dueDate}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleTaskStatus(task.id)}
                      className={cn(
                        'h-8 px-2',
                        task.status === 'Pendiente'
                          ? 'text-tertiary hover:text-tertiary hover:bg-tertiary/20 cursor-pointer'
                          : 'text-orange-400 hover:text-orange-400 hover:bg-orange-300/20 cursor-pointer'
                      )}
                      title={
                        task.status === 'Pendiente'
                          ? 'Marcar como Completada'
                          : 'Marcar como Pendiente'
                      }
                    >
                      {task.status === 'Pendiente' ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Clock className="w-4 h-4" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
