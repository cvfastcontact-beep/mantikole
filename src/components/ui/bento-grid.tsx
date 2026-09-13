import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-6",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  badgeText,
}: {
  name: string;
  className?: string;
  background?: ReactNode;
  Icon?: any;
  description: string;
  href?: string;
  cta?: string;
  badgeText?: string;
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-1 md:col-span-3 flex flex-col justify-between overflow-hidden rounded-2xl",
      // Magic UI Light style
      "bg-white border border-slate-200/80 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      "transform-gpu transition-all duration-300 hover:shadow-lg hover:border-slate-300",
      className,
    )}
  >
    {/* Background interactive visual element */}
    <div>{background}</div>

    {/* Content */}
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1.5 p-6 transition-all duration-300 group-hover:-translate-y-8">
      <div className="flex items-center justify-between mb-1">
        {Icon && (
          <Icon className="h-8 w-8 origin-left transform-gpu text-slate-800 transition-all duration-300 ease-in-out group-hover:scale-75 text-blue-600" />
        )}
        {badgeText && (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
            {badgeText}
          </span>
        )}
      </div>

      <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
        {name}
      </h3>
      <p className="max-w-lg text-xs text-slate-600 leading-relaxed font-normal">{description}</p>
    </div>

    {/* CTA on Hover */}
    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 border-t border-slate-100 bg-white/95 backdrop-blur-xs",
      )}
    >
      <a
        href={href || "#"}
        className="pointer-events-auto text-xs font-semibold text-blue-600 flex items-center space-x-1.5 hover:text-blue-700"
      >
        <span>{cta || "Lihat Selengkapnya"}</span>
        <ArrowRight size={14} />
      </a>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-slate-950/[.02]" />
  </div>
);

export { BentoCard, BentoGrid };
