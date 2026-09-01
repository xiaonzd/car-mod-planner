import './partcard.css';
import { BsExclamationCircle, BsDashCircle, BsCheckCircle, BsCart2, BsClock, BsPencil, BsTrash, } from "react-icons/bs";

export default function PartCard({ title, type, priority, value, status, onEdit, onDelete,}) {

    const priorityConfig = {
        high: {
            icon: BsExclamationCircle,
            color: "danger",
        },
        medium: {
            icon: BsDashCircle,
            color: "warning",
        },
        low: {
            icon: BsCheckCircle,
            color: "info",
        },
    };

    const statusConfig = {
        bought: {
            icon: BsCart2,
            color: "warning",
        },
        planned: {
            icon: BsClock,
            color: "info",
        },
        installed: {
            icon: BsCheckCircle,
            color: "success",
        },
    };

    const currentPriority = priorityConfig[priority?.toLowerCase()];
    const currentStatus = statusConfig[status?.toLowerCase()];

    const PriorityIcon = currentPriority?.icon;
    const StatusIcon = currentStatus?.icon;

    return (
        <div className="part-card">
            <div className="part-card-header">
                <div className={`part-card-priority-rectangle ${currentPriority?.color}`}/>

                <div className="part-card-info">
                    <h3 className="part-card-title">
                        {title}
                    </h3>

                    <p className="part-card-type">
                        {type}
                    </p>
                </div>

                {currentPriority && (
                    <div className={`part-card-badge priority ${currentPriority.color}`}>
                        <PriorityIcon />
                        <span>{priority}</span>
                    </div>
                )}

            </div>

            <div className="part-card-body">
                <div className="part-card-details">
                    <h3 className="part-card-value">
                        {value}
                    </h3>

                    {currentStatus && (
                        <div
                            className={`part-card-badge status ${currentStatus.color}`}
                        >
                            <StatusIcon />
                            <span>{status}</span>
                        </div>
                    )}
                </div>

                <div className="part-card-actions">
                    <button
                        className="part-card-action edit"
                        onClick={onEdit}
                    >
                        <BsPencil />
                    </button>

                    <button
                        className="part-card-action delete"
                        onClick={onDelete}
                    >
                        <BsTrash />
                    </button>
                </div>
            </div>
        </div>
    );
}