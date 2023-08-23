import { getActiveBoards } from "./app";

const boardElms: NodeListOf<Element> = document.querySelectorAll(".board");

function handleCell({
    boardIdx,
    cellIdx,
}: {
    boardIdx: number;
    cellIdx: number;
}): void {
    // clear all active cells
    for (const boardElm of boardElms) {
        for (const cellElm of boardElm.children) {
            (cellElm as HTMLElement).className = "cell";
        }
    }

    // active current board
    const currentBoardElm = boardElms[boardIdx];
    for (const cellElm of currentBoardElm.children) {
        (cellElm as HTMLElement).className = "cell active";
    }

    // active row and column cells
    const activeBoards = getActiveBoards({ boardIdx, cellIdx });

    for (let activeBoardIdx in activeBoards) {
        const activeBoardElm = boardElms[Number(activeBoardIdx)];
        const activeCells = activeBoards[activeBoardIdx];

        for (let activeCellIdx of activeCells) {
            const activeCellElm = activeBoardElm.children[
                activeCellIdx
            ] as HTMLElement;
            activeCellElm.className = "cell active";
        }
    }
}

function init(): void {
    for (let boardIdx = 0; boardIdx < boardElms.length; boardIdx++) {
        const boardElm = boardElms[boardIdx];

        for (let cellIdx = 0; cellIdx < boardElm.children.length; cellIdx++) {
            const cellElm = boardElm.children[cellIdx];

            (cellElm as HTMLElement).addEventListener("click", () =>
                handleCell({ cellIdx, boardIdx })
            );
        }
    }
}

init();