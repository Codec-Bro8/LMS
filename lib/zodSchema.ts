import z from "zod";
export const courseLevel = ["Beginner", "Intermediate", "Advanced"];
export const courseStatus = ["Draft", "Published", "Archive"];
export const courseCategories = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning & AI",
  "Cybersecurity",
  "Cloud Computing",
  "DevOps",
  "UI/UX Design",
  "Game Development",
  "Blockchain & Cryptocurrency",
  "Database Management",
  "Software Testing",
  "Digital Marketing",
  "Business & Entrepreneurship",
];

export const CourseSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long.")
    .max(100, "Title must be at most 100 characters long."),

  description: z
    .string("Description is required.")
    .min(3, "Description must be at least 3 characters long."),

  fileKey: z
    .string("File key is required.")
    .min(1, "File key cannot be empty."),

  price: z.coerce
    .number("Price is required.")
    .min(1, "Price must be at least 1."),

  duration: z.coerce
    .number("Duration is required.")
    .min(1, "Duration must be at least 1 unit.")
    .max(500, "Duration must be at most 500 units."),

  level: z.enum(courseLevel, "Course level is required."),

  category: z.enum(courseCategories, "Category is required."),

  smallDescription: z
    .string("Short description is required.")
    .min(3, "Short description must be at least 3 characters long.")
    .max(200, "Short description must be at most 200 characters long."),

  slug: z
    .string("Slug is required.")
    .min(3, "Slug must be at least 3 characters long."),

  status: z.enum(courseStatus, "Course status is required."),
});

export type CourseSchemaType = z.infer<typeof CourseSchema>;
