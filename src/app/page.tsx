import { BlurFade } from "@/components/animations/blur-fade";
import { BlurFadeText } from "@/components/animations/blur-fade-text";
import { ContactMeForm } from "@/components/contact-me-form";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Signature } from "@/components/signature";
import { Accordion } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { RESUME } from "@/consts/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import { DialogOverlay } from "@/components/ui/dialog";
import Image from "next/image";
import { XIcon } from "@/icons";
import { ProjectDialog } from "@/components/project-dialog";

const BLUR_FADE_DELAY = 0.04;

export default () => {
  return (
    <main className="flex min-h-[100dvh] flex-col space-y-10">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="flex justify-between gap-2">
            <div className="flex flex-1 flex-col space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="font-bold text-3xl tracking-tighter sm:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={`Hi, I'm ${RESUME.name.split(" ")[0]} 👋`}
              />
              <BlurFadeText
                className="max-w-[600px] md:text-xl"
                delay={BLUR_FADE_DELAY}
                text={RESUME.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-28 border">
                <AvatarImage alt={RESUME.name} src={RESUME.avatarUrl} />
                <AvatarFallback>{RESUME.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="font-bold text-xl">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose dark:prose-invert max-w-full text-pretty font-sans text-muted-foreground text-sm">
            {RESUME.summary}
          </Markdown>
        </BlurFade>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="font-bold text-xl">Work Experience</h2>
          </BlurFade>
          {RESUME.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <Accordion type={"multiple"}>
                <ResumeCard
                  {...work}
                  key={work.company}
                  logo={work.logoUrl}
                  alt={work.company}
                  title={work.company}
                  subtitle={work.title}
                />
              </Accordion>
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="font-bold text-xl">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1">
            {RESUME.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge key={skill}>{skill}</Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="projects">
        <div className="w-full space-y-12 py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground px-3 py-1 text-background text-sm">
                  My Projects
                </div>
                <h2 className="font-bold text-3xl tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve worked on a variety of projects, from simple
                  websites to complex web applications. Here are a few of my
                  favorites.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="mx-auto grid max-w-[800px] grid-cols-1 gap-3 sm:grid-cols-2">
            {RESUME.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <DialogPrimitive.Dialog>
                  <DialogPrimitive.DialogTrigger>
                    <ProjectCard key={project.title} {...project} />
                  </DialogPrimitive.DialogTrigger>
                  <DialogPrimitive.DialogPortal>
                    <DialogOverlay />
                    <DialogPrimitive.DialogClose asChild>
                      <button
                        type="button"
                        className="fixed top-4 right-4 z-[500] rounded-full p-1 bg-background "
                      >
                        <XIcon />
                      </button>
                    </DialogPrimitive.DialogClose>
                    <ProjectDialog {...project} />
                  </DialogPrimitive.DialogPortal>
                </DialogPrimitive.Dialog>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="contact">
        <div className="grid w-full items-center justify-center gap-4 px-4 py-12 md:px-6">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="mb-4 space-y-3 text-center">
              <div className="inline-block rounded-lg bg-foreground px-3 py-1 text-background text-sm">
                Contact
              </div>
              <h2 className="font-bold text-3xl tracking-tighter sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Want to chat? Just shoot me a dm{" "}
                <Link
                  href={RESUME.contact.social.X.url}
                  className="text-blue-500 hover:underline"
                >
                  with a direct question on twitter
                </Link>{" "}
                and I&apos;ll respond whenever I can. I will ignore all
                soliciting.
              </p>
            </div>
            <ContactMeForm />
          </BlurFade>
          <Signature className="w-full" />
        </div>
      </section>
    </main>
  );
};
