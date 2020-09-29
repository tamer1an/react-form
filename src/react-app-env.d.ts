/// <reference types="react-scripts" />

interface AppState {
  missingFields: string[];
  password: string;
  saving: boolean;
}

interface UserFormModel {
  firstName?: string;
  userName: string;
  password: string;
  rePassword: string;
  email: string;
}

interface InputConfig {
  type?: string;
  max?: number;
  min?: number;
  required?: boolean;
  pattern?: string;
  autoFocus?: boolean;
  autoCapitalize?: string;
  title?: string;
  onClick?: () => void;
  onChange?: () => void;
  disabled?: boolean;
  // controllable component
  defaultValue?: any;
  value?: any;
}
