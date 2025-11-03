// Lightweight toast wrapper using react-hot-toast
// Provides both named exports { toast, useToast } compatible with shadcn-style API
import { toast as hotToast } from 'react-hot-toast';

// Map variants to default styles/messages if needed
const show = (title, opts = {}) => {
  const { description, variant, duration = 3000 } = opts;
  const content = description ? `${title}\n${description}` : title;

  switch (variant) {
    case 'destructive':
    case 'error':
      return hotToast.error(content, { duration });
    case 'success':
      return hotToast.success(content, { duration });
    case 'loading':
      return hotToast.loading(content, { duration });
    default:
      return hotToast(content, { duration });
  }
};

export const toast = Object.assign(show, hotToast);

export const useToast = () => ({ toast });

export default toast;
