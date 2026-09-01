import { useEffect, useState } from "react";
import "./toast.css";

export default function Toast({ message, icon: Icon, variant, onClose }) {

    const [closing, setClosing] = useState(false);

    useEffect(() => {
        const closeTimer = setTimeout(() => {
            setClosing(true);
        }, 3500);

        return () => clearTimeout(closeTimer);
    }, []);

    useEffect(() => {
        if (!closing) return;

        const removeTimer = setTimeout(() => {
            onClose();
        }, 500);

        return () => clearTimeout(removeTimer);
    }, [closing, onClose]);

    return (
        <div className={`toast ${variant} ${closing ? "toast-closing" : ""}`}>
            {Icon && <Icon className="toast-icon" />}
            <span>{message}</span>
        </div>
    );
}