import { ShieldCheck } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex justify-center items-center gap-3">
      <ShieldCheck
        size={40}
        className="text-blue-600"
      />
      <h2 className="flex flex-col">
        <p className="text-slate-100 text-xl sm:text-2xl">Warranty Vault</p>
        <p className="text-sm text-slate-400 hidden sm:block">
          Protect you purchases
        </p>
      </h2>
    </div>
  );
}
