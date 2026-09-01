import { useEffect, useState } from "react";
import PartCard from "../components/partcard";
import { supabase } from "../supabaseClient";
import "./parts.css";

export default function Parts() {

    const [mods, setMods] = useState([]);

    useEffect(() => {
        fetchMods();
    }, []);

    async function fetchMods() {

        const { data, error } = await supabase
            .from("mod")
            .select("*")
            .order("id", { ascending: false });

        if (error) {
            console.log("Error fetching mods:", error);
            return;
        }

        setMods(data);
    }

    return (
        <div className="parts">
            {mods.map((mod) => (
                <PartCard
                    key={mod.id}
                    title={mod.name}
                    type={mod.type}
                    priority={mod.priority}
                    value={`${Number(mod.price).toLocaleString("en-US")}€`}
                    status={mod.status}
                />
            ))}
        </div>
    );
}