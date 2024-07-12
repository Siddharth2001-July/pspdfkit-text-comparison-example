"use client";

import {useEffect, useRef, useState} from "react";

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
    const deleteHighlightColor = {r: 255, g: 201, b: 203}; // #FFC9CB
    const insertHighlightColor = {r: 192, g: 216, b: 239}; // #C0D8EF

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
        const scrollElement = changedInstance.contentDocument.querySelector(".PSPDFKit-Scroll");
        scrollElement.addEventListener("scroll", syncViewState);
        changedInstance.addEventListener("viewState.currentPageIndex.change", syncViewState);
        changedInstance.addEventListener("viewState.zoom.change", syncViewState);

        // synchronize the view state of the original instance viewer to the changed instance viewer
        function syncViewState() {
          // Get the current view state from the left viewer
          const customViewState = {
            pageNumber: changedInstance.viewState.currentPageIndex,
            zoomLevel: changedInstance.viewState.zoom,
            scrollLeft: changedInstance.contentDocument.querySelector(".PSPDFKit-Scroll").scrollLeft,
            scrollTop: changedInstance.contentDocument.querySelector(".PSPDFKit-Scroll").scrollTop,
          };

          // Set the page number and zoom level for the right viewer
          let viewState = originalInstance.viewState;
          originalInstance.setViewState(viewState.set("currentPageIndex", customViewState.pageNumber));
          originalInstance.setViewState(viewState.set("zoom", customViewState.zoomLevel));

          // Set scroll position for the right viewer
          const scrollElement = originalInstance.contentDocument.querySelector(".PSPDFKit-Scroll");
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

          const textComparisonOperation = new PSPDFKit.ComparisonOperation(PSPDFKit.ComparisonOperationType.TEXT, {
            numberOfContextWords: numberOfContextWords,
          });

          const comparisonResult = await originalInstance.compareDocuments({originalDocument, changedDocument}, textComparisonOperation);

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

          operationsRef.current = new Map([...operationsRef.current, ...changes]);

          let originalAnnotations = new PSPDFKit.Annotations.HighlightAnnotation({
            pageIndex: i,
            rects: originalInstanceRects,
            color: new PSPDFKit.Color(deleteHighlightColor),
          });

          let changedAnnotations = new PSPDFKit.Annotations.HighlightAnnotation({
            pageIndex: i,
            rects: changedInstanceRects,
            color: new PSPDFKit.Color(insertHighlightColor),
          });

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
          <span className="bg-[#FFC9CB]">-1</span> | <span className="bg-[#C0D8EF]">+1</span>
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

  return (
    <div>
      <div className="m-4 grid grid-cols-12 h-100">
        <div className="min-h-fit col-span-5 border-1">
          <div>
            <p className="text-center p-3">{originalDoc}</p>
          </div>
          <div id="original-document-viewer" ref={originalContainerRef} className="h-lvh" />
        </div>
        <div className="min-h-[100px] col-span-5 border-1">
          <div>
            <p className="text-center p-3">{changedDoc}</p>
          </div>
          <div id="changed-document-viewer" ref={changedContainerRef} className="h-lvh" />
        </div>
        <div className="col-span-2 sm:block border-1">
          <p className="p-3">Changes</p>
          <div>
            {Array.from(operationsMap).map(([key, value]) => (
              <div key={key} className="p-1 border border-gray-400 border-1 rounded mx-auto mb-2 w-11/12">
                <div className="flex justify-between p-1 pl-0">
                  <div className="text-gray-400 text-xs">{value.insert && value.del ? "replaced" : value.insert ? "inserted" : "deleted"}</div>
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
  );
}
