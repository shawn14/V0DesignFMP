import React from 'react';

export const ScrollArea: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div {...props} className="overflow-auto">{children}</div>
);