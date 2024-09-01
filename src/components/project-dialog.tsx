import type { Project } from "@/consts/resume";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
export const ProjectDialog = ({ studyCase }: Project) => {
  return (
    <DialogPrimitive.DialogContent className="overflow-y-auto overflow-x-hidden data-[state=closed]:animate-out data-[state=open]:animate-in duration-500 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0  data-[state=closed]:slide-in-from-bottom-[0] data-[state=open]:slide-in-from-bottom-[10%] rounded-t-2xl z-[100] bg-background fixed w-screen h-[90dvh] translate-x-0 translate-y-0 bottom-0 left-0">
      <VisuallyHidden.Root>
        <DialogPrimitive.Title>{studyCase} - PDF Viewer</DialogPrimitive.Title>
      </VisuallyHidden.Root>
      <VisuallyHidden.Root>
        <DialogPrimitive.Description>
          {studyCase} - PDF Viewer
        </DialogPrimitive.Description>
      </VisuallyHidden.Root>
      <object
        data={`${studyCase}#toolbar=0`}
        className="size-full"
        title="PDF Viewer"
      >
        <p className="p-4">
          Your browser doesn't support PDF viewing. Please download the PDF to
          view it:{" "}
          <a href={studyCase} className="underline">
            Download PDF
          </a>
          .
        </p>
      </object>
    </DialogPrimitive.DialogContent>
  );
};
