// Breadcrumb.js
import { useLocation } from 'react-router-dom';

const Breadcrumb = () => {
    const currentPath = useLocation().pathname;
    const pathSegments = currentPath.split('/').filter((segment) => segment);
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div>
            {pathSegments.map((segment, index) => (
                <span key={index}>
                    {index > 0 && <span> &gt; </span>}
                    <span style={{ color: `${index > 0 ? "#4460EF" : ""}`, fontWeight: "bold" }}>{capitalizeFirstLetter(segment)}</span>
                </span>
            ))}
        </div>
    );
};

export default Breadcrumb;
