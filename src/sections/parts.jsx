import PartCard from "../components/partcard";
import './parts.css';

export default function Parts() {
    return (
        <div className="parts">
            <PartCard title="Cat-back exhaust" type="Exhaust" priority="High" value="1,200€" status="Bought" />
            <PartCard title="Coilovers" type="Suspension" priority="Medium" value="1,200€" status="Bought" />
            <PartCard title="18” forged wheels" type="Wheels" priority="Low" value="1,200€" status="Bought" />
        </div>
    );
}