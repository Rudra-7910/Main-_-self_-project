import Modal from "react-modal";
function CustomModal({
  isOpen,
  onClose,
  title,
  children,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white p-6 rounded-xl max-w-lg mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-start"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button onClick={onClose}>
          ✕
        </button>
      </div>

      {children}
    </Modal>
  );
}

export default CustomModal;