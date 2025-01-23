import { useParams } from 'react-router-dom'

const EditProjectView = () => {

    const params = useParams()

    const projectId = params.projectId!

    console.log(projectId)

  return (
    <div>
      
    </div>
  )
}

export default EditProjectView
