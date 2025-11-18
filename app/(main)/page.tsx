import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface featureProps {
  title: string;
  description: string;
  icon: string;
}

const features: featureProps[] = [
  {
    title: "Comprehensive Courses",
    description:
      "Access a wide range of courses across various subjects, designed by industry experts to provide you with the knowledge and skills you need.",
    icon: "📚",
  },
  {
    title: "Interactive Learning",
    description:
      "Engage with interactive content, quizzes, and assignments that make learning fun and effective. Our platform encourages active participation to enhance your understanding.",
    icon: "🎮",
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your learning journey with our built-in progress tracking features. Set goals, track your achievements, and stay motivated to reach new heights.",
    icon: "📈",
  },
  {
    title: "Community Support",
    description:
      "Join a vibrant community of learners and educators. Share your experiences, ask questions, and collaborate on projects to enrich your learning experience.",
    icon: "🤝",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative py-20">
        <div className="flex flex-col items-center text-center space-y-8">
          <Badge variant={"outline"}>The future of online Education</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Elevate your Learning Experience
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Discover a new way to learn with our modern, interactive learning
            management system. Access high-quality courses anytime, anywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href={"/courses"}
              className={buttonVariants({
                size: "lg",
              })}
            >
              Explore Courses
            </Link>
            <Link
              href={"/login"}
              className={buttonVariants({
                size: "lg",
                variant: "outline",
              })}
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
        {features.map((features, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="text-4xl mb-4">{features.icon}</div>
              <CardTitle>{features.title}</CardTitle>
              <CardContent>
                <p className="text-muted-foreground">{features.description}</p>
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </section>
    </>
  );
}
