import { Skeleton } from "@mui/material";

export const Skeleton60Circular: React.FC = () => {
  return (
    <Skeleton
      variant="circular"
      width={60}
      height={60}
      sx={{ borderRadius: "50%" }}
      animation="wave"
    />
  );
};

export const Skeleton19By182Rectangular: React.FC = () => {
  return <Skeleton variant="text" width={182} height={19} animation="wave" />;
};

export const SkeletonShortText: React.FC = () => {
  return <Skeleton variant="text" width={90} height={40} animation="wave" />;
};

export const SkeletonShortTextV2: React.FC = () => {
  return <Skeleton variant="text" width={90} height={30} animation="wave" />;
};
