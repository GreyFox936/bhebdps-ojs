const tooltipLinks = document.querySelectorAll('.has-tooltip');
const tooltip = document.createElement('div');

let activeTooltipLink = null;

tooltip.classList.add('tooltip');
document.body.appendChild(tooltip);


// Убрать подсказку
function hideTooltip() {
  tooltip.classList.remove('tooltip_active');
  activeTooltipLink = null;
}

// Задать координаты подсказки относительно выбранного элемента
function setTooltipPosition(element) {
  const elementPosition = element.getBoundingClientRect();

  tooltip.style.left = `${elementPosition.left + window.scrollX}px`;
  tooltip.style.top = `${elementPosition.bottom + window.scrollY}px`;
}

// Показать подсказку
function showTooltip(element) {
  tooltip.textContent = element.getAttribute('title');

  setTooltipPosition(element);

  tooltip.classList.add('tooltip_active');
  activeTooltipLink = element;
}


// Обработать клик по элементу с подсказкой
function handleTooltipClick(event) {
  event.preventDefault();
  event.stopPropagation();

  const tooltipLink = event.currentTarget;

  if (activeTooltipLink === tooltipLink) {
    hideTooltip();

    return;
  }

  showTooltip(tooltipLink);
}


// Обработать клик вне элемента с подсказкой
function handleDocumentClick() {
  hideTooltip();
}

tooltipLinks.forEach(function (tooltipLink) {
  tooltipLink.addEventListener('click', handleTooltipClick);
});

document.addEventListener('click', handleDocumentClick);
