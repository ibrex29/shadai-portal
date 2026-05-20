export default function VolumeDropdownSkeleton() {
  return (
    <div className="relative w-64">
      <label className="block text-xs font-semibold text-primary">Volume</label>
      <div className="mt-1 h-10 w-full bg-gray-200 animate-pulse rounded-lg"></div>
    </div>
  );
}

export function IssueDropdownSkeleton() {
  return (
    <div className="relative w-64">
      <label className="block text-xs font-semibold text-primary">Issue</label>
      <div className="mt-1 h-10 w-full bg-gray-200 animate-pulse rounded-lg"></div>
    </div>
  );
}
