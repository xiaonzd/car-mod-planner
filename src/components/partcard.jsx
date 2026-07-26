import './partcard.css';

export default function PartCard({ title, type, priority, value, status }) {
    return (
        <div className="part-card">
            <div className="part-card-header">
                <div className="part-card-priority-rectangle"></div>
                <div className="part-card-info">
                    <h3 className="part-card-title">
                        {title}
                    </h3>
                    <p className="part-card-type">
                        {type}
                    </p>
                </div>
                <div className="part-card-priority-badge">
                    <h2 className="part-card-priority">
                        {priority}
                    </h2>
                </div>
            </div>

            <div className="part-card-body">
                <div className="part-card-details">
                    <h3 className="part-card-value">
                        {value}
                    </h3>
                    <p className="part-card-status">
                        {status}
                    </p>
                </div>

                <div className="part-card-actions">
                    teste
                </div>
                
            </div>
        </div>
    );
}