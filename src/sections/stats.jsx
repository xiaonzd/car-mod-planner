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

export default function Stats({ mods = [] }) {

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

    const spent = mods
        .filter(
            (mod) =>
                mod.status === "bought" ||
                mod.status === "in progress" ||
                mod.status === "installed"
        )
        .reduce((total, mod) => total + Number(mod.price || 0), 0);

    const totalPlanned = mods
        .reduce((total, mod) => total + Number(mod.price || 0), 0);

    const installedMods = mods.filter(
        (mod) => mod.status === "installed"
    ).length;

    const buildProgress =
        mods.length > 0
            ? Math.round((installedMods / mods.length) * 100)
            : 0;

    const spentPercentage =
        budget > 0
            ? Math.round((spent / budget) * 100)
            : 0;

    return (
        <>
            <div className="stats">
                <StatCard
                    title="Budget"
                    icon={<BsCurrencyEuro />}
                    value={budget} format="currency"
                    details="Total project budget"
                    editable={true}
                    onValueChange={updateBudget}
                />
                <StatCard
                    title="Spent"
                    icon={<BsCart2 />}
                    value={spent}
                    format="currency"
                    details={`${spentPercentage}% of budget spent`}
                />
                <StatCard
                    title="Total Planned"
                    icon={<BsWallet2 />}
                    value={totalPlanned}
                    format="currency"
                    details={`${mods.length} mods on the list`}
                />
                <StatCard
                    title="Build Progress"
                    icon={<BsCheckCircle />}
                    value={`${buildProgress}%`}
                    details={`${installedMods} of ${mods.length} mods installed`}
                />
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