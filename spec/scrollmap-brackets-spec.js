const { CompositeDisposable } = require("atom");

describe("scrollmap-brackets", () => {
  let editor, mainModule, provider, layer, api, consumerDisposable;

  // Minimal stand-in for the layer object the scrollmap hub passes to
  // `initialize` and `getItems` (see lumine-code/scrollmap lib/layer.js).
  function makeLayer(targetEditor) {
    const fake = {
      editor: targetEditor,
      cache: new Map(),
      items: [],
      disposables: new CompositeDisposable(),
    };
    fake.update = jasmine.createSpy("update").and.callFake(() => {
      const items = provider.getItems(fake);
      if (items) {
        fake.items = items;
      }
    });
    fake.updateSync = fake.update;
    fake.refresh = () => {};
    targetEditor.scrollmap = {
      layers: new Map([[provider.name, fake]]),
      updateView() {},
    };
    if (provider.initialize) {
      provider.initialize(fake);
    }
    return fake;
  }

  beforeEach(async () => {
    jasmine.attachToDOM(atom.views.getView(atom.workspace));
    const pack = await atom.packages.activatePackage("scrollmap-brackets");
    mainModule = pack.mainModule;
    provider = mainModule.provideScrollmap();

    // Consume the real service from the bundled bracket-matcher package.
    const bracketMatcher = await atom.packages.activatePackage("bracket-matcher");
    api = bracketMatcher.mainModule.provideBracketMatcher();

    editor = await atom.workspace.open();
    editor.setText("(hello)\nworld\n{\n  body\n}\n");
    layer = makeLayer(editor);
    consumerDisposable = mainModule.consumeBracketMatcher(api);
  });

  afterEach(() => {
    consumerDisposable.dispose();
    layer.disposables.dispose();
  });

  it("activates and provides a scrollmap layer descriptor", () => {
    expect(atom.packages.isPackageActive("scrollmap-brackets")).toBe(true);
    expect(provider.name).toBe("brackets");
    expect(typeof provider.description).toBe("string");
    expect(typeof provider.getItems).toBe("function");
  });

  it("matches the shape of the real bracket-matcher service", () => {
    expect(typeof api.getMatchRanges).toBe("function");
    expect(typeof api.observe).toBe("function");
    expect(api.getMatchRanges(editor)).toBeNull();
  });

  it("marks a single row when the matched pair sits on one line", () => {
    editor.setCursorBufferPosition([0, 0]);
    expect(layer.update).toHaveBeenCalled();
    expect(layer.items).toEqual([{ row: 0 }]);
  });

  it("marks both rows of a multi-line bracket pair", () => {
    editor.setCursorBufferPosition([2, 0]);
    expect(layer.items).toEqual([{ row: 2 }, { row: 4 }]);
  });

  it("clears the markers when the cursor leaves the bracket pair", () => {
    editor.setCursorBufferPosition([2, 0]);
    expect(layer.items.length).toBe(2);
    editor.setCursorBufferPosition([1, 2]);
    expect(layer.items).toEqual([]);
  });

  it("is wired to the bundled bracket-matcher through the services hub", () => {
    // Both packages are active, so the services hub connected them on its own;
    // the layer keeps updating even without the manual consumer subscription.
    consumerDisposable.dispose();
    layer.update.calls.reset();
    editor.setCursorBufferPosition([0, 0]);
    expect(layer.update).toHaveBeenCalled();
    expect(layer.items).toEqual([{ row: 0 }]);
  });

  it("stops updating the layer once the consumer is disposed", () => {
    const { Emitter } = require("atom");
    const emitter = new Emitter();
    const fakeApi = {
      getMatchRanges: () => null,
      observe: (callback) => emitter.on("match", (e) => callback(e, null)),
    };
    const disposable = mainModule.consumeBracketMatcher(fakeApi);
    layer.update.calls.reset();
    emitter.emit("match", editor);
    expect(layer.update).toHaveBeenCalled();

    disposable.dispose();
    layer.update.calls.reset();
    emitter.emit("match", editor);
    expect(layer.update).not.toHaveBeenCalled();
  });
});
