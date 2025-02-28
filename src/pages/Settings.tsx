
import { useNavigate } from "react-router-dom";
import ApiKeySettings from "@/components/ApiKeySettings";
import { Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <SettingsIcon className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50"
          >
            Back to Chat
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <ApiKeySettings />
      </div>
    </div>
  );
}
