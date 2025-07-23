import React, { useState, ReactNode } from 'react';

interface CollapsibleOptionGroupProps {
  label: string;
  children: ReactNode;
  initialCollapsed?: boolean;
}

export const CollapsibleOptionGroup: React.FC<CollapsibleOptionGroupProps> = ({
  label,
  children,
  initialCollapsed = true,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="collapsible-option-group">
      <div className="group-header flex flex-row" onClick={toggleCollapse}>
        <h3 className="pr-4">{label}</h3>
        <span>{isCollapsed ? '▼' : '▲'}</span>{' '}
        {/* Indicator for collapsed/expanded */}
      </div>
      {!isCollapsed && <div className="group-content">{children}</div>}
    </div>
  );
};

//export default CollapsibleOptionGroup;
