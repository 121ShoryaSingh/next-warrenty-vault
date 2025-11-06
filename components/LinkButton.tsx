'use client';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

export default function LinkButton({
  children,
  link,
  className,
  variant,
  size,
}: {
  children: React.ReactNode;
  link: string;
  className?: string;
  variant?:
    | 'ghost'
    | 'link'
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'outline'
    | null
    | undefined;
  size?:
    | 'default'
    | 'sm'
    | 'lg'
    | 'icon'
    | 'icon-sm'
    | 'icon-lg'
    | null
    | undefined;
}) {
  const router = useRouter();
  return (
    <>
      <Button
        className={`${className}`}
        variant={variant}
        onClick={() => {
          router.push(link);
        }}
        size={size}
      >
        {children}
      </Button>
    </>
  );
}
