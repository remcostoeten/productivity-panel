import React from "react";
import { useProcessor } from "./use-processor";
import { Card, CardContent } from "@/components/ui/card";

interface PreviewProps {
  value: string;
}

export function Preview({ value }: PreviewProps) {
  const { processor } = useProcessor();
  const content = processor.processSync(value).result;

  return (
    <Card>
      <CardContent className="prose max-w-none p-4">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </CardContent>
    </Card>
  );
}
