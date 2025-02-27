
import { AuthForm } from "@/components/AuthForm";
import AnimatedLogo from "@/components/AnimatedLogo";

export default function Auth() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-slate-50">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6 p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
          <div className="flex justify-center">
            <AnimatedLogo />
          </div>
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
