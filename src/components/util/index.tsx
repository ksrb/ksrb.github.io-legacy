import typenames from "src/graphql/typenames";
import uses from "src/graphql/data/uses";
import { Displayed, Tool, Use } from "src/graphql/__generated__";

import {
  languagesColor,
  primaryColor,
  secondaryColor,
  trinaryColor,
} from "src/styles";

function getColorByUse(use: Use): string {
  const { id } = use;

  switch (id) {
    case uses.Frontend.id:
      return primaryColor;
    case uses.Backend.id:
      return secondaryColor;
    case uses.Build.id:
      return trinaryColor;
  }

  return "";
}

export function getColorByType(
  displayedNode: Displayed[],
  parentDisplayedNodes?: Displayed[],
): string {
  // TODO: consider nodes with mixed use
  const node = displayedNode[0];

  // @ts-ignore
  const { __typename } = node;

  switch (__typename) {
    case typenames.Use:
      return getColorByUse(node as Use);
    case typenames.Tool:
      return getColorByUse((node as Tool).use);
    case typenames.Language:
      return parentDisplayedNodes
        ? getColorByType(parentDisplayedNodes)
        : languagesColor;
    default:
      return "";
  }
}
