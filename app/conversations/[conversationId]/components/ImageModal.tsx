import Modal from "@/app/components/Modal";
import Image from "next/image";

interface ImageModalProps {
    isOpen?: boolean;
    onClose: () => void;
    src?: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src }) => {
  return !src ? null : (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-center">
        <Image
          src={src}
          width={200}
          height={200}
          className="rounded-md object-cover"
          alt="Image"
        />
      </div>
    </Modal>
  );
};

export default ImageModal;