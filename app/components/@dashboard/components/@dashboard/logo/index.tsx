import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import LogoLink from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef, ReactNode, Ref } from "react";

interface LogoProps {
  disabledLink?: boolean;
  sx?: Record<string, any>;
  children?: ReactNode;
}

const Logo = forwardRef(
  ({ disabledLink = false, sx }: LogoProps, ref: Ref<HTMLAnchorElement>) => {
    const pathname = usePathname();

    // Match the base url e.g /dashboard/user-type-name-with-or-without-dash
    // pick the first array element returned by `match` or redirect to home if empty
    const redirectPath =
      (pathname.match(/\/dashboard\/\w+(-\w+)*/g) || [])[0] || "/";

    const logo = (
      <Box
        component="img"
        src="/logo/shadai_logo.png"
        sx={{ width: 80, height: "auto", cursor: "pointer", ...sx }}
      />
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link
        component={LogoLink}
        href={redirectPath}
        ref={ref}
        sx={{ display: "contents" }}
      >
        {logo}
      </Link>
    );
  },
);

export default Logo;
