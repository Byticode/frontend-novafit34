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
            ? 'bg-green-900/40 text-green-300'
            : 'bg-orange-900/40 text-orange-300'
        )}
      >
        {isCompleted ? 'Completado' : 'Pendiente'}
      </span>
    );
  };

  return (
    <div className="space-y-4 mb-10">
      <h2 className="text-2xl font-bold text-white">Resumen de Tareas</h2>
      <Card className="bg-card border border-gray-800 shadow-md p-6">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 bg-[var(--blue-primary)] hover:bg-[var(--blue-primary)]">
                <TableHead className="text-sm font-medium text-gray-400 w-1/2">
                  Tarea
                </TableHead>
                <TableHead className="text-sm font-medium text-gray-400 w-1/4">
                  Estado
                </TableHead>
                <TableHead className="text-sm font-medium text-gray-400 w-1/4">
                  Fecha Límite
                </TableHead>
                <TableHead className="text-sm font-medium text-gray-400 text-right">
                  Acción
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow
                  key={task.id}
                  className="border-gray-800 hover:bg-gray-700/30 transition-colors"
                >
                  <TableCell className="font-medium text-white">
                    {task.taskName}
                  </TableCell>
                  <TableCell>
                    <StatusTag status={task.status} />
                  </TableCell>
                  <TableCell className="text-gray-300">
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
                          ? 'text-green-500 hover:bg-green-300/30 cursor-pointer'
                          : 'text-orange-500 hover:bg-orange-300/30 cursor-pointer'
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
