import type { ListMeta } from "@keystone-6/core/types";
import React from "react";

import type { IGraphQLObject } from "../../../../types";
import { Link } from "@md/components/next";
import { BodyCell } from "../styles";

interface ViewCellProps {
  element: IGraphQLObject;
  list: ListMeta;
  gqlElement: string;
  linkTo?: string;
}

const ViewCell: React.FC<ViewCellProps> = ({
  element,
  list,
  gqlElement,
  linkTo,
}) => {
  const field = list.fields[gqlElement];
  const Cell = field?.views?.Cell;

  if (!field) return null;

  return (
    <BodyCell>
      {linkTo ? (
        <Link href={linkTo} className="text-blue-500 hover:text-blue-600">
          <Cell field={field.controller} item={element} linkTo={undefined} />
        </Link>
      ) : (
        <Cell field={field.controller} item={element} linkTo={undefined} />
      )}
    </BodyCell>
  );
};

export { ViewCell };
