import React from "react";
import Image from "next/image";
import '@/app/styles/Modal.scss';

interface ModalProps {
  selectedImage: string;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ selectedImage, closeModal }) => {
  return (
    <div className="modal" onClick={closeModal}>
      <div className="modal-content">
        <Image
          src={selectedImage}
          alt="Enlarged Furniture"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export default Modal;
