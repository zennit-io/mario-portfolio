import type { Project } from "@/consts/resume";
import Image from "next/image";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export const ProjectDialog = ({ studyCase }: Project) => {
  return (
    <DialogPrimitive.DialogContent className="overflow-y-auto overflow-x-hidden data-[state=closed]:animate-out data-[state=open]:animate-in duration-500 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0  data-[state=closed]:slide-in-from-bottom-[0] data-[state=open]:slide-in-from-bottom-[10%] rounded-t-2xl z-[100] bg-background fixed w-screen h-[90dvh] translate-x-0 translate-y-0 bottom-0 left-0">
      <embed
        src={`${studyCase}#toolbar=0`}
        type="application/pdf"
        className="size-full"
      />
    </DialogPrimitive.DialogContent>
  );
};
