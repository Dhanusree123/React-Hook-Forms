import { Home, NavigateNextSharp } from "@mui/icons-material";
import { Box, Breadcrumbs, Link } from "@mui/material";

type Props = {
  path?: string;
  pathName?: string;
  subPath?: string;
  subPathName?: string;
};
const CustomBreadCrumbs = (props: Props) => {
  const { pathName, subPathName, path, subPath } = props;
  return (
    <>
      <Box>
        <Breadcrumbs
          separator={<NavigateNextSharp fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            href="#"
            sx={{
              textDecoration: "none",
              fontSize: "md",
              color: "inherit",
            }}
          >
            <Home />
          </Link>
          <Link
            sx={{
              textDecoration: "none",
              fontSize: "md",
              color: "inherit",
            }}
            href={path}
          >
            {pathName}
          </Link>
          {subPathName && (
            <Link
              sx={{
                textDecoration: "none",
                fontSize: "md",
                color: "inherit",
              }}
              href={subPath}
            >
              {subPathName}
            </Link>
          )}
        </Breadcrumbs>
      </Box>
    </>
  );
};

export default CustomBreadCrumbs;
