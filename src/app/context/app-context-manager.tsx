'use client';

import React, { useContext, useMemo, useState } from 'react';
import { Genre, PageProps } from '../common/types';

type AppContextType = {
  genres: Genre[];
  setGenres: (genres: Genre[]) => void;
};
const defaultFunc = () => {};
const contextDefaultValues: AppContextType = {
  genres: [],
  setGenres: defaultFunc,
};
export const AppContext = React.createContext<AppContextType>(contextDefaultValues);
export default function AppContextProvider({ children }: PageProps) {
  const [genres, setGenres] = useState<Genre[]>(contextDefaultValues.genres);
  const memoContext = useMemo(() => ({ genres, setGenres }), [genres]);
  return <AppContext.Provider value={memoContext}>{children}</AppContext.Provider>;
}

export const useAppContext = () => useContext(AppContext);
