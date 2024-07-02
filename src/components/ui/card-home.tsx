import { LucideIcon } from "lucide-react";

type CardHomeProps = {
  title: string;
  value: string;
  icon: LucideIcon;
};

export default function CardHome({ title, value, icon: Icon }: CardHomeProps) {
  return (
    <div>
      <h3 className="text-lg font-bold py-2 bg-zinc-200 text-primary">
        <span className="inline-block align-middle mr-2">
          <Icon />
        </span>
        {title}
      </h3>
      <div className="text-3xl border py-8 text-center font-bold text-primary">
        {value}
      </div>
    </div>
  );
}
