import { motion, AnimatePresence } from "framer-motion";
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  children?: React.ReactNode;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
  variant?: "danger" | "success" | "info";
}

const iconMap = {
  danger: <ExclamationTriangleIcon className="h-10 w-10 text-red-500" />,
  success: <CheckCircleIcon className="h-10 w-10 text-green-500" />,
  info: <InformationCircleIcon className="h-10 w-10 text-blue-500" />,
};

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  children,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  confirmColor = "bg-red-500 hover:bg-red-600",
  variant = "danger",
}: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="flex justify-center">{iconMap[variant]}</div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mt-3">
              {title}
            </h3>
            {description && (
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {description}
              </p>
            )}
            <div className="mt-4 flex justify-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white rounded-lg"
              >
                {cancelText}
              </button>
              {onConfirm && (
                <button
                  onClick={onConfirm}
                  className={`px-4 py-2 text-white rounded-lg ${confirmColor}`}
                >
                  {confirmText}
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
