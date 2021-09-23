import { useContext } from 'react';
import { MainContext } from '../contexts';

export function useAlerts() {
  const { triggerErrorAlert, triggerWarningAlert, onCloseAlert } = useContext(MainContext);
  return { triggerErrorAlert, triggerWarningAlert, onCloseAlert }
}