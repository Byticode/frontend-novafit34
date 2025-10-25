import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Card } from '../../components/ui/card';
import { cn } from '../../lib/utils';

interface GymProfileData {
  nombre: string;
  direccion: string;
  telefono: string;
  correo: string;
  horarioApertura: string;
  logoUrl: string | null;
}

// Datos simulados iniciales del gimnasio
const DUMMY_GYM_DATA: GymProfileData = {
  nombre: 'Novafit34',
  direccion: 'Calle Jose Arcadio, Macondo',
  telefono: '0422-1234567',
  correo: 'novafit34@protonmail.com',
  horarioApertura:
    'Lunes a Viernes: 6:00 AM - 10:00 PM\nSábados: 8:00 AM - 3:00 PM\nDomingos: Cerrado',
  // URL de logo simulado
  logoUrl:
    'https://via.placeholder.com/300x200/2a3042/ffc107?text=GIMNASIO+NOVAFIT',
};

export const GymProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] =
    useState<GymProfileData>(DUMMY_GYM_DATA);
  const [isSaving, setIsSaving] = useState(false);

  // Manejador genérico para la entrada de texto
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Manejador para la subida de logo (simulado)
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setProfileData((prev) => ({
          ...prev,
          logoUrl: reader.result as string,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  // Manejador para guardar los datos (simulado)
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulación de una llamada a la API
    setTimeout(() => {
      console.log('Datos del gimnasio guardados:', profileData);
      setIsSaving(false);
      alert('Información del gimnasio actualizada con éxito.');
    }, 1500);
  };

  return (
    <div className="min-h-screen p-4 lg:p-8 space-y-4">
      <Button
        variant="link"
        onClick={() => navigate('/admin/settings')}
        className="text-indigo-400 hover:text-indigo-300 p-0 mb-4 cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Volver a Ajustes
      </Button>

      <h1 className="text-3xl lg:text-4xl font-bold text-white">
        Perfil del Gimnasio
      </h1>
      <p className="text-gray-400">
        Actualiza la información básica, contacto y logo del gimnasio.
      </p>

      <Card className="bg-bg-primary border-none p-6 mt-10">
        <form onSubmit={handleSave} className="space-y-8">
          {/* Campos de Información General */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="nombre" className="text-white">
                  Nombre del Gimnasio
                </Label>
                <Input
                  id="nombre"
                  value={profileData.nombre}
                  onChange={handleChange}
                  className="bg-blue-primary border-gray-700 text-white focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="direccion" className="text-white">
                  Dirección
                </Label>
                <Input
                  id="direccion"
                  value={profileData.direccion}
                  onChange={handleChange}
                  className="bg-blue-primary border-gray-700 text-white focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefono" className="text-white">
                  Teléfono
                </Label>
                <Input
                  id="telefono"
                  value={profileData.telefono}
                  onChange={handleChange}
                  className="bg-blue-primary border-gray-700 text-white focus:ring-indigo-500"
                  type="tel"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="correo" className="text-white">
                  Correo Electrónico
                </Label>
                <Input
                  id="correo"
                  value={profileData.correo}
                  onChange={handleChange}
                  className="bg-blue-primary border-gray-700 text-white focus:ring-indigo-500"
                  type="email"
                  required
                />
              </div>
            </div>

            {/* Horario de Apertura */}
            <div className="space-y-2 pt-4">
              <Label htmlFor="horarioApertura" className="text-white">
                Horario de Apertura (Líneas múltiples)
              </Label>
              <Textarea
                id="horarioApertura"
                value={profileData.horarioApertura}
                onChange={handleChange}
                className="min-h-[150px] bg-blue-primary border-gray-700 text-white focus:ring-indigo-500"
                placeholder="Ejemplo: L-V: 6 AM - 10 PM, Sáb: 8 AM - 3 PM"
              />
            </div>
          </div>

          {/* Sección del Logo */}
          <div className="space-y-4 pt-4 border-t border-gray-700">
            <Label className="text-white text-lg font-semibold">
              Logo del Gimnasio
            </Label>

            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
              {/* Visualización del Logo */}
              <div className="w-full max-w-xs h-auto bg-gray-900 rounded-lg overflow-hidden border border-gray-700 p-4">
                {profileData.logoUrl ? (
                  <img
                    src={profileData.logoUrl}
                    alt="Logo del Gimnasio"
                    className="w-full h-auto object-contain"
                  />
                ) : (
                  <div className="h-32 flex items-center justify-center text-gray-500 border border-dashed border-gray-600 rounded">
                    Sin Logo
                  </div>
                )}
              </div>

              {/* Botón de Subida */}
              <div className="relative w-full sm:w-auto">
                <Input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <Label
                  htmlFor="logo-upload"
                  className={cn(
                    'cursor-pointer inline-flex items-center justify-center rounded-md font-medium',
                    'h-10 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 transition-colors'
                  )}
                >
                  <Upload className="w-4 h-4 mr-2" /> Subir o Cambiar Logo
                </Label>
              </div>
            </div>
          </div>

          {/* 3. Botón de Guardar */}
          <div className="pt-6 border-t border-gray-700 flex justify-end">
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg cursor-pointer"
              disabled={isSaving}
            >
              {isSaving ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
