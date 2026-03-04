import DictionaryApp from "../components/DictionaryApp";
import Features from "../components/Features";

export default function ToolHome() {
  return (
    <div className="w-full min-h-screen px-4 sm:px-6 lg:px-8">
      <DictionaryApp />
      <Features/>
    </div>
  );
}