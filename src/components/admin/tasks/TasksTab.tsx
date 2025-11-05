import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Input } from '../../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { Trash2, CheckCircle, Plus } from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { TaskItem, Priority } from '../../../types/taskManager';
import { useTasks } from '../../../hooks/useTaskManager.tsx';

// Estilos para las etiquetas de prioridad
const priorityStyles: Record<Priority, string> = {
  Alta: 'bg-red-900/40 text-red-300 border-red-700/50',
  Media: 'bg-yellow-900/40 text-yellow-300 border-yellow-700/50',
  Baja: 'bg-green-900/40 text-green-300 border-green-700/50',
};

// Subcomponente: Formulario de Entrada
const TaskInputForm: React.FC = () => {
  const { addTask } = useTasks();
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState<Priority>('Media');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskText.trim()) return;

    addTask(taskText, priority);
    setTaskText('');
    setPriority('Media');
  };

  return (
    <Card className="bg-background border-secondary/30 p-4 mb-6 mt-6">
      <form
        onSubmit={handleAddTask}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Input
          type="text"
          placeholder="Ingresa la nueva tarea a realizar..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className="flex-grow bg-card-background! border-secondary/30 text-headline placeholder-sub-headline"
        />
        <Select
          value={priority}
          onValueChange={(value: Priority) => setPriority(value as Priority)}
        >
          <SelectTrigger
            className={cn(
              'w-full sm:w-[150px] bg-card-background border-secondary/30 text-headline cursor-pointer',
              priorityStyles[priority]
            )}
          >
            <SelectValue placeholder="Prioridad" />
          </SelectTrigger>
          <SelectContent className="bg-card-background border-secondary/30 text-white p-2">
            <SelectItem
              value="Alta"
              className={cn('text-headline mb-2', priorityStyles['Alta'])}
            >
              Alta
            </SelectItem>
            <SelectItem
              value="Media"
              className={cn('text-headline mb-2', priorityStyles['Media'])}
            >
              Media
            </SelectItem>
            <SelectItem
              value="Baja"
              className={cn('text-headline', priorityStyles['Baja'])}
            >
              Baja
            </SelectItem>
          </SelectContent>
        </Select>
        <Button
          type="submit"
          className="w-full sm:w-auto bg-highlight hover:bg-highlight/70 cursor-pointer"
          disabled={!taskText.trim()}
        >
          <Plus className="w-4 h-4 mr-2" /> Agregar
        </Button>
      </form>
    </Card>
  );
};

// Subcomponente: Fila de Tarea
const TaskRow: React.FC<{ task: TaskItem }> = ({ task }) => {
  const { toggleTaskStatus, deleteTask } = useTasks();
  const isCompleted = task.status === 'Completed';

  return (
    <div
      className={cn(
        'flex items-center justify-between p-4 rounded-lg transition-all border border-secondary/30',
        isCompleted
          ? 'bg-card-background/50 line-through text-sub-headline'
          : 'bg-card-background hover:bg-card-background/80 text-headline'
      )}
    >
      <div className="flex items-center space-x-4 min-w-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => toggleTaskStatus(task.id)}
          className={cn(
            isCompleted
              ? 'text-green-400 hover:text-gray-300 hover:bg-green-900/20 cursor-pointer'
              : 'text-gray-300 hover:text-green-300 hover:bg-gray-700 cursor-pointer'
          )}
          title={
            isCompleted ? 'Marcar como Pendiente' : 'Marcar como Completada'
          }
        >
          <CheckCircle
            className="w-5 h-5"
            fill={isCompleted ? 'none' : 'none'}
          />
        </Button>
        <p
          className={cn(
            'flex-grow truncate',
            isCompleted ? 'text-gray-500' : 'text-white'
          )}
        >
          {task.text}
        </p>
        <span
          className={cn(
            'px-2 py-0.5 rounded-full text-xs font-semibold border hidden sm:block',
            priorityStyles[task.priority]
          )}
        >
          {task.priority}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => deleteTask(task.id)}
          className="text-red-500 hover:text-red-400 hover:bg-red-400/20 cursor-pointer"
          title="Eliminar Tarea"
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

// Componente Principal
export const TasksTab: React.FC = () => {
  const { tasks } = useTasks();

  return (
    <div className="space-y-6">
      <TaskInputForm />
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskRow key={task.id} task={task} />
        ))}
      </div>
      {tasks.length === 0 && (
        <p className="text-center text-sub-headline py-10">
          ¡No tienes tareas pendientes! Añade una arriba.
        </p>
      )}
    </div>
  );
};
