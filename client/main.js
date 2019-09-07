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
        params = { code: cm.getValue(), indent_size: 2, max_line_length: 100 };

        // add an option to allow users to select use public API or local server
        const resp = await fetch(withParams('https://pyformatter.com/api/format', params));

        const data = await resp.json();
        const cur = cm.getCursor();
        cm.setValue(data.code); // setValue moves the cursor to the document start ({line: 0, ch: 0})
        cm.setCursor(cur); // restore the cursor position
      };
    }
  });
})();
