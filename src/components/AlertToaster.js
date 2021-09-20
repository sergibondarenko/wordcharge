import { Snackbar } from '@material-ui/core';
import { Alert } from './Alert';

export function AlertToaster({ isOpen, onCloseSnackbar, onCloseAlert, alertSeverity, alertText }) {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={onCloseSnackbar}
    >
      <Alert
        data-testid="app-alert-toast"
        onClose={onCloseAlert}
        severity={alertSeverity}
        style={{ minWidth: '400px' }}
      >
        {alertText}
      </Alert>
    </Snackbar>
  );
}