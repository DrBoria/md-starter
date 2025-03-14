import React from "react";
import Link from "next/link";

import { LucideIcon } from "../Icons";

export type Breadcrumb = {
  label: string;
  link?: string;
};

const breadcrumbClasses = "flex items-center space-x-2 text-sm";
const linkClasses = "text-body hover:text-primary";
const activeLinkClasses = "text-body font-medium px-2 py-1 bg-gray-100 rounded";
const chenvronClasses = "w-3 h-3 text-gray-400";

interface BreadcrumbProps {
  items: Breadcrumb[];
}

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className={breadcrumbClasses}>
      <Link href="/" className="text-body hover:text-primary">
        <LucideIcon name="Home" className="w-4 h-5" />
      </Link>

      {items.length >= 1 && (
        <LucideIcon name="ChevronRight" className={chenvronClasses} />
      )}

      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.link ? (
            <Link href={item.link} className={linkClasses}>
              {item.label}
            </Link>
          ) : (
            <div className={activeLinkClasses}>{item.label}</div>
          )}
          {index < items.length - 1 && (
            <LucideIcon name="ChevronRight" className={chenvronClasses} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;
