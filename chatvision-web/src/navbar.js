import { useNavigate } from "react-router-dom";
export default function Navbar(){
    const navigate=useNavigate();
    const handleClick = (e) => {
      localStorage.removeItem("user_email");
      localStorage.removeItem("KEY_ACCESS_TOKEN");
      navigate('/login');
    }
    return (
      <>
      <nav className="shadow rounded px-4 py-2 flex flex-row justify-between items-center sticky top-0 bg-gray-900 border-gray-700 text-gray-200">
        <div className="text-xl font-bold"><a href='/' >ChatVision</a></div>
        <button onClick={handleClick}>Logout</button>
      </nav>
      <div class="absolute w-50 h-full top-11 items-center text-gray-200 bg-gray-900">
		<div class="flex flex-col items-center mt-3">
			<a class="flex items-center h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" href="/stable">
                Text-2-Image
			</a>
			<a class="flex items-center h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" href="/code_explainer">
                Code-Explainer
			</a>
			<a class="flex items-center h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" href="/mock_interview">
                &nbsp;Mock-Interviewer &nbsp;
			</a>
            <a class="flex items-center  h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" href="/quiz_master">
				Quiz-Master
			</a>
      <a class="flex items-center  h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" href="/email_gen">
      &nbsp;Email-Generator &nbsp;
			</a>
      <a class="flex items-center  h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" href="/tutor">
      &nbsp;Personal-Tutor&nbsp;
			</a>
		</div>
	</div>
    </>
    )
}