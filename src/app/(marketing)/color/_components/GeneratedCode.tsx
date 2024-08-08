import { GeneratedCodeProps } from "./types.colors";


export default function GeneratedCode({ code }: GeneratedCodeProps) {
    return (
        <div className="mt-6 p-4 bg-card rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Generated Code</h2>
            <pre className="whitespace-pre-wrap">{code}</pre>
        </div>
    );
}