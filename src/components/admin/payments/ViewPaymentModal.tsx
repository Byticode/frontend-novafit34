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
      <DialogContent className="sm:max-w-[425px] bg-background text-headline border-secondary/30">
        <DialogHeader className="border-b border-secondary/30 pb-4 mb-4">
          <DialogTitle className="text-xl font-bold text-headline">
            Detalles del Pago
          </DialogTitle>
          <DialogDescription className="text-sub-headline">
            Referencia: {payment.referenciaBancaria}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 text-sm">
          <p>
            <strong>Miembro:</strong>{' '}
            <span className="text-sub-headline">{payment.memberName}</span>
          </p>
          <p>
            <strong>Plan:</strong>{' '}
            <span className="text-sub-headline">{payment.plan}</span>
          </p>
          <p>
            <strong>Monto:</strong>{' '}
            <span className="text-tertiary font-bold">
              ${payment.monto.toFixed(2)}
            </span>
          </p>
          <p>
            <strong>Fecha Inicio:</strong>{' '}
            <span className="text-sub-headline">{payment.fechaInicio}</span>
          </p>
          <p>
            <strong>Fecha Vencimiento:</strong>{' '}
            <span className="text-sub-headline">
              {payment.fechaVencimiento}
            </span>
          </p>

          {/* Cambiar Estado */}
          <div>
            <label
              htmlFor="estado"
              className="block text-sm font-medium text-sub-headline mb-2"
            >
              Estado
            </label>
            <Select
              value={currentStatus}
              onValueChange={(value) =>
                setCurrentStatus(value as PaymentStatus)
              }
            >
              <SelectTrigger className="w-full bg-card-background text-headline border-sm border-secondary/30 focus:ring-highlight focus:border-highlight">
                <SelectValue placeholder="Selecciona el estado" />
              </SelectTrigger>
              <SelectContent className="bg-card-background text-headline border-secondary/30">
                <SelectItem value="Pendiente">Pendiente</SelectItem>
                <SelectItem value="Pagado">Pagado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="pt-4 mt-4 border-t border-secondary/30">
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-transparent text-sub-headline border-secondary/30 hover:bg-card-background hover:text-headline cursor-pointer"
          >
            Cerrar
          </Button>
          <Button
            type="submit"
            onClick={handleUpdate}
            className="bg-highlight hover:bg-highlight/70 text-headline cursor-pointer"
          >
            Guardar Cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
