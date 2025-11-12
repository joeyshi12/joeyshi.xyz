const codeBlocks = document.querySelectorAll(".highlight");

codeBlocks.forEach((block) => {
    // Skip if it"s an inline code block or already has a button
    if (block.querySelector(".copy-button")) return;

    const button = document.createElement("button");
    button.className = "copy-button";
    button.textContent = "Copy";

    button.addEventListener("click", async () => {
        const code = block.querySelector("code");
        const text = code.textContent;

        try {
            await navigator.clipboard.writeText(text);
            button.textContent = "Copied";
            
            setTimeout(() => {
                button.textContent = "Copy";
            }, 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
            button.textContent = "Failed";

            setTimeout(() => {
                button.textContent = "Copy";
            }, 2000);
        }
    });

    block.appendChild(button);
});
