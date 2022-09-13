
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="flex items-center justify-center h-full text-textColor text-2xl font-semibold">
      <h1>Seja bem-vindo!</h1>
    </div>

  )
}