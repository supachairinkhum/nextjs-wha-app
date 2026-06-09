import { getCourses } from "@/services/course-service";
import FeaturesCourse from "@/components/features-course";

// http://localhost:3000/course
export default async function CoursePage() {
  const courseResponse = await getCourses();

  return (
    <main>
      {/* {
        JSON.stringify(courseResponse.data)
      } */}
      {
        courseResponse.data.length > 0 && <FeaturesCourse courses={courseResponse.data} />
      }
    </main>
  );
}
