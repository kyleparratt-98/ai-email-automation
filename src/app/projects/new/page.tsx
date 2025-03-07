"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import AppLayout from "@/components/layout/AppLayout";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { ProjectFormData, ActionType } from "@/lib/types";

const aiModelOptions = [
  { label: "GPT-4", value: "gpt-4" },
  { label: "Claude", value: "claude" },
  { label: "Gemini", value: "gemini" },
];

const actionTypeOptions = [
  { label: "Webhook", value: "webhook" },
  { label: "Email", value: "email" },
  { label: "Database", value: "database" },
  { label: "Automation", value: "automation" },
];

export default function NewProject() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProjectFormData>({
    defaultValues: {
      action: {
        type: "webhook",
        config: {},
      },
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const selectedActionType = watch("action.type") as ActionType;

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement project creation
      console.log(data);
    } catch (error) {
      console.error("Failed to create project:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Create New Project
          </h2>
        </div>
      </div>

      <div className="mt-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Project Details
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Basic information about your email automation project.
                </p>
              </div>
              <div className="mt-5 md:col-span-2 md:mt-0">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-4">
                    <Input
                      label="Project Name"
                      {...register("name", {
                        required: "Project name is required",
                      })}
                      error={errors.name?.message}
                    />
                  </div>

                  <div className="col-span-6">
                    <Input
                      label="Description"
                      {...register("description")}
                      error={errors.description?.message}
                    />
                  </div>

                  <div className="col-span-6">
                    <Input
                      label="Forwarding Emails (comma-separated)"
                      {...register("forwardingEmails", {
                        required: "At least one forwarding email is required",
                        setValueAs: (v: string) =>
                          v.split(",").map((email) => email.trim()),
                      })}
                      error={errors.forwardingEmails?.message}
                    />
                  </div>

                  <div className="col-span-6">
                    <Input
                      label="AI Prompt"
                      {...register("prompt", {
                        required: "Prompt is required",
                      })}
                      error={errors.prompt?.message}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <Select
                      label="AI Model"
                      options={aiModelOptions}
                      {...register("aiModel", {
                        required: "AI Model is required",
                      })}
                      error={errors.aiModel?.message}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <Select
                      label="Action Type"
                      options={actionTypeOptions}
                      {...register("action.type", {
                        required: "Action type is required",
                      })}
                    />
                  </div>

                  {selectedActionType === "webhook" && (
                    <div className="col-span-6">
                      <Input
                        label="Webhook URL"
                        {...register("action.config.webhookUrl", {
                          required: "Webhook URL is required",
                        })}
                        error={errors.action?.config?.webhookUrl?.message}
                      />
                    </div>
                  )}

                  {selectedActionType === "email" && (
                    <div className="col-span-6">
                      <Input
                        label="Forward to Email"
                        type="email"
                        {...register("action.config.forwardToEmail", {
                          required: "Forward to email is required",
                        })}
                        error={errors.action?.config?.forwardToEmail?.message}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="ml-3 inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isSubmitting ? "Creating..." : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
