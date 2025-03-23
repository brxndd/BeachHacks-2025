'use client'
import Questionnaire from "../../components/Questionnaire"
import NavBar from "../../components/NavBar"

export default function TodoList() {
  return (
    <div>
      <NavBar />
      <h1 className = "text-[#8a2929] text-5xl font-bold mb-6 flex justify-center items-center mt-16">
        To-Do-List
      </h1>
      <Questionnaire />
    </div>
  );
}
