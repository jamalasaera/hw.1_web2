(() => {
  const KM_TO_MI = 0.621371;

  // DOM elements
  const form = document.getElementById('converter-form');
  const kmInput = document.getElementById('kilometers');
  const resultOut = document.getElementById('result');
  const errorBox = document.getElementById('km-error');
  const clearBtn = document.getElementById('clear-btn');

  // Format numbers nicely for the user's locale
  const fmt = new Intl.NumberFormat(undefined, { maximumFractionDigits: 6 });

  function showError(msg) {
    errorBox.textContent = msg;
    kmInput.setAttribute('aria-invalid', 'true');
    resultOut.textContent = '—';
  }

  function clearError() {
    errorBox.textContent = '';
    kmInput.removeAttribute('aria-invalid');
  }

  function convertKmToMiles(km) {
    // exact spec: miles = kilometers × 0.621371
    return km * KM_TO_MI;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearError();

    const raw = kmInput.value.trim();

    if (raw === '') {
      showError('Please enter a value.');
      kmInput.focus();
      return;
    }

    const km = Number(raw);
    if (!Number.isFinite(km)) {
      showError('That doesn’t look like a number.');
      kmInput.focus();
      return;
    }

    if (km < 0) {
      showError('Please enter a non-negative value.');
      kmInput.focus();
      return;
    }

    const miles = convertKmToMiles(km);

    // Display with sensible precision; keep the full-precision number accessible in title
    resultOut.textContent = `${fmt.format(km)} km = ${fmt.format(miles)} mi`;
    resultOut.title = `${km} kilometers = ${miles} miles`;
  });

  clearBtn.addEventListener('click', () => {
    form.reset();
    clearError();
    resultOut.textContent = '—';
    kmInput.focus();
  });

  // Quality of life: pressing Enter inside the input triggers submit naturally
})();
