import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ColumnId } from "@/enums/column-ids"
import type { TrelloCardData } from "@/components/TrelloCard"

interface AddCardModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (card: TrelloCardData, columnId: ColumnId) => void
}

export function AddCardModal({ open, onOpenChange, onSave }: AddCardModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleSave = () => {
    if (!title.trim()) {
      return
    }

    const newCard: TrelloCardData = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim() || undefined,
    }

    onSave(newCard, ColumnId.Todo)
    
    setTitle("")
    setDescription("")
    onOpenChange(false)
  }

  const handleCancel = () => {
    setTitle("")
    setDescription("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Card</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Ingresa el título de la card"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && title.trim()) {
                  handleSave()
                }
              }}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Ingresa una descripción (opcional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!title.trim()}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}