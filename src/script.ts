const buttons = [
  document.getElementById("arrowButton1"),
  document.getElementById("arrowButton2"),
  document.getElementById("arrowButton3"),
  document.getElementById("arrowButton4"),
  document.getElementById("arrowButton5")
];

const reasonExpansions = [
  document.getElementById("reasonExpansionOne"),
  document.getElementById("reasonExpansionTwo"),
  document.getElementById("reasonExpansionThree"),
  document.getElementById("reasonExpansionFour"),
  document.getElementById("reasonExpansionFive")
];

buttons.forEach((button, index) => {
  const expansion = reasonExpansions[index];

  if (!button || !expansion) return;

  button.addEventListener("click", () => {
    const isExpanded = expansion.classList.toggle("expanded");

    button.textContent = isExpanded ? "<" : ">";
  });
});