// Interactivity: nav toggle, day tabs, mailto registration, generate simple ICS
document.addEventListener('DOMContentLoaded', function(){
  // Nav toggle for small screens
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');
  navToggle?.addEventListener('click', () => {
    siteNav.style.display = siteNav.style.display === 'flex' ? 'none' : 'flex';
  });

  // Day tabs
  const tabs = document.querySelectorAll('.day-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const day = tab.dataset.day;
      document.querySelectorAll('.day-schedule').forEach(ds => ds.classList.remove('schedule-active'));
      const el = document.getElementById('day-' + day);
      if (el) el.classList.add('schedule-active');
    });
  });
});

// Registration handler: open mail client with pre-filled content
function handleRegister(e){
  e.preventDefault();
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const aff = document.getElementById('reg-aff').value.trim();
  const ticket = document.getElementById('reg-ticket').value;
  const comments = document.getElementById('reg-comments').value.trim();

  const to = 'vivekiniitm@afucommunity.com';
  const subject = encodeURIComponent('Registration - QC Fall Fest 2026');
  const bodyLines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Affiliation: ${aff}`,
    `Ticket: ${ticket}`,
    `Comments: ${comments}`
  ];
  const body = encodeURIComponent(bodyLines.join('\n'));
  const mailto = `mailto:${to}?subject=${subject}&body=${body}`;
  window.location.href = mailto;
  return false;
}

// Simple ICS download for event dates (tentative)
function downloadICS(){
  const start = '20261012T090000';
  const end = '20261016T140000';
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//QC Fall Fest 2026//EN',
    'BEGIN:VEVENT',
    `UID:qcfallfest2026@qcfallfest.org`,
    `DTSTAMP:${start}Z`,
    `DTSTART:${start}Z`,
    `DTEND:${end}Z`,
    'SUMMARY:Quantum Computing Fall Fest 2026',
    'DESCRIPTION:Quantum Computing Fall Fest 2026 — Oct 12-16. Check the site for details.',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([ics], {type: 'text/calendar'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'qc-fall-fest-2026.ics';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
