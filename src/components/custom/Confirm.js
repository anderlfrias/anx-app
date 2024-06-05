import { ConfirmDialog } from "components/shared";
import React from "react";

const dialogType = {
  info: {
    type: 'info',
    title: 'Información',
    children: null,
    cancelText: 'Cancelar',
    confirmText: 'Aceptar',
    confirmButtonColor: 'blue-600',
  },
  success: {
    type: 'success',
    title: 'Completado!',
    children: 'La acción se ha completado exitosamente.',
    cancelText: 'Cancelar',
    confirmText: 'Aceptar',
    confirmButtonColor: 'emerald-600',
  },
  warning: {
    type: 'warning',
    title: 'Advertencia!',
    children: '¿Estás seguro de realizar esta acción?',
    cancelText: 'Cancelar',
    confirmText: 'Aceptar',
    confirmButtonColor: 'amber-600',
  },
  danger: {
    type: 'danger',
    title: 'Eliminar',
    children: '¿Estás seguro de eliminar este registro?',
    cancelText: 'Cancelar',
    confirmText: 'Eliminar',
    confirmButtonColor: 'red-600',
  },
}

export default function Confirm({ onConfirm, children, subtitle, loading: loadingProps, type = 'info' }) {
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false)
  const openConfirm = () => setShowConfirmDialog(true)
  const closeConfirm = () => setShowConfirmDialog(false)
  const [loading, setLoading] = React.useState(false)
  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm?.();
    setLoading(false);
    closeConfirm();
  }

  return (
    <>
      <div onClick={openConfirm}>
        {children}
      </div>
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={closeConfirm}
        onCancel={closeConfirm}
        onConfirm={handleConfirm}
        loading={loading || loadingProps}
        type={dialogType[type].type}
        title={dialogType[type].title}
        confirmText={dialogType[type].confirmText}
        confirmButtonColor={dialogType[type].confirmButtonColor}
        cancelText={dialogType[type].cancelText}
      >
        <p>{subtitle || dialogType[type].children}</p>
      </ConfirmDialog>
    </>
  )
}