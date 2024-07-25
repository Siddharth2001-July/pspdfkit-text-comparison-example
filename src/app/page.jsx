"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

export const chatBotSVG = (
  //<svg id="Layer_1" data-name="Layer 1" fill="rgb(245 240 240)" height={50} width={50} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 119.35"><title>chatbot</title><path d="M57.49,29.2V23.53a14.41,14.41,0,0,1-2-.93A12.18,12.18,0,0,1,50.44,7.5a12.39,12.39,0,0,1,2.64-3.95A12.21,12.21,0,0,1,57,.92,12,12,0,0,1,61.66,0,12.14,12.14,0,0,1,72.88,7.5a12.14,12.14,0,0,1,0,9.27,12.08,12.08,0,0,1-2.64,3.94l-.06.06a12.74,12.74,0,0,1-2.36,1.83,11.26,11.26,0,0,1-2,.93V29.2H94.3a15.47,15.47,0,0,1,15.42,15.43v2.29H115a7.93,7.93,0,0,1,7.9,7.91V73.2A7.93,7.93,0,0,1,115,81.11h-5.25v2.07A15.48,15.48,0,0,1,94.3,98.61H55.23L31.81,118.72a2.58,2.58,0,0,1-3.65-.29,2.63,2.63,0,0,1-.63-1.85l1.25-18h-.21A15.45,15.45,0,0,1,13.16,83.18V81.11H7.91A7.93,7.93,0,0,1,0,73.2V54.83a7.93,7.93,0,0,1,7.9-7.91h5.26v-2.3A15.45,15.45,0,0,1,28.57,29.2H57.49ZM82.74,47.32a9.36,9.36,0,1,1-9.36,9.36,9.36,9.36,0,0,1,9.36-9.36Zm-42.58,0a9.36,9.36,0,1,1-9.36,9.36,9.36,9.36,0,0,1,9.36-9.36Zm6.38,31.36a2.28,2.28,0,0,1-.38-.38,2.18,2.18,0,0,1-.52-1.36,2.21,2.21,0,0,1,.46-1.39,2.4,2.4,0,0,1,.39-.39,3.22,3.22,0,0,1,3.88-.08A22.36,22.36,0,0,0,56,78.32a14.86,14.86,0,0,0,5.47,1A16.18,16.18,0,0,0,67,78.22,25.39,25.39,0,0,0,72.75,75a3.24,3.24,0,0,1,3.89.18,3,3,0,0,1,.37.41,2.22,2.22,0,0,1,.42,1.4,2.33,2.33,0,0,1-.58,1.35,2.29,2.29,0,0,1-.43.38,30.59,30.59,0,0,1-7.33,4,22.28,22.28,0,0,1-7.53,1.43A21.22,21.22,0,0,1,54,82.87a27.78,27.78,0,0,1-7.41-4.16l0,0ZM94.29,34.4H28.57A10.26,10.26,0,0,0,18.35,44.63V83.18A10.26,10.26,0,0,0,28.57,93.41h3.17a2.61,2.61,0,0,1,2.41,2.77l-1,14.58L52.45,94.15a2.56,2.56,0,0,1,1.83-.75h40a10.26,10.26,0,0,0,10.22-10.23V44.62A10.24,10.24,0,0,0,94.29,34.4Z"/></svg>
<svg style={{marginLeft:'6px'}} fill="white" width={40} height={40} viewBox="0 0 628 628" id="icons" xmlns="http://www.w3.org/2000/svg"><path d="M208,512a24.84,24.84,0,0,1-23.34-16l-39.84-103.6a16.06,16.06,0,0,0-9.19-9.19L32,343.34a25,25,0,0,1,0-46.68l103.6-39.84a16.06,16.06,0,0,0,9.19-9.19L184.66,144a25,25,0,0,1,46.68,0l39.84,103.6a16.06,16.06,0,0,0,9.19,9.19l103,39.63A25.49,25.49,0,0,1,400,320.52a24.82,24.82,0,0,1-16,22.82l-103.6,39.84a16.06,16.06,0,0,0-9.19,9.19L231.34,496A24.84,24.84,0,0,1,208,512Zm66.85-254.84h0Z"/><path d="M400,256a16,16,0,0,1-14.93-10.26l-22.84-59.37a8,8,0,0,0-4.6-4.6l-59.37-22.84a16,16,0,0,1,0-29.86l59.37-22.84a8,8,0,0,0,4.6-4.6L384.9,42.68a16.45,16.45,0,0,1,13.17-10.57,16,16,0,0,1,16.86,10.15l22.84,59.37a8,8,0,0,0,4.6,4.6l59.37,22.84a16,16,0,0,1,0,29.86l-59.37,22.84a8,8,0,0,0-4.6,4.6l-22.84,59.37A16,16,0,0,1,400,256Z"/></svg>
);

// Baseline UI components
const I18nProvider = dynamic(
  () => import("@baseline-ui/core").then((mod) => mod.I18nProvider),
  { ssr: false }
);
const ThemeProvider = dynamic(
  () => import("@baseline-ui/core").then((mod) => mod.ThemeProvider),
  { ssr: false }
);

export default function Home() {
  const originalContainerRef = useRef(null);
  const changedContainerRef = useRef(null);
  const operationsRef = useRef(new Map());

  const [operationsMap, setOperationsMap] = useState(new Map());

  function updateOperationsMap(existingMap) {
    setOperationsMap(new Map(existingMap));
  }

  const originalDoc = "text-comparison-a.pdf";
  const changedDoc = "text-comparison-b.pdf";
  const numberOfContextWords = 100;

  useEffect(() => {
    const originalContainer = originalContainerRef.current;
    const changedContainer = changedContainerRef.current;
    const deleteHighlightColor = { r: 255, g: 201, b: 203 }; // #FFC9CB
    const insertHighlightColor = { r: 192, g: 216, b: 239 }; // #C0D8EF

    if (typeof window !== "undefined") {
      import("pspdfkit").then(async (PSPDFKit) => {
        if (PSPDFKit) {
          PSPDFKit.unload(originalContainer);
        }

        let originalInstance = await PSPDFKit.load({
          container: originalContainer,
          document: originalDoc,
          baseUrl: `${window.location.protocol}//${window.location.host}/`,
          styleSheets: ["/styles.css"],
        });

        let changedInstance = await PSPDFKit.load({
          container: changedContainer,
          document: changedDoc,
          baseUrl: `${window.location.protocol}//${window.location.host}/`,
        });

        // add event listeners to sync the view state to the right viewer
        const scrollElement =
          changedInstance.contentDocument.querySelector(".PSPDFKit-Scroll");
        scrollElement.addEventListener("scroll", syncViewState);
        changedInstance.addEventListener(
          "viewState.currentPageIndex.change",
          syncViewState
        );
        changedInstance.addEventListener(
          "viewState.zoom.change",
          syncViewState
        );

        // synchronize the view state of the original instance viewer to the changed instance viewer
        function syncViewState() {
          // Get the current view state from the left viewer
          const customViewState = {
            pageNumber: changedInstance.viewState.currentPageIndex,
            zoomLevel: changedInstance.viewState.zoom,
            scrollLeft:
              changedInstance.contentDocument.querySelector(".PSPDFKit-Scroll")
                .scrollLeft,
            scrollTop:
              changedInstance.contentDocument.querySelector(".PSPDFKit-Scroll")
                .scrollTop,
          };

          // Set the page number and zoom level for the right viewer
          let viewState = originalInstance.viewState;
          originalInstance.setViewState(
            viewState.set("currentPageIndex", customViewState.pageNumber)
          );
          originalInstance.setViewState(
            viewState.set("zoom", customViewState.zoomLevel)
          );

          // Set scroll position for the right viewer
          const scrollElement =
            originalInstance.contentDocument.querySelector(".PSPDFKit-Scroll");
          scrollElement.scrollLeft = customViewState.scrollLeft;
          scrollElement.scrollTop = customViewState.scrollTop;
        }

        let totalPageCount = await originalInstance.totalPageCount;

        for (let i = 0; i < totalPageCount; i++) {
          console.log("comparing page: ", i + 1, " of ", totalPageCount);

          const originalDocument = new PSPDFKit.DocumentDescriptor({
            filePath: originalDoc,
            pageIndexes: [i],
          });

          const changedDocument = new PSPDFKit.DocumentDescriptor({
            filePath: changedDoc,
            pageIndexes: [i],
          });

          const textComparisonOperation = new PSPDFKit.ComparisonOperation(
            PSPDFKit.ComparisonOperationType.TEXT,
            {
              numberOfContextWords: numberOfContextWords,
            }
          );

          const comparisonResult = await originalInstance.compareDocuments(
            { originalDocument, changedDocument },
            textComparisonOperation
          );

          let originalInstanceRects = PSPDFKit.Immutable.List([
            // new PSPDFKit.Geometry.Rect({
            //   left: 10,
            //   top: 10,
            //   width: 200,
            //   height: 10,
            // }),
          ]);

          let changedInstanceRects = PSPDFKit.Immutable.List([]);

          let originalPageInfo = await originalInstance.pageInfoForIndex(i);
          let changedPageInfo = await changedInstance.pageInfoForIndex(i);

          let changes = new Map();
          // prettier-ignore
          for (let j = 0; j < comparisonResult.length; j++) {
            for (let k = 0; k < comparisonResult[j].documentComparisonResults.length; k++) {
              for (let l = 0; l < comparisonResult[j].documentComparisonResults[k].comparisonResults.length; l++) {
                for (let m = 0; m < comparisonResult[j].documentComparisonResults[k].comparisonResults[l].hunks.length; m++) {
                  for (let n = 0; n < comparisonResult[j].documentComparisonResults[k].comparisonResults[l].hunks[m].operations.length; n++) {
                    let operation = comparisonResult[j].documentComparisonResults[k].comparisonResults[l].hunks[m].operations[n];
                    switch (operation.type) {
                      case "equal":
                        break;
                      case "delete":
                        originalInstanceRects = originalInstanceRects.push(new PSPDFKit.Geometry.Rect(
                          new PSPDFKit.Geometry.Rect({ 
                            'left': operation.originalTextBlocks[0].rect[0],
                            // defect in CORE, submitted a bug report, should only need to get rect[1]
                            'top': originalPageInfo.height - operation.originalTextBlocks[0].rect[1] - operation.originalTextBlocks[0].rect[3],
                            'width': operation.originalTextBlocks[0].rect[2], 
                            'height': operation.originalTextBlocks[0].rect[3]
                          }),
                        ));

                        // left + top 
                        let delCoord = (operation.changedTextBlocks[0].rect[0]).toString() + "," + (operation.changedTextBlocks[0].rect[1]).toString();

                        if (changes.has(delCoord)) {
                          changes.set(delCoord, {
                            insertText: changes.get(delCoord).insertText,
                            insert: changes.get(delCoord).insert,
                            deleteText: operation.text,
                            del: true,
                          });
                        } else {
                          changes.set(delCoord, {
                            deleteText: operation.text,
                            del: true
                          });
                        }
                        
                        break;
                      case "insert":
                        changedInstanceRects = changedInstanceRects.push(new PSPDFKit.Geometry.Rect(
                          new PSPDFKit.Geometry.Rect({ 
                            'left': operation.changedTextBlocks[0].rect[0],
                            // defect in CORE, submitted a bug report, should only need to get rect[1]
                            'top': changedPageInfo.height - operation.changedTextBlocks[0].rect[1] - operation.changedTextBlocks[0].rect[3],
                            'width': operation.changedTextBlocks[0].rect[2], 
                            'height': operation.changedTextBlocks[0].rect[3]
                          }),
                        ));

                        let insertCoord = (operation.changedTextBlocks[0].rect[0]).toString() + "," + (operation.changedTextBlocks[0].rect[1]).toString();

                        if (changes.has(insertCoord)) {
                          changes.set(insertCoord, {
                            deleteText: changes.get(insertCoord).deleteText,
                            del: changes.get(insertCoord).del,
                            insertText: operation.text,
                            insert: true,
                          });
                        } else {
                          changes.set(insertCoord, {
                            insertText: operation.text,
                            insert: true
                          });
                        }

                        break;
                      default:
                        break;
                    }
                  }
                }
              }
            }
          } // end of for comparisonResult iteration

          operationsRef.current = new Map([
            ...operationsRef.current,
            ...changes,
          ]);

          let originalAnnotations =
            new PSPDFKit.Annotations.HighlightAnnotation({
              pageIndex: i,
              rects: originalInstanceRects,
              color: new PSPDFKit.Color(deleteHighlightColor),
            });

          let changedAnnotations = new PSPDFKit.Annotations.HighlightAnnotation(
            {
              pageIndex: i,
              rects: changedInstanceRects,
              color: new PSPDFKit.Color(insertHighlightColor),
            }
          );

          await originalInstance.create(originalAnnotations);
          await changedInstance.create(changedAnnotations);
        } // end of for totalPageCount iteration

        // update state, which should trigger re-render
        updateOperationsMap(operationsRef.current);
      });
    }
  }, []);

  function plusMinusDisplayText(operation) {
    if (operation.insert && operation.del) {
      return (
        <div className="text-xs">
          <span className="bg-[#FFC9CB]">-1</span> |{" "}
          <span className="bg-[#C0D8EF]">+1</span>
        </div>
      );
    } else if (operation.insert) {
      return (
        <div className="text-xs">
          <span className="bg-[#C0D8EF]">+1</span>
        </div>
      );
    } else {
      return (
        <div className="text-xs">
          <span className="bg-[#FFC9CB]">-1</span>
        </div>
      );
    }
  }

  // Chatdialogue variables
  const [isChatOpen, setIsChatOpen] = useState(false);
  const aiName = "AI";
  const initMessages = [
    {
      type: "PLAIN",
      text: "Welcome to the PSPDFKit document comparison! Ask me anything related to the documents.",
      sender: aiName,
      canCopy: true,
      isComplete: true,
      id: "1",
    },
  ];
  const [messages, setMessages] = useState([...initMessages]);

  return (
    <ThemeProvider theme={"system"}>
      <I18nProvider locale="en-US">
        <div>
          <div className="m-4 grid grid-cols-12 h-100">
            <div className="min-h-fit col-span-5 border-1">
              <div>
                <p className="text-center p-3">{originalDoc}</p>
              </div>
              <div
                id="original-document-viewer"
                ref={originalContainerRef}
                className="h-lvh"
              />
            </div>
            <div className="min-h-[100px] col-span-5 border-1">
              <div>
                <p className="text-center p-3">{changedDoc}</p>
              </div>
              <div
                id="changed-document-viewer"
                ref={changedContainerRef}
                className="h-lvh"
              />
            </div>
            <div className="col-span-2 sm:block border-1">
              <p className="p-3">Changes</p>
              <div>
                {Array.from(operationsMap).map(([key, value]) => (
                  <div
                    key={key}
                    className="p-1 border border-gray-400 border-1 rounded mx-auto mb-2 w-11/12"
                  >
                    <div className="flex justify-between p-1 pl-0">
                      <div className="text-gray-400 text-xs">
                        {value.insert && value.del
                          ? "replaced"
                          : value.insert
                          ? "inserted"
                          : "deleted"}
                      </div>
                      {plusMinusDisplayText(value)}
                    </div>
                    <div>
                      <p className="text-xs">
                        <span className="bg-[#FFC9CB]">{value.deleteText}</span>
                      </p>
                      <p className="text-xs">
                        <span className="bg-[#C0D8EF]">{value.insertText}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Divs */}
        <div
          style={{
            //overflow: "auto",
            position: "absolute",
            bottom: 10,
            right: 10,
            border: "0.5px solid grey",
            borderRadius: isChatOpen ? "10px" : "50%",
            width: isChatOpen ? "35vh" : "8vh",
            height: isChatOpen ? "70vh" : "8vh",
            padding: isChatOpen ? "10px" : "0px",
            boxShadow: "1px",
          }}
        >
          {isChatOpen ? (
            <div
              style={{
                position: "sticky",
                cursor: "pointer",
              }}
              onClick={() => {
                setIsChatOpen(!isChatOpen);
              }}
              className="heading-custom-style"
            >
              Ask AI (Beta) <span style={{ float: "right" }}>&times;</span>
            </div>
          ) : (
            <div
              style={{
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                borderRadius: isChatOpen ? "10px" : "50%",
                width: isChatOpen ? "35vh" : "8vh",
                height: isChatOpen ? "60vh" : "8vh",
                backgroundColor: "#4537de ",
              }}
              onClick={() => {
                setIsChatOpen(!isChatOpen);
              }}
            >
              {chatBotSVG}
            </div>
          )}
          {isChatOpen && (
            <ChatDialog
              style={{ height: "62vh", width: "100%", overflow: "auto" }}
              //@ts-ignore
              messages={messages}
              onInputChanged={async function Da(inp) {
                //console.log("Input Changed : ",inp);
              }}
              onMessageSubmit={async function Da(inp) {
                console.log("Message Submitted : ", inp);

                const newMessage = {
                  type: "PLAIN",
                  text: inp,
                  sender: "You",
                  isComplete: true,
                  canCopy: true,
                  id: Math.random().toString(),
                };

                setMessages([...messages, newMessage]);
                
              }}
            />
          )}
        </div>
      </I18nProvider>
    </ThemeProvider>
  );
}
