(() => {
  const withParams = (url, params) => {
    const urlParams = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => urlParams.set(k, v));
    return url + (url.endsWith('?') ? '' : '?') + urlParams.toString();
  };

  document.addEventListener('keyup', () => {
    const activeCell = document.querySelector('div.is-editing div.CodeMirror');
    if (activeCell && activeCell.CodeMirror) {
      const { CodeMirror: cm } = activeCell;

      // set Ctrl-J to trigger autoformat
      cm.options.extraKeys['Ctrl-J'] = async cm => {
        // TODO: error handling
        const resp = await fetch(
          withParams('https://127.0.0.1:8080/format', { code: cm.getValue() }),
        );
        const data = await resp.json();
        const cur = cm.getCursor();
        cm.setValue(data.code); // setValue moves the cursor to the document start ({line: 0, ch: 0})
        cm.setCursor(cur); // restore the cursor position
      };
    }
  });
})();
