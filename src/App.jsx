import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import Header from "./sections/header";
import Stats from "./sections/stats";
import Parts from "./sections/parts";
import Popup from "./components/popup";
import Toast from "./components/toast";
import { BsCheckCircle, BsExclamationCircle } from "react-icons/bs";
import "./app.css";

export default function App() {
    const [mods, setMods] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedMod, setSelectedMod] = useState(null);
    const [toast, setToast] = useState(null);

    const fetchMods = async () => {
        const { data, error } = await supabase
            .from("mod")
            .select("*")
            .order("id", { ascending: false });

        if (error) {
            console.log(error);

            setToast({
                message: "Failed to load mods",
                icon: BsExclamationCircle,
                variant: "error",
            });

            return;
        }

        setMods(data);
    };

    useEffect(() => {
        fetchMods();
    }, []);

    const handleCreate = () => {
        setSelectedMod(null);
        setShowPopup(true);
    };

    const handleEdit = (mod) => {
        setSelectedMod(mod);
        setShowPopup(true);
    };

    const handleSuccess = (message) => {
        fetchMods();

        setToast({
            message,
            icon: BsCheckCircle,
            variant: "success",
        });
    };

    const handleError = (message) => {
        setToast({
            message,
            icon: BsExclamationCircle,
            variant: "error",
        });
    };

    return (
        <div className="app">
            <Header onAddClick={handleCreate} />

            <Stats mods={mods} />

            <Parts
                mods={mods}
                onEdit={handleEdit}
            />

            {showPopup && (
                <Popup
                    onClose={() => {
                        setShowPopup(false);
                        setSelectedMod(null);
                    }}
                    onSuccess={handleSuccess}
                    onError={handleError}
                    mod={selectedMod}
                />
            )}

            {toast && (
                <Toast
                    message={toast.message}
                    icon={toast.icon}
                    variant={toast.variant}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
}