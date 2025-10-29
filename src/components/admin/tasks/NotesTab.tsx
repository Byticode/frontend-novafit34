import React, { useState, useEffect } from 'react';
import { Button } from '../../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '../../ui/dialog';
import { Textarea } from '../../ui/textarea';
import { Trash2, Plus } from 'lucide-react';
import type { Note } from '../../../types/taskManager';
import { useNotes } from '../../../hooks/useTaskManager.tsx';

// UTILITIES
// Función para obtener el título de la nota en la primera línea
const getNoteTitle = (content: string) => {
  if (!content) return 'Nota sin título';
  const firstLine = content.trim().split('\n')[0].trim();
  if (firstLine && firstLine.length > 0) {
    return firstLine.length > 50
      ? firstLine.substring(0, 50) + '...'
      : firstLine;
  }
  const bodyPreview = content.substring(0, 50).trim();
  return bodyPreview || 'Nota sin título';
};

// Subcomponente: Editor de Notas (Modal)
interface NoteEditorProps {
  note: Note;
  saveNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  setIsOpen: (open: boolean) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({
  note,
  saveNote,
  deleteNote,
  setIsOpen,
}) => {
  const initialContentParts = note.content.split('\n');
  const initialTitle = initialContentParts[0] || '';
  const initialBody = initialContentParts.slice(1).join('\n');

  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);

  // Lógica de debounce para guardar mientras se escribe
  useEffect(() => {
    const handler = setTimeout(() => {
      const newContent = `${title}\n${body}`;
      if (newContent !== note.content) {
        saveNote({ ...note, content: newContent });
      }
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [title, body, note, saveNote]);

  // Al cerrar, asegurar que se guarda la última versión
  const handleClose = (open: boolean) => {
    const newContent = `${title}\n${body}`;
    if (!open && newContent !== note.content) {
      saveNote({ ...note, content: newContent });
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-4xl bg-bg-primary border-gray-700 p-6">
        <DialogHeader>
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteNote(note.id)}
              className="text-red-500 hover:bg-red-400/20 hover:text-red-400 cursor-pointer"
            >
              <Trash2 className="w-4 h-4 mr-2" /> Eliminar Nota
            </Button>
          </div>
        </DialogHeader>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tu título..."
          className="w-full bg-transparent text-white border-none focus:ring-0 p-0 text-2xl font-bold focus:outline-none"
        />
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Escribe el resto de tu nota aquí..."
          className="w-full min-h-[360px] bg-transparent text-gray-300 border-none focus:ring-0 focus-none p-0 text-base resize-none focus:outline-none mt-2"
          style={{
            fontFamily: 'Inter, sans-serif',
            lineHeight: 1.6,
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

// Subcomponente: Tarjeta de Nota
const NoteCard: React.FC<{
  note: Note;
  saveNote: (note: Note) => void;
  deleteNote: (id: string) => void;
}> = ({ note, saveNote, deleteNote }) => {
  const [isOpen, setIsOpen] = useState(false);
  const title = getNoteTitle(note.content);
  const date = new Date(note.updatedAt).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <>
      <DialogTrigger asChild>
        <Card
          className="bg-gray-800/80 border border-gray-700 cursor-pointer hover:border-indigo-500 transition-colors h-[150px] px-2 py-4"
          onClick={() => setIsOpen(true)}
        >
          <CardHeader className="p-4 pb-0">
            <CardTitle className="text-lg font-bold text-white line-clamp-2 min-h-[50px]">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <CardDescription className="text-xs text-gray-400">
              Modificado: {date}
            </CardDescription>
          </CardContent>
        </Card>
      </DialogTrigger>
      {isOpen && (
        <NoteEditor
          note={note}
          saveNote={saveNote}
          deleteNote={deleteNote}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
};

// Componente Principal
export const NotesTab: React.FC = () => {
  const { notes, saveNote, deleteNote } = useNotes();

  const handleCreateNewNote = () => {
    const newNotePlaceholder: Note = {
      id: 'new', // ID temporal para crear
      content: 'Nueva Nota',
      createdAt: 0,
      updatedAt: 0,
    };
    saveNote(newNotePlaceholder);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          onClick={handleCreateNewNote}
          className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-2" /> Crear Nueva Nota
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {notes.map((note) => (
          <Dialog key={note.id}>
            <NoteCard note={note} saveNote={saveNote} deleteNote={deleteNote} />
          </Dialog>
        ))}
      </div>
      {notes.length === 0 && (
        <p className="text-center text-gray-500 py-10">
          Aún no tienes notas. ¡Crea una para comenzar!
        </p>
      )}
    </div>
  );
};
