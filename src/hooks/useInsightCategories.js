import { useEffect, useState } from "react";
import { insightsSeed } from "@/data/insightsSeed";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

function getCategories(posts) {
  return [...new Set(posts.map((post) => post.category?.trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

const seedCategories = getCategories(insightsSeed);

export default function useInsightCategories() {
  const [categories, setCategories] = useState(isSupabaseConfigured ? [] : seedCategories);

  useEffect(() => {
    if (!supabase) return undefined;

    let active = true;
    Promise.resolve(supabase.from("posts").select("category").eq("published", true))
      .then(({ data, error }) => {
        if (error) throw error;
        if (active) setCategories(getCategories(data || []));
      })
      .catch((error) => {
        if (active) console.error("Unable to load insight categories:", error.message);
      });

    return () => {
      active = false;
    };
  }, []);

  return categories;
}
