"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import slugify from "slugify";
import type { JSONContent } from "@tiptap/react";
import RichTextEditor from "@/components/editor/RichTextEditor";
import type { EmploymentType } from "@/lib/types";

const employmentTypes: EmploymentType[] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
];

export default function NewCareerPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState<JSONContent>({ type: "doc", content: [] });
  const [requirements, setRequirements] = useState<JSONContent>({ type: "doc", content: [] });
  const [published, setPublished] = useState(false);
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("Sulphur, LA");
  const [employmentType, setEmploymentType] = useState<EmploymentType>("Full-time");
  const [salaryRange, setSalaryRange] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setSlug(slugify(value, { lower: true, strict: true }));
  };

  const handleSave = async () => {
    if (!title.trim()) return;

    setSaving(true);
    const body: Record<string, unknown> = {
      title,
      slug,
      description,
      requirements,
      published,
      department: department || null,
      location,
      employment_type: employmentType,
      salary_range: salaryRange || null,
      expires_at: expiresAt || null,
    };

    const res = await fetch("/api/careers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push("/admin/careers");
    }
    setSaving(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/careers"
          className="p-2 text-tactical-400 hover:text-tactical-200 hover:bg-tactical-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-tactical-100">
            Post New Job
          </h1>
          <p className="text-tactical-400 mt-1">
            Create a new job posting
          </p>
        </div>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-tactical-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Job title"
              className="w-full px-4 py-3 bg-tactical-900 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sniper-brand/50"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-tactical-300 mb-2">
              Slug
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="job-slug"
              className="w-full px-4 py-3 bg-tactical-900 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sniper-brand/50"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-tactical-300 mb-2">
              Description
            </label>
            <RichTextEditor
              content={description}
              onChange={setDescription}
              placeholder="Describe the role and responsibilities..."
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-medium text-tactical-300 mb-2">
              Requirements
            </label>
            <RichTextEditor
              content={requirements}
              onChange={setRequirements}
              placeholder="List the qualifications and requirements..."
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-tactical-900 border border-tactical-700 rounded-xl p-6 space-y-5">
            {/* Published Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-tactical-300">
                Published
              </label>
              <button
                type="button"
                onClick={() => setPublished(!published)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  published ? "bg-sniper-brand" : "bg-tactical-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    published ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-tactical-300 mb-2">
                Department
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Operations"
                className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sniper-brand/50"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-tactical-300 mb-2">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Sulphur, LA"
                className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sniper-brand/50"
              />
            </div>

            {/* Employment Type */}
            <div>
              <label className="block text-sm font-medium text-tactical-300 mb-2">
                Employment Type
              </label>
              <select
                value={employmentType}
                onChange={(e) =>
                  setEmploymentType(e.target.value as EmploymentType)
                }
                className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 rounded-lg text-tactical-100 focus:outline-none focus:border-sniper-brand/50"
              >
                {employmentTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Salary Range */}
            <div>
              <label className="block text-sm font-medium text-tactical-300 mb-2">
                Salary Range
              </label>
              <input
                type="text"
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
                placeholder="e.g. $50,000 - $70,000"
                className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sniper-brand/50"
              />
            </div>

            {/* Expires At */}
            <div>
              <label className="block text-sm font-medium text-tactical-300 mb-2">
                Expires At
              </label>
              <input
                type="date"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 rounded-lg text-tactical-100 focus:outline-none focus:border-sniper-brand/50"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={saving || !title.trim()}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-crimson-600 hover:bg-crimson-700 disabled:bg-tactical-700 disabled:text-tactical-500 text-white font-medium rounded-lg transition-colors"
            >
              {saving ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Save className="h-5 w-5" />
              )}
              {saving ? "Saving..." : "Save Job Posting"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
