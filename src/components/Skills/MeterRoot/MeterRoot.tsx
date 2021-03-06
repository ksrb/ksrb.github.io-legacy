import clsx from "clsx";
import React, { DOMAttributes, FC } from "react";
import Link from "src/components/Link";
import { useStylesShared } from "src/components/Skills";

type Props = {
  color?: string;
  logo?: string;
  title?: string;
  url?: string;
} & Pick<DOMAttributes<HTMLDivElement>, "onClick">;

const MeterRoot: FC<Props> = ({
  children,
  color,
  logo,
  title,
  url,
  onClick,
}) => {
  const { classesMeterRoot, classesSkills } = useStylesShared();

  return (
    <>
      <div
        className={classesMeterRoot.meter_edgeVertical}
        style={{ backgroundColor: color }}
      />
      <div className={classesMeterRoot.meter} onClick={onClick}>
        <Link
          href={url}
          className={classesMeterRoot.meter_root}
          rel="noreferrer"
          target="_blank"
        >
          <div
            className={classesMeterRoot.meter_rootContent}
            style={{ borderColor: color }}
          >
            {logo && (
              <>
                <img
                  className={clsx(classesMeterRoot.meter_rootIcon)}
                  src={logo}
                  alt={title}
                />
                {color && (
                  <img
                    className={clsx(
                      classesMeterRoot.meter_rootIcon,
                      classesMeterRoot.meter_rootIconFader,
                      classesMeterRoot[color.substring(1)],
                    )}
                    src={logo}
                    alt={title}
                  />
                )}
              </>
            )}
          </div>
        </Link>
        {children}
      </div>
    </>
  );
};

export default MeterRoot;
