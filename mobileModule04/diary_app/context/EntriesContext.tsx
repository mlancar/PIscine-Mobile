import { useEffect, useState, createContext, useContext } from 'react';
import { supabase } from "@/lib/supabase";
import type { Entry } from '@/types/entry';
import { ReactNode } from "react";

type EntriesContextType = {
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
};

type EntriesProviderProps = {
    children: ReactNode;
};

export const EntriesContext = createContext<EntriesContextType | null>(null);

export function EntriesProvider({ children }: EntriesProviderProps) {
  
	const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    fetchEntries();
  }, []);

  async function fetchEntries() {
    const { data, error } = await supabase
      .from("entry")
      .select('*')
      .order("created_at", { ascending: false });

    if (error) {
      console.log("error", error);
      return;
    }

    setEntries(data ?? []);
  }
  return (
    <EntriesContext.Provider value={{ entries, setEntries }}>
      {children}
    </EntriesContext.Provider>
  );
}

export function useEntries() {
  const context = useContext(EntriesContext);

  if (!context) {
    throw new Error("useEntries must be used inside EntriesProvider");
  }

  return context;
}