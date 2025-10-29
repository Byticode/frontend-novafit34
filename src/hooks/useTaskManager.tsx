import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  TaskItem,
  Note,
  Priority,
  TaskStatus,
} from '../types/taskManager';

// TIPOS PARA EL CONTEXTO
interface TaskManagerContextType {
  tasks: TaskItem[];
  notes: Note[];
  addTask: (text: string, priority: Priority) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  saveNote: (note: Note) => void;
  deleteNote: (id: string) => void;
}

// CONFIGURACIÓN DE PERSISTENCIA
const NOTES_STORAGE_KEY = 'admin_notes_storage';
const TASKS_STORAGE_KEY = 'admin_tasks_storage';

// FUNCIÓN DE ORDENACIÓN
const sortTasks = (tasks: TaskItem[]) => {
  // Crea una copia para no mutar el estado original antes de ordenar
  return [...tasks].sort((a, b) => {
    if (a.status === 'Pending' && b.status === 'Completed') return -1;
    if (a.status === 'Completed' && b.status === 'Pending') return 1;
    return b.createdAt - a.createdAt;
  });
};

// DATOS DE EJEMPLO
const DUMMY_TASKS: TaskItem[] = [
  {
    id: '1',
    text: 'Revisar inventario de suplementos',
    priority: 'Alta',
    status: 'Pending',
    createdAt: Date.now() - 100000,
  },
  {
    id: '2',
    text: 'Llamar al técnico para la caminadora #3',
    priority: 'Media',
    status: 'Pending',
    createdAt: Date.now() - 200000,
  },
  {
    id: '3',
    text: 'Planificar clase de spinning del viernes',
    priority: 'Baja',
    status: 'Completed',
    createdAt: Date.now() - 300000,
  },
];

const DUMMY_NOTES: Note[] = [
  {
    id: 'note-1',
    content:
      'Ideas para la campaña de verano\n- Descuento en planes anuales\n- Clases especiales al aire libre',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'note-2',
    content: 'Contacto de proveedores\n- Suplementos XYZ: 123-456-7890',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

// CREACIÓN DEL CONTEXTO
const TaskManagerContext = createContext<TaskManagerContextType | undefined>(
  undefined
);

// PROVIDER COMPONENT
export const TaskManagerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    return storedTasks
      ? sortTasks(JSON.parse(storedTasks))
      : sortTasks(DUMMY_TASKS);
  });
  const [notes, setNotes] = useState<Note[]>(() => {
    const storedNotes = localStorage.getItem(NOTES_STORAGE_KEY);
    return storedNotes ? JSON.parse(storedNotes) : DUMMY_NOTES;
  });

  // // Cargar estado desde localStorage al montar el componente
  // useEffect(() => {
  //     const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
  //     setTasks(storedTasks ? sortTasks(JSON.parse(storedTasks)) : sortTasks(DUMMY_TASKS));

  //     const storedNotes = localStorage.getItem(NOTES_STORAGE_KEY);
  //     setNotes(storedNotes ? JSON.parse(storedNotes) : DUMMY_NOTES);
  // }, []);

  // Guardar estado en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  // LÓGICA DE TAREAS
  const addTask = (text: string, priority: Priority) => {
    const newTask: TaskItem = {
      id: crypto.randomUUID(),
      text,
      priority,
      status: 'Pending',
      createdAt: Date.now(),
    };
    setTasks((prevTasks) => sortTasks([newTask, ...prevTasks]));
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleTaskStatus = (id: string) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === id) {
          const newStatus: TaskStatus =
            task.status === 'Completed' ? 'Pending' : 'Completed';
          return { ...task, status: newStatus };
        }
        return task;
      });
      return sortTasks(updatedTasks);
    });
  };

  // LÓGICA DE NOTAS
  const saveNote = (noteToSave: Note) => {
    setNotes((prevNotes) => {
      const existingNoteIndex = prevNotes.findIndex(
        (n) => n.id === noteToSave.id
      );
      if (existingNoteIndex > -1) {
        // Actualizar nota existente
        const updatedNotes = [...prevNotes];
        updatedNotes[existingNoteIndex] = {
          ...noteToSave,
          updatedAt: Date.now(),
        };
        return updatedNotes;
      } else {
        // Crear nueva nota
        const newNote: Note = {
          ...noteToSave,
          id: `note-${Date.now()}`,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        return [newNote, ...prevNotes];
      }
    });
  };

  const deleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const value = {
    tasks,
    notes,
    addTask,
    deleteTask,
    toggleTaskStatus,
    saveNote,
    deleteNote,
  };

  return (
    <TaskManagerContext.Provider value={value}>
      {children}
    </TaskManagerContext.Provider>
  );
};

const useTaskManager = () => {
  const context = useContext(TaskManagerContext);
  if (context === undefined) {
    throw new Error(
      'useTaskManager debe ser usado dentro de un TaskManagerProvider'
    );
  }
  return context;
};

// Hooks específicos para desacoplar componentes
export const useTasks = () => {
  const { tasks, addTask, deleteTask, toggleTaskStatus } = useTaskManager();
  return { tasks, addTask, deleteTask, toggleTaskStatus };
};

export const useNotes = () => {
  const { notes, saveNote, deleteNote } = useTaskManager();
  return { notes, saveNote, deleteNote };
};
