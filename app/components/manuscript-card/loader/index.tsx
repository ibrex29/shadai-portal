import { Skeleton } from "@mui/material";

export default function ManuscriptCardSkeleton() {
  return (
    <div className="border-t-2 border-primary py-4 flex gap-4 items-start">
      <Skeleton variant="rectangular" width={100} height={100} />
      <div className="w-full">
        <Skeleton variant="text" width="60%" height={24} />
        <Skeleton variant="text" width="40%" height={20} />
        <Skeleton variant="text" width="100%" height={80} />
        <div className="mt-2 flex items-center text-sm">
          <Skeleton variant="text" width="30%" height={20} />
          <Skeleton variant="text" width="20%" height={20} className="ml-4" />
        </div>
      </div>
    </div>
  );
}
