import {ReactNode} from 'react';
import {createPortal} from 'react-dom';

interface PortalProps {
  children: ReactNode;
  element?: HTMLElement;
}

export const Portal = ({children, element}: PortalProps) =>
  createPortal(
    children,
    element || document.getElementById('app') || document.body,
  );
