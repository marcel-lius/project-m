'use client';

import { cn } from '@/lib/utils';
import React from 'react';

const Link = ({
  className,
  ...props
}: React.ComponentProps<"a">) => {
  return (
    <a
      {...props}
      className={cn(className, "flex items-center justify-center relative self-center bg-transparent cursor-pointer text-center border-none py-0.75 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-3.75 after:h-[2px] after:bg-gold-40 after:transition-[width] after:duration-300 hover:after:w-full")}
    >
      {props.children}
    </a>
  );
};

export default Link;
