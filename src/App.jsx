import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

import Header from "./sections/header";
import Stats from "./sections/stats";
import Parts from "./sections/parts";
import Popup from "./components/popup";

import "./app.css";

export default function App() {
  const [mods, setMods] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMod, setSelectedMod] = useState(null);

  const fetchMods = async () => {
    const { data, error } = await supabase
      .from("mod")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log(error);
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

  return (
    <div className="app">
      <Header onAddClick={handleCreate} />

      <Stats mods={mods} />

      <Parts mods={mods} onEdit={handleEdit} />

      {showPopup && (
        <Popup
          onClose={() => setShowPopup(false)}
          onSuccess={fetchMods}
          mod={selectedMod}
        />
      )}
    </div>
  );
}