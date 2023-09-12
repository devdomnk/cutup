import React, { createContext, useContext, useState } from "react";

const TermsOfUseContext = createContext();
const SetTermsOfUseContext = createContext();

export function useIsTermsOfUseOpened() {
  return useContext(TermsOfUseContext);
}

export function useSetIsTermsOfUseOpened() {
  return useContext(SetTermsOfUseContext);
}

const ContactFormContext = createContext();
const SetContactFormContext = createContext();

export function useIsContactFormOpened() {
  return useContext(ContactFormContext);
}

export function useSetIsContactFormOpened() {
  return useContext(SetContactFormContext);
}

export default function ModalContext({ children }) {
  const [isTermsOfUseModalOpened, setIsTermsOfUseModalOpened] = useState(false);
  const [isContactFormOpened, setIsContactFormOpened] = useState(false);
  return (
    <TermsOfUseContext.Provider value={isTermsOfUseModalOpened}>
      <SetTermsOfUseContext.Provider value={setIsTermsOfUseModalOpened}>
        <ContactFormContext.Provider value={isContactFormOpened}>
          <SetContactFormContext.Provider value={setIsContactFormOpened}>
            {children}
          </SetContactFormContext.Provider>
        </ContactFormContext.Provider>
      </SetTermsOfUseContext.Provider>
    </TermsOfUseContext.Provider>
  );
}
