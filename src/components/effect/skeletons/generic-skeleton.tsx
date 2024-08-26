export default function Skeleton({
  className,
  key,
}: {
  key?: string | number;
  className?: string;
}) {
  return <div key={key} className={`animate-pulse bg-gray-300 ${className}`} />;
}
