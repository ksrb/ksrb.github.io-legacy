import { Link as MaterialUILink, LinkProps } from "@material-ui/core";
import React, { FC } from "react";
import useStyles from "./styles";

type Props = LinkProps;

const Link: FC<Props> = ({
  children,
  href,
  rel = "noreferrer",
  target = "_blank",
  ...props
}) => {
  const classes = useStyles();

  return (
    <>
      {href ? (
        <MaterialUILink href={href} rel={rel} target={target} {...props}>
          {children}
        </MaterialUILink>
      ) : (
        <span {...props}>{children}</span>
      )}
    </>
  );
};

export default Link;
