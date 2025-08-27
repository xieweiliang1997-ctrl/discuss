import TopicCrateForm from "@/src/components/topic-crate-form";

export default function Home() {
  return (
    <div className="flex justify-between">
     <div>
       <h1 className='text-xl mt-2'>Top Posts</h1>
     </div>
    <div>
      <TopicCrateForm></TopicCrateForm>
    </div>
    </div>
  );
}
