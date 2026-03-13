'use client';

import React, { createContext, useCallback, useContext, useState } from "react";

type ContactDrawerContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const ContactDrawerContext = createContext<ContactDrawerContextValue | undefined>(
  undefined
);

export const ContactDrawerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  const openDrawer = useCallback(() => setOpen(true), []);
  const closeDrawer = useCallback(() => setOpen(false), []);

  return (
    <ContactDrawerContext.Provider
      value={{ open, setOpen, openDrawer, closeDrawer }}
    >
      {children}
    </ContactDrawerContext.Provider>
  );
};

export const useContactDrawer = () => {
  const ctx = useContext(ContactDrawerContext);
  if (!ctx) {
    throw new Error("useContactDrawer must be used within a ContactDrawerProvider");
  }
  return ctx;
};

