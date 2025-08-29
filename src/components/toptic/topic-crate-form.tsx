"use client"
import {Button} from "@heroui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@heroui/popover";
import {Input, Textarea} from "@heroui/input";
import * as actions from "@/src/actions"
import {startTransition, useActionState} from "react"
import {Chip} from "@heroui/chip";
export default function TopicCrateForm() {
  const [state, formAction,isPending] = useActionState(actions.createTopic, {
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
        <Button color={"secondary"} variant={'bordered'} className='block ml-auto'>Crate a Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className='text-lg'>Create a Topic</h3>
            <Input name={'name'} labelPlacement={"outside"} label={"name"} placeholder={"name"}
                   isInvalid={!!state.errors.name} errorMessage={state.errors.name?.join('')}></Input>
            <Textarea name={'description'} labelPlacement={"outside"} label={"description"}
                      placeholder={"topic description please"} isInvalid={!!state.errors.description}
                      errorMessage={state.errors.description?.join('')}></Textarea>
            {state.errors._form?<Chip variant={"bordered"} radius={'sm'} className="max-w-full">{state.errors._form.join(',')}</Chip>:null}
            <Button isLoading={isPending} type={"submit"}>submit</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )


}