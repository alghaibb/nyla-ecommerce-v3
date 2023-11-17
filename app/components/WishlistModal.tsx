import React, { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    // Apply or remove the 'overflow-hidden' class from the body
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Clean up function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        {/* Modal header */}
        <div className="border-b modal-header border-zinc-400/60">
          <h2 className="modal-title">My Wishlist</h2>
          <button
            onClick={onClose}
            className="duration-300 ease-out modal-close-button hover:text-zinc-900"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        {/* Border under the header */}
        <div className="modal-header-border" />
        {/* Modal body */}
        <div className="modal-body flex flex-col items-center justify-start h-[80vh]">
          <h3 className="mb-4 text-sm font-semibold tracking-wider md:text-lg">
            Adore something? Place it on My Wishlist!
          </h3>
          <p className="px-4 mt-5 text-sm leading-6 tracking-wider text-zinc-500 max-w-[100%] md:max-w-[60%] lg:max-w-[60%]">
            This handy tool lets you effortlessly monitor your preferred items
            and your browsing history across any device. Skip the hassle of
            retracing your steps to find that perfect piece you came across.
            With My Wishlist, your favorites are conveniently gathered in a
            single spot for easy access.
          </p>
          {children}
          <button
            onClick={onClose}
            className="mt-8 button"
            aria-label="Continue Shopping"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
