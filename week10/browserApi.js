// filter function
function filterOut(names, props) {
    let set = new Set();
    props.forEach(o => set.add(o));
    return names.filter(e => !set.has(e));
}

// get all browserAPI
let browserAPI = Object.getOwnPropertyNames(window)

// filter ECMA262 API
let objects = ["globalThis", "console", "BigInt", "BigInt64Array", "BigUint64Array", "Infinity", "NaN", "undefined", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "Array", "Date", "RegExp", "Promise", "Proxy", "Map", "WeakMap", "Set", "WeakSet", "Function", "Boolean", "String", "Number", "Symbol", "Object", "Error", "EvalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError", "ArrayBuffer", "SharedArrayBuffer", "DataView", "Float32Array", "Float64Array", "Int8Array", "Int16Array", "Int32Array", "Uint8Array", "Uint16Array", "Uint32Array", "Uint8ClampedArray", "Atomics", "JSON", "Math", "Reflect", "escape", "unescape"];
browserAPI = filterOut(browserAPI, objects)

// filter Node本身以及其子类
browserAPI = browserAPI.filter(e => {
    try {
        return !(window[e].prototype instanceof Node)
    } catch (e) {
        return true
    }
}).filter(e => e != "Node")

// filter window object (https://html.spec.whatwg.org/#window)
objects = [window, self, document, name, location, history, customElements, locationbar, menubar, personalbar, scrollbars, statusbar, toolbar, status, close, closed, stop, focus, blur, frames, length, top, opener, parent, frameElement, open, navigator, alert, confirm, prompt, print, postMessage]
browserAPI = filterOut(browserAPI, objects)

// filter on-events
browserAPI = browserAPI.filter(e => !e.match(/^on/))

// filter webkit前缀的私有属性我们也过滤掉
browserAPI = browserAPI.filter(e => !e.match(/^webkit/))

// filter HTML interfaces
objects = ["ApplicationCache", "AudioTrack", "AudioTrackList", "BarProp", "BeforeUnloadEvent", "BroadcastChannel", "CanvasGradient", "CanvasPattern", "CanvasRenderingContext2D", "CloseEvent", "CustomElementRegistry", "DOMStringList", "DOMStringMap", "DataTransfer", "DataTransferItem", "DataTransferItemList", "DedicatedWorkerGlobalScope", "Document", "DragEvent", "ErrorEvent", "EventSource", "External", "FormDataEvent", "HTMLAllCollection", "HashChangeEvent", "History", "ImageBitmap", "ImageBitmapRenderingContext", "ImageData", "Location", "MediaError", "MessageChannel", "MessageEvent", "MessagePort", "MimeType", "MimeTypeArray", "Navigator", "OffscreenCanvas", "OffscreenCanvasRenderingContext2D", "PageTransitionEvent", "Path2D", "Plugin", "PluginArray", "PopStateEvent", "PromiseRejectionEvent", "RadioNodeList", "SharedWorker", "SharedWorkerGlobalScope", "Storage", "StorageEvent", "TextMetrics", "TextTrack", "TextTrackCue", "TextTrackCueList", "TextTrackList", "TimeRanges", "TrackEvent", "ValidityState", "VideoTrack", "VideoTrackList", "WebSocket", "Window", "Worker", "WorkerGlobalScope", "WorkerLocation", "WorkerNavigator"];
browserAPI = filterOut(browserAPI, objects);

// filter intl
browserAPI = browserAPI.filter(e => e != "Intl");

// filter webGL
objects = ["WebGLVertexArrayObject", "WebGLUniformLocation", "WebGLTransformFeedback", "WebGLTexture", "WebGLSync", "WebGLShaderPrecisionFormat", "WebGLShader", "WebGLSampler", "WebGLRenderingContext", "WebGLRenderbuffer", "WebGLQuery", "WebGLProgram", "WebGLFramebuffer", "WebGLContextEvent", "WebGLBuffer", "WebGLActiveInfo", "WebGL2RenderingContext"];
browserAPI = filterOut(browserAPI, objects);

// filter web audio api
objects = ["OfflineAudioContext", "OfflineAudioCompletionEvent", "AudioContext", "AudioNode", "AnalyserNode", "AudioBuffer", "AudioBufferSourceNode", "AudioDestinationNode", "AudioParam", "AudioListener", "AudioWorklet", "AudioWorkletGlobalScope", "AudioWorkletNode", "AudioWorkletProcessor", "BiquadFilterNode", "ChannelMergerNode", "ChannelSplitterNode", "ConstantSourceNode", "ConvolverNode", "DelayNode", "DynamicsCompressorNode", "GainNode", "IIRFilterNode", "MediaElementAudioSourceNode", "MediaStreamAudioSourceNode", "MediaStreamTrackAudioSourceNode", "MediaStreamAudioDestinationNode", "PannerNode", "PeriodicWave", "OscillatorNode", "StereoPannerNode", "WaveShaperNode", "ScriptProcessorNode", "AudioProcessingEvent"];
browserAPI = filterOut(browserAPI, objects);

// filter Encoding标准
objects = ["TextDecoder", "TextEncoder", "TextDecoderStream", "TextEncoderStream"];
browserAPI = filterOut(browserAPI, objects);

// filter Web Background Synchronization
browserAPI = filterOut(browserAPI, ['SyncManager']);

// filter Web Cryptography API
objects = ["CryptoKey", "SubtleCrypto", "Crypto", "crypto"];
browserAPI = filterOut(browserAPI, objects);

// filter Media Source Extensions (https://www.w3.org/TR/media-source/)
objects= ["MediaSource", "SourceBuffer", "SourceBufferList"];
browserAPI = filterOut(browserAPI, objects);

// The Screen Orientation API (https://www.w3.org/TR/screen-orientation/)
browserAPI = filterOut(browserAPI, ['ScreenOrientation']);

// webRTC (https://www.w3.org/TR/webrtc/)
objects = ["RTCTrackEvent", "RTCStatsReport", "RTCSessionDescription", "RTCSctpTransport", "RTCRtpTransceiver", "RTCRtpSender", "RTCRtpReceiver", "RTCPeerConnectionIceEvent", "RTCPeerConnectionIceErrorEvent", "RTCPeerConnection", "RTCIceCandidate", "RTCErrorEvent", "RTCError", "RTCDtlsTransport", "RTCDataChannelEvent", "RTCDataChannel", "RTCDTMFToneChangeEvent", "RTCDTMFSender", "RTCCertificate"];
browserAPI = filterOut(browserAPI, objects);

// Stream标准
objects = ["ReadableStream", "ReadableStreamDefaultReader", "ReadableStreamBYOBReader", "ReadableStreamDefaultController", "ReadableByteStreamController", "ReadableStreamBYOBRequest", "WritableStream", "WritableStreamDefaultWriter", "WritableStreamDefaultController", "TransformStream", "TransformStreamDefaultController", "ByteLengthQueuingStrategy", "CountQueuingStrategy"];
browserAPI = filterOut(browserAPI, objects);

// MediaStream Image Capture
objects = ["ImageCapture", "PhotoCapabilities", "OverconstrainedError", "MediaStreamTrackEvent", "MediaStreamTrack", "MediaStreamEvent", "MediaStream", "MediaSettingsRange", "MediaRecorder", "MediaEncryptedEvent", "MediaCapabilities"]
browserAPI = filterOut(browserAPI, objects);

// Network Information API
objects = ["NetworkInformation"];
browserAPI = filterOut(browserAPI, objects);

// IndexedDB API
objects = ["IDBVersionChangeEvent", "IDBTransaction", "IDBRequest", "IDBOpenDBRequest", "IDBObjectStore", "IDBKeyRange", "IDBIndex", "IDBFactory", "IDBDatabase", "IDBCursorWithValue", "IDBCursor"];
browserAPI = filterOut(browserAPI, objects);

// Geolocation API
objects = ["GeolocationPositionError", "GeolocationPosition", "GeolocationCoordinates", "Geolocation"];
browserAPI = filterOut(browserAPI, objects);

// Gamepad API
objects = ["GamepadHapticActuator", "GamepadEvent", "Gamepad", "GamepadButton"];
browserAPI= filterOut(browserAPI, objects);

// Compression Streams (https://wicg.github.io/compression/)
objects = ["GenericTransformStream", "DecompressionStream", "CompressionStream"]
browserAPI = filterOut(browserAPI, objects);

// Clipboard API (https://www.w3.org/TR/clipboard-apis/#clipboard-event-paste)
objects = ["ClipboardItem"]
browserAPI = filterOut(browserAPI, objects);

// Media Capture
objects = ["CanvasCaptureMediaStreamTrack", "CaptureStream", "HTMLMediaElement", "HTMLCanvasElement", "MediaStream", "HTMLMediaElement", ""];
browserAPI = filterOut(browserAPI, objects);
