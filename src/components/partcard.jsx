import './partcard.css';
import { BsCheckCircle, BsCart2, BsClock, BsPencil, BsTrash } from "react-icons/bs";
import { RiFireLine, RiFlashlightLine, RiCheckboxBlankCircleLine, RiWrenchLine  } from "react-icons/ri";

export default function PartCard({ title, type, priority, value, status, onEdit, onDelete,}) {

    const priorityConfig = {
        high: {
            icon: RiFireLine,
            color: "danger",
        },
        medium: {
            icon: RiFlashlightLine,
            color: "warning",
        },
        low: {
            icon: RiCheckboxBlankCircleLine,
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
        "in progress": {
            icon: RiWrenchLine,
            color: "primary",
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
                    <h2 className="part-card-title">
                        {title}
                    </h2>

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
                    <h2 className="part-card-value">
                        {value}
                    </h2>

                    {currentStatus && (
                        <div className="badge-container">
                            <div
                                className={`part-card-badge status ${currentStatus.color}`}
                            >
                                <StatusIcon />
                                <span>{status}</span>
                            </div>
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