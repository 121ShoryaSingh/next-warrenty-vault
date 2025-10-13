export default function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-32 ${className}`}
    >
      {children}
    </section>
  );
}
