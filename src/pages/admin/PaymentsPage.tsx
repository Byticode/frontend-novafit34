import React, { useState, useMemo } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { AddPaymentModal } from '../../components/admin/payments/AddPaymentModal';
import { ViewPaymentModal } from '../../components/admin/payments/ViewPaymentModal';
import { PaymentsTable } from '../../components/admin/payments/PaymentsTable';
import { DUMMY_PAYMENTS } from '../../types/payment';
import type {
  Payment,
  NewPaymentData,
  PaymentStatus,
} from '../../types/payment';

type FilterOption = 'Todos' | PaymentStatus;

const FILTER_OPTIONS: FilterOption[] = ['Todos', 'Pagado', 'Pendiente'];

export const PaymentsPage: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>(DUMMY_PAYMENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterOption>('Todos');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  // --- HANDLERS DE MODALES ---

  const handleAddPayment = (newPaymentData: NewPaymentData) => {
    const today = new Date();
    const startDate = today.toISOString().slice(0, 10); // YYYY-MM-DD
    const expiryDate = new Date(today.setFullYear(today.getFullYear() + 1))
      .toISOString()
      .slice(0, 10); // +1 año

    const newPayment: Payment = {
      ...newPaymentData,
      id: String(Date.now()), // ID único
      fechaInicio: startDate,
      fechaVencimiento: expiryDate,
      estado: 'Pendiente', // Por defecto el pago es Pendiente
    };
    setPayments((prev) => [...prev, newPayment]);
  };

  const handleOpenViewPayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsViewModalOpen(true);
  };

  const handleUpdatePaymentStatus = (
    paymentId: string,
    newStatus: PaymentStatus
  ) => {
    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === paymentId ? { ...payment, estado: newStatus } : payment
      )
    );
  };

  // --- LÓGICA DE FILTRADO Y BÚSQUEDA ---

  const filteredAndSearchedPayments = useMemo(() => {
    let tempPayments = payments;

    if (filter !== 'Todos') {
      tempPayments = tempPayments.filter(
        (payment) => payment.estado === filter
      );
    }

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      tempPayments = tempPayments.filter(
        (payment) =>
          payment.memberName.toLowerCase().includes(lowerCaseSearchTerm) ||
          payment.referenciaBancaria
            .toLowerCase()
            .includes(lowerCaseSearchTerm) ||
          payment.plan.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    return tempPayments;
  }, [payments, filter, searchTerm]);

  return (
    <div className="min-h-screen p-4 lg:p-8">
      {/* HEADER y BOTÓN AÑADIR PAGO */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 lg:mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-headline mb-4 md:mb-0">
          Pagos
        </h1>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-highlight hover:bg-highlight/70 text-headline flex items-center shadow-lg cursor-pointer"
        >
          <Plus className="w-5 h-5 mr-2" /> Añadir Pago
        </Button>
      </div>

      {/* BARRA DE BÚSQUEDA */}
      <div className="relative mb-6">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-sub-headline"
          size={20}
        />
        <Input
          type="text"
          placeholder="Buscar pagos por miembro o referencia..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-6 pl-10 rounded-lg bg-card-background text-headline placeholder-sub-headline border-sm border-secondary/30 focus:outline-none focus:ring-2 focus:ring-highlight shadow-md"
        />
      </div>

      {/* FILTROS (Botones) */}
      <div className="flex border-b border-secondary/30 mb-6 overflow-x-auto whitespace-nowrap">
        {FILTER_OPTIONS.map((option) => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            className={`py-2 px-4 text-sm font-medium transition-colors ${
              filter === option
                ? 'border-b-2 border-highlight text-indigo-400'
                : 'text-sub-headline hover:text-headline cursor-pointer'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* TABLA DE PAGOS (Desktop y Mobile) */}
      <PaymentsTable
        filteredPayments={filteredAndSearchedPayments}
        onViewPayment={handleOpenViewPayment}
      />

      {/* MODALES */}
      <AddPaymentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddPayment}
      />
      <ViewPaymentModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        payment={selectedPayment}
        onUpdateStatus={handleUpdatePaymentStatus}
      />
    </div>
  );
};
