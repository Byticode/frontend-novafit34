import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Calendar } from '../../components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
// import { cn } from '../../lib/utils';

export const ClassesPage: React.FC = () => {
  const [activeView, setActiveView] = useState<'semana' | 'lista'>('semana');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [className, setClassName] = useState('');
  const [classDescription, setClassDescription] = useState('');
  const [instructor, setInstructor] = useState('');
  const [day, setDay] = useState<string | undefined>(undefined);
  const [hour, setHour] = useState<string | undefined>(undefined);
  const [duration, setDuration] = useState('');
  const [capacity, setCapacity] = useState('');
  // const [errors, setErrors] = useState<Record<string, string>>({});
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const [errors, setErrors] = useState<{
    className?: string;
    classDescription?: string;
    instructor?: string;
    day?: string;
    hour?: string;
    duration?: string;
    capacity?: string;
  }>({});

  const handleSaveClass = () => {
    const newErrors: Record<string, string> = {};

    if (!className) {
      newErrors['className'] = 'El nombre es requerido.';
    }
    if (!classDescription) {
      newErrors['classDescription'] = 'La descripción es requerida.';
    }
    if (!instructor) {
      newErrors['instructor'] = 'El instructor es requerido.';
    }
    if (!day) {
      newErrors['day'] = 'El día es requerido.';
    }
    if (!hour) {
      newErrors['hour'] = 'La hora es requerida.';
    }
    if (!duration) {
      newErrors['duration'] = 'La duración es requerida.';
    }
    if (!capacity) {
      newErrors['capacity'] = 'La capacidad es requerida.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Logica para guardar la clase (por ahora solo cierra el modal)
    console.log('Clase guardada:', {
      className,
      classDescription,
      instructor,
      day,
      hour,
      duration,
      capacity,
    });
    setIsModalOpen(false);
    // Limpiar campos después de guardar
    setClassName('');
    setClassDescription('');
    setInstructor('');
    setDay(undefined);
    setHour(undefined);
    setDuration('');
    setCapacity('');
    setErrors({});
  };

  const handleCancelClass = () => {
    setIsModalOpen(false);
    // Limpiar campos al cancelar
    setClassName('');
    setClassDescription('');
    setInstructor('');
    setDay(undefined);
    setHour(undefined);
    setDuration('');
    setCapacity('');
    setErrors({});
  };

  // const currentMonthName = date?.toLocaleString('es-ES', { month: 'long', year: 'numeric' }) || 'Mes Año';

  return (
    <div className="min-h-screen pt-0 p-4 lg:p-8 lg:pt-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 lg:mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-0">
          Horario de clases
        </h1>

        {/* Botón para abrir el modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center cursor-pointer">
              <Plus className="w-5 h-5 mr-2" /> Añadir clase
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px] md:max-w-3xl max-h-[98%] border-blue-primary/50 bg-bg-primary text-white">
            <DialogHeader className="pb-2">
              <DialogTitle className="text-2xl font-bold text-white">
                Añadir nueva clase
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              {/* Nombre de la clase */}
              <div>
                <label
                  htmlFor="className"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Nombre de la clase
                </label>
                <Input
                  id="className"
                  placeholder="Ej: Yoga para principiantes"
                  value={className}
                  onChange={(e) => {
                    setClassName(e.target.value);
                    setErrors((prev) => ({ ...prev, className: '' }));
                  }}
                  className={`bg-blue-primary/50 text-white border ${errors.className ? 'border-red-500' : 'border-gray-700/50'} focus:ring-indigo-500 focus:border-indigo-500`}
                />
                {errors.className && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.className}
                  </p>
                )}
              </div>
              {/* Descripción */}
              <div className="md:col-span-2">
                <label
                  htmlFor="classDescription"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Descripción
                </label>
                <Textarea
                  id="classDescription"
                  placeholder="Descripción detallada de la clase..."
                  value={classDescription}
                  onChange={(e) => {
                    setClassDescription(e.target.value);
                    setErrors((prev) => ({ ...prev, classDescription: '' }));
                  }}
                  className={`min-h-[100px] bg-blue-primary/50 text-white border ${errors.classDescription ? 'border-red-500' : 'border-gray-700/50'} focus:ring-indigo-500 focus:border-indigo-500`}
                />
                {errors.classDescription && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.classDescription}
                  </p>
                )}
              </div>
              {/* Instructor */}
              <div>
                <label
                  htmlFor="instructor"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Instructor
                </label>
                <Input
                  id="instructor"
                  placeholder="Nombre del instructor"
                  value={instructor}
                  onChange={(e) => {
                    setInstructor(e.target.value);
                    setErrors((prev) => ({ ...prev, instructor: '' }));
                  }}
                  className={`bg-blue-primary/50 text-white border ${errors.instructor ? 'border-red-500' : 'border-gray-700/50'} focus:ring-indigo-500 focus:border-indigo-500`}
                />
                {errors.instructor && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.instructor}
                  </p>
                )}
              </div>
              {/* Día */}
              <div>
                <label
                  htmlFor="day"
                  className="block text-sm font-medium text-gray-100 mb-2"
                >
                  Día
                </label>
                <Select
                  value={day || ''}
                  onValueChange={(value) => {
                    setDay(value);
                    setErrors((prev) => ({ ...prev, day: '' }));
                  }}
                >
                  <SelectTrigger
                    className={`w-full bg-blue-primary/50 text-white border ${errors.day ? 'border-red-500' : 'border-gray-700/50'} focus:ring-indigo-500 focus:border-indigo-500`}
                  >
                    <SelectValue placeholder="Selecciona un día" />
                  </SelectTrigger>
                  <SelectContent className="bg-card text-white border-gray-700">
                    <SelectItem value="Lunes">Lunes</SelectItem>
                    <SelectItem value="Martes">Martes</SelectItem>
                    <SelectItem value="Miércoles">Miércoles</SelectItem>
                    <SelectItem value="Jueves">Jueves</SelectItem>
                    <SelectItem value="Viernes">Viernes</SelectItem>
                    <SelectItem value="Sábado">Sábado</SelectItem>
                    <SelectItem value="Domingo">Domingo</SelectItem>
                  </SelectContent>
                </Select>
                {errors.day && (
                  <p className="mt-1 text-xs text-red-500">{errors.day}</p>
                )}
              </div>
              {/* Hora (usando Select) */}
              <div>
                <label
                  htmlFor="hour"
                  className="block text-sm font-medium text-gray-100 mb-2"
                >
                  Hora
                </label>
                <Select
                  value={hour || ''}
                  onValueChange={(value) => {
                    setHour(value);
                    setErrors((prev) => ({ ...prev, hour: '' }));
                  }}
                >
                  <SelectTrigger
                    className={`w-full bg-blue-primary/50 text-white border ${errors.hour ? 'border-red-500' : 'border-gray-700/50'} focus:ring-indigo-500 focus:border-indigo-500`}
                  >
                    <SelectValue placeholder="Selecciona una hora" />
                  </SelectTrigger>
                  <SelectContent className="bg-card text-white border-gray-700">
                    {/* Generar horas cada 30 min por ejemplo */}
                    {Array.from({ length: 17 }, (_, i) => 6 + i).flatMap(
                      (h) => [
                        <SelectItem
                          key={`${h}:00`}
                          value={`${h}:00`}
                        >{`${h}:00`}</SelectItem>,
                        <SelectItem
                          key={`${h}:30`}
                          value={`${h}:30`}
                        >{`${h}:30`}</SelectItem>,
                      ]
                    )}
                  </SelectContent>
                </Select>
                {errors.hour && (
                  <p className="mt-1 text-xs text-red-500">{errors.hour}</p>
                )}
              </div>
              {/* Duración */}
              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Duración (minutos)
                </label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="Ej: 60"
                  value={duration}
                  onChange={(e) => {
                    setDuration(e.target.value);
                    setErrors((prev) => ({ ...prev, duration: '' }));
                  }}
                  className={`bg-blue-primary/50 text-white border ${errors.duration ? 'border-red-500' : 'border-gray-700/50'} focus:ring-indigo-500 focus:border-indigo-500`}
                />
                {errors.duration && (
                  <p className="mt-1 text-xs text-red-500">{errors.duration}</p>
                )}
              </div>
              {/* Capacidad Máxima */}
              <div>
                <label
                  htmlFor="capacity"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Capacidad máxima
                </label>
                <Input
                  id="capacity"
                  type="number"
                  placeholder="Ej: 20"
                  value={capacity}
                  onChange={(e) => {
                    setCapacity(e.target.value);
                    setErrors((prev) => ({ ...prev, capacity: '' }));
                  }}
                  className={`bg-blue-primary/50 text-white border ${errors.capacity ? 'border-red-500' : 'border-gray-700/50'} focus:ring-indigo-500 focus:border-indigo-500`}
                />
                {errors.capacity && (
                  <p className="mt-1 text-xs text-red-500">{errors.capacity}</p>
                )}
              </div>
            </div>

            <DialogFooter className="pt-0 space-x-4">
              <Button
                variant="outline"
                onClick={handleCancelClass}
                className="bg-transparent text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white cursor-pointer"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                onClick={handleSaveClass}
                className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
              >
                Guardar clase
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Selector de Vista: Semana - Lista */}
      <div className="flex border-b border-gray-700 mb-6">
        <button
          onClick={() => setActiveView('semana')}
          className={`py-2 px-4 text-sm font-medium ${
            activeView === 'semana'
              ? 'border-b-2 border-indigo-500 text-indigo-400'
              : 'text-gray-400 hover:text-white cursor-pointer'
          } transition-colors`}
        >
          Semana
        </button>
        <button
          onClick={() => setActiveView('lista')}
          className={`py-2 px-4 text-sm font-medium ${
            activeView === 'lista'
              ? 'border-b-2 border-indigo-500 text-indigo-400'
              : 'text-gray-400 hover:text-white cursor-pointer'
          } transition-colors`}
        >
          Lista
        </button>
      </div>

      {activeView === 'semana' ? (
        <div className="grid grid-cols-1 justify-center gap-6">
          {/* Calendario */}
          <div className="p-4 rounded-lg flex justify-center">
            {/* <h2 className="text-xl font-bold text-white mb-4 text-center">{currentMonthName}</h2> */}
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="bg-bg-primary text-white flex items-center justify-center"
              classNames={{
                month: 'space-y-4 font-semibold',
                caption: 'flex justify-center pt-1 relative items-center',
                caption_label: 'text-sm font-medium text-white',
                nav: 'space-x-1 flex items-center justify-between w-full absolute top-0 left-0 rigth-0',
                nav_button:
                  'h-7 w-7 bg-transparent hover:bg-transparent! p-0 hover:text-white!',
                nav_button_previous:
                  'absolute left-1 hover:bg-transparent! hover:text-white!',
                nav_button_next:
                  'absolute right-1 hover:bg-transparent! hover:text-white!',

                table: 'w-full border-collapse space-y-1',
                head_row: 'flex justify-around mt-2',
                head_cell:
                  'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
                row: 'flex w-full mt-2 justify-around',
                cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].range-end)]:rounded-r-md [&:has([aria-selected].range-start)]:rounded-l-md [&:has([aria-selected])]:bg-card first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100 text-white hover:bg-gray-700',
                day_range_end: 'day-range-end',
                day_selected:
                  'bg-indigo-600 text-gray-700! hover:bg-indigo-700 focus:bg-indigo-700',
                day_today: 'bg-indigo-500 text-gray-700! font-bold',
                day_outside: 'text-muted-foreground opacity-50',
                day_disabled: 'text-muted-foreground opacity-50',
                day_range_middle:
                  'aria-selected:bg-accent aria-selected:text-accent-foreground',
                day_hidden: 'invisible',
              }}
            />
          </div>

          {/* Tabla de Horario Semanal */}
          <div className="lg:col-span-2 bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-white mb-4">
              Horario de clases semanal
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left table-fixed">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-3 px-2 text-sm font-medium text-gray-400 w-24">
                      Hora
                    </th>
                    <th className="py-3 px-2 text-sm font-medium text-gray-400">
                      Lunes
                    </th>
                    <th className="py-3 px-2 text-sm font-medium text-gray-400">
                      Martes
                    </th>
                    <th className="py-3 px-2 text-sm font-medium text-gray-400">
                      Miércoles
                    </th>
                    <th className="py-3 px-2 text-sm font-medium text-gray-400">
                      Jueves
                    </th>
                    <th className="py-3 px-2 text-sm font-medium text-gray-400">
                      Viernes
                    </th>
                    <th className="py-3 px-2 text-sm font-medium text-gray-400">
                      Sábado
                    </th>
                    <th className="py-3 px-2 text-sm font-medium text-gray-400">
                      Domingo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Ejemplo de filas */}
                  {[
                    '8:00 AM',
                    '9:00 AM',
                    '10:00 AM',
                    '11:00 AM',
                    '12:00 PM',
                    '1:00 PM',
                    '2:00 PM',
                    '3:00 PM',
                    '4:00 PM',
                    '5:00 PM',
                  ].map((time) => (
                    <tr
                      key={time}
                      className="border-b border-gray-800 hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="py-4 px-2 font-medium text-white w-24">
                        {time}
                      </td>
                      {[...Array(7)].map((_, dayIndex) => (
                        <td key={dayIndex} className="py-4 px-2 text-gray-300">
                          {time === '8:00 AM' && dayIndex === 0 && (
                            <div className="text-sm">Yoga (5 plazas)</div>
                          )}
                          {time === '8:00 AM' && dayIndex === 1 && (
                            <div className="text-sm">Algo (2 plazas)</div>
                          )}
                          {time === '8:00 AM' && dayIndex === 2 && (
                            <div className="text-sm">Crossfit (6 plazas)</div>
                          )}
                          {time === '8:00 AM' && dayIndex === 3 && (
                            <div className="text-sm">Crossfit (6 plazas)</div>
                          )}
                          {time === '8:00 AM' && dayIndex === 4 && (
                            <div className="text-sm">Crossfit (6 plazas)</div>
                          )}
                          {time === '8:00 AM' && dayIndex === 5 && (
                            <div className="text-sm">Crossfit (6 plazas)</div>
                          )}
                          {time === '8:00 AM' && dayIndex === 6 && (
                            <div className="text-sm">Crossfit (6 plazas)</div>
                          )}
                          {time === '9:00 AM' && dayIndex === 1 && (
                            <div className="text-sm">Zumba (12 plazas)</div>
                          )}
                          {time === '10:00 AM' && dayIndex === 2 && (
                            <div className="text-sm">Crossfit (6 plazas)</div>
                          )}
                          {time === '11:00 AM' && dayIndex === 3 && (
                            <div className="text-sm">Spinning (10 plazas)</div>
                          )}
                          {time === '12:00 PM' && dayIndex === 4 && (
                            <div className="text-sm">Boxeo (8 plazas)</div>
                          )}
                          {time === '1:00 PM' && dayIndex === 5 && (
                            <div className="text-sm">Pilates (7 plazas)</div>
                          )}
                          {time === '2:00 PM' && dayIndex === 6 && (
                            <div className="text-sm">Yoga (5 plazas)</div>
                          )}
                          {time === '3:00 PM' && dayIndex === 0 && (
                            <div className="text-sm">Crossfit (2 plazas)</div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-white mb-4">
            Lista de Clases
          </h2>
          <p className="text-gray-400">
            Supongo que aqui ira una lista de clases...
          </p>
          {/* ... */}
        </div>
      )}
    </div>
  );
};
