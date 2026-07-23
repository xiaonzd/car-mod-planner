import './statcard.css';

export default function StatCard({ title, icon, value, details }) {
    return (
        <div className="stat-card">
            <div className="stat-card-header">
                <h2 className="stat-card-title">
                    {title}
                </h2>
                <div className="stat-card-icon">
                    {icon}
                </div>
            </div>

            <div className="stat-card-details">
                <h1 className="stat-card-value">
                    {value}
                </h1>
                <p className="stat-card-detail">
                    {details}
                </p>
            </div>
        </div>
    );
}