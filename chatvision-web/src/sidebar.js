export default function SideBar(){
    return (
        <>
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
		</div>
	</div>
        </>
    )
}