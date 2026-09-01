import { useEffect, useState } from "react";
import StatCard from "../components/statcard";
import './stats.css';
import { supabase } from "../supabaseClient";

import Toast from "../components/toast";

import { BsExclamationCircle } from "react-icons/bs";
import { BsCurrencyEuro } from "react-icons/bs";
import { BsCart2 } from "react-icons/bs";
import { BsWallet2 } from "react-icons/bs";
import { BsCheckCircle } from "react-icons/bs";

export default function Stats() {

    const [projectId, setProjectId] = useState(null);
    const [budget, setBudget] = useState(0);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        fetchBudget();
    }, []);

    async function fetchBudget() {
        if (!projectId) {
            const { data, error } = await supabase
                .from("project")
                .select("*")
                .single();

            if (error) {
                // No project exists yet
                if (error.code === "PGRST116") {
                    const { data: newProject, error: createError } = await supabase
                        .from("project")
                        .insert([{ budget: 0}])
                        .select()
                        .single();

                    if (createError) {
                        console.log("Error creating project:", createError);
                        return;
                    }

                    setProjectId(newProject.id);
                    setBudget(newProject.budget);

                    return;
                }

                console.log("Error fetching project:", error);
                return;
            }

            setProjectId(data.id);
            setBudget(data.budget);
        }
    }

    async function updateBudget (newBudget) {
        if (newBudget !== budget) {
            setBudget(newBudget);

            setToast({
                message: "Budget saved",
                icon: BsCheckCircle,
                variant: "success",
            });

            const { error } = await supabase
                .from("project")
                .update({ budget: newBudget })
                .eq("id", projectId);

            if (error) {
                console.log("Error updating budget:", error);

                setToast({
                    message: "Error saving budget",
                    icon: BsExclamationCircle,
                    variant: "error",
                });
            }
        }
    }

    return (
        <>
            <div className="stats">
                <StatCard title="Budget" icon={<BsCurrencyEuro />} value={budget} format="currency" details="Total project budget" editable={true} onValueChange={updateBudget}/>
                <StatCard title="Spent" icon={<BsCart2 />} value="1,580€" details="16% of budget" />
                <StatCard title="Total Planned" icon={<BsWallet2 />} value="9,080€" details="5 mods on the list" />
                <StatCard title="Build Progress" icon={<BsCheckCircle />} value="20%" details="1 of 5 installed" />
            </div>

            {toast && (
                <Toast
                    message={toast.message}
                    icon={toast.icon}
                    variant={toast.variant}
                    onClose={() => setToast(null)}
                />
            )}
        </>
    )
}