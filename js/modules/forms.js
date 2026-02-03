/**
 * @fileoverview Moduł Formularza Wieloetapowego
 * @description Obsługuje nawigację i walidację formularza wieloetapowego.
 * @module forms
 * @exports {Function} initMultiStepForm - Inicjalizuje formularz wieloetapowy
 */

/**
 * Inicjalizuje formularz wieloetapowy z nawigacją i walidacją.
 * Obsługuje przejścia między krokami, aktualizacje paska postępu i wysyłkę formularza.
 */
export function initMultiStepForm() {
  const multiStepForm = document.getElementById('multi-step-form');

  if (!multiStepForm) {
    return;
  }

  const steps = multiStepForm.querySelectorAll('.form-step');
  const nextBtns = multiStepForm.querySelectorAll('.next-btn');
  const prevBtns = multiStepForm.querySelectorAll('.prev-btn');
  const progressBar = multiStepForm.querySelector('#progress-bar');
  const progressText = multiStepForm.querySelector('#progress-text');

  const briefFormWrapper = document.getElementById('brief-form-wrapper');
  const successMessage = briefFormWrapper?.querySelector('#success-message');

  let currentStep = 0;
  const totalSteps = steps.length;

  /**
   * Aktualizuje wyświetlanie kroków i pasek postępu.
   * @private
   */
  const updateStepDisplay = () => {
    steps.forEach((step, index) => {
      if (index === currentStep) {
        step.classList.remove('hidden');
        step.classList.add('active-step');
      } else {
        step.classList.add('hidden');
        step.classList.remove('active-step');
      }
    });

    const progress = ((currentStep + 1) / totalSteps) * 100;
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
    if (progressText) {
      progressText.textContent = `Krok ${currentStep + 1}/${totalSteps}`;
    }
  };

  /**
   * Waliduje pola w aktualnym kroku.
   * @returns {boolean} - True jeśli wszystkie wymagane pola są prawidłowe
   * @private
   */
  const validateCurrentStep = () => {
    const inputs = steps[currentStep].querySelectorAll('input, select, textarea');
    let isValid = true;

    inputs.forEach(input => {
      // Ignoruj elementy ukryte lub bez required (chociaż querySelectorAll pobiera wszystko, sprawdzamy attr)
      if (!input.hasAttribute('required')) {
        return;
      }

      if (!input.checkValidity()) {
        isValid = false;

        // Dodaj klasę błędu do inputa
        input.classList.add('form-invalid');

        // Dodaj klasę błędu do labela
        const parentLabel = input.closest('label');
        if (parentLabel) {
          parentLabel.classList.add('form-invalid');
        }

        // Specjalna obsługa dla grup radio (zaznacz całą grupę jako błąd)
        if (input.type === 'radio') {
          const groupName = input.name;
          const group = steps[currentStep].querySelectorAll(`input[name="${groupName}"]`);
          group.forEach(radio => {
            radio.closest('label')?.classList.add('form-invalid');
          });
        }
      } else {
        // Usuń błędy jeśli jest OK
        input.classList.remove('form-invalid');
        const parentLabel = input.closest('label');
        if (parentLabel) {
          parentLabel.classList.remove('form-invalid');
        }

        if (input.type === 'radio') {
          const groupName = input.name;
          const group = steps[currentStep].querySelectorAll(`input[name="${groupName}"]`);
          group.forEach(radio => {
            const label = radio.closest('label');
            if (label) {
              label.classList.remove('form-invalid');
            }
          });
        }
      }
    });

    return isValid;
  };

  // Obsługa przycisków "Dalej"
  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (validateCurrentStep() && currentStep < totalSteps - 1) {
        currentStep++;
        updateStepDisplay();
      } else if (!validateCurrentStep()) {
        // Animacja trzęsienia przy nieprawidłowej walidacji
        steps[currentStep].classList.add('form-step-invalid');
        setTimeout(() => {
          steps[currentStep].classList.remove('form-step-invalid');
        }, 500);
      }
    });
  });

  // Obsługa przycisków "Wstecz"
  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 0) {
        currentStep--;
        updateStepDisplay();
      }
    });
  });

  // Obsługa wysyłki formularza
  multiStepForm.addEventListener('submit', e => {
    e.preventDefault();

    const inputs = steps[currentStep].querySelectorAll('[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!input.checkValidity()) {
        isValid = false;
        // Dodaj klasę invalid aby pokazać czerwoną ramkę
        const parentLabel = input.closest('label');
        if (parentLabel) {
          parentLabel.classList.add('form-invalid');
        }
        input.classList.add('form-invalid');
      }
    });

    if (isValid && briefFormWrapper && successMessage) {
      multiStepForm.style.transition = 'opacity 0.5s ease';
      multiStepForm.style.opacity = '0';

      setTimeout(() => {
        multiStepForm.classList.add('hidden');
        successMessage.classList.remove('hidden');
        successMessage.style.opacity = '1';
      }, 500);
    } else {
      // Brakująca obsługa błędu - potrząśnij formularzem
      steps[currentStep].classList.add('form-step-invalid');
      setTimeout(() => {
        steps[currentStep].classList.remove('form-step-invalid');
      }, 500);
    }
  });

  // Inicjalizacja wyświetlania
  if (steps.length > 0) {
    updateStepDisplay();
  }
}
