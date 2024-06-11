import { useState } from "react";
import Header from "./Header";
import Image from "@/components/Image";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import prism from "react-syntax-highlighter/dist/esm/styles/prism/prism";
import remarkGfm from "remark-gfm";
SyntaxHighlighter.registerLanguage("jsx", jsx);

export default function DocsPage() {
  const data = {
    "Module 1": ["Lesson 1", "Lesson 2", "Lesson 3"],
    "Module 2": [
      "Lesson 1",
      "Lesson 2",
      "Lesson 3",
      "Lesson 4",
      "Lesson 5",
      "Lesson 6",
      "Lesson 7",
      "Lesson 8",
      "Lesson 9",
      "Lesson 10",
      "Lesson 11",
      "Lesson 12",
      "Lesson 13",
      "Lesson 14",
    ],
  };

  const [selectedModule, setSelectedModule] = useState(Object.keys(data)[0]);
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [content, setContent] = useState("");
  const handleLessonIncrement = (increment = 1) => {
    if (selectedLesson < data[selectedModule].length - 1 && increment > 0) {
      setSelectedLesson(selectedLesson + increment);
    }
    if (selectedLesson > 0 && increment < 0) {
      setSelectedLesson(selectedLesson + increment);
    }
  };
  const disableNext = selectedLesson === data[selectedModule].length - 1;
  const disablePrev = selectedLesson === 0;
  useEffect(() => {
    const path = `/modules/${selectedModule}/${data[selectedModule][selectedLesson]}.md`;
    fetch(path)
      .then((response) => response.text())
      .then((text) => {
        console.log("text recieved from file", path, text);
        setContent(text);
      });
  }, [selectedLesson, selectedModule]);
  return (
    <div className="h-screen flex flex-col w-screen">
      <Header />
      <div className="flex  px-6 py-4 gap-3 flex-1 max-h-[calc(100%-90px)] w-full">
        {/* left meny */}
        <div className=" max-w-[20%] flex gap-3 flex-col h-full w-full">
          <select
            defaultValue={selectedModule}
            className="outline-none flex uppercase text-base font-medium items-center justify-center border-2 flex-1 max-h-8 bg-accent w-full rounded-[10px] border-black  shadow2"
            onChange={(e) => {
              setSelectedModule(e.target.value);
              setSelectedLesson(0);
            }}
          >
            {Object.keys(data).map((module, index) => (
              <option className="text-center w-full" key={index} value={module}>
                {module}
              </option>
            ))}
          </select>
          <div className="overflow-y-auto border-2 flex-1 w-full rounded-[10px] border-black bg-bg2 shadow2 px-2 py-3 gap-3 flex flex-col items-center">
            {data[selectedModule].map((lesson, index) => (
              <button
                className={`w-full ${index == selectedLesson ? "bg-primary" : "bg-white"} flex flex-row  h-6 shadow1 rounded-[10px] items-center border-2 border-black gap-2`}
                key={index}
                onClick={() => {
                  setSelectedLesson(index);
                }}
              >
                <div className="h-6 flex items-center justify-center border-r-2 border-black w-6">
                  {index + 1}.
                </div>
                <h4 className="mt-[2px]"> {lesson}</h4>
              </button>
            ))}
          </div>
        </div>
        {/* info part */}
        <div className=" max-w-[50%]  flex gap-3 flex-col h-full w-full">
          <div className="p-3 overflow-y-auto border-2 flex-1 w-full rounded-[10px] border-black  bg-white  shadow2">
            {content && (
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    console.log("match", match?.[1]);
                    return !inline && match ? (
                      <SyntaxHighlighter
                        language={match[1]}
                        PreTag="div"
                        style={prism}
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
                className={"markdown"}
                remarkPlugins={[remarkGfm]}
              >
                {content}
              </ReactMarkdown>
            )}
          </div>
          <div className=" flex flex-row gap-3 flex-1 max-h-8 h-full w-full">
            <button
              disabled={disablePrev}
              className=" border-2 flex-1 max-h-8 h-full w-full rounded-[10px] border-black  bg-black shadow2 bg-opacity-40 flex items-center justify-center gap-2"
              onClick={() => handleLessonIncrement(-1)}
            >
              <Image
                src={"iconLongArrow.png"}
                className="h-[16px] w-[16px] rotate-180"
              />
              Previous
            </button>
            <button
              disabled={disableNext}
              className=" border-2 flex-1 max-h-8 h-full w-full rounded-[10px] border-black  bg-black bg-opacity-60 shadow2 flex items-center justify-center gap-2"
              onClick={() => handleLessonIncrement()}
            >
              Next
              <Image src={"iconLongArrow.png"} className="h-[16px] w-[16px]" />
            </button>
          </div>
        </div>
        {/* code part */}
        <div className="max-w-[30%] border-2 rounded-[10px] border-black  h-full bg-secondary w-full shadow2"></div>
      </div>
      {/* footer */}
      <div className="flex-shrink-0  w-full max-h-8 text-white px-6 bg-black flex-1 flex items-center text-opacity-60">
        @copyright CadenceFun
      </div>
    </div>
  );
}
