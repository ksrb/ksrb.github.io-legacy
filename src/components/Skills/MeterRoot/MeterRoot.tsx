import clsx from "clsx";
import React, { FC } from "react";
import Link from "src/components/Link";
import { useStylesShared } from "src/components/Skills";

type Props = {
  color?: string;
  logo?: string;
  title?: string;
  url?: string;
};

const MeterRoot: FC<Props> = ({ children, color, logo, title, url }) => {
  const { classesMeterRoot: classes, classesSkills } = useStylesShared();

  return (
    <>
      <div
        className={classesSkills.meter_edgeVertical}
        style={{ backgroundColor: color }}
      />
      <div className={classes.meter}>
        <Link
          href={url}
          className={classes.meter_root}
          rel="noreferrer"
          target="_blank"
        >
          <div
            className={classes.meter_rootContent}
            style={{ borderColor: color }}
          >
            {logo && (
              <>
                <img
                  className={clsx(classes.meter_rootIcon)}
                  src={logo}
                  alt={title}
                />
                {color && (
                  <img
                    className={clsx(
                      classesSkills.meter_rootIcon,
                      classesSkills.meter_rootIconFader,
                      classes[color.substring(1)],
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
