"use client"
import {Button} from "@heroui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@heroui/popover";
import {Input, Textarea} from "@heroui/input";
import {startTransition, useActionState} from "react";
import * as actions from "@/src/actions"
import {Chip} from "@heroui/chip";
interface PostsCrateFormProps {
  name:string
}

export default function PostsCrateForm({name}:PostsCrateFormProps) {
  const [state, formAction,isPending] = useActionState(actions.createPosts.bind(null,name), {
    errors: {}
  })



  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => formAction(formData))
  }

  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Button color={"secondary"} variant={'bordered'} className='block ml-auto'>Crate a posts</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className='text-lg'>Create a posts</h3>
            <Input name={'title'} labelPlacement={"outside"} label={"title"} placeholder={"name"}
                   isInvalid={!!state.errors.title} errorMessage={state.errors.title?.join('')} ></Input>
            <Textarea name={'content'} labelPlacement={"outside"} label={"content"}
                      isInvalid={!!state.errors.content} errorMessage={state.errors.content?.join('')} placeholder={"posts description please"} ></Textarea>
            {state.errors._form?<Chip variant={"bordered"} radius={'sm'} className="max-w-full">{state.errors._form.join(',')}</Chip>:null}
            <Button isLoading={isPending} type={"submit"}>submit</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )


}