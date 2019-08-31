(() => {
  const withParams = (url, params) => {
    const urlParams = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => urlParams.set(k, v));
    return url + (url.endsWith('?') ? '' : '?') + urlParams.toString();
  };

  document.addEventListener('keyup', () => {
    const cellEditing = document.querySelector('div.is-editing div.CodeMirror');
    if (cellEditing && cellEditing.CodeMirror) {
      const { CodeMirror: cm } = cellEditing;
      cm.options.extraKeys['Ctrl-J'] = async cm => {
        // TODO: Error handling
        const resp = await fetch(
          withParams('https://0.0.0.0:8888/format', { code: cm.getValue() }),
        );
        const data = await resp.json();
        const cur = cm.getCursor();
        cm.setValue(data.code); // the cursor moves to {line: 0, ch: 0}
        cm.setCursor(cur); // move the cursor where it was before calling setValue
      };
    }
  });
})();
