import { Progress } from "@/components/ui/progress";

type ProgressBarProps = {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return <Progress value={progress} className="w-full" />
}