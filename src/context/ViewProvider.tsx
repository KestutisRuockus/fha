import React, { useState, type ReactNode } from "react";
import { ViewContext } from "../context/ViewContext";
import { type ViewType } from "../types/types";

export const ViewProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [view, setView] = useState<ViewType>("images");

  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
};
