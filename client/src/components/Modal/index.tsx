import { X } from 'phosphor-react';

interface ModalProps {
  isOpen: boolean;
  children: JSX.Element;
  onClose: () => void;
}

export function Modal({ isOpen, children, onClose }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  function stopPropagation(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
  }

  return (
    <div
      onClick={onClose}
      className="fixed p-0 h-full w-screen bg-[#00000080] text-textColor"
      role="presentation"
    >
      <div
        onClick={stopPropagation}
        role="presentation"
        className="flex flex-col max-w-6xl w-full fixed top-[35%] left-[27%]  bg-secondary shadow-custom rounded p-1.5"
      >
        <button onClick={onClose} className="fixed self-end mr-4">
          <X size={25} />
        </button>
        {children}
      </div>
    </div>
  );
}
