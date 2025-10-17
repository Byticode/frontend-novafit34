import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import { Button } from '../../ui/button';
import type { MemberPlan } from '../../../types/member';
import type { Payment, PaymentStatus } from '../../../types/payment';
import { ChevronDown, ChevronUp, Eye } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface PaymentsTableProps {
  filteredPayments: Payment[];
  onViewPayment: (payment: Payment) => void;
}

const PaymentTag: React.FC<{
  type: 'plan' | 'status';
  value: MemberPlan | PaymentStatus;
}> = ({ type, value }) => {
  let bgColor = 'bg-gray-800';
  let textColor = 'text-gray-300';

  if (type === 'plan') {
    if (value === 'Premium') {
      bgColor = 'bg-yellow-900/40';
      textColor = 'text-yellow-300';
    } else {
      // Básico
      bgColor = 'bg-indigo-900/40';
      textColor = 'text-indigo-300';
    }
  } else if (type === 'status') {
    if (value === 'Pagado') {
      bgColor = 'bg-green-900/40';
      textColor = 'text-green-300';
    } else {
      // Pendiente
      bgColor = 'bg-orange-900/40';
      textColor = 'text-orange-300';
    }
  }

  return (
    <span
      className={cn(
        'px-3 py-1 rounded-full text-xs font-semibold w-fit',
        bgColor,
        textColor
      )}
    >
      {value}
    </span>
  );
};

export const PaymentsTable: React.FC<PaymentsTableProps> = ({
  filteredPayments,
  onViewPayment,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // --- VISTA DESKTOP ---
  const DesktopTable = (
    <div className="overflow-x-auto hidden lg:block bg-card rounded-lg shadow-xl border border-gray-800 px-6 py-4">
      <Table className="min-w-full text-left">
        <TableHeader>
          <TableRow className="border-gray-700 bg-[var(--blue-primary)] hover:bg-[var(--blue-primary)]">
            <TableHead className="text-sm font-medium text-gray-400">
              Nombre
            </TableHead>
            <TableHead className="text-sm font-medium text-gray-400">
              Plan
            </TableHead>
            <TableHead className="text-sm font-medium text-gray-400">
              Fecha de Inicio
            </TableHead>
            <TableHead className="text-sm font-medium text-gray-400">
              Fecha de Vencimiento
            </TableHead>
            <TableHead className="text-sm font-medium text-gray-400">
              Estado
            </TableHead>
            <TableHead className="text-sm font-medium text-gray-400">
              Monto
            </TableHead>
            <TableHead className="text-sm font-medium text-gray-400">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPayments.map((payment) => (
            <TableRow
              key={payment.id}
              className="border-gray-800 hover:bg-gray-700/30 transition-colors"
            >
              <TableCell className="py-4 px-2 font-medium text-white">
                {payment.memberName}
              </TableCell>
              <TableCell className="py-4 px-2">
                <PaymentTag type="plan" value={payment.plan} />
              </TableCell>
              <TableCell className="py-4 px-2 text-gray-300">
                {payment.fechaInicio}
              </TableCell>
              <TableCell className="py-4 px-2 text-gray-300">
                {payment.fechaVencimiento}
              </TableCell>
              <TableCell className="py-4 px-2">
                <PaymentTag type="status" value={payment.estado} />
              </TableCell>
              <TableCell className="py-4 px-2 text-green-400 font-semibold">
                ${payment.monto.toFixed(2)}
              </TableCell>
              <TableCell className="py-4 px-2">
                <Button
                  variant="link"
                  onClick={() => onViewPayment(payment)}
                  className="p-0 h-auto text-indigo-400 hover:text-indigo-500 cursor-pointer"
                >
                  Ver
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  // --- VISTA MOBILE (responsive) ---
  const MobileList = (
    <div className="lg:hidden space-y-4">
      {' '}
      {/* Visible solo en mobile */}
      {filteredPayments.map((item) => (
        <div
          key={item.id}
          className="bg-card p-4 rounded-lg shadow-md border border-gray-800"
        >
          <div
            className="flex justify-between items-center"
            onClick={() => toggleExpand(item.id)}
          >
            <div className="flex flex-col space-y-1">
              <span className="font-medium text-white">{item.memberName}</span>
              <div className="flex space-x-2">
                <PaymentTag type="status" value={item.estado} />
                <PaymentTag type="plan" value={item.plan} />
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-700/30"
            >
              {expandedId === item.id ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </Button>
          </div>

          {expandedId === item.id && (
            <div className="mt-4 border-t border-gray-700 pt-4 text-sm text-gray-300 space-y-2">
              <p>
                <strong>Monto:</strong>{' '}
                <span className="text-green-400 font-bold">
                  ${item.monto.toFixed(2)}
                </span>
              </p>
              <p>
                <strong>Referencia:</strong> {item.referenciaBancaria}
              </p>
              <p>
                <strong>Inicio:</strong> {item.fechaInicio}
              </p>
              <p>
                <strong>Vencimiento:</strong> {item.fechaVencimiento}
              </p>
              <div className="mt-3 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewPayment(item)}
                  className="bg-transparent text-indigo-400 border-indigo-400/50 hover:bg-indigo-900/30"
                >
                  <Eye className="w-4 h-4 mr-2" /> Ver Detalles
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <>
      {DesktopTable}
      {MobileList}
    </>
  );
};
