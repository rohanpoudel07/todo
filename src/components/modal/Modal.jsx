
const Modal = ({ state, content }) => {

  return (
    <div data-testid="modal" className="fixed left-0 top-0 w-screen h-screen bg-black bg-opacity-10 flex items-center justify-center">
      <div className="relative w-fit h-fit p-10 bg-white rounded-lg">
        <button data-testid="close_modal" className="absolute right-0 top-0 p-2 font-bold" onClick={() => state(false)}>
          X
        </button>
        {
          content
        }
      </div>
    </div>
  )
}

export default Modal