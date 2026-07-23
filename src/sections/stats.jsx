import StatCard from "../components/statcard";
import './stats.css';

import { BsCurrencyEuro } from "react-icons/bs";
import { BsCart2 } from "react-icons/bs";
import { BsWallet2 } from "react-icons/bs";
import { BsCheckCircle } from "react-icons/bs";

export default function Stats() {
    return (
        <div className="stats">
            <StatCard title="Budget" icon={<BsCurrencyEuro />} value="10,000€" details="8,420€ remaining" />
            <StatCard title="Spent" icon={<BsCart2 />} value="1,580€" details="16% of budget" />
            <StatCard title="Total Planned" icon={<BsWallet2 />} value="9,080€" details="5 mods on the list" />
            <StatCard title="Build Progress" icon={<BsCheckCircle />} value="20%" details="1 of 5 installed" />
        </div>
    )
}