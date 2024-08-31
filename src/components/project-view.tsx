"use client";

import { RESUME } from "@/consts/resume";
import type { Project } from "@/types/project";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import Markdown from "react-markdown";
import { BlurFade } from "./animations/blur-fade";
import { ProjectCard } from "./project-card";
import { Badge } from "./ui/badge";
const BLUR_FADE_DELAY = 0.04;

export const ProjectView = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [cardRect, setCardRect] = useState<DOMRect | null>(null);
  const handleSelect = (
    index: number,
    event: MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setSelectedProject(RESUME.projects[index]);
    const rect = event.currentTarget.getBoundingClientRect();
    setCardRect(rect);
    console.log(selectedProject);
  };
  const handleDismiss = () => {
    setSelectedProject(null);
  };

  return (
    <LayoutGroup>
      <BlurFade
        delay={BLUR_FADE_DELAY * 12 * 0.05}
        className="mx-auto grid max-w-[800px] grid-cols-2 gap-3 sm:grid-cols-2 w-full"
      >
        {RESUME.projects.map((project, i) => (
          <ProjectCard
            key={project.title}
            {...project}
            onClick={(e) => handleSelect(i, e)}
            layoutId={`project-${project.title}`}
          />
        ))}

        {createPortal(
          <AnimatePresence>
            {!!selectedProject && !!cardRect && (
              <motion.div
                onClick={handleDismiss}
                className="fixed top-0 left-0 w-screen h-screen z-20 bg-foreground/40 backdrop-blur-lg overflow-auto origin-center"
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
              >
                <motion.div
                  layoutId={`project-${selectedProject.title}`}
                  initial={{
                    width: cardRect.width,
                    height: cardRect.height,
                    x: cardRect.left,
                    y: cardRect.top,
                  }}
                  animate={{
                    width: "100vw",
                    height: "90vh",
                    x: 0,
                    y: 0,
                  }}
                  exit={{
                    width: cardRect.width,
                    height: cardRect.height,
                    x: cardRect.left,
                    y: cardRect.top,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="fixed bottom-0 left-0 bg-background rounded-xl overflow-hidden"
                >
                  <motion.div layout className="p-2 flex flex-col gap-2">
                    <motion.h3
                      className="mt-1 font-semibold text-lg"
                      layout="position"
                      layoutId={`project-${selectedProject.title}-title`}
                    >
                      {selectedProject.title}
                    </motion.h3>
                    <motion.div
                      layoutId={`project-${selectedProject.title}-description`}
                      layout="position"
                    >
                      <Markdown className="prose dark:prose-invert max-w-full text-pretty font-sans text-muted-foreground text-xs">
                        {selectedProject.description}
                      </Markdown>
                    </motion.div>
                    <motion.div
                      className="mt-auto flex flex-col"
                      layoutId={`project-${selectedProject.title}-tags`}
                      layout="position"
                    >
                      {!!selectedProject.tags.length && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {selectedProject.tags?.map((tag) => (
                            <Badge
                              className="text-2xs"
                              variant="soft"
                              key={tag}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
      </BlurFade>
    </LayoutGroup>
  );
};
