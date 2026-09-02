import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { BsPlusLg } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";
import Button from "./button";
import "./popup.css";

export default function Popup({ onClose, onSuccess, mod }) {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (mod) {
            setName(mod.name || "");
            setType(mod.type || "");
            setPrice(mod.price || "");
            setPriority(mod.priority || "");
            setStatus(mod.status || "");
        } else {
            setName("");
            setType("");
            setPrice("");
            setPriority("low");
            setStatus("planned");
        }
    }, [mod]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const payload = {
            name,
            type,
            price: Number(price),
            priority,
            status,
        };
console.log("PAYLOAD:", payload);
        if (mod) {
            const { error } = await supabase
                .from("mod")
                .update(payload)
                .eq("id", mod.id);

            if (error) {
                console.log("Error updating mod:", error);
                alert("Error updating mod");
                setLoading(false);
                return;
            }

        } else {
            const { error } = await supabase
                .from("mod")
                .insert([payload]);

            if (error) {
                console.log("Error creating mod:", error);
                alert("Error creating mod");
                setLoading(false);
                return;
            }
        }

        setLoading(false);

        onClose();
        onSuccess();
    };


    return (
        <div className="overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2 className="title">{mod ? "Edit Mod" : "Add New Mod"}</h2>

                    <button 
                        className="close-button"
                        onClick={onClose}
                    >
                        <BsXLg />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input
                            className="form-input"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Type</label>
                            <input
                                className="form-input"
                                type="text"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Price</label>
                            <input
                                className="form-input"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Priority</label>
                            <select
                                className="form-input"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Status</label>
                            <select
                                className="form-input"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="planned">Planned</option>
                                <option value="bought">Bought</option>
                                <option value="in progress">In Progress</option>
                                <option value="installed">Installed</option>
                            </select>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        icon={!mod ? BsPlusLg : null}
                    >
                        {loading? "Saving...": mod? "Save": "Add"}
                    </Button>
                </form>
            </div>
        </div>
    );
}