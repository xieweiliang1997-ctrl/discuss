"use client"
import {Textarea} from "@heroui/input";
import {Button} from "@heroui/button";
import {startTransition, useActionState, useEffect, useRef, useState} from "react";
import * as actions from "@/src/actions";
import {Chip} from "@heroui/chip";

export default function CommentCreateForm({postId, isOpen = false,parentId}: { postId: string, isOpen?: boolean,parentId?:string }) {
  const [open, setOpen] = useState(isOpen)
  const [state, formAction, isPending] = useActionState(actions.createComment.bind(null, {
    postId,
    parentId
  }), {
    errors: {}
  })
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => formAction(formData))
  }

  const formRef = useRef<HTMLFormElement | null>(null)

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
    }
  }, [state]);

  return (
    <div className={"space-y-3 mt-3"}>
      {!isOpen && <Button onClick={() => setOpen(!open)} size={'sm'} variant={"shadow"}>Reply</Button>}
      {
        open && <form ref={formRef} onSubmit={handleSubmit} className={"space-y-3"}>
              <Textarea isInvalid={!!state.errors.content} errorMessage={state.errors.content?.join('')} label={'Reply'}
                        name={'content'} labelPlacement={'inside'} placeholder={"Enter your comment"}/>
          {state.errors._form ? <Chip variant={"bordered"} radius={'sm'}
                                      className="max-w-full">{state.errors._form.join(',')}</Chip> : null}
              <Button type={"submit"} color={"secondary"} variant={"bordered"}>Create Comment</Button>
          </form>
      }
    </div>
  )
}