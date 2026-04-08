"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ModalProps } from "@/types";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";

export default function Modal({ children, titleModal, dialogTitle, dialogDescription }: ModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2" slot="trigger">
          <Upload className="mh-4 w-4" />
          {titleModal || "Open"}
        </Button>
      </DialogTrigger>
      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle>{dialogTitle || "Are you absolutely sure?"}</DialogTitle>
          <DialogDescription>{dialogDescription || "This action cannot be undone. This will permanently delete your account and remove your data from our servers."}</DialogDescription>
        </DialogHeader>
        <div className="mt-2">
          {children} {/* Konten fleksibel, bisa form, tombol, icons */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
