import { Link } from "react-router-dom";

const IconButton = ({ icon: Icon, to, tooltip }) => {
  const ButtonContent = (
    <div className="relative group">
      <button
        type="button"
        className="text-2xl hover:text-green-900 rounded-full p-2 transform transition-transform duration-300 hover:scale-120"
        aria-label={tooltip || "icon button"}
      >
        <Icon />
      </button>

      {tooltip && (
        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-emerald-50 text-green-800 text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md z-50 whitespace-nowrap">
        {tooltip}
         </span>
      
      )}
    </div>
  );

  return to ? <Link to={to}>{ButtonContent}</Link> : ButtonContent;
};

export default IconButton;
