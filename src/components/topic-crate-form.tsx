"use client"
import {Button} from "@heroui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@heroui/popover";
import {Input, Textarea} from "@heroui/input";
import * as actions from "@/src/actions"
import {useActionState} from "react"
export default function TopicCrateForm(){
  const [state,formAction] = useActionState(actions.createTopic,{
    errors:{}
  })
  return(
    <Popover placement="bottom">
      <PopoverTrigger>
        <Button color={"secondary"} variant={'bordered'}>Crate a Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={formAction}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className='text-lg'>Create a Topic</h3>
            <Input name={'name'} labelPlacement={"outside"} label={"name"} placeholder={"name"} isInvalid={!!state.errors.name} errorMessage={state.errors.name?.join('')}></Input>
            <Textarea name={'description'} labelPlacement={"outside"} label={"description"} placeholder={"topic description please"}  isInvalid={!!state.errors.description} errorMessage={state.errors.description?.join('')}></Textarea>
            <Button type={"submit"}>submit</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )


}