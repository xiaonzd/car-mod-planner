import { useState } from "react";
import PartCard from "../components/partcard";
import Button from "../components/button";
import "./parts.css";

export default function Parts({ mods, onEdit }) {
    const [filter, setFilter] = useState("all");

    const filteredMods =
        filter === "all"
            ? mods
            : mods.filter((mod) => mod.status === filter);

    const counts = {
        all: mods.length,
        planned: mods.filter((mod) => mod.status === "planned").length,
        bought: mods.filter((mod) => mod.status === "bought").length,
        "in progress": mods.filter((mod) => mod.status === "in progress").length,
        installed: mods.filter((mod) => mod.status === "installed").length,
    };

    return (
        <div className="parts">
            <div className="parts-filters">
                <Button
                    variant={filter === "all" ? "primary" : "secondary"}
                    onClick={() => setFilter("all")}
                    count={counts.all}
                >
                    All
                </Button>

                <Button
                    variant={filter === "planned" ? "primary" : "secondary"}
                    onClick={() => setFilter("planned")}
                    count={counts.planned}
                >
                    Planned
                </Button>

                <Button
                    variant={filter === "bought" ? "primary" : "secondary"}
                    onClick={() => setFilter("bought")}
                    count={counts.bought}
                >
                    Purchased
                </Button>

                <Button
                    variant={filter === "in progress" ? "primary" : "secondary"}
                    onClick={() => setFilter("in progress")}
                    count={counts["in progress"]}
                >
                    In Progress
                </Button>

                <Button
                    variant={filter === "installed" ? "primary" : "secondary"}
                    onClick={() => setFilter("installed")}
                    count={counts.installed}
                >
                    Installed
                </Button>
            </div>

            <div className="parts-list">
                {filteredMods.map((mod) => (
                    <PartCard
                        key={mod.id}
                        title={mod.name}
                        type={mod.type}
                        priority={mod.priority}
                        value={`${mod.price.toLocaleString("en-US")}€`}
                        status={mod.status}
                        onEdit={() => onEdit(mod)}
                    />
                ))}
            </div>
        </div>
    );
}