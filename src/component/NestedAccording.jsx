import React from 'react'

const NestedAccording = ({ title, content }) => {
    const [accordionOpen, setAccordionOpen] = React.useState(false);

  return (
    <div className="">
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className={`${
          accordionOpen ? "" : ""
        } flex justify-between items-center  rounded-[12px] font-bold  `}
      >
        <span>{title}</span>
        <svg
          className="fill-[#F43F5E] shrink-0 ml-8"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
        </svg>
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out text-black rounded-[12px] w-[90%] mr-[45px] max-sm:mr-[12px] mt-[10px] text-sm ${
          accordionOpen ? "grid-rows-[1fr]  opacity-100" : "grid-rows-[0fr] p-0 opacity-0"
        }`}
      >
        <div className="overflow-hidden">{content}</div>
      </div>
    </div>
  )
}

export default NestedAccording