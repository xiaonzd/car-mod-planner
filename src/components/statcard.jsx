import { useEffect, useState } from "react";
import './statcard.css';

export default function StatCard({ title, icon, value, details, editable = false, onValueChange, format }) {

    const [editing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    function formatValue(value, format) {

        if (format === "currency") {
            return Number(value).toLocaleString("en-US") + "€";
        }

        return value;
    }

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    useEffect(() => {
        if (!editing) return;

        const timer = setTimeout(() => {
            if (inputValue !== value) {
                onValueChange(Number(inputValue));
                setEditing(false);
            }
        }, 1500);

        return () => clearTimeout(timer);

    }, [inputValue, editing, value, onValueChange]);

    function saveValue() {

        const newValue = Number(inputValue);

        if (newValue !== value) {
            onValueChange(newValue);
        }

        setEditing(false);
    }

    return (
        <div className="stat-card">
            <div className="stat-card-header">
                <h3 className="stat-card-title">
                    {title}
                </h3>

                <div className="stat-card-icon">
                    {icon}
                </div>
            </div>

            <div className="stat-card-details">
                {
                    editable && editing ? (
                        <div className="stat-card-edit">
                            <input
                                autoFocus
                                className="stat-card-input"
                                value={
                                    inputValue 
                                    ? Number(inputValue).toLocaleString("en-US")
                                    : ""
                                }
                                style={{
                                    width: `${Math.max(inputValue.toLocaleString().length, 1)}ch`
                                }}
                                onChange={(e) => {
                                    const value = e.target.value
                                        .replace(/,/g, "")
                                        .replace(/\D/g, "");

                                    setInputValue(value);
                                }}
                            />

                            <span className="stat-card-currency">
                                €
                            </span>
                        </div>
                    ) : (
                        <h1
                            className={
                                editable
                                ? "stat-card-value editable"
                                : "stat-card-value"
                            }
                            onClick={() => editable && setEditing(true)}
                        >
                            {formatValue(value, format)}
                        </h1>
                    )
                }

                <p className="stat-card-detail">
                    {details}
                </p>
            </div>
        </div>
    );
}