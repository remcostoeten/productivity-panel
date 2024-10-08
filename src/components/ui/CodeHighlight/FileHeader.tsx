interface FileHeaderProps {
  title?: string;
  onCopy: () => void;
  disableMinWidth: boolean;
  allowCollapse: boolean;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  showModal: boolean;
  modalTrigger: React.ReactNode;
}

const FileHeader: React.FC<FileHeaderProps> = ({
  title,
  onCopy,
  disableMinWidth,
  allowCollapse,
  isCollapsed,
  onToggleCollapse,
  showModal,
  modalTrigger,
}) => {
  return (
    <div className="flex justify-between items-center p-2 bg-dark-section--lighter">
      <div className="flex items-center">
        <span className="mr-2">{title}</span>
        {showModal && modalTrigger}
      </div>
      <div className="flex items-center">
        <button
          onClick={onCopy}
          className="text-xs text-gray-400 hover:text-white mr-2"
        >
          Copy
        </button>
        {allowCollapse && (
          <button
            onClick={onToggleCollapse}
            className="text-xs text-gray-400 hover:text-white"
          >
            {isCollapsed ? "Expand" : "Collapse"}
          </button>
        )}
      </div>
    </div>
  );
};

export default FileHeader;
