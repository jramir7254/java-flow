import Header from "@/components/navigation/header";
import { SidebarInset } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/navigation/sidebar";
import { createClient } from "@/lib/supabase/server";

export default async function CoursesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    let role = "student";
    let enrolledCourses: any[] = [];

    if (user) {
        const { data: profile } = await supabase.from('user_profiles').select('role').eq('id', user.id).single();
        if (profile?.role) role = profile.role;

        const { data: enrollments } = await supabase.from('course_enrollments')
            .select(`
                courses (
                    id,
                    name
                )
            `)
            .eq('user_id', user.id);
        
        if (enrollments) {
            enrolledCourses = enrollments
                .map(e => e.courses)
                .flat()
                .filter(Boolean);
        }
    }

    return (
        <>
            <AppSidebar role={role} enrolledCourses={enrolledCourses} />
            <SidebarInset className="overflow-hidden border border-border">
                <Header courses={enrolledCourses} />
                <Separator />
                <div className="flex flex-1 flex-col overflow-hidden">
                    {children}
                </div>
            </SidebarInset>
        </>
    );
}
