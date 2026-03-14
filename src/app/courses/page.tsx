import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { CourseCard } from '@/components/courses/CourseCard';
import styles from './courses.module.css';

export default function CoursesPage() {
    return (
        <div className={styles.page}>
            <PageHeader
                title="COURSES"
                subtitle="成長段階に合わせた3つのステップ"
            />

            <Section>
                <p className={styles.courseIntro}>
                    AIと人間が共創する社会へ。KuKKAでは、段階的にAI活用を解禁することで、<br />
                    真の「思考の筋力」と「AI活用力」を育みます。
                </p>
                <div className={styles.courseGrid}>
                    <CourseCard
                        title="Sprout コース"
                        href="/courses/basic"
                        imageSrc="/images/courses/basic-course.png"
                        imageAlt="Sprout Course - Scratch and Minecraft programming for kids"
                        target="小学生 / 初学者"
                        tools="Scratch, Minecraft"
                        aiStatus="forbidden"
                        description="プログラミング初学者向け。AIを禁止し、自分の頭で考える楽しさを学びます。"
                    />
                    <CourseCard
                        title="Grow コース"
                        href="/courses/text-coding"
                        imageSrc="/images/courses/text-coding-course.png"
                        imageAlt="Grow Course - Python and JavaScript with partial AI assistance"
                        target="中学生〜 / 基礎習得者"
                        tools="Python, JavaScript"
                        aiStatus="partial"
                        description="本格的なコーディングへ。AIを一部解禁し、学習を加速させます。"
                    />
                    <CourseCard
                        title="Bloom コース"
                        href="/courses/app-dev"
                        imageSrc="/images/courses/app-dev-course.png"
                        imageAlt="App Dev Course - Web and Native Apps with full AI integration"
                        target="応用力・開発志向"
                        tools="Web/Native Apps"
                        aiStatus="full"
                        description="実践的なアプリ開発。AIをフル活用し、創造力を最大限に発揮します。"
                    />
                </div>
            </Section>
        </div>
    );
}
