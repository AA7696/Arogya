import Kanban from "./Kanban"
function DailyTask() {

  return (
    <>
      <div className=" w-full min-h-screen  flex  mt-10 ">
        <div className="  shadow-lg rounded-lg  w-full  px-7 ">
          <h1 className="text-3xl font-bold text-center mb-6 text-[#1fbcf9]">Daily Task</h1>
          <p className=" text-center text-xl">Manage your task to live stress free life</p>
          <Kanban />
        </div>
      </div>    </>
  )
}

export default DailyTask
