import React, { useReducer } from 'react';
import { AlertToaster, Alert } from '../components';

const ACTION_SNACKBAR_ERROR = 'action_snackbar_error';
const ACTION_SNACKBAR_WARNING = 'action_snackbar_warning';
const ACTION_SNACKBAR_CLOSE = 'action_snackbar_close';
const ACTION_ALERT_ERROR = 'action_alert_error';
const ACTION_ALERT_WARNING = 'action_alert_warning';
const ACTION_ALERT_CLOSE = 'action_alert_close';

export function stateReducer(state, action) {
  switch (action.type) {
    case ACTION_SNACKBAR_ERROR:
      return { ...state, isToast: true, toastText: action.payload };
    case ACTION_SNACKBAR_WARNING:
      return { ...state, isToast: true, toastSeverity: 'warning', toastText: action.payload };
    case ACTION_SNACKBAR_CLOSE:
      return { ...state, isToast: false };
    case ACTION_ALERT_ERROR:
      return { ...state, isAlert: true, alertText: action.payload };
    case ACTION_ALERT_WARNING:
      return { ...state, isAlert: true, alertSeverity: 'warning', alertText: action.payload };
    case ACTION_ALERT_CLOSE:
      return { ...state, isAlert: false };
    default:
      break;
  }
}

const initialState = {
  isToast: false,
  toastText: 'Unknown error!',
  toastSeverity: 'error', // info, success, warning, error
  isAlert: false,
  alertText: 'Unknown error!',
  alertSeverity: 'error' // info, success, warning, error
};

export const MainContext = React.createContext();

export function MainContextProvider({ children }) {
  const [ state, dispatch ] = useReducer(stateReducer, initialState);

  function triggerErrorToast(text) {
    dispatch({ type: ACTION_SNACKBAR_ERROR, payload: text });
  }

  function triggerWarningToast(text) {
    dispatch({ type: ACTION_SNACKBAR_WARNING, payload: text });
  }

  function handleCloseToast() {
    dispatch({ type: ACTION_SNACKBAR_CLOSE });
  }

  function triggerErrorAlert(text) {
    dispatch({ type: ACTION_ALERT_ERROR, payload: text });
  }

  function triggerWarningAlert(text) {
    dispatch({ type: ACTION_ALERT_WARNING, payload: text });
  }

  function handleCloseAlert() {
    dispatch({ type: ACTION_ALERT_CLOSE });
  }

  return (
    <MainContext.Provider value={{
      triggerErrorAlert,
      triggerWarningAlert,
      triggerErrorToast,
      triggerWarningToast,
      onCloseAlert: handleCloseAlert,
      onCloseToast: handleCloseToast
    }}>
      <AlertToaster
        isOpen={state.isToast}
        alertSeverity={state.toastSeverity}
        alertText={state.toastText}
        onCloseSnackbar={handleCloseToast}
        onCloseAlert={handleCloseToast}
      />
  
      {state.isAlert && (
        <Alert
          data-testid="app-alert"
          severity={state.alertSeverity}
          onClose={handleCloseAlert}
        >
          {state.alertText}
        </Alert>
      )}
  
      {children}
    </MainContext.Provider>
  );
}
