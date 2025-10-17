import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import type { Payment, PaymentStatus } from '../../../types/payment';

interface ViewPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: Payment | null;
  onUpdateStatus: (paymentId: string, newStatus: PaymentStatus) => void;
}

export const ViewPaymentModal: React.FC<ViewPaymentModalProps> = ({
  isOpen,
  onClose,
  payment,
  onUpdateStatus,
}) => {
  const [currentStatus, setCurrentStatus] =
    useState<PaymentStatus>('Pendiente');

  useEffect(() => {
    if (payment) {
      setCurrentStatus(payment.estado);
    }
  }, [payment]);

  const handleUpdate = () => {
    if (payment) {
      onUpdateStatus(payment.id, currentStatus);
      onClose();
    }
  };

  if (!payment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-bg-primary text-white border-gray-700">
        <DialogHeader className="border-b border-gray-700 pb-4 mb-4">
          <DialogTitle className="text-xl font-bold text-white">
            Detalles del Pago
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Referencia: {payment.referenciaBancaria}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 text-sm">
          <p>
            <strong>Miembro:</strong>{' '}
            <span className="text-gray-300">{payment.memberName}</span>
          </p>
          <p>
            <strong>Plan:</strong>{' '}
            <span className="text-gray-300">{payment.plan}</span>
          </p>
          <p>
            <strong>Monto:</strong>{' '}
            <span className="text-green-400 font-bold">
              ${payment.monto.toFixed(2)}
            </span>
          </p>
          <p>
            <strong>Fecha Inicio:</strong>{' '}
            <span className="text-gray-300">{payment.fechaInicio}</span>
          </p>
          <p>
            <strong>Fecha Vencimiento:</strong>{' '}
            <span className="text-gray-300">{payment.fechaVencimiento}</span>
          </p>

          {/* Cambiar Estado */}
          <div>
            <label
              htmlFor="estado"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Estado
            </label>
            <Select
              value={currentStatus}
              onValueChange={(value) =>
                setCurrentStatus(value as PaymentStatus)
              }
            >
              <SelectTrigger className="w-full bg-blue-primary text-white border border-gray-700 focus:ring-indigo-500 focus:border-indigo-500">
                <SelectValue placeholder="Selecciona el estado" />
              </SelectTrigger>
              <SelectContent className="bg-card text-white border-gray-700">
                <SelectItem value="Pendiente">Pendiente</SelectItem>
                <SelectItem value="Pagado">Pagado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="pt-4 mt-4 border-t border-gray-700">
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-transparent text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white cursor-pointer"
          >
            Cerrar
          </Button>
          <Button
            type="submit"
            onClick={handleUpdate}
            className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
          >
            Guardar Cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
