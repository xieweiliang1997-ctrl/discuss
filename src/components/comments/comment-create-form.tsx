"use client"
import {Textarea} from "@heroui/input";
import {Button} from "@heroui/button";
import {startTransition, useActionState} from "react";
import * as actions from "@/src/actions";
import {Chip} from "@heroui/chip";

export default function CommentCreateForm({postId}:{postId:string}) {
  const [state, formAction,isPending] = useActionState(actions.createComment.bind(null,{
    postId
  }), {
    errors: {}
  })
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => formAction(formData))
  }
  return (
    <form onSubmit={handleSubmit} className={"space-y-3"}>
      <Textarea   isInvalid={!!state.errors.content} errorMessage={state.errors.content?.join('')} label={'Reply'} name={'content'} labelPlacement={'inside'} placeholder={"Enter your comment"}/>
      {state.errors._form ? <Chip variant={"bordered"} radius={'sm'}
                                  className="max-w-full">{state.errors._form.join(',')}</Chip> : null}
      <Button type={"submit"} color={"secondary"} variant={"bordered"}>Create Comment</Button>
    </form>
  )
}