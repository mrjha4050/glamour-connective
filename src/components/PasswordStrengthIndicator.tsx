import { cn } from "@/lib/utils";

interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator = ({ password }: PasswordStrengthIndicatorProps) => {
  const getStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getStrength();

  return (
    <div className="space-y-2">
      <div className="flex gap-1 h-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={cn(
              "h-full w-full rounded-full transition-all duration-300",
              {
                "bg-red-500": strength >= level && strength < 3,
                "bg-yellow-500": strength >= level && strength === 3,
                "bg-green-500": strength >= level && strength > 3,
                "bg-gray-200": strength < level,
              }
            )}
          />
        ))}
      </div>
      <p className="text-xs text-gray-500">
        {strength < 3 && "Weak password"}
        {strength === 3 && "Medium password"}
        {strength > 3 && "Strong password"}
      </p>
    </div>
  );
};

export default PasswordStrengthIndicator;