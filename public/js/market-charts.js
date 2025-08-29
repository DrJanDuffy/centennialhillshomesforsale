// Market Dashboard Charts
document.addEventListener('DOMContentLoaded', () => {
  // Sample data - replace with calls to your own analytics endpoint later
  const priceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    values: [
      600000, 620000, 610000, 630000, 640000, 650000, 660000, 655000, 670000, 680000, 690000,
      700000,
    ],
  };

  const inventoryData = {
    labels: priceData.labels,
    values: [30, 28, 35, 40, 45, 38, 42, 44, 39, 36, 33, 30],
  };

  const domData = {
    labels: priceData.labels,
    values: [20, 18, 22, 19, 17, 15, 14, 13, 12, 11, 10, 9],
  };

  // Chart creator function
  function makeChart(ctx, title, data) {
    if (!ctx) return null;

    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: title,
            data: data.values,
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37,99,235,0.1)',
            tension: 0.3,
            fill: true,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: (context) => {
                if (title === 'Average Sale Price') {
                  return `$${(context.parsed.y / 1000).toFixed(0)}k`;
                } else if (title === 'Active Listings') {
                  return `${context.parsed.y} listings`;
                } else {
                  return `${context.parsed.y} days`;
                }
              },
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#6b7280' },
          },
          y: {
            grid: { color: '#e5e7eb' },
            ticks: {
              color: '#6b7280',
              callback: (value) => {
                if (title === 'Average Sale Price') {
                  return `$${(value / 1000).toFixed(0)}k`;
                } else if (title === 'Active Listings') {
                  return value;
                } else {
                  return `${value} days`;
                }
              },
            },
          },
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
      },
    });
  }

  // Initialize charts
  const priceChart = makeChart(
    document.getElementById('chart-price'),
    'Average Sale Price',
    priceData
  );
  const invChart = makeChart(
    document.getElementById('chart-inventory'),
    'Active Listings',
    inventoryData
  );
  const domChart = makeChart(document.getElementById('chart-dom'), 'Avg Days on Market', domData);

  // Tab logic
  const tabs = document.querySelectorAll('.tab-btn');
  const canvases = document.querySelectorAll('.tab-canvas');

  tabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Toggle active button styling
      tabs.forEach((t) => {
        t.classList.remove('bg-blue-600', 'text-white');
        t.classList.add('bg-gray-200', 'text-gray-800');
      });

      btn.classList.remove('bg-gray-200', 'text-gray-800');
      btn.classList.add('bg-blue-600', 'text-white');

      // Show/hide canvases
      const target = btn.dataset.tab;
      canvases.forEach((c) => {
        c.classList.toggle('hidden', !c.id.includes(target));
      });

      // Resize charts when they become visible
      setTimeout(() => {
        if (target === 'price' && priceChart) priceChart.resize();
        if (target === 'inventory' && invChart) invChart.resize();
        if (target === 'dom' && domChart) domChart.resize();
      }, 100);
    });
  });
});
