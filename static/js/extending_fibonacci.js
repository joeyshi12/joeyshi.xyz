const elt = document.getElementById("calculator");
const calculator = Desmos.GraphingCalculator(elt, { expressionsCollapsed: true, settingsMenu: false });
const expressions = [
    { id: "golden_ratio", latex: "\\phi = \\frac{1 + \\sqrt{5}}{2}" },
    { id: "extfib", latex: "\\frac{\\phi^{x}}{\\sqrt{5}} - \\frac{\\phi^{-x}}{\\sqrt{5}}\\sum_{k=0}^{500} \\frac{1}{2^{k+1}}\\cos((1 + 2k)\\pi x)", color: "#ff0000" },
    { id: "fibfunc", latex: "F(n) = \\frac{\\phi^n - (-\\frac{1}{\\phi})^{n}}{\\sqrt{5}}", hidden: true },
    { id: "ints", latex: "N = [-20...100]" },
    { id: "fibpoints", latex: "(N, F(N))", color: "#000000" },
];
calculator.setExpressions(expressions);
