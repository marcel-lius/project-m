import { cn } from "@/lib/utils";

export default function CardCorner({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const corner = "before:content-[''] after:content-[''] before:absolute after:absolute before:bg-gold-40 after:bg-gold-40 before:w-[2px] before:h-[10px] after:w-[10px] after:h-[2px]";
  const decoration = (
    <div className="group/card absolute w-full h-full z-1">
      <div className={`${corner} absolute inset-0 before:top-0 before:left-0 before:transition-[height] before:duration-300 after:top-0 after:left-0 group-hover/card:before:h-[calc(100%-10px)]`} />
      <div className={`${corner} absolute inset-0 before:top-0 before:right-0 after:top-0 after:right-0 after:transition-[width] after:duration-300 group-hover/card:after:w-[calc(100%-10px)]`} />
      <div className={`${corner} absolute inset-0 before:bottom-0 before:left-0 after:bottom-0 after:left-0 after:transition-[width] after:duration-300 group-hover/card:after:w-[calc(100%-10px)]`} />
      <div className={`${corner} absolute inset-0 before:bottom-0 before:right-0 before:transition-[height] before:duration-300 after:bottom-0 after:right-0 group-hover/card:before:h-[calc(100%-10px)]`} />
    </div>
  );
  return (
    <div
      className={cn(
        "relative mx-auto w-full",
        className
      )}
      {...props}
    >
        {decoration}
        <div className="flex flex-col items-center justify-center text-center w-full h-full px-2 py-4">
            {children}
        </div>
    </div>
  )
}
