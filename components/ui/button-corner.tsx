'use client';

import { cn } from '@/lib/utils';
import React from 'react';

const ButtonCorner = ({
  className,
  ...props
}: React.ComponentProps<"button">) => {
  const corner = "before:content-[''] after:content-[''] before:absolute after:absolute before:bg-foreground after:bg-foreground before:w-[1px] before:h-[8px] after:w-[8px] after:h-[1px]";

  const decoration = (
    <>
      <div className={`${corner} before:top-0 before:left-0 before:transition-[height] before:duration-300 after:top-0 after:left-0 group-hover:before:h-[calc(100%-8px)]`} />
      <div className={`${corner} before:top-0 before:right-0 after:top-0 after:right-0 after:transition-[width] after:duration-300 group-hover:after:w-[calc(100%-8px)]`} />
      <div className={`${corner} before:bottom-0 before:left-0 after:bottom-0 after:left-0 after:transition-[width] after:duration-300 group-hover:after:w-[calc(100%-8px)]`} />
      <div className={`${corner} before:bottom-0 before:right-0 before:transition-[height] before:duration-300 after:bottom-0 after:right-0 group-hover:before:h-[calc(100%-8px)]`} />
    </>
  );

  return (
    <button
      className={cn(className, "group flex items-center justify-center relative self-center bg-transparent cursor-pointer text-center border-none min-w-30 px-2.5 py-1.25 transition-colors duration-300 hover:bg-gold-40")}
      {...props}
    >
      {decoration}
      {props.children}
    </button>
  );
};

export default ButtonCorner;
