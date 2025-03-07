export type AIModel = "gpt-4" | "claude" | "gemini";

export type ActionType = "webhook" | "email" | "database" | "automation";

export interface Project {
  id: string;
  name: string;
  description?: string;
  forwardingEmails: string[];
  prompt: string;
  aiModel: AIModel;
  action: {
    type: ActionType;
    config: {
      webhookUrl?: string;
      forwardToEmail?: string;
      databaseConfig?: {
        type: string;
        connection: string;
      };
      automationConfig?: {
        type: string;
        params: Record<string, unknown>;
      };
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

export type ProjectFormData = Omit<Project, "id" | "createdAt" | "updatedAt">;
