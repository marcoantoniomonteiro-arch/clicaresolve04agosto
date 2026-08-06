import React, { createContext, useContext, useCallback } from "react";

interface NavigationContextType {
  onSelectCategory: (slug: string) => void;
  onSelectTool: (slug: string) => void;
  onSelectGuide: (slug: string) => void;
  lang: "pt" | "en";
}

export const NavigationContext = createContext<NavigationContextType>({
  onSelectCategory: () => {},
  onSelectTool: () => {},
  onSelectGuide: () => {},
  lang: "pt",
});

export function useNavigation() {
  return useContext(NavigationContext);
}
