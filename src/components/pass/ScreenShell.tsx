import { ReactNode } from "react";
import BottomNav from "./BottomNav";

interface Props {
  children: ReactNode;
  showNav?: boolean;
  className?: string;
}

export default function ScreenShell({ children, showNav = false, className = "" }: Props) {
  return (
    <div
      className="mx-auto w-full max-w-[440px] min-h-screen flex flex-col"
      style={{ background: "#111008" }}
    >
      <div className={`flex-1 ${showNav ? "pb-24" : ""} ${className}`}>{children}</div>
      {showNav && <BottomNav />}
    </div>
  );
}
