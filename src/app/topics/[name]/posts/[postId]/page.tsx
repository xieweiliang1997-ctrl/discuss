
interface PostShowPageProps{
  params:{
    name:string,
    postId:string
  }
}

export default async function PostShowPage({params}:PostShowPageProps){
  const {name,postId} = await params;
  return (
    <div>
  <h1>{postId}</h1>
      <h1>{name}</h1>
    </div>
  )
}