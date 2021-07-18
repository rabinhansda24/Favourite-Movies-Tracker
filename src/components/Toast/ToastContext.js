import React, {
    createContext,
    useState,
    useEffect,
    useRef,
    useCallback,
} from 'react';

const initialToast = {
    message: '',
    type: null,
    visible: false,
};

export const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState(initialToast);
    const timeout = useRef();


    const Toast = useCallback(args => {
        setToast({ ...initialToast, visible: true, ...args });
    }, []);

    const hide = useCallback(() => {
        setToast({ ...toast, visible: false });
    }, [toast]);

    return (
        <ToastContext.Provider
            value={{
                hide,
                Toast,
                toast,
            }}>
            {children}
        </ToastContext.Provider>
    );
};