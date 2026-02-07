import React from "react";
import { BreadcrumbContainer, BreadcrumbLink, ActiveBreadcrumb, ChevronIcon, HomeIcon } from "./styles";

export type Breadcrumb = {
  label: string;
  link?: string;
};

const Breadcrumbs: React.FC<{ items: Breadcrumb[] }> = ({ items }) => {
  return (
    <BreadcrumbContainer>
      <BreadcrumbLink href="/">
        <HomeIcon name="Home" />
      </BreadcrumbLink>

      {items.length >= 1 && <ChevronIcon name="ChevronRight" className="breadcrumb-separator" />}

      {items.map((item, index) => (
        <React.Fragment key={item.link || item.label}>
          {item.link ? (
            <BreadcrumbLink href={item.link}>{item.label}</BreadcrumbLink>
          ) : (
            <ActiveBreadcrumb className="active-crumb">{item.label}</ActiveBreadcrumb>
          )}
          {index < items.length - 1 && <ChevronIcon name="ChevronRight" className="breadcrumb-separator" />}
        </React.Fragment>
      ))}
    </BreadcrumbContainer>
  );
};

export default Breadcrumbs;
