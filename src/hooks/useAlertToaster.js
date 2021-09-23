import { useContext } from 'react';
import { MainContext } from '../contexts';

export function useAlertToaster() {
  const { triggerErrorToast, triggerWarningToast, onCloseToast } = useContext(MainContext);
  return { triggerErrorToast, triggerWarningToast, onCloseToast };
}