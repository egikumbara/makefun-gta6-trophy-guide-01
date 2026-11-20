// GTA VI trophy guide & tracker: checklist saved in localStorage, export/import,
// grade + kind filters, search, earned-only view, and a spoiler setting that hides
// the names and descriptions of hidden story trophies until they are earned.
// Static and offline: the only file it loads is data/trophies.json, beside it.
const KEY = 'gta6-trophy-checklist-v1';
const SPOILER_KEY = 'gta6-trophy-spoilers-v1';

const listEl = document.getElementById('trophyList');
const emptyEl = document.getElementById('emptyState');
const statusEl = document.getElementById('status');
const gradeSel = document.getElementById('gradeFilter');
const kindSel = document.getElementById('kindFilter');
const searchEl = document.getElementById('search');
const earnedOnlyEl = document.getElementById('earnedOnly');
const spoilerEl = document.getElementById('spoiler');
const onlineNote = document.getElementById('onlineNote');

let earned = new Set();
try { earned = new Set(JSON.parse(localStorage.getItem(KEY) ?? '[]')); } catch { earned = new Set(); }
spoilerEl.checked = localStorage.getItem(SPOILER_KEY) !== 'off';

const doc = await (await fetch('data/trophies.json')).json();
const trophies = doc.trophies;
const sources = doc.sources;
const roadmap = doc.roadmap;

document.getElementById('honestyText').textContent = doc.note;

const stagesEl = document.getElementById('stages');
for (const s of roadmap) {
  const li = document.createElement('li');
  const num = document.createElement('span');
  num.className = 'stage-num';
  num.textContent = 'Stage ' + s.stage;
  const h = document.createElement('h3');
  h.textContent = s.title;
  const p = document.createElement('p');
  p.textContent = s.summary;
  li.append(num, h, p);
  stagesEl.append(li);
}

const sourceList = document.getElementById('sourceList');
for (const [key, s] of Object.entries(sources)) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = s.url;
  a.textContent = s.name;
  a.rel = 'noopener';
  a.target = '_blank';
  li.append(a);
  if (key === 'exophase') li.append(document.createTextNode(' — the pre-release list this guide is built on'));
  sourceList.append(li);
}

function save() {
  localStorage.setItem(KEY, JSON.stringify([...earned].sort()));
}

function flash(msg) {
  statusEl.textContent = msg;
  setTimeout(() => { statusEl.textContent = ''; }, 4000);
}

function trophyIsSpoiled(t) {
  return spoilerEl.checked && t.hidden && !earned.has(t.name);
}

function render() {
  const grade = gradeSel.value;
  const kind = kindSel.value;
  const q = searchEl.value.trim().toLowerCase();
  const earnedOnly = earnedOnlyEl.checked;
  onlineNote.hidden = kind !== 'online';

  const gradeCount = { platinum: 0, gold: 0, silver: 0, bronze: 0 };
  for (const t of trophies) if (earned.has(t.name)) gradeCount[t.grade]++;

  document.getElementById('progressBig').textContent = earned.size + ' / ' + trophies.length;
  document.getElementById('progressFill').style.width = (earned.size / trophies.length * 100) + '%';
  document.getElementById('progressPct').textContent =
    Math.round(earned.size / trophies.length * 100) + '% to platinum';
  document.getElementById('gradeCounts').textContent =
    'Platinum ' + gradeCount.platinum + '/1 · Gold ' + gradeCount.gold + '/2 · Silver ' +
    gradeCount.silver + '/6 · Bronze ' + gradeCount.bronze + '/46';

  listEl.replaceChildren();
  let shown = 0;
  for (const t of trophies) {
    if (grade !== 'all' && t.grade !== grade) continue;
    if (kind !== 'all' && t.kind !== kind) continue;
    if (earnedOnly && !earned.has(t.name)) continue;
    if (q && !(t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) ||
        t.guide.toLowerCase().includes(q))) continue;
    shown++;

    const li = document.createElement('li');
    li.className = 'trophy' + (earned.has(t.name) ? ' earned' : '');
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = earned.has(t.name);
    box.setAttribute('aria-label', 'Mark ' + t.name + ' as earned');
    box.addEventListener('change', () => {
      if (box.checked) earned.add(t.name); else earned.delete(t.name);
      save();
      render();
    });
    const body = document.createElement('div');

    const head = document.createElement('div');
    head.className = 'trophy-head';
    const h = document.createElement('h3');
    const spoiled = trophyIsSpoiled(t);
    h.textContent = spoiled ? 'Hidden story trophy — earn it to reveal' : t.name;
    head.append(h);
    const gradeBadge = document.createElement('span');
    gradeBadge.className = 'badge ' + t.grade;
    gradeBadge.textContent = t.grade;
    head.append(gradeBadge);
    const kindBadge = document.createElement('span');
    kindBadge.className = 'badge kind';
    kindBadge.textContent = t.kind;
    head.append(kindBadge);
    if (t.missable) {
      const m = document.createElement('span');
      m.className = 'badge missable';
      m.textContent = 'Possibly missable';
      head.append(m);
    }
    const stageBadge = document.createElement('span');
    stageBadge.className = 'badge stage';
    stageBadge.textContent = 'Roadmap stage ' + t.roadmap_stage;
    head.append(stageBadge);
    body.append(head);

    if (spoiled) {
      const p = document.createElement('p');
      p.className = 'spoiled';
      p.innerHTML = '';
      const lock = document.createElement('span');
      lock.className = 'lock';
      lock.textContent = 'Spoiler hidden. ';
      p.append(lock, document.createTextNode(
        'This is a hidden story trophy. Its name, description and guide stay hidden until you tick it earned — or turn spoiler hiding off above.'));
      body.append(p);
    } else {
      const desc = document.createElement('p');
      desc.className = 'desc';
      desc.textContent = '“' + t.description + '”';
      body.append(desc);
      const guide = document.createElement('p');
      guide.className = 'guide';
      const label = document.createElement('strong');
      label.textContent = 'Guide: ';
      guide.append(label, document.createTextNode(t.guide));
      body.append(guide);
      const src = document.createElement('p');
      src.className = 'cite';
      src.append(document.createTextNode('Sources: '));
      t.sources.forEach((key, i) => {
        if (i > 0) src.append(document.createTextNode(', '));
        const a = document.createElement('a');
        a.href = sources[key].url;
        a.textContent = sources[key].name;
        a.rel = 'noopener';
        a.target = '_blank';
        src.append(a);
      });
      body.append(src);
    }

    li.append(box, body);
    listEl.append(li);
  }
  emptyEl.hidden = shown > 0;
  document.getElementById('countLine').textContent =
    'Showing ' + shown + ' of ' + trophies.length + ' trophies' +
    (kind === 'online' ? ' — the game lists no online trophies.' : '.');
}

document.getElementById('exportBtn').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify({ game: 'Grand Theft Auto VI', earned: [...earned].sort() }, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'gta6-trophy-progress.json';
  a.click();
  URL.revokeObjectURL(a.href);
  flash('Progress exported (' + earned.size + ' earned).');
});

document.getElementById('importFile').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    const names = Array.isArray(data) ? data : data.earned;
    if (!Array.isArray(names)) throw new Error('bad file');
    const known = new Set(trophies.map((t) => t.name));
    const kept = names.filter((n) => known.has(n));
    earned = new Set(kept);
    save();
    render();
    flash('Imported ' + kept.length + ' earned trophies' + (names.length - kept.length ? ' (' + (names.length - kept.length) + ' unknown names skipped)' : '') + '.');
  } catch {
    flash('That file could not be imported. It must be a progress JSON exported from this guide.');
  }
  e.target.value = '';
});

document.getElementById('resetBtn').addEventListener('click', () => {
  if (!confirm('Clear all ' + earned.size + ' earned trophies?')) return;
  earned = new Set();
  save();
  render();
  flash('Progress cleared.');
});

spoilerEl.addEventListener('change', () => {
  localStorage.setItem(SPOILER_KEY, spoilerEl.checked ? 'on' : 'off');
  render();
});
gradeSel.addEventListener('change', render);
kindSel.addEventListener('change', render);
searchEl.addEventListener('input', render);
earnedOnlyEl.addEventListener('change', render);

render();
